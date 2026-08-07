import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { adminDb, adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }
    const decoded = await adminAuth.verifyIdToken(authHeader.split("Bearer ")[1]);

    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const bookingRef = adminDb.collection("bookings").doc(bookingId);
    const bookingSnap = await bookingRef.get();
    if (!bookingSnap.exists) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    const booking = bookingSnap.data()!;
    if (booking.customerId !== decoded.uid) {
      return NextResponse.json({ error: "Not your booking" }, { status: 403 });
    }
    if (booking.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Order mismatch" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await bookingRef.update({ status: "payment_failed" });
      return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
    }

    const listingRef = adminDb.collection("provider_listings").doc(booking.listingId);
    const invoiceNumber = `INV-${Date.now()}`;

    await adminDb.runTransaction(async (tx) => {
      const listingSnap = await tx.get(listingRef);
      if (!listingSnap.exists) throw new Error("Listing not found");
      const listing = listingSnap.data()!;
      const schedule = [...listing.schedule];

      const slotIndex = schedule.findIndex(
        (s: any) => s.date === booking.bookingDate && s.time === booking.bookingTime
      );
      if (slotIndex === -1) throw new Error("Slot not found");

      const slot = schedule[slotIndex];
      if (slot.capacity - slot.booked < booking.quantity) throw new Error("Not enough seats left");

      schedule[slotIndex] = { ...slot, booked: slot.booked + booking.quantity };

      tx.update(listingRef, { schedule });
      tx.update(bookingRef, {
        status: "confirmed",
        razorpayPaymentId: razorpay_payment_id,
        invoiceNumber,
        updatedAt: new Date(),
      });
    });

    return NextResponse.json({ success: true, invoiceNumber });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}