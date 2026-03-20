"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "@/store/cartStore";
import type { CurrencyCode } from "@/store/uiStore";
import { useUIStore } from "@/store/uiStore";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Our Story" },
  { href: "/blog", label: "Journal" },
];

function CurrencyToggleButton({
  value,
  label,
  activeCurrency,
  onClick,
}: {
  value: CurrencyCode;
  label: string;
  activeCurrency: CurrencyCode;
  onClick: (currency: CurrencyCode) => void;
}) {
  const isActive = activeCurrency === value;

  return (
    <button
      type="button"
      aria-label={`Switch currency to ${label}`}
      onClick={() => onClick(value)}
      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
        isActive
          ? "bg-[#c9973a] text-[#1c0f0a]"
          : "bg-transparent text-[#faf6ee]/80 hover:text-[#faf6ee]"
      }`}
    >
      {label}
    </button>
  );
}

interface NavbarProps {
  alwaysSolid?: boolean;
}

export function Navbar({ alwaysSolid = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const currency = useUIStore((state) => state.currency);
  const setCurrency = useUIStore((state) => state.setCurrency);
  const openCart = useUIStore((state) => state.openCart);
  const itemCount = useCartStore((state) => state.itemCount);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        alwaysSolid || isScrolled
          ? "border-white/15 bg-[#1c0f0a]/90 backdrop-blur-md"
          : "border-white/10 bg-[#1c0f0a]/35 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="Smalldose home"
          className="font-display text-2xl tracking-wide text-[#faf6ee]"
        >
          SMALLDOSE
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#faf6ee] transition-colors hover:text-[#c9973a]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div
            className="hidden items-center rounded-full border border-[#faf6ee]/30 p-0.5 md:flex"
            aria-label="Currency switcher"
            role="group"
          >
            <CurrencyToggleButton
              value="IDR"
              label="Rp"
              activeCurrency={currency}
              onClick={setCurrency}
            />
            <CurrencyToggleButton
              value="USD"
              label="$"
              activeCurrency={currency}
              onClick={setCurrency}
            />
          </div>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart with ${itemCount} items`}
            className="inline-flex items-center gap-2 rounded-full border border-[#c9973a] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#faf6ee] transition-colors hover:bg-[#c9973a] hover:text-[#1c0f0a]"
          >
            Cart
            <span className="rounded-full bg-[#faf6ee] px-1.5 py-0.5 text-[10px] text-[#1c0f0a]">
              {itemCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
