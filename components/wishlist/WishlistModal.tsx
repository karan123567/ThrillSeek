"use client";

import { X, Heart, MapPin, Clock, ArrowRight, Trash2 } from "lucide-react";
import { useWishlist } from "./WishlistProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import ModalShell from "@/components/ModalShell";
import { difficultyColors } from "@/lib/data";
import { useToast } from "@/components/Toast";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDetail: (id: number) => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= Math.round(rating) ? "text-yellow-400" : "text-th-text-faint"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function WishlistModal({
  isOpen,
  onClose,
  onOpenDetail,
}: WishlistModalProps) {
  const { adventures, loading, toggle, count } = useWishlist();
  const { user } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  return (
    <ModalShell onClose={onClose} size="lg">
      <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-medium text-th-text flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-500" fill="currentColor" />
              My Wishlist
            </h3>
            <p className="text-sm text-th-text-muted mt-1">
              {count} {count === 1 ? "adventure" : "adventures"} saved
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
          >
            <X className="w-4 h-4 text-th-text-sub" />
          </button>
        </div>

        {/* Not logged in */}
        {!user && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-th-input flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-th-text-faint" />
            </div>
            <p className="text-lg font-medium text-th-text-sub mb-2">
              Sign in to view your wishlist
            </p>
            <p className="text-sm text-th-text-muted mb-6">
              Save your favorite adventures and find them later
            </p>
            <button
              onClick={() => {
                onClose();
                // The parent will handle opening auth modal
                window.dispatchEvent(
                  new CustomEvent("open-auth")
                );
              }}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Loading */}
        {user && loading && (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-th-input border border-th-border animate-pulse h-48"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {user && !loading && count === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-brand-400" />
            </div>
            <p className="text-lg font-medium text-th-text-sub mb-2">
              Your wishlist is empty
            </p>
            <p className="text-sm text-th-text-muted mb-6 max-w-sm mx-auto">
              Browse adventures and tap the heart icon to save your favorites
            </p>
            <button
              onClick={onClose}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2"
            >
              Browse Adventures
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Wishlist items */}
        {user && !loading && count > 0 && (
          <div className="space-y-3">
            {adventures.map((adv) => (
              <div
                key={adv.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-th-border-subtle bg-th-card hover:bg-th-card-hover transition-all group"
              >
                {/* Image */}
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onOpenDetail(adv.id);
                  }}
                >
                  <img
                    src={`https://picsum.photos/seed/${adv.image}/200/200`}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    alt={adv.name}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-sm font-medium text-th-text truncate cursor-pointer hover:text-brand-400 transition-colors"
                    onClick={() => {
                      onClose();
                      onOpenDetail(adv.id);
                    }}
                  >
                    {adv.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-th-text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {adv.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {adv.duration}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Stars rating={adv.rating} />
                      {adv.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[adv.difficulty]}`}
                    >
                      {adv.difficulty.charAt(0).toUpperCase() +
                        adv.difficulty.slice(1)}
                    </span>
                    <span className="text-sm font-semibold text-th-text">
                      ₹{adv.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => onOpenDetail(adv.id)}
                    className="btn-primary px-4 py-2 rounded-lg text-xs font-medium text-white hidden md:inline-flex items-center gap-1"
                  >
                    Book <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => toggle(adv.id)}
                    className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-all group/btn"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-red-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Heart
                      className="w-4 h-4 text-red-400 absolute group-hover/btn:hidden"
                      fill="currentColor"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom summary */}
        {user && !loading && count > 0 && (
          <div className="mt-6 pt-4 border-t border-th-border-subtle flex items-center justify-between">
            <p className="text-sm text-th-text-muted">
              Total:{" "}
              <span className="text-th-text font-medium">
                ₹
                {adventures
                  .reduce((sum, a) => sum + a.price, 0)
                  .toLocaleString()}
              </span>
            </p>
            <button
              onClick={onClose}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2"
            >
              Browse More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  );
}