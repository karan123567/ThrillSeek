"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

export default function OtpInput({
  length = 6,
  onComplete,
  disabled = false,
}: OtpInputProps) {
  const [values, setValues] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const otp = newValues.join("");
    if (otp.length === length && !newValues.includes("")) {
      onComplete(otp);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const newValues = [...values];
    pasted.split("").forEach((char, i) => {
      newValues[i] = char;
    });
    setValues(newValues);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();

    if (pasted.length === length) {
      onComplete(pasted);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-12 h-14 rounded-xl text-center text-xl font-semibold focus:outline-none transition-all duration-200 ${
            disabled
              ? "bg-th-surface-alt border-th-border text-th-text-faint cursor-not-allowed"
              : "bg-th-input border-th-border text-th-text focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          }`}
        />
      ))}
    </div>
  );
}