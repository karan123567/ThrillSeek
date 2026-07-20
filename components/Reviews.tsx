"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, PenLine, Star } from "lucide-react";
import { reviews } from "@/lib/data";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-th-text-faint"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function Reviews({
  onOpenReview,
}: {
  onOpenReview: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scroll = (d: number) =>
    scrollerRef.current?.scrollBy({ left: d * 340, behavior: "smooth" });

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-500/3 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="flex items-end justify-between mb-12 reveal-on-scroll">
          <div>
            <span className="text-xs font-medium tracking-wider uppercase text-brand-500 mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tighter">
              Real <span className="gradient-text">Experiences</span>
            </h2>
          </div>
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-th-text-sub" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
            >
              <ChevronRight className="w-4 h-4 text-th-text-sub" />
            </button>
          </div>
        </div>
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              className="shrink-0 w-80 snap-start rounded-2xl bg-th-card border border-th-border-subtle p-5"
            >
              <div className="flex items-center gap-1 mb-3">
                <Stars rating={r.rating} />
              </div>
              <p className="text-sm text-th-text-sub leading-relaxed mb-4 line-clamp-4">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-th-border-subtle">
                <img
                  src={`https://picsum.photos/seed/${r.avatar}/60/60`}
                  className="w-9 h-9 rounded-full object-cover"
                  alt={r.name}
                />
                <div>
                  <p className="text-xs font-medium text-th-text">{r.name}</p>
                  <p className="text-[10px] text-th-text-muted">
                    {r.adventure} · {r.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 glass rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
              <PenLine className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-th-text">
                Share Your Adventure
              </h3>
              <p className="text-sm text-th-text-muted">
                Help others find their perfect thrill. Write a review.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenReview}
            className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Star className="w-4 h-4" />Write a Review
          </button>
        </div>
      </div>
    </section>
  );
}