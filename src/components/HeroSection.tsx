import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      <Image
        src="/images/hero-coffee.svg"
        alt="Coffee cherries and brewing setup"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#1c0f0a]/85 via-[#1c0f0a]/55 to-[#1c0f0a]/25"
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9973a]">
            Slow Roasted. Story Driven.
          </p>
          <h1 className="font-display text-5xl leading-tight text-[#faf6ee] sm:text-6xl lg:text-7xl">
            Where Heritage
            <br />
            Lives in Every Cup
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#faf6ee]/90 sm:text-lg">
            Discover rare coffee lots and mindful brewing tools curated for ritual,
            flavor clarity, and everyday moments that feel elevated.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-[#c9973a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1c0f0a] transition-colors hover:bg-[#ddac50]"
            >
              Shop Coffee
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[#faf6ee]/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition-colors hover:border-[#c9973a] hover:text-[#c9973a]"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
