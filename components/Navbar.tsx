"use client";

import { useState, useEffect } from "react";
import { Mountain, Search, Heart, Menu, X } from "lucide-react";
import { useToast } from "./Toast";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

export default function Navbar({ onOpenSearch, onOpenProfile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Adventures", href: "#adventures" },
    { label: "Destinations", href: "#destinations" },
    { label: "Providers", href: "#providers" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tighter text-th-text hidden sm:inline">
            Thrill<span className="text-brand-500">Seek</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-th-text-sub hover:text-th-text transition-colors rounded-lg hover:bg-th-card-hover"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={onOpenSearch}
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-th-input border border-th-border text-sm text-th-text-sub hover:text-th-text hover:bg-th-card-hover transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search adventures...</span>
            <kbd className="ml-4 px-1.5 py-0.5 text-[10px] bg-th-surface-alt rounded text-th-text-muted">
              ⌘K
            </kbd>
          </button>
          <button
            onClick={onOpenSearch}
            className="lg:hidden w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
          >
            <Search className="w-4 h-4 text-th-text-sub" />
          </button>
          <button
            onClick={() => showToast("Your wishlist has 3 adventures", "info")}
            className="relative w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
          >
            <Heart className="w-4 h-4 text-th-text-sub" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 text-[9px] font-bold flex items-center justify-center text-white">
              3
            </span>
          </button>
          <button
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-xl overflow-hidden border-2 border-th-border hover:border-brand-500/50 transition-all"
          >
            <img
              src="https://picsum.photos/seed/userprofile/80/80"
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-th-text-sub" />
            ) : (
              <Menu className="w-4 h-4 text-th-text-sub" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mx-4 mb-4 glass-strong rounded-2xl p-4 animate-slide-down">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm text-th-text-sub hover:text-th-text hover:bg-th-card-hover rounded-xl transition-all"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}