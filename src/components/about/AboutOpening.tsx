"use client";

import { OrbitalRing } from "@/components/ui/OrbitalRing";

export function AboutOpening() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#1c0f0a] px-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <OrbitalRing size={600} durationSec={30} className="opacity-90" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="rounded-full border border-[#c9973a]/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#c9973a]">
          EST. 2018 · CIREBON, INDONESIA
        </span>
        <h1 className="font-display mt-10 text-[52px] font-bold leading-none tracking-[-0.02em] text-[#faf6ee] md:text-[96px]">
          SMALLDOSE
        </h1>
        <p className="mt-6 text-[20px] italic text-[#c9973a]">Your daily caffein doses</p>
      </div>
      <div
        className="about-scroll-indicator absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <div className="h-12 w-px bg-[#c9973a]/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#c9973a]" />
      </div>
    </section>
  );
}
