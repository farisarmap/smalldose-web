"use client";

import { Reveal } from "./Reveal";

interface Value {
  number: string;
  title: string;
  body: string;
}

export function AboutPrinciplesSection({ values }: { values: readonly Value[] }) {
  return (
    <section className="overflow-x-hidden border-t border-[#1c0f0a]/10 bg-[#faf6ee] px-4 py-24 md:py-[100px]">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[12px] uppercase tracking-[0.15em] text-[#c9973a]">What We Stand For</p>
        <div className="mt-16 grid grid-cols-1 gap-0.5 md:grid-cols-2">
          {values.map((v, index) => (
            <Reveal key={v.number} delayMs={index * 100}>
              <article className="group relative border border-[#1c0f0a]/10 bg-white p-10 shadow-sm transition md:p-12">
                <span
                  className="pointer-events-none absolute right-8 top-8 font-display text-[80px] font-black leading-none text-[#1c0f0a] opacity-[0.06]"
                  aria-hidden
                >
                  {v.number}
                </span>
                <div className="border-l-[3px] border-transparent pl-0 transition duration-300 group-hover:translate-x-1 group-hover:border-[#c9973a]">
                  <h3 className="font-display text-[28px] font-bold text-[#1c0f0a] md:text-[32px]">{v.title}</h3>
                  <p className="mt-4 max-w-[320px] text-[16px] leading-[1.7] text-[#1c0f0a]/65">{v.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
