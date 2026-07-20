"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, PlusCircle, ShieldCheck, Star } from "lucide-react";

export default function Hero() {
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters = countersRef.current?.querySelectorAll("[data-count]");
    if (!counters) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.count || "0");
            let current = 0;
            const step = Math.ceil(target / 60);
            const interval = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              el.textContent = current.toLocaleString();
            }, 25);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/adventure-hero-mountain/1920/1080"
          className="w-full h-full object-cover opacity-40"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
      </div>
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="absolute top-32 right-20 hidden xl:block animate-float">
        <div className="glass-dark rounded-2xl p-4 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">Verified Providers</p>
            <p className="text-[10px] text-neutral-500">500+ trusted partners</p>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-40 right-40 hidden xl:block animate-float"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="glass-dark rounded-2xl p-4 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">4.9 Avg Rating</p>
            <p className="text-[10px] text-neutral-500">From 12K+ reviews</p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          <div
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              2,500+ Adventures Worldwide
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tighter leading-[0.9] mb-6 animate-fade-in-up opacity-0 text-white"
            style={{ animationDelay: "0.2s" }}
          >
            Find Your
            <br />
            <span className="gradient-text">Next Thrill</span>
          </h1>

          <p
            className="text-lg lg:text-xl font-light text-neutral-300 leading-relaxed mb-10 max-w-lg animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.35s" }}
          >
            Discover, book, and experience the world&apos;s most exciting outdoor
            adventures — from mountain summits to ocean depths.
          </p>

          <div
            className="flex flex-wrap gap-4 mb-12 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href="#adventures"
              className="btn-primary px-7 py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2"
            >
              Explore Adventures <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#adventures"
              className="btn-secondary px-7 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> List Your Adventure
            </a>
          </div>

          <div
            ref={countersRef}
            className="flex gap-10 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.65s" }}
          >
            <div>
              <p
                className="text-3xl font-semibold tracking-tighter text-white"
                data-count="2500"
              >
                0
              </p>
              <p className="text-xs text-neutral-500 mt-1">Adventures</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p
                className="text-3xl font-semibold tracking-tighter text-white"
                data-count="120"
              >
                0
              </p>
              <p className="text-xs text-neutral-500 mt-1">Countries</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p
                className="text-3xl font-semibold tracking-tighter text-white"
                data-count="50"
              >
                0
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                K+ Happy Travelers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-[10px] uppercase tracking-widest text-neutral-500">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/30 animate-bounce" />
        </div>
      </div>
    </section>
  );
}