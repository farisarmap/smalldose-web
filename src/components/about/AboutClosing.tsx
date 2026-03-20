"use client";

import Link from "next/link";

import { OrbitalRing } from "@/components/ui/OrbitalRing";

import { Reveal } from "./Reveal";

export function AboutClosing() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#1c0f0a] px-4 py-28 md:py-[140px]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-80">
        <OrbitalRing size={400} durationSec={20} />
      </div>
      <div className="relative z-10 mx-auto max-w-[680px] text-center">
        <Reveal delayMs={0}>
          <h2 className="font-display whitespace-pre-line text-[40px] font-bold leading-[1.1] text-[#faf6ee] md:text-[64px]">
            {"Every bag ships\nwith the farmer's\nname on it."}
          </h2>
        </Reveal>
        <Reveal delayMs={150}>
          <p className="mt-6 text-[18px] italic text-[#c9973a]">
            Because the story matters as much as the taste.
          </p>
        </Reveal>
        <Reveal delayMs={280}>
          <Link
            href="/shop"
            className="font-display mt-12 inline-flex rounded-full bg-[#c9973a] px-10 py-4 text-[16px] font-bold uppercase tracking-wide text-[#1c0f0a] transition hover:bg-[#d8a951] hover:shadow-[0_0_32px_rgba(201,151,58,0.35)]"
          >
            Shop All Origins →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
