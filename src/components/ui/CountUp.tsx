"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

interface CountUpProps {
  /** e.g. "40+", "12", "6" — numeric part animates */
  value: string;
  className?: string;
  durationMs?: number;
  /** Fire when parent section is visible */
  active: boolean;
}

export function CountUp({ value, className = "", durationMs = 1500, active }: CountUpProps) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setTimeout(() => {
        setDisplay(value);
      }, 0);
      startedRef.current = true;
      return;
    }
    const target = Number.parseInt(match[1], 10);
    const suffix = match[2] ?? "";
    startedRef.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(`${target}${suffix}`);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, value, durationMs]);

  return <span className={className}>{display}</span>;
}
