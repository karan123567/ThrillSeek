"use client";

import { MapPin, RotateCcw } from "lucide-react";

interface FilterBarProps {
  onFilter: () => void;
  onReset: () => void;
  onUpdatePriceLabel: () => void;
  activeQuickFilter: string;
  onSetQuickFilter: (f: string) => void;
}

const quickFilters = [
  { key: "all", label: "All" },
  { key: "trending", label: "🔥 Trending" },
  { key: "top-rated", label: "⭐ Top Rated" },
  { key: "budget", label: "💰 Budget Friendly" },
  { key: "new", label: "✨ New" },
];

export default function FilterBar({
  onFilter,
  onReset,
  onUpdatePriceLabel,
  activeQuickFilter,
  onSetQuickFilter,
}: FilterBarProps) {
  return (
    <div className="glass rounded-2xl p-4 lg:p-6 mb-8 reveal-on-scroll">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        <div className="flex-1 w-full">
          <label className="text-xs font-medium text-th-text-muted mb-2 block">
            Where to?
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-th-text-muted" />
            <input
              type="text"
              id="searchLocation"
              placeholder="Search destinations..."
              className="w-full bg-th-input border border-th-border rounded-xl pl-10 pr-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
              onChange={onFilter}
            />
          </div>
        </div>
        <div className="w-full lg:w-48">
          <label className="text-xs font-medium text-th-text-muted mb-2 block">
            Category
          </label>
          <select
            id="filterCategory"
            className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text appearance-none cursor-pointer focus:outline-none focus:border-brand-500/50 transition-colors"
            onChange={onFilter}
          >
            <option value="all" className="bg-th-surface">All Categories</option>
            <option value="trekking" className="bg-th-surface">Trekking</option>
            <option value="water" className="bg-th-surface">Water Sports</option>
            <option value="aerial" className="bg-th-surface">Aerial</option>
            <option value="winter" className="bg-th-surface">Winter Sports</option>
            <option value="wildlife" className="bg-th-surface">Wildlife</option>
          </select>
        </div>
        <div className="w-full lg:w-48">
          <label className="text-xs font-medium text-th-text-muted mb-2 block">
            Difficulty
          </label>
          <select
            id="filterDifficulty"
            className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text appearance-none cursor-pointer focus:outline-none focus:border-brand-500/50 transition-colors"
            onChange={onFilter}
          >
            <option value="all" className="bg-th-surface">Any Level</option>
            <option value="easy" className="bg-th-surface">Easy</option>
            <option value="moderate" className="bg-th-surface">Moderate</option>
            <option value="hard" className="bg-th-surface">Hard</option>
            <option value="extreme" className="bg-th-surface">Extreme</option>
          </select>
        </div>
        <div className="w-full lg:w-52">
          <label className="text-xs font-medium text-th-text-muted mb-2 block">
            Price Range:{" "}
            <span id="priceLabel" className="text-brand-400">
              ₹0 – ₹50,000
            </span>
          </label>
          <input
            type="range"
            id="filterPrice"
            min="0"
            max="50000"
            defaultValue="50000"
            step="1000"
            onChange={() => {
              onUpdatePriceLabel();
              onFilter();
            }}
          />
        </div>
        <button
          onClick={onReset}
          className="btn-secondary px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
      <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
        {quickFilters.map((f) => (
          <span
            key={f.key}
            onClick={() => onSetQuickFilter(f.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border whitespace-nowrap ${
              activeQuickFilter === f.key
                ? "bg-brand-500/15 border-brand-500/40 text-brand-400"
                : "border-th-border text-th-text-sub hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-400"
            }`}
            style={
              activeQuickFilter !== f.key
                ? { background: "var(--chip-bg)", borderColor: "var(--chip-border)" }
                : {}
            }
          >
            {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}