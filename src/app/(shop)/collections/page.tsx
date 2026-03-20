import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { CollectionCard } from "@/components/CollectionCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { OrbitalRings } from "@/components/collections/OrbitalRings";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Collections | Smalldose",
  description:
    "Explore Smalldose collections — single origin coffee beans, brewing equipment, gift sets, and monthly subscriptions.",
};

function productCountForSlug(slug: string) {
  return products.filter((p) => p.category === slug).length;
}

export default function CollectionsPage() {
  const [c0, c1, ...rest] = collections;
  const row2 = rest;

  const featured = collections.find((c) => c.slug === "coffee-beans");

  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <main>
        <section className="relative overflow-hidden border-b border-[#1c0f0a]/10 bg-[#1c0f0a] py-20">
          <OrbitalRings className="absolute -right-24 -top-24 h-[420px] w-[420px] opacity-40 md:right-10 md:top-10" />
          <OrbitalRings className="absolute -bottom-32 -left-16 h-[360px] w-[360px] opacity-25" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9973a]">Collections</p>
            <h1 className="font-display mt-4 whitespace-pre-line text-[38px] leading-[1.05] text-[#faf6ee] md:text-[56px]">
              {"Every Coffee Has\na Category. Explore Them."}
            </h1>
            <p className="mx-auto mt-6 max-w-[520px] text-[17px] leading-relaxed text-[#faf6ee]/70">
              From single-origin beans to brewing equipment — everything we carry, organized the way you think.
            </p>
          </div>
        </section>

        <section className="border-b border-[#1c0f0a]/10 bg-[#faf6ee] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6 lg:gap-6">
              {c0 ? (
                <div className="lg:col-span-3">
                  <CollectionCard collection={c0} index={0} productCount={productCountForSlug(c0.slug)} />
                </div>
              ) : null}
              {c1 ? (
                <div className="lg:col-span-3">
                  <CollectionCard collection={c1} index={1} productCount={productCountForSlug(c1.slug)} />
                </div>
              ) : null}
              {row2.map((c, i) => (
                <div key={c.id} className="lg:col-span-2">
                  <CollectionCard collection={c} index={i + 2} productCount={productCountForSlug(c.slug)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {featured ? (
          <section className="border-b border-[#1c0f0a]/10 bg-[#f5edd8]/50 py-20">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
              <div className="order-2 lg:order-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9973a]">Featured Collection</p>
                <h2 className="font-display mt-4 text-4xl text-[#1c0f0a] md:text-[48px]">{featured.name}</h2>
                <p className="mt-4 text-[20px] italic text-[#3b1e0e]/85">{featured.tagline}</p>
                <p className="mt-6 max-w-[480px] text-[16px] leading-[1.8] text-[#1c0f0a]/70">
                  {featured.description.replace(/\s+/g, " ").trim()}
                </p>
                <p className="mt-6 inline-flex rounded-full border border-[#1c0f0a]/15 bg-white px-4 py-2 text-[13px] text-[#1c0f0a]/80">
                  {productCountForSlug("coffee-beans")} Single Origins Available
                </p>
                <Link
                  href="/collections/coffee-beans"
                  className="mt-8 inline-flex rounded-full bg-[#1c0f0a] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition hover:bg-[#3b1e0e]"
                >
                  Shop the Collection →
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-[#1c0f0a]/10 shadow-[0_24px_48px_-24px_rgba(28,15,10,0.35)]">
                  <Image
                    src={featured.heroImage}
                    alt={featured.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1c0f0a_0%,#3b1e0e_100%)] py-20">
          <OrbitalRings className="absolute left-4 top-1/2 hidden h-[280px] w-[280px] -translate-y-1/2 opacity-20 lg:block" />
          <OrbitalRings className="absolute right-4 top-1/2 hidden h-[280px] w-[280px] -translate-y-1/2 opacity-20 lg:block" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-[36px] text-[#faf6ee] md:text-[42px]">Never Run Out of Good Coffee</h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] text-[#faf6ee]/75">
              Subscribe and get a freshly roasted origin delivered to your door every month. Cancel anytime.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/collections/subscriptions"
                className="inline-flex w-full max-w-xs justify-center rounded-full bg-[#c9973a] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#1c0f0a] transition hover:bg-[#d8a951] sm:w-auto"
              >
                Start Subscription
              </Link>
              <Link
                href="/about"
                className="inline-flex w-full max-w-xs justify-center rounded-full border border-[#faf6ee]/35 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition hover:bg-[#faf6ee]/10 sm:w-auto"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
