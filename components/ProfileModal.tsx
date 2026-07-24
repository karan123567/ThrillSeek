"use client";

import { User, Calendar, Heart, Settings, LogOut } from "lucide-react";
import ModalShell from "./ModalShell";
import { useToast } from "./Toast";
import { useAuth } from "./auth/AuthProvider";
import { useWishlist } from "./wishlist/WishlistProvider";

export default function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // ALL hooks MUST be before any conditional return
  const { showToast } = useToast();
  const { user, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();

  // Conditional return goes AFTER all hooks
  if (!isOpen) return null;

  const items = [
    {
      icon: User,
      label: "My Profile",
      action: () => showToast("Profile page — coming soon!", "info"),
    },
    {
      icon: Calendar,
      label: "My Bookings",
      action: () => showToast("Bookings page — coming soon!", "info"),
    },
    {
      icon: Heart,
      label: "Wishlist",
      badge: wishlistCount > 0 ? String(wishlistCount) : null,
      action: () => {
        onClose();
        window.dispatchEvent(new CustomEvent("open-wishlist"));
      },
    },
    {
      icon: Settings,
      label: "Settings",
      action: () => showToast("Settings — coming soon!", "info"),
    },
  ];

  return (
    <ModalShell onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-th-border">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              <div className="w-full h-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xl font-bold">
                {user?.displayName?.charAt(0) ||
                  user?.email?.charAt(0) ||
                  "U"}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-base font-medium text-th-text">
              {user?.displayName || "User"}
            </h3>
            <p className="text-xs text-th-text-muted">{user?.email}</p>
            {user?.phoneNumber && (
              <p className="text-xs text-th-text-muted mt-0.5">
                📞 {user.phoneNumber}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1 mb-6">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={it.action}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-th-text-sub hover:text-th-text hover:bg-th-card-hover rounded-xl transition-all text-left"
            >
              <it.icon className="w-4 h-4" />
              {it.label}
              {it.badge && (
                <span className="ml-auto text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full">
                  {it.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            onClose();
            logout();
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </ModalShell>
  );
}