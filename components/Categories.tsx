"use client";

import { ArrowRight, Compass } from "lucide-react";

interface Props {
  onFilterByCategory: (cat: string) => void;
  onNotify: () => void;
}

const cats = [
  { key: "trekking", title: "Trekking & Hiking", count: "480+", desc: "Mountain trails, forest paths & summit expeditions", img: "trekking-cat" },
  { key: "water", title: "Water Sports", count: "350+", desc: "Rafting, diving, surfing & underwater explorations", img: "watersports-cat" },
  { key: "aerial", title: "Aerial Adventures", count: "200+", desc: "Skydiving, paragliding, bungee & zip lines", img: "skydiving-cat" },
  { key: "winter", title: "Winter Sports", count: "180+", desc: "Skiing, snowboarding, ice climbing & more", img: "winter-ski-cat" },
  { key: "wildlife", title: "Wildlife Safaris", count: "290+", desc: "Jungle safaris, bird watching & nature camps", img: "wildlife-safari-cat" },
];

export default function Categories({ onFilterByCategory, onNotify }: Props) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="text-xs font-medium tracking-wider uppercase text-brand-500 mb-4 block">Categories</span>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter mb-4">Choose Your <span className="gradient-text">Adventure</span></h2>
          <p className="text-neutral-500 font-light max-w-md mx-auto">From serene treks to heart-pounding extremes, find the perfect experience for your thrill level.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((c, i) => (
            <div key={c.key} className="group relative rounded-3xl overflow-hidden h-72 card-hover cursor-pointer reveal-on-scroll" style={{ transitionDelay: `${(i % 3) * 0.1}s` }} onClick={() => onFilterByCategory(c.key)}>
              <img src={`https://picsum.photos/seed/${c.img}/600/400`} className="card-img absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700" alt={c.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center justify-between mb-2"><h3 className="text-xl font-medium text-white">{c.title}</h3><span className="text-xs text-neutral-500">{c.count}</span></div>
                <p className="text-sm text-neutral-400">{c.desc}</p>
                <div className="card-overlay opacity-0 transition-opacity duration-300 mt-3"><span className="text-brand-400 text-sm font-medium inline-flex items-center gap-1">Explore <ArrowRight className="w-3.5 h-3.5" /></span></div>
              </div>
            </div>
          ))}
          <div className="group relative rounded-3xl overflow-hidden h-72 card-hover cursor-pointer reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-neutral-900/80 border border-white/5 rounded-3xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-7 text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4"><Compass className="w-7 h-7 text-brand-400" /></div>
              <h3 className="text-xl font-medium text-white mb-2">More Coming</h3>
              <p className="text-sm text-neutral-500 mb-4">Rock climbing, caving, desert & more adventures being added</p>
              <span onClick={(e) => { e.stopPropagation(); onNotify(); }} className="text-brand-400 text-sm font-medium inline-flex items-center gap-1 cursor-pointer">Get Notified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}