"use client";

import { X, MapPin, Clock, Users, Building2, ArrowRight } from "lucide-react";
import ModalShell from "./ModalShell";
import { adventures, difficultyColors } from "@/lib/data";
import { useToast } from "./Toast";

export default function DetailModal({ isOpen, onClose, adventureId }: { isOpen: boolean; onClose: () => void; adventureId: number | null }) {
  const { showToast } = useToast();
  if (!isOpen || !adventureId) return null;
  const a = adventures.find((x) => x.id === adventureId);
  if (!a) return null;

  return (
    <ModalShell onClose={onClose} size="lg">
      <div className="relative h-64 md:h-80">
        <img src={`https://picsum.photos/seed/${a.image}/900/500`} className="w-full h-full object-cover opacity-70" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-all"><X className="w-5 h-5 text-white" /></button>
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[a.difficulty]}`}>{a.difficulty.charAt(0).toUpperCase() + a.difficulty.slice(1)}</span>
            {a.trending && <span className="px-2 py-0.5 rounded-full bg-brand-500/90 text-[10px] font-medium text-white">Trending</span>}
          </div>
          <h2 className="text-2xl font-medium text-white">{a.name}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-neutral-400">
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-400" />{a.location}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-400" />{a.duration}</span>
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-brand-400" />{a.group}</span>
          <span className="flex items-center gap-1.5"><span className="text-yellow-400">★</span>{a.rating} ({a.reviews} reviews)</span>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed mb-6">{a.description}</p>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
          <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-brand-400" /></div>
          <div><p className="text-sm font-medium text-white">{a.provider}</p><p className="text-xs text-neutral-500">Verified Provider</p></div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div><p className="text-2xl font-semibold text-white">₹{a.price.toLocaleString()}</p><p className="text-xs text-neutral-500">per person</p></div>
          <button onClick={() => { onClose(); showToast(`Booking confirmed for ${a.name}!`, "success"); }} className="btn-primary px-8 py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2">Book Now <ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </ModalShell>
  );
}