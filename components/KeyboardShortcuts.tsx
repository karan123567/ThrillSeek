"use client";

import { useEffect } from "react";

export default function KeyboardShortcuts({ onOpenSearch, onCloseAll }: { onOpenSearch: () => void; onCloseAll: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); onOpenSearch(); }
      if (e.key === "Escape") onCloseAll();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onOpenSearch, onCloseAll]);
  return null;
}