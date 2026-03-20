import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const CATEGORIES = [
  { value: "coffee-beans", label: "Coffee Beans" },
  { value: "brewing-gear", label: "Brewing Equipment" },
  { value: "merchandise", label: "Merchandise" },
] as const;

const ROAST_PROFILES = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "dark", label: "Dark" },
  { value: "espresso", label: "Espresso" },
] as const;

const ORIGINS = [
  "Ethiopia",
  "Colombia",
  "Panama",
  "Rwanda",
  "Guatemala",
  "Indonesia",
] as const;

const PRICE_TIERS = [
  { value: "under500000", label: "Under Rp500.000" },
  { value: "500000to1500000", label: "Rp500.000 - Rp1.500.000" },
  { value: "over1500000", label: "Over Rp1.500.000" },
] as const;

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

interface ShopSearchParams {
  category?: string | string[];
  roast?: string | string[];
  origin?: string | string[];
  price?: string | string[];
  sort?: string;
  page?: string;
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function parsePriceTier(price: number, tiers: string[]) {
  if (tiers.length === 0) return true;
  return tiers.some((tier) => {
    if (tier === "under500000") return price < 500000;
    if (tier === "500000to1500000") return price >= 500000 && price <= 1500000;
    if (tier === "over1500000") return price > 1500000;
    return false;
  });
}

function getSortedProducts(items: typeof products, sort: SortMode) {
  if (sort === "price-asc") return [...items].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...items].sort((a, b) => b.price - a.price);
  if (sort === "newest") return [...items].reverse();
  return [...items].sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
}

interface SearchParamInputProps {
  name: string;
  values: string[];
}

function SearchParamInputs({ name, values }: SearchParamInputProps) {
  return (
    <>
      {values.map((value) => (
        <input key={`${name}-${value}`} type="hidden" name={name} value={value} />
      ))}
    </>
  );
}

interface FilterFormProps {
  selectedCategories: string[];
  selectedRoasts: string[];
  selectedOrigins: string[];
  selectedPrices: string[];
  sort: SortMode;
  idPrefix: string;
}

