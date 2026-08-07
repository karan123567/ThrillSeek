import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { adminDb, adminAuth } from "@/lib/firebaseAdmin";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }
    const decoded = await adminAuth.verifyIdToken(authHeader.split("Bearer ")[1]);

    const { bookingId } = await req.json();
    if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

    const bookingRef = adminDb.collection("bookings").doc(bookingId);
    const bookingSnap = await bookingRef.get();
    if (!bookingSnap.exists) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    const booking = bookingSnap.data()!;
    if (booking.customerId !== decoded.uid) {
      return NextResponse.json({ error: "Not your booking" }, { status: 403 });
    }
    if (booking.status !== "pending_payment") {
      return NextResponse.json({ error: `Booking is already ${booking.status}` }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(booking.totalAmount * 100), // paise
      currency: "INR",
      receipt: bookingId,
      notes: { bookingId },
    });

    await bookingRef.update({ razorpayOrderId: order.id });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}