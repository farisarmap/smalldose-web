"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1c0f0a] text-[#faf6ee] hover:bg-[#2d1a13] border border-transparent",
  secondary:
    "bg-[#c9973a] text-[#1c0f0a] hover:bg-[#d8a951] border border-transparent",
  ghost: "bg-transparent text-[#1c0f0a] hover:bg-[#1c0f0a]/5 border border-transparent",
  outline: "bg-transparent text-[#1c0f0a] border border-[#1c0f0a]/20 hover:bg-[#1c0f0a]/5",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
