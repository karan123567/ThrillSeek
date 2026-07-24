"use client";

import { useState, useEffect } from "react";
import { Mountain, Search, Heart, Menu, X, LogIn, LogOut } from "lucide-react";
import { useToast } from "./Toast";
import { useAuth } from "./auth/AuthProvider";
import { useWishlist } from "./wishlist/WishlistProvider";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onOpenWishlist: () => void;
}

export default function Navbar({
  onOpenSearch,
  onOpenProfile,
  onOpenAuth,
  onOpenWishlist,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { showToast } = useToast();
  const { user, logout, loading: authLoading } = useAuth();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Listen for custom auth event from WishlistModal
  useEffect(() => {
    const handler = () => onOpenAuth();
    window.addEventListener("open-auth", handler);
    return () => window.removeEventListener("open-auth", handler);
  }, [onOpenAuth]);

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

          {/* Wishlist — only when logged in */}
          {user && !authLoading && (
            <button
              onClick={onOpenWishlist}
              className="relative w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-th-card-hover transition-all"
            >
              <Heart className="w-4 h-4 text-th-text-sub" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full bg-brand-500 text-[9px] font-bold flex items-center justify-center text-white px-1">
                  {wishlistCount}
                </span>
              )}
            </button>
          )}

          {/* Logged In */}
          {user && !authLoading && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-th-card-hover transition-all"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-th-border">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-bold">
                      {user.displayName?.charAt(0) ||
                        user.email?.charAt(0) ||
                        "U"}
                    </div>
                  )}
                </div>
                <span className="text-sm text-th-text-sub max-w-[100px] truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>
              <button
                onClick={logout}
                className="w-10 h-10 rounded-xl bg-th-input border border-th-border flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all group"
                title="Sign out"
              >
                <LogOut className="w-4 h-4 text-th-text-sub group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          )}

          {/* Logged Out */}
          {!user && !authLoading && (
            <button
              onClick={onOpenAuth}
              className="btn-primary px-4 py-2.5 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {authLoading && (
            <div className="w-10 h-10 rounded-xl bg-th-input border border-th-border animate-pulse" />
          )}

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

      {/* Mobile menu */}
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
          {user ? (
            <>
              <button
                onClick={() => {
                  onOpenWishlist();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-th-text-sub hover:bg-th-card-hover rounded-xl transition-all text-left mt-2"
              >
                <Heart className="w-4 h-4" /> Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-auto text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brand-400 hover:bg-brand-500/10 rounded-xl transition-all text-left mt-2"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}