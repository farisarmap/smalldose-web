import type { Metadata } from "next";

import { BlogListingClient } from "@/components/BlogListingClient";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Journal | Smalldose",
  description: "Brew guides, origin stories, and coffee education from the Smalldose roastery.",
};

export default function BlogPage() {
  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <main>
        <section className="border-b border-[#1c0f0a]/10 bg-[#1c0f0a] py-20 text-center">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9973a]">Journal</p>
            <h1 className="font-display mt-4 whitespace-pre-line text-4xl leading-[1.1] text-[#faf6ee] sm:text-[56px]">
              {"Stories, Guides &\nOrigin Reports"}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-[#faf6ee]/75">
              Notes from the roastery on brewing technique, coffee origins, and the decisions that shape each cup.
            </p>
          </div>
        </section>
        <BlogListingClient articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
