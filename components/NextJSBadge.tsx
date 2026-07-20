"use client";

import { useToast } from "./Toast";

export default function NextJSBadge() {
  const { showToast } = useToast();

  return (
    <div
      className="fixed bottom-6 left-6 z-40 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer border transition-all duration-300 animate-pulse-glow hover:border-brand-500/30"
      style={{
        background:
          "linear-gradient(135deg, var(--glass-bg), var(--glass-bg-strong))",
        borderColor: "var(--glass-border)",
      }}
      onClick={() =>
        showToast(
          "Built with Next.js 15 App Router, Server Components, TypeScript & Tailwind CSS v4",
          "info"
        )
      }
    >
      <svg width="20" height="20" viewBox="0 0 180 180" fill="none">
        <mask
          id="badge-mask"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="180"
          height="180"
        >
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#badge-mask)">
          <circle cx="90" cy="90" r="90" fill="white" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill="black"
          />
          <rect x="115" y="54" width="12" height="72" fill="black" />
        </g>
      </svg>
      <div>
        <p className="text-xs font-semibold text-th-text leading-none">
          Next.js 15
        </p>
        <p className="text-[10px] text-th-text-muted mt-0.5">
          App Router · SSR · RSC
        </p>
      </div>
    </div>
  );
}