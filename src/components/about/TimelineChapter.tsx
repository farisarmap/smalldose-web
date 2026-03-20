"use client";

import Image from "next/image";

import type { AboutChapter } from "@/data/about";

import { Reveal } from "./Reveal";

interface TimelineChapterProps {
  chapter: AboutChapter;
  index: number;
}

export function TimelineChapter({ chapter, index }: TimelineChapterProps) {
  const chapterNum = String(index + 2).padStart(2, "0");
  const label = `Chapter ${chapterNum} — ${chapter.moment}`;
  const isOddLayout = index % 2 === 0;

  const content = (
    <div
      className={`relative flex min-h-[50vh] flex-1 flex-col justify-center px-6 py-16 md:px-12 lg:min-h-screen lg:py-20 lg:pl-14 lg:pr-14 ${
        isOddLayout ? "bg-[#1c0f0a]" : "bg-[#f5edd8]/50"
      }`}
    >
      <span
        className={`pointer-events-none absolute left-4 top-8 select-none font-display text-[72px] font-black leading-none opacity-[0.08] sm:left-8 sm:text-[100px] md:text-[120px] ${
          isOddLayout ? "text-[#faf6ee]" : "text-[#1c0f0a]"
        }`}
        aria-hidden
      >
        {chapter.year}
      </span>
      <Reveal delayMs={0}>
        <p
          className={`relative z-[1] text-[11px] uppercase tracking-[0.2em] ${
            isOddLayout ? "text-[#c9973a]" : "text-[#b07040]"
          }`}
        >
          {label}
        </p>
      </Reveal>
      <Reveal delayMs={100}>
        <h2
          className={`relative z-[1] mt-6 whitespace-pre-line font-display text-[36px] font-bold leading-[1.1] md:text-[52px] ${
            isOddLayout ? "text-[#faf6ee]" : "text-[#1c0f0a]"
          }`}
        >
          {chapter.statement}
        </h2>
      </Reveal>
      <Reveal delayMs={250}>
        <div
          className={`relative z-[1] mt-8 h-px w-10 ${isOddLayout ? "bg-[#c9973a]" : "bg-[#c9973a]/80"}`}
          aria-hidden
        />
        <p
          className={`relative z-[1] mt-8 max-w-[380px] text-[16px] leading-[1.7] ${
            isOddLayout ? "text-[#faf6ee]/65" : "text-[#1c0f0a]/65"
          }`}
        >
          {chapter.detail}
        </p>
      </Reveal>
    </div>
  );

  const imageBlock = (orderClass: string) => (
    <div
      className={`relative h-[40vh] w-full shrink-0 lg:h-auto lg:min-h-screen lg:w-[55%] ${orderClass}`}
    >
      <Image
        src={chapter.image}
        alt={`${chapter.moment}, ${chapter.year}`}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 55vw"
        priority={index === 0}
      />
    </div>
  );

  if (isOddLayout) {
    return (
      <section className="flex min-h-screen flex-col overflow-x-hidden lg:flex-row">
        {imageBlock("")}
        <div className="w-full lg:w-[45%]">{content}</div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen flex-col overflow-x-hidden lg:flex-row">
      {imageBlock("lg:order-2")}
      <div className="w-full lg:order-1 lg:w-[45%]">{content}</div>
    </section>
  );
}
