import type { Metadata } from "next";

import { AboutClosing } from "@/components/about/AboutClosing";
import { AboutOpening } from "@/components/about/AboutOpening";
import { AboutParallaxBreak } from "@/components/about/AboutParallaxBreak";
import { AboutPrinciplesSection } from "@/components/about/AboutPrinciplesSection";
import { AboutQuestion } from "@/components/about/AboutQuestion";
import { AboutStatsSection } from "@/components/about/AboutStatsSection";
import { TimelineChapter } from "@/components/about/TimelineChapter";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { aboutData } from "@/data/about";

export const metadata: Metadata = {
  title: "Our Story | Smalldose",
  description:
    "From a question in Cirebon to 40+ farm partnerships worldwide. The Smalldose story — one cup at a time.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <main className="overflow-x-hidden">
        <AboutOpening />
        <AboutQuestion />
        {aboutData.chapters.map((chapter, index) => (
          <TimelineChapter key={chapter.year} chapter={chapter} index={index} />
        ))}
        <AboutStatsSection stats={aboutData.stats} />
        <AboutPrinciplesSection values={aboutData.values} />
        <AboutParallaxBreak />
        <AboutClosing />
      </main>
      <Footer />
    </div>
  );
}
