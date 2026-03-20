"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import type { Collection } from "@/types";
import type { Product } from "@/types";

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

const ROAST_TABS = [
  { value: "", label: "All" },
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "dark", label: "Dark" },
  { value: "espresso", label: "Espresso" },
] as const;

function sortProducts(items: Product[], sort: SortMode): Product[] {
  if (sort === "price-asc") return [...items].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...items].sort((a, b) => b.price - a.price);
  if (sort === "newest") return [...items].reverse();
  return [...items].sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
}

function filterByParams(
  items: Product[],
  slug: string,
  roast: string,
  origin: string,
): Product[] {
  let list = items.filter((p) => p.category === slug);
  if (slug === "coffee-beans") {
    if (roast) {
      list = list.filter((p) => p.roastProfile === roast);
    }
    if (origin) {
      list = list.filter((p) => p.origin === origin);
    }
  }
  return list;
}

interface CollectionProductsClientProps {
  collection: Collection;
  products: Product[];
  origins: string[];
}

export function CollectionProductsClient({
  collection,
  products,
  origins,
}: CollectionProductsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = (searchParams.get("sort") as SortMode) || "featured";
  const roast = searchParams.get("roast") || "";
  const origin = searchParams.get("origin") || "";

  const filtered = useMemo(
    () => filterByParams(products, collection.slug, roast, origin),
    [products, collection.slug, roast, origin],
  );

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const buildQuery = (updates: Record<string, string | null>) => {
    const q = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") q.delete(key);
      else q.set(key, value);
    });
    const s = q.toString();
    return s ? `${pathname}?${s}` : pathname;
  };

  const isCoffee = collection.slug === "coffee-beans";
  const hasFilterParams = isCoffee && (Boolean(roast) || Boolean(origin));
  const emptyFromFilters = sorted.length === 0 && hasFilterParams;
  const emptyCatalog = sorted.length === 0 && products.length === 0;

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-[#1c0f0a]/10 bg-[#faf6ee] shadow-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-h-[36px] flex-wrap items-center gap-2">
              {isCoffee && roast ? (
                <button
                  type="button"
                  onClick={() => router.push(buildQuery({ roast: null }), { scroll: false })}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1c0f0a]/15 bg-[#f5edd8] px-3 py-1.5 text-[13px] text-[#1c0f0a] transition hover:border-[#c9973a]"
                >
                  Roast: {roast}
                  <span className="text-lg leading-none" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {isCoffee && origin ? (
                <button
                  type="button"
                  onClick={() => router.push(buildQuery({ origin: null }), { scroll: false })}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1c0f0a]/15 bg-[#f5edd8] px-3 py-1.5 text-[13px] text-[#1c0f0a] transition hover:border-[#c9973a]"
                >
                  Origin: {origin}
                  <span className="text-lg leading-none" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {hasFilterParams ? (
                <button
                  type="button"
                  onClick={() => router.push(pathname, { scroll: false })}
                  className="text-[13px] font-semibold uppercase tracking-wide text-[#c9973a] underline"
                >
                  Clear filters
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="sr-only" htmlFor="collection-sort">
                Sort products
              </label>
              <select
                id="collection-sort"
                value={sort}
                onChange={(e) => router.push(buildQuery({ sort: e.target.value }), { scroll: false })}
                className="rounded-full border border-[#1c0f0a]/15 bg-white px-4 py-2 text-[13px] text-[#1c0f0a] outline-none focus:border-[#c9973a]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {isCoffee ? (
            <div className="mt-4 flex flex-col gap-3 border-t border-[#1c0f0a]/10 pt-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {ROAST_TABS.map((tab) => {
                  const active = roast === tab.value;
                  return (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => router.push(buildQuery({ roast: tab.value || null }), { scroll: false })}
                      className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                        active
                          ? "bg-[#1c0f0a] text-[#faf6ee]"
                          : "bg-white text-[#1c0f0a]/70 ring-1 ring-[#1c0f0a]/10 hover:bg-[#f5edd8]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="origin-filter" className="text-[13px] text-[#1c0f0a]/55">
                  Origin
                </label>
                <select
                  id="origin-filter"
                  value={origin}
                  onChange={(e) => router.push(buildQuery({ origin: e.target.value || null }), { scroll: false })}
                  className="min-w-[180px] rounded-full border border-[#1c0f0a]/15 bg-white px-4 py-2 text-[13px] text-[#1c0f0a] outline-none focus:border-[#c9973a]"
                >
                  <option value="">All origins</option>
                  {origins.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <section className="border-t border-[#1c0f0a]/10 bg-[#faf6ee] py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {sorted.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-[#1c0f0a]/20 bg-white px-8 py-14 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5edd8] text-2xl" aria-hidden>
                ☕
              </div>
              <p className="font-display text-lg font-semibold text-[#1c0f0a]">
                {emptyCatalog
                  ? "Nothing here yet"
                  : emptyFromFilters
                    ? "No coffees match your filters"
                    : "No products match your filters"}
              </p>
              <p className="mt-2 text-[14px] text-[#1c0f0a]/60">
                {emptyCatalog
                  ? "We’re restocking this collection — check back soon."
                  : emptyFromFilters
                    ? "Try clearing filters or choose a different roast or origin."
                    : "Try a different sort option."}
              </p>
              {emptyFromFilters ? (
                <Link
                  href={pathname}
                  className="mt-6 rounded-full bg-[#1c0f0a] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition hover:bg-[#3b1e0e]"
                >
                  Clear filters
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
