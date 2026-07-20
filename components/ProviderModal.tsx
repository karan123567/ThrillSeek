"use client";

import { X } from "lucide-react";
import ModalShell from "./ModalShell";
import { useToast } from "./Toast";

export default function ProviderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  if (!isOpen) return null;

  return (
    <ModalShell onClose={onClose} size="md">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-th-text">
            Become a Provider
          </h3>
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
            onClose();
            showToast(
              "Application submitted! We'll review it within 48 hours.",
              "success"
            );
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
              Business Name
            </label>
            <input
              required
              placeholder="e.g., Himalayan Adventures Co."
              className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
              What activities do you offer?
            </label>
            <textarea
              required
              rows={3}
              placeholder="Trekking, rafting, camping..."
              className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white"
          >
            Submit Application
          </button>
        </form>
      </div>
    </ModalShell>
  );
}