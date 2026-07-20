"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className="relative w-[52px] h-[28px] rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-th-bg"
      style={{
        backgroundColor: isDark
          ? "rgba(255,255,255,0.08)"
          : "rgba(251,191,36,0.2)",
        boxShadow: isDark
          ? "inset 0 1px 3px rgba(0,0,0,0.3)"
          : "inset 0 1px 3px rgba(0,0,0,0.06)",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-500"
        style={{
          transform: isDark ? "translateX(24px)" : "translateX(0)",
          background: isDark
            ? "linear-gradient(135deg, #e65214, #ff6b2c)"
            : "linear-gradient(135deg, #f59e0b, #fbbf24)",
          boxShadow: isDark
            ? "0 2px 8px rgba(255,107,44,0.4)"
            : "0 2px 8px rgba(245,158,11,0.4)",
        }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-white" />
        ) : (
          <Sun className="w-3 h-3 text-white" />
        )}
      </span>
    </button>
  );
}