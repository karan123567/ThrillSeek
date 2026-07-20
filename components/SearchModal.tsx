"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import ModalShell from "./ModalShell";
import { adventures } from "@/lib/data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenDetail: (id: number) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onOpenDetail,
}: Props) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => ref.current?.focus(), 100);
    if (!isOpen) setQ("");
  }, [isOpen]);

  if (!isOpen) return null;

  const results = q.trim()
    ? adventures.filter(
        (a) =>
          a.name.toLowerCase().includes(q.toLowerCase()) ||
          a.location.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <ModalShell onClose={onClose} size="md">
      <div className="p-2">
        <div className="flex items-center gap-3 px-4 py-3">
          <Search className="w-5 h-5 text-th-text-muted shrink-0" />
          <input
            ref={ref}
            type="text"
            placeholder="Search adventures, destinations..."
            className="flex-1 bg-transparent text-sm text-th-text focus:outline-none placeholder-th-text-faint"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <kbd
            onClick={onClose}
            className="px-2 py-1 text-[10px] bg-th-input rounded text-th-text-muted cursor-pointer border border-th-border"
          >
            ESC
          </kbd>
        </div>
        {q.trim() && (
          <div className="border-t border-th-border-subtle max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-6 text-center text-sm text-th-text-muted">
                No results found
              </div>
            ) : (
              results.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    onClose();
                    onOpenDetail(a.id);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-th-card-hover transition-all text-left"
                >
                  <img
                    src={`https://picsum.photos/seed/${a.image}/100/100`}
                    className="w-10 h-10 rounded-lg object-cover"
                    alt=""
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-th-text truncate">{a.name}</p>
                    <p className="text-xs text-th-text-muted">
                      {a.location} · ₹{a.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xs text-yellow-400">★ {a.rating}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </ModalShell>
  );
}