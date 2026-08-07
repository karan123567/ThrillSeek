"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { collection, query, where, onSnapshot, getFirestore } from "firebase/firestore";
import { ProviderListing } from "@/lib/types";
import { difficultyColors } from "@/lib/data";

export default function LiveAdventures({ onBook }: { onBook: (listing: ProviderListing) => void }) {
  const [listings, setListings] = useState<ProviderListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "provider_listings"), where("status", "==", "published"));
    const unsub = onSnapshot(q, (snap) => {
      setListings(snap.docs.map(d => ({ id: d.id, ...d.data() } as ProviderListing)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null;
  if (listings.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-xl font-medium text-th-text mb-6">Live Bookable Adventures</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {listings.map((l) => {
            const seatsLeft = l.schedule.reduce((sum, s) => sum + (s.capacity - s.booked), 0);
            return (
              <div key={l.id} className="rounded-2xl overflow-hidden bg-th-card border border-th-border-subtle">
                <div className="p-4">
                  <span className={`inline-block mb-2 px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[l.difficulty]}`}>
                    {l.difficulty}
                  </span>
                  <h3 className="text-sm font-medium text-th-text mb-1">{l.name}</h3>
                  <p className="text-xs text-th-text-muted mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {l.location}
                  </p>
                  <p className="text-xs text-th-text-muted mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {l.duration}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-semibold text-th-text">₹{l.price.toLocaleString()}</p>
                    <span className="text-[11px] text-th-text-muted">{seatsLeft} seats left</span>
                  </div>
                  <button
                    onClick={() => onBook(l)}
                    disabled={seatsLeft === 0}
                    className="btn-primary w-full py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-40"
                  >
                    {seatsLeft === 0 ? "Fully Booked" : "Book Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}