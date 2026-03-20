"use client";

import { CountUp } from "@/components/ui/CountUp";

import { Reveal } from "./Reveal";
import { useInViewOnce } from "./useInViewOnce";

interface Stat {
  value: string;
  label: string;
}

export function AboutStatsSection({ stats }: { stats: readonly Stat[] }) {
  const { ref, visible } = useInViewOnce(0.2);

  return (
    <section className="overflow-x-hidden border-t border-[#faf6ee]/10 bg-[#1c0f0a] px-4 py-24 md:py-[100px]">
      <div ref={ref} className="mx-auto grid max-w-6xl grid-cols-2 gap-y-16 lg:grid-cols-4 lg:gap-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`relative flex flex-col items-center text-center lg:px-6 ${
              i > 0 ? "lg:border-l lg:border-[#faf6ee]/10" : ""
            }`}
          >
            <div className="mb-6 h-0.5 w-8 bg-[#c9973a]" />
            {stat.value === "IDR" ? (
              <Reveal delayMs={0}>
                <span className="font-display text-[56px] font-black leading-none text-[#c9973a] md:text-[80px]">
                  {stat.value}
                </span>
              </Reveal>
            ) : (
              <span className="font-display text-[56px] font-black leading-none md:text-[80px]">
                <CountUp
                  value={stat.value}
                  active={visible}
                  durationMs={1500}
                  className="text-[#c9973a]"
                />
              </span>
            )}
            <p className="mt-4 max-w-[140px] text-[14px] uppercase tracking-[0.15em] text-[#faf6ee]/55">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
