"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}

export default function ModalShell({
  children,
  onClose,
  size = "md",
}: Props) {
  const maxW = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-3xl" };
  const mt = { sm: "mt-28", md: "mt-20", lg: "mt-16" };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div
        className={`relative ${maxW[size]} ${mt[size]} mx-4 mb-8 w-full animate-scale-in ${
          size === "lg"
            ? "max-h-[90vh] overflow-y-auto scrollbar-hide"
            : ""
        }`}
      >
        <div
          className="rounded-2xl shadow-2xl overflow-hidden border border-th-border"
          style={{ background: "var(--modal-content-bg)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}