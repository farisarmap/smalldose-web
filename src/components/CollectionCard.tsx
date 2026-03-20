import Image from "next/image";
import Link from "next/link";

import type { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
  index: number;
  /** When set, overrides static `collection.productCount` (e.g. from live catalog) */
  productCount?: number;
}

export function CollectionCard({ collection, index, productCount: countOverride }: CollectionCardProps) {
  return (
    <div data-animate className={`h-full stagger-120-${index % 9}`}>
      <Link
        href={`/collections/${collection.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-[#1c0f0a]/10 bg-white shadow-sm transition duration-300 ease-out hover:border-[#c9973a]/45 hover:shadow-[0_20px_40px_-28px_rgba(28,15,10,0.22)]"
      >
        <div className="relative aspect-3/2 w-full overflow-hidden md:aspect-4/3">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover transition duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(28,15,10,0.92)_0%,rgba(28,15,10,0.42)_45%,transparent_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[#1c0f0a]/0 transition duration-300 ease-out group-hover:bg-[#1c0f0a]/20"
            aria-hidden
          />
          {collection.badge ? (
            <span className="absolute right-4 top-4 rounded-full bg-[#c9973a] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#1c0f0a]">
              {collection.badge}
            </span>
          ) : null}
          <div className="absolute bottom-0 left-0 max-w-[90%] p-5 md:p-6">
            <h3 className="font-display text-[28px] font-semibold leading-tight text-[#faf6ee]">{collection.name}</h3>
            <p className="mt-2 text-[14px] leading-normal text-[#faf6ee]/80">{collection.tagline}</p>
            <p className="mt-3 text-[12px] text-[#faf6ee]/55">{countOverride ?? collection.productCount} products</p>
            <p className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wide text-[#c9973a] transition duration-300 group-hover:translate-x-1 group-hover:underline">
              Explore →
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
