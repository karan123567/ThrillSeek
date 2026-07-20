"use client";

import { User, Calendar, Heart, Settings } from "lucide-react";
import ModalShell from "./ModalShell";
import { useToast } from "./Toast";

export default function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  if (!isOpen) return null;

  const items = [
    { icon: User, label: "My Profile" },
    { icon: Calendar, label: "My Bookings" },
    { icon: Heart, label: "Wishlist", badge: "3" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <ModalShell onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://picsum.photos/seed/userprofile/80/80"
            className="w-14 h-14 rounded-xl object-cover border-2 border-th-border"
            alt=""
          />
          <div>
            <h3 className="text-base font-medium text-th-text">
              Alex Rivera
            </h3>
            <p className="text-xs text-th-text-muted">alex@thrillseek.com</p>
          </div>
        </div>
        <div className="space-y-1 mb-6">
          {items.map((it) => (
            <button
              key={it.label}
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
            showToast("Logged out successfully", "success");
          }}
          className="w-full py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
        >
          Sign Out
        </button>
      </div>
    </ModalShell>
  );
}