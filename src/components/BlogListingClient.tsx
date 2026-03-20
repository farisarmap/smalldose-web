"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArticleCard } from "@/components/ArticleCard";
import type { Article } from "@/types";

const categories = [
  { label: "All", value: "all" },
  { label: "Brew Guides", value: "brew-guides" },
  { label: "Origin Stories", value: "origin-stories" },
  { label: "News", value: "news" },
  { label: "Recipes", value: "recipes" },
] as const;

type Category = (typeof categories)[number]["value"];

function isCategory(value: string | null): value is Exclude<Category, "all"> {
  return value === "brew-guides" || value === "origin-stories" || value === "news" || value === "recipes";
}

interface BlogListingClientProps {
  articles: Article[];
}

export function BlogListingClient({ articles }: BlogListingClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategory: Category = isCategory(categoryParam) ? categoryParam : "all";

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory, articles]);

  const featured = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  const setCategory = (category: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <>
      <section className="border-b border-[#1c0f0a]/10 bg-[#faf6ee]">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-6 px-4 py-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const isActive = category.value === activeCategory;
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setCategory(category.value)}
                className={`border-b-2 pb-2 text-sm font-medium transition ${
                  isActive
                    ? "border-[#c9973a] text-[#1c0f0a]"
                    : "border-transparent text-[#1c0f0a]/55 hover:text-[#1c0f0a]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {featured ? (
        <section className="bg-[#f5edd8]/40 py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" data-animate>
            <ArticleCard article={featured} variant="featured" />
          </div>
        </section>
      ) : null}

      <section className="bg-[#faf6ee] py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {gridArticles.length ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article, index) => (
                <div key={article.id} data-animate className={`stagger-${index % 6}`}>
                  <ArticleCard article={article} variant="grid" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#1c0f0a]/60">No journal entries in this category yet.</p>
          )}
        </div>
      </section>

      <section className="border-t border-[#1c0f0a]/10 bg-[#f5edd8]/50 py-16">
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl text-[#1c0f0a] sm:text-4xl">Get brew guides in your inbox</h2>
          <p className="mt-3 text-[17px] text-[#1c0f0a]/65">New origins, new techniques. No spam.</p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-full border border-[#1c0f0a]/15 bg-white px-4 text-sm text-[#1c0f0a] outline-none transition focus:border-[#c9973a]"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-[#1c0f0a] px-6 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition hover:bg-[#3b1e0e]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