function FilterForm({
  selectedCategories,
  selectedRoasts,
  selectedOrigins,
  selectedPrices,
  sort,
  idPrefix,
}: FilterFormProps) {
  return (
    <form method="get" className="space-y-6">
      <input type="hidden" name="sort" value={sort} />
      <input type="hidden" name="page" value="1" />
      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-[#1c0f0a]">
          Category
        </legend>
        <div className="mt-3 space-y-2">
          {CATEGORIES.map((option) => (
            <label key={option.value} htmlFor={`${idPrefix}-${option.value}`} className="flex items-center gap-2 text-sm">
              <input
                id={`${idPrefix}-${option.value}`}
                type="checkbox"
                name="category"
                value={option.value}
                defaultChecked={selectedCategories.includes(option.value)}
                className="h-4 w-4 accent-[#1c0f0a]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-[#1c0f0a]">
          Roast Profile
        </legend>
        <div className="mt-3 space-y-2">
          {ROAST_PROFILES.map((option) => (
            <label key={option.value} htmlFor={`${idPrefix}-${option.value}`} className="flex items-center gap-2 text-sm">
              <input
                id={`${idPrefix}-${option.value}`}
                type="checkbox"
                name="roast"
                value={option.value}
                defaultChecked={selectedRoasts.includes(option.value)}
                className="h-4 w-4 accent-[#1c0f0a]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-[#1c0f0a]">
          Origin
        </legend>
        <div className="mt-3 space-y-2">
          {ORIGINS.map((origin) => (
            <label key={origin} htmlFor={`${idPrefix}-${origin}`} className="flex items-center gap-2 text-sm">
              <input
                id={`${idPrefix}-${origin}`}
                type="checkbox"
                name="origin"
                value={origin}
                defaultChecked={selectedOrigins.includes(origin)}
                className="h-4 w-4 accent-[#1c0f0a]"
              />
              {origin}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-[#1c0f0a]">
          Price range
        </legend>
        <div className="mt-3 space-y-2">
          {PRICE_TIERS.map((tier) => (
            <label key={tier.value} htmlFor={`${idPrefix}-${tier.value}`} className="flex items-center gap-2 text-sm">
              <input
                id={`${idPrefix}-${tier.value}`}
                type="checkbox"
                name="price"
                value={tier.value}
                defaultChecked={selectedPrices.includes(tier.value)}
                className="h-4 w-4 accent-[#1c0f0a]"
              />
              {tier.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-full bg-[#1c0f0a] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition-colors hover:bg-[#2d1a13]"
      >
        Apply filters
      </button>
    </form>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const params = await searchParams;

  const selectedCategories = toArray(params.category);
  const selectedRoasts = toArray(params.roast);
  const selectedOrigins = toArray(params.origin);
  const selectedPrices = toArray(params.price);
  const sort = (params.sort as SortMode) || "featured";
  const currentPage = Math.max(Number(params.page || "1"), 1);
  const pageSize = 9;

  const filtered = products.filter((product) => {
    const matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchRoast =
      selectedRoasts.length === 0 ||
      (product.roastProfile ? selectedRoasts.includes(product.roastProfile) : false);
    const matchOrigin =
      selectedOrigins.length === 0 ||
      (product.origin ? selectedOrigins.includes(product.origin) : false);
    const matchPrice = parsePriceTier(product.price, selectedPrices);
    return matchCategory && matchRoast && matchOrigin && matchPrice;
  });

  const sortedProducts = getSortedProducts(filtered, sort);
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const visibleProducts = sortedProducts.slice(pageStart, pageStart + pageSize);

  const buildPageQuery = (page: number) => {
    const query = new URLSearchParams();
    selectedCategories.forEach((value) => query.append("category", value));
    selectedRoasts.forEach((value) => query.append("roast", value));
    selectedOrigins.forEach((value) => query.append("origin", value));
    selectedPrices.forEach((value) => query.append("price", value));
    query.set("sort", sort);
    query.set("page", String(page));
    return query.toString();
  };

  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-[#1c0f0a]/60">
          <Link href="/" className="hover:text-[#c9973a]">
            Home
          </Link>{" "}
          / Shop
        </p>
        <h1 className="mt-2 font-display text-5xl">Shop</h1>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <details className="md:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-[#1c0f0a]/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide">
              Filters
            </summary>
            <div className="mt-3 rounded-2xl border border-[#1c0f0a]/10 bg-white p-4">
              <FilterForm
                selectedCategories={selectedCategories}
                selectedRoasts={selectedRoasts}
                selectedOrigins={selectedOrigins}
                selectedPrices={selectedPrices}
                sort={sort}
                idPrefix="mobile"
              />
            </div>
          </details>

          <form method="get" className="ml-auto">
            <SearchParamInputs name="category" values={selectedCategories} />
            <SearchParamInputs name="roast" values={selectedRoasts} />
            <SearchParamInputs name="origin" values={selectedOrigins} />
            <SearchParamInputs name="price" values={selectedPrices} />
            <input type="hidden" name="page" value="1" />
            <label className="sr-only" htmlFor="sort">
              Sort products
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              className="rounded-full border border-[#1c0f0a]/20 bg-white px-4 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <button
              type="submit"
              className="ml-2 rounded-full border border-[#1c0f0a]/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-[#1c0f0a]/5"
            >
              Sort
            </button>
          </form>
        </div>

        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <aside className="sticky top-24 hidden self-start rounded-2xl border border-[#1c0f0a]/10 bg-white p-5 md:block">
            <FilterForm
              selectedCategories={selectedCategories}
              selectedRoasts={selectedRoasts}
              selectedOrigins={selectedOrigins}
              selectedPrices={selectedPrices}
              sort={sort}
              idPrefix="desktop"
            />
          </aside>

          <div>
            {visibleProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#1c0f0a]/20 p-10 text-center text-[#1c0f0a]/60">
                No products found for your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-[#1c0f0a]/10 pt-5">
              <p className="text-sm text-[#1c0f0a]/70">
                Page {safePage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href={`?${buildPageQuery(Math.max(1, safePage - 1))}`}
                  aria-disabled={safePage === 1}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    safePage === 1
                      ? "pointer-events-none border-[#1c0f0a]/10 text-[#1c0f0a]/30"
                      : "border-[#1c0f0a]/20 hover:bg-[#1c0f0a]/5"
                  }`}
                >
                  Prev
                </Link>
                <Link
                  href={`?${buildPageQuery(Math.min(totalPages, safePage + 1))}`}
                  aria-disabled={safePage === totalPages}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    safePage === totalPages
                      ? "pointer-events-none border-[#1c0f0a]/10 text-[#1c0f0a]/30"
                      : "border-[#1c0f0a]/20 hover:bg-[#1c0f0a]/5"
                  }`}
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
