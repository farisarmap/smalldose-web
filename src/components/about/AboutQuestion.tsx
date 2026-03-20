"use client";

import { Reveal } from "./Reveal";

export function AboutQuestion() {
  return (
    <section className="overflow-x-hidden border-t border-[#1c0f0a]/10 bg-[#faf6ee] px-4 py-28 md:py-[120px]">
      <div className="mx-auto max-w-[800px] text-center">
        <Reveal delayMs={0}>
          <p className="text-[12px] uppercase tracking-[0.15em] text-[#c9973a]">Chapter 01</p>
        </Reveal>
        <Reveal delayMs={100}>
          <h2 className="font-display mt-8 whitespace-pre-line text-[44px] font-bold leading-[1.1] text-[#1c0f0a] md:text-[72px]">
            {"Why does the same coffee\ntaste different everywhere\nyou buy it?"}
          </h2>
        </Reveal>
        <Reveal delayMs={200}>
          <p className="mt-8 text-[18px] italic leading-relaxed text-[#1c0f0a]/65">
            Cirebon, 2018. A small table. One bad cup too many.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
