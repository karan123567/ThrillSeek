"use client";

import { ArrowRight, PlusCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover object-center opacity-50"
          alt="Hiker looking at mountain view"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
      </div>
      
      {/* Ambient light */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-20 sm:pb-24 w-full">
        <div className="max-w-2xl">
          
          {/* Badge */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium mb-6 sm:mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              120+ guides online right now
            </span>
          </div>

          {/* Headline - Safe for small screens (320px width) */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tighter leading-[0.95] sm:leading-[0.9] mb-5 sm:mb-6 animate-fade-in-up opacity-0 text-white" style={{ animationDelay: "0.2s" }}>
            Skip the tourist
            <br />
            <span className="gradient-text">traps.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg lg:text-xl font-light text-neutral-300 leading-relaxed mb-6 sm:mb-8 max-w-lg animate-fade-in-up opacity-0" style={{ animationDelay: "0.35s" }}>
            We hand-pick local guides and off-the-beaten-path experiences. 
            No fluff, no crowds — just real outdoor adventures.
          </p>

          {/* Social Proof Avatars */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8 sm:mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: "0.45s" }}>
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" alt="User" />
              <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white">+5K</div>
            </div>
            <p className="text-sm text-neutral-400">
              Joined by <span className="text-white font-medium">50,000+</span> this year
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-14 animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
            <a href="#adventures" className="btn-primary px-7 py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2">
              Explore Adventures <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="btn-secondary px-7 py-3.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2">
              <PlusCircle className="w-4 h-4" /> List Your Adventure
            </a>
          </div>

          {/* ✅ REPLACEMENT: Real Review instead of Stats */}
          <div className="animate-fade-in-up opacity-0 max-w-md" style={{ animationDelay: "0.65s" }}>
            <div className="flex items-start gap-3 sm:gap-4 pl-3 sm:pl-4 border-l-2 border-white/10">
              <div className="flex gap-0.5 mt-0.5 shrink-0">
                {/* Inline SVG stars to avoid extra dependencies */}
                <svg className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </div>
              <div>
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  "Skipped the crowded tours in Bali and found a hidden waterfall. Best day of our trip."
                </p>
                <p className="text-xs text-neutral-500 mt-1 not-italic">— Sarah M., London</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}