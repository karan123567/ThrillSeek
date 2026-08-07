"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import { ProviderListing } from "@/lib/types";
import { useAuth } from "./auth/AuthProvider";
import { getAuth } from "firebase/auth";
import { useToast } from "./Toast";

const GST_RATE = 0.18;

// add this helper function above the component
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookingModal({ listing, onClose }: { listing: ProviderListing | null; onClose: () => void }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [slotIndex, setSlotIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  if (!listing) return null;

  const slot = listing.schedule[slotIndex];
  const seatsLeft = slot.capacity - slot.booked;
  const subtotal = listing.price * quantity;
  const gstAmount = Math.round(subtotal * GST_RATE);
  const totalAmount = subtotal + gstAmount;

  const handleConfirm = async () => {
  if (!user) {
    showToast("Sign in to book this adventure.", "error");
    return;
  }
  if (quantity < 1 || quantity > seatsLeft) {
    showToast(`Only ${seatsLeft} seats available for this slot.`, "error");
    return;
  }

  setSubmitting(true);
  try {
    const db = getFirestore();
    const bookingRef = await addDoc(collection(db, "bookings"), {
      listingId: listing.id,
      providerId: listing.providerId,
      customerId: user.uid,
      customerName: user.displayName || "",
      customerEmail: user.email || "",
      listingName: listing.name,
      unitPrice: listing.price,
      quantity,
      subtotal,
      gstAmount,
      totalAmount,
      bookingDate: slot.date,
      bookingTime: slot.time,
      status: "pending_payment",
      razorpayOrderId: null,
      razorpayPaymentId: null,
      invoiceNumber: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const idToken = await getAuth().currentUser?.getIdToken();
    if (!idToken) throw new Error("Not signed in");

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ bookingId: bookingRef.id }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) throw new Error("Failed to load Razorpay checkout");

    const rzp = new (window as any).Razorpay({
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,
      name: "Thrillseek",
      description: listing.name,
      prefill: { name: user.displayName || "", email: user.email || "" },
      theme: { color: "#ff6b2c" },
      handler: async (response: any) => {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
            body: JSON.stringify({
              bookingId: bookingRef.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) throw new Error(verifyData.error || "Verification failed");
          showToast(`Payment successful! Invoice: ${verifyData.invoiceNumber}`, "success");
          onClose();
        } catch (err) {
          console.error(err);
          showToast("Payment succeeded but verification failed — contact support.", "error");
        }
      },
      modal: {
        ondismiss: () => {
          showToast("Payment cancelled — your booking is saved as pending.", "info");
        },
      },
    });

    rzp.open();
  } catch (error) {
    console.error(error);
    showToast("Failed to start payment.", "error");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-th-card border border-th-border rounded-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-th-text-muted hover:text-th-text">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-medium text-th-text mb-1">{listing.name}</h3>
        <p className="text-xs text-th-text-muted mb-5">{listing.location}</p>

        <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Choose a slot</label>
        <select
          value={slotIndex}
          onChange={(e) => setSlotIndex(Number(e.target.value))}
          className="w-full bg-th-input border border-th-border rounded-xl px-4 py-2.5 text-sm mb-4"
        >
          {listing.schedule.map((s, i) => (
            <option key={i} value={i} disabled={s.capacity - s.booked === 0}>
              {s.date} · {s.time} — {s.capacity - s.booked} seats left
            </option>
          ))}
        </select>

        <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Number of people</label>
        <input
          type="number"
          min={1}
          max={seatsLeft}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full bg-th-input border border-th-border rounded-xl px-4 py-2.5 text-sm mb-5"
        />

        <div className="space-y-1.5 text-sm border-t border-th-border pt-4 mb-5">
          <div className="flex justify-between text-th-text-muted">
            <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-th-text-muted">
            <span>GST (18%)</span><span>₹{gstAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-th-text font-semibold text-base pt-1.5 border-t border-th-border">
            <span>Total</span><span>₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={submitting || seatsLeft === 0}
          className="btn-primary w-full py-3 rounded-xl text-sm font-medium text-white disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}