import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "grid";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({ article, variant = "grid" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <article className="group overflow-hidden rounded-2xl border border-[#1c0f0a]/10 bg-white shadow-sm">
        <Link
          href={`/blog/${article.slug}`}
          aria-label={`Read ${article.title}`}
          className="grid md:grid-cols-[3fr_2fr]"
        >
          <div className="relative min-h-72 overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition duration-300 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-[#1c0f0a]/0 transition duration-300 ease-out group-hover:bg-[#1c0f0a]/25" />
          </div>
          <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
            <p className="inline-flex w-fit rounded-full bg-[#f5edd8] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#3b1e0e]">
              {article.category.replace("-", " ")}
            </p>
            <h3 className="font-display max-w-[400px] text-[32px] leading-[1.2] text-[#1c0f0a]">
              {article.title}
            </h3>
            <p className="max-w-[380px] text-[15px] leading-[1.7] text-[#1c0f0a]/70">
              {article.excerpt}
            </p>
            <p className="text-[13px] text-[#1c0f0a]/60">
              {article.author} · {formatDate(article.publishedAt)} · {article.readTime} min read
            </p>
            <span className="text-[14px] font-semibold uppercase tracking-wide text-[#c9973a] transition group-hover:text-[#b07040]">
              Read article →
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <Link
      href={`/blog/${article.slug}`}
      aria-label={`Read ${article.title}`}
      className="group block overflow-hidden rounded-2xl border border-[#1c0f0a]/10 bg-white shadow-sm transition duration-300 ease-out hover:border-[#c9973a]/50 hover:shadow-[0_20px_40px_-28px_rgba(28,15,10,0.25)]"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition duration-300 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-3 p-5">
        <p className="inline-flex rounded-full bg-[#f5edd8] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#3b1e0e]">
          {article.category.replace("-", " ")}
        </p>
        <h3 className="font-display text-[22px] leading-[1.3] text-[#1c0f0a]">{article.title}</h3>
        <p className="line-clamp-2 text-[14px] leading-[1.6] text-[#1c0f0a]/70">{article.excerpt}</p>
        <p className="text-[12px] text-[#1c0f0a]/55">
          {formatDate(article.publishedAt)} · {article.readTime} min read
        </p>
      </div>
    </Link>
  );
}
