
"use client";

import { BadgeCheck } from "lucide-react";
import { providers } from "@/lib/data";
import { useToast } from "./Toast";

export default function Providers() {
  const { showToast } = useToast();

  return (
    <section id="providers" className="py-16 sm:py-24 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16 reveal-on-scroll">
          <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-brand-500 mb-3 sm:mb-4 block">
            Trusted Partners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter mb-4">
            Top Adventure <span className="gradient-text">Providers</span>
          </h2>
          <p className="text-th-text-muted font-light max-w-md mx-auto text-sm sm:text-base">
            Verified, experienced, and loved by thousands of adventurers worldwide.
          </p>
        </div>
        
        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {providers.map((p, i) => (
            <div
              key={p.name}
              className="card-hover rounded-2xl bg-th-card border border-th-border-subtle p-4 sm:p-5 reveal-on-scroll"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={`https://picsum.photos/seed/${p.image}/80/80`}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0"
                  alt={p.name}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-medium text-th-text truncate">
                      {p.name}
                    </h3>
                    {p.verified && (
                      <BadgeCheck className="w-4 h-4 text-brand-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-th-text-muted truncate">{p.location}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-th-text-muted">
                  {p.adventures} adventures
                </span>
                <span className="text-xs flex items-center gap-1 font-medium">
                  <span className="text-yellow-400">★</span>
                  {p.rating}
                </span>
              </div>
              
              <button
                onClick={() => showToast(`Viewing ${p.name}'s profile`, "info")}
                className="w-full py-2.5 rounded-xl bg-th-input border border-th-border text-xs font-medium text-th-text-sub hover:bg-th-card-hover hover:border-th-border transition-all active:scale-[0.98]"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}