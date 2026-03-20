import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CollectionCard } from "@/components/CollectionCard";
import { CollectionProductsClient } from "@/components/collections/CollectionProductsClient";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function truncateMeta(s: string, max: number) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) {
    return {
      title: "Collections | Smalldose",
      description:
        "Explore Smalldose collections — single origin coffee beans, brewing equipment, gift sets, and monthly subscriptions.",
    };
  }
  return {
    title: `${collection.name} | Smalldose`,
    description: truncateMeta(collection.description, 155),
  };
}

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const collectionProducts = products.filter((p) => p.category === collection.slug);
  const origins = Array.from(
    new Set(collectionProducts.map((p) => p.origin).filter((o): o is string => Boolean(o))),
  ).sort();

  const related = collections.filter((c) => c.slug !== collection.slug).slice(0, 3);

  const overlayClass =
    collection.theme === "dark" ? "bg-[rgba(28,15,10,0.82)]" : "bg-[rgba(28,15,10,0.58)]";

  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <main>
        <section className="relative min-h-[320px] md:min-h-[480px]">
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className={`absolute inset-0 ${overlayClass}`} />
          <div className="relative z-10 flex min-h-[320px] flex-col justify-center px-4 py-16 md:min-h-[480px] md:px-8">
            <div className="absolute left-4 top-4 z-20 md:left-8 md:top-8">
              <p className="text-[13px] text-[#faf6ee]/60">
                <Link href="/" className="transition hover:text-[#faf6ee]">
                  Home
                </Link>
                <span className="mx-2 text-[#faf6ee]/35">/</span>
                <Link href="/collections" className="transition hover:text-[#faf6ee]">
                  Collections
                </Link>
                <span className="mx-2 text-[#faf6ee]/35">/</span>
                <span className="text-[#faf6ee]/90">{collection.name}</span>
              </p>
            </div>
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              {collection.badge ? (
                <span className="mb-4 rounded-full bg-[#c9973a] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#1c0f0a]">
                  {collection.badge}
                </span>
              ) : null}
              <h1 className="font-display text-[40px] leading-[1.05] text-[#faf6ee] md:text-[64px]">{collection.name}</h1>
              <p className="mt-4 max-w-2xl text-[20px] italic text-[#f5edd8]/90">{collection.tagline}</p>
              <p className="mt-6 max-w-[600px] text-[16px] leading-[1.8] text-[#faf6ee]/78">
                {collection.description.replace(/\s+/g, " ").trim()}
              </p>
              <p className="mt-6 text-[14px] text-[#faf6ee]/55">{collectionProducts.length} products</p>
            </div>
          </div>
        </section>

        <Suspense
          fallback={
            <div className="min-h-[240px] animate-pulse bg-[#faf6ee]" aria-hidden>
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="h-10 rounded-full bg-[#1c0f0a]/10" />
              </div>
            </div>
          }
        >
          <CollectionProductsClient collection={collection} products={collectionProducts} origins={origins} />
        </Suspense>

        <section className="border-t border-[#1c0f0a]/10 bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-[#1c0f0a]">Explore Other Collections</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, index) => (
                <CollectionCard
                  key={c.id}
                  collection={c}
                  index={index}
                  productCount={products.filter((p) => p.category === c.slug).length}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
