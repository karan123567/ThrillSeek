"use client";

import { useState } from "react";
import { X } from "lucide-react";
import ModalShell from "./ModalShell";
import { useToast } from "./Toast";

export default function ReviewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const { showToast } = useToast();
  if (!isOpen) return null;

  return (
    <ModalShell onClose={onClose} size="md">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-th-text">Write a Review</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
          >
            <X className="w-4 h-4 text-th-text-sub" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!rating) {
              showToast("Please select a rating", "error");
              return;
            }
            onClose();
            showToast("Review submitted successfully!", "success");
            setRating(0);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
              Which adventure?
            </label>
            <select
              required
              className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text appearance-none cursor-pointer focus:outline-none focus:border-brand-500/50"
            >
              <option value="" className="bg-th-surface">
                Select an adventure...
              </option>
              <option className="bg-th-surface">Everest Base Camp Trek</option>
              <option className="bg-th-surface">Bali Scuba Diving</option>
              <option className="bg-th-surface">Swiss Alps Paragliding</option>
              <option className="bg-th-surface">Rishikesh Rafting</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  className={`text-2xl transition-colors ${
                    i <= rating
                      ? "text-yellow-400"
                      : "text-th-text-faint hover:text-yellow-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              placeholder="Share your experience..."
              className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white"
          >
            Submit Review
          </button>
        </form>
      </div>
    </ModalShell>
  );
}