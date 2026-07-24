"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, PlusCircle } from "lucide-react";

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
      {/* Background - Using a REAL high-quality Unsplash image of a hiker */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover object-center opacity-50"
          alt="Hiker looking at mountain view"
        />
        {/* Heavier gradient to ensure text pops perfectly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
      </div>
      
      {/* Subtle ambient light, toned down from 800px to 600px for realism */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          {/* Badge - Changed to a more specific, trust-based metric */}
          <div
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              120+ guides online right now
            </span>
          </div>

          {/* Headline - More conversational, less corporate */}
          <h1
            className="text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tighter leading-[0.9] mb-6 animate-fade-in-up opacity-0 text-white"
            style={{ animationDelay: "0.2s" }}
          >
            Skip the tourist
            <br />
            <span className="gradient-text">traps.</span>
          </h1>

          {/* Subtext - Sounds like a founder wrote it, not a marketer */}
          <p
            className="text-lg lg:text-xl font-light text-neutral-300 leading-relaxed mb-8 max-w-lg animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.35s" }}
          >
            We hand-pick local guides and off-the-beaten-path experiences. 
            No fluff, no crowds — just real outdoor adventures.
          </p>

          {/* Social Proof Avatars - Replaces the fake floating cards */}
          <div
            className="flex items-center gap-3 mb-10 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
              <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white">+5K</div>
            </div>
            <p className="text-sm text-neutral-400">
              Joined by <span className="text-white font-medium">50,000+</span> adventurers this year
            </p>
          </div>

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
              href="#"
              className="btn-secondary px-7 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> List Your Adventure
            </a>
          </div>

          {/* Stats - Changed to more believable, "unrounded" numbers */}
          <div
            ref={countersRef}
            className="flex gap-10 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.65s" }}
          >
            <div>
              <p
                className="text-3xl font-semibold tracking-tighter text-white"
                data-count="2400"
              >
                0
              </p>
              <p className="text-xs text-neutral-500 mt-1">Experiences</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p
                className="text-3xl font-semibold tracking-tighter text-white"
                data-count="45"
              >
                0
              </p>
              <p className="text-xs text-neutral-500 mt-1">Countries</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="flex items-center gap-1.5">
                <p
                  className="text-3xl font-semibold tracking-tighter text-white"
                  data-count="4"
                >
                  0
                </p>
                <span className="text-3xl font-semibold tracking-tighter text-white">.9</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Removed the floating mouse scroll animation - it feels dated and template-like */}
    </section>
  );
}