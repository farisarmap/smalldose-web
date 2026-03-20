import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/ArticleCard";
import { CollectionCard } from "@/components/CollectionCard";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { articles } from "@/data/articles";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar />
      <main>
        <HeroSection />

        <section
          aria-labelledby="featured-collections"
          className="mx-auto w-full max-w-7xl border-t border-[#1c0f0a]/10 px-4 py-18 sm:px-6 lg:px-8"
        >
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9973a]">
                Discover
              </p>
              <h2 id="featured-collections" className="font-display text-4xl">
                Featured Collections
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#c9973a]"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {collections.slice(0, 3).map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={index}
                productCount={products.filter((p) => p.category === collection.slug).length}
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="bestsellers"
          className="mx-auto w-full max-w-7xl border-t border-[#1c0f0a]/10 px-4 py-8 sm:px-6 lg:px-8"
        >
          <h2 id="bestsellers" className="mb-8 font-display text-4xl">
            Bestsellers
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="brand-story"
          className="mx-auto grid w-full max-w-7xl gap-8 border-t border-[#1c0f0a]/10 px-4 py-18 sm:px-6 lg:grid-cols-2 lg:px-8"
        >
          <div className="relative min-h-96 overflow-hidden rounded-2xl">
            <Image
              src="/images/story-teaser.svg"
              alt="A roaster working carefully in the coffee lab"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9973a]">
              Our Story
            </p>
            <h2 id="brand-story" className="mt-3 font-display text-4xl">
              Built on craft, fueled by intention
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#1c0f0a]/75">
              Smalldose is rooted in thoughtful sourcing and careful roasting. We work
              closely with producing partners so each lot keeps its true character,
              from first crack to final brew.
            </p>
            <div className="mt-7">
              <Link
                href="/about"
                className="rounded-full bg-[#1c0f0a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition-colors hover:bg-[#2d1a13]"
              >
                Meet the Roasters
              </Link>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="testimonials"
          className="mx-auto w-full max-w-7xl border-t border-[#1c0f0a]/10 px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9973a]">
              Testimony
            </p>
            <h2 id="testimonials" className="mt-2 font-display text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <TestimonialSlider />
        </section>

        <section
          aria-labelledby="brew-guides"
          className="mx-auto w-full max-w-7xl border-t border-[#1c0f0a]/10 px-4 py-8 pb-18 sm:px-6 lg:px-8"
        >
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="brew-guides" className="font-display text-4xl">
              Brew Guides & Journal
            </h2>
            <Link
              href="/blog"
              className="text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#c9973a]"
            >
              Visit blog
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
