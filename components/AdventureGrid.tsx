"use client";

import { Heart, MapPin, Clock } from "lucide-react";
import { Adventure } from "@/lib/types";
import { difficultyColors } from "@/lib/data";
import { useToast } from "./Toast";
import { useWishlist } from "./wishlist/WishlistProvider";
import { useAuth } from "./auth/AuthProvider";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= Math.round(rating) ? "text-yellow-400" : "text-th-text-faint"
          }
        >
          ★
        </span>
      ))}
    </span>
  );
}

interface Props {
  adventures: Adventure[];
  count: number;
  onOpenDetail: (id: number) => void;
  onSort: () => void;
}

export default function AdventureGrid({
  adventures,
  count,
  onOpenDetail,
  onSort,
}: Props) {
  const { showToast } = useToast();
  const { isWished, toggle } = useWishlist();
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center justify-between mb-6 reveal-on-scroll">
        <p className="text-sm text-th-text-muted">
          <span className="text-th-text font-medium">{count}</span> adventures
          found
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-th-text-muted">Sort by:</span>
          <select
            id="sortBy"
            className="bg-th-input border border-th-border rounded-lg px-3 py-1.5 text-xs text-th-text-sub appearance-none cursor-pointer focus:outline-none"
            onChange={onSort}
          >
            <option value="recommended" className="bg-th-surface">
              Recommended
            </option>
            <option value="price-low" className="bg-th-surface">
              Price: Low to High
            </option>
            <option value="price-high" className="bg-th-surface">
              Price: High to Low
            </option>
            <option value="rating" className="bg-th-surface">
              Highest Rated
            </option>
          </select>
        </div>
      </div>

      {count === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-th-input flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-th-text-faint" />
          </div>
          <p className="text-lg font-medium text-th-text-sub mb-2">
            No adventures found
          </p>
          <p className="text-sm text-th-text-muted">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {adventures.map((adv, idx) => {
            const wished = isWished(adv.id);
            return (
              <div
                key={adv.id}
                className="adventure-card card-hover rounded-2xl overflow-hidden bg-th-card border border-th-border-subtle cursor-pointer group"
                style={{ animationDelay: `${idx * 0.08}s` }}
                onClick={() => onOpenDetail(adv.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${adv.image}/600/400`}
                    className="card-img w-full h-full object-cover opacity-60 transition-all duration-700"
                    alt={adv.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {adv.trending && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-500/90 text-[10px] font-medium text-white">
                        Trending
                      </span>
                    )}
                    {adv.isNew && (
                      <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-[10px] font-medium text-white">
                        New
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user) {
                        showToast(
                          "Sign in to save to wishlist",
                          "info"
                        );
                        return;
                      }
                      toggle(adv.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:scale-110 transition-all"
                  >
                    <Heart
                      className="w-3.5 h-3.5 transition-all duration-300"
                      style={{
                        color: wished ? "#ff6b2c" : "white",
                        fill: wished ? "currentColor" : "none",
                      }}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[adv.difficulty]}`}
                    >
                      {adv.difficulty.charAt(0).toUpperCase() +
                        adv.difficulty.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1.5">
                    <span className="text-xs">
                      <Stars rating={adv.rating} />
                    </span>
                    <span className="text-[11px] text-th-text-muted ml-1">
                      {adv.rating} ({adv.reviews})
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-th-text mb-1 group-hover:text-brand-400 transition-colors truncate">
                    {adv.name}
                  </h3>
                  <p className="text-xs text-th-text-muted mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {adv.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-th-text">
                      ₹{adv.price.toLocaleString()}
                    </p>
                    <span className="text-[11px] text-th-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {adv.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}