import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { articles } from "@/data/articles";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function renderBodyBlock(block: string, index: number) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={index} className="font-display mt-12 text-[28px] font-semibold leading-tight text-[#1c0f0a]">
        {trimmed.replace("## ", "")}
      </h2>
    );
  }

  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={index} className="font-display mt-8 text-[22px] font-medium leading-tight text-[#1c0f0a]">
        {trimmed.replace("### ", "")}
      </h3>
    );
  }

  if (trimmed.startsWith("> ")) {
    return (
      <blockquote
        key={index}
        className="my-10 border-l-[3px] border-[#c9973a] pl-6 text-[20px] italic leading-relaxed text-[#3b1e0e]"
      >
        {trimmed.replace("> ", "")}
      </blockquote>
    );
  }

  const imageMatch = trimmed.match(/^!\[(.*?)\]\((\S+)(?:\s+"(.*)")?\)$/);
  if (imageMatch) {
    const [, alt, src, caption] = imageMatch;
    return (
      <figure key={index} className="my-10">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image src={src} alt={alt || "Article image"} fill className="object-cover" sizes="100vw" />
        </div>
        {caption ? (
          <figcaption className="mt-3 text-[13px] italic text-[#1c0f0a]/55">{caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <p key={index} className="mb-6 text-[17px] leading-[1.9] text-[#1c0f0a]">
      {trimmed}
    </p>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Journal | Smalldose",
      description: "Brew guides, origin stories, and coffee education from the Smalldose roastery.",
    };
  }

  return {
    title: `${article.title} | Smalldose Journal`,
    description: article.excerpt,
    openGraph: {
      images: [article.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  const relatedArticles = articles
    .filter((item) => item.category === article.category && item.slug !== article.slug)
    .slice(0, 3);

  const bodyBlocks = article.body.split("\n\n");

  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <main>
        <section className="border-b border-[#1c0f0a]/10 bg-[#1c0f0a] py-20">
          <div className="mx-auto w-full max-w-[800px] px-4 text-[#faf6ee] sm:px-6">
            <p className="inline-flex rounded-full border border-[#faf6ee]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#faf6ee]">
              {article.category.replace("-", " ")}
            </p>
            <h1 className="font-display mt-5 max-w-[720px] text-4xl leading-[1.1] text-[#faf6ee] sm:text-[52px]">
              {article.title}
            </h1>
            <p className="mt-5 text-[14px] text-[#faf6ee]/75">
              {article.author} · {formatDate(article.publishedAt)} · {article.readTime} min read
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="relative h-[320px] w-full sm:h-[420px] md:h-[520px]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#faf6ee] to-transparent" />
        </section>

        <article className="mx-auto w-full max-w-[720px] px-4 py-16 sm:px-6">
          {bodyBlocks.map((block, index) => renderBodyBlock(block, index))}
        </article>

        <section className="mx-auto w-full max-w-[720px] px-4 pb-16 sm:px-6">
          <div className="border-t border-[#1c0f0a]/10 pt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#1c0f0a]/10 bg-[#f5edd8]">
                <Image
                  src="/images/journal/author-smalldose.jpg"
                  alt="Smalldose Roastery"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-[18px] font-semibold text-[#1c0f0a]">Smalldose Roastery</h3>
                <p className="text-[13px] text-[#1c0f0a]/55">Editorial Team</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#1c0f0a]/65">
                  We publish practical brewing knowledge, sourcing reports, and field notes from producers and processing
                  partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {relatedArticles.length ? (
          <section className="border-t border-[#1c0f0a]/10 bg-[#f5edd8]/40 py-16">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl text-[#1c0f0a]">More from the Journal</h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle, index) => (
                  <div key={relatedArticle.id} data-animate className={`stagger-${index % 6}`}>
                    <ArticleCard article={relatedArticle} variant="grid" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
