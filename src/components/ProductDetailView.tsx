"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { formatProductPrice } from "@/lib/currency";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import type { Product } from "@/types";

interface ProductDetailViewProps {
  product: Product;
}

const noteIcons: Record<string, string> = {
  citrus: "🍋",
  floral: "🌸",
  honey: "🍯",
  bergamot: "🍋",
  jasmine: "🌸",
  apricot: "🍑",
  cacao: "🍫",
  caramel: "🍬",
  cherry: "🍒",
};

function getNoteIcon(note: string): string {
  const key = note.toLowerCase().split(" ")[0];
  return noteIcons[key] ?? "✨";
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const currency = useUIStore((state) => state.currency);
  const addItem = useCartStore((state) => state.addItem);

  const fallbackGallery = useMemo(
    () => [
      "/images/product-geisha.svg",
      "/images/product-ethiopia.svg",
      "/images/product-colombia.svg",
      "/images/product-gear.svg",
      "/images/hero-coffee.svg",
      "/images/story-teaser.svg",
    ],
    [],
  );

  const galleryImages = useMemo(() => {
    const merged = [...product.images, ...fallbackGallery];
    return Array.from(new Set(merged)).slice(0, 6);
  }, [fallbackGallery, product.images]);

  const [mainImage, setMainImage] = useState(galleryImages[0]);
  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions?.[0] ?? "250g",
  );
  const [selectedGrind, setSelectedGrind] = useState(
    product.grindOptions?.[0] ?? "Whole Bean",
  );
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const producerLine = [product.producer, product.harvest]
    .filter(Boolean)
    .join(" · ");

  const notes = product.tastingNotes ?? ["Citrus", "Floral", "Honey"];
  const weightOptions = product.weightOptions ?? ["250g", "500g", "1kg"];
  const grindOptions =
    product.grindOptions ?? ["Whole Bean", "Espresso", "Filter", "French Press"];

  return (
    <section className="grid gap-10 lg:grid-cols-[3fr_2fr]">
      <div>
        <div className="group relative aspect-square overflow-hidden rounded-2xl border border-[#C8D9E8] bg-white">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#1c0f0a]/0 transition duration-300 ease-out group-hover:bg-[#1c0f0a]/40" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {galleryImages.map((image) => (
            <button
              key={image}
              type="button"
              aria-label={`View product image ${image}`}
              onClick={() => setMainImage(image)}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                mainImage === image
                  ? "border-[#1E6FAD]"
                  : "border-[#C8D9E8] hover:border-[#1E6FAD]"
              }`}
            >
              <Image src={image} alt={product.name} fill className="object-cover" sizes="20vw" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <nav aria-label="Breadcrumb" className="text-sm text-[#5A7A96]">
          <Link href="/" className="hover:text-[#1E6FAD]">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link href="/shop" className="hover:text-[#1E6FAD]">
            Shop
          </Link>{" "}
          &gt;{" "}
          <span>{product.category.replace("-", " ")}</span>
        </nav>

        <p className="mt-4 inline-flex rounded-full bg-[#faf6ee] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1c0f0a]/75">
          Single Origin · {product.origin ?? "Mixed Origin"}
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-[#1c0f0a]">{product.name}</h1>
        <p className="mt-2 text-sm text-[#1c0f0a]/60">{producerLine || "Producer details pending"}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-[#1c0f0a]/10 bg-white px-3 py-1 text-xs text-[#1c0f0a]"
            >
              {getNoteIcon(note)} {note}
            </span>
          ))}
        </div>

        <p className="mt-6 text-3xl font-semibold text-[#0D1B2E]">
          {formatProductPrice(product.price, currency)}
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1c0f0a]/60">
              Weight / Size
            </p>
            <div className="flex flex-wrap gap-2">
              {weightOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedWeight(option)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedWeight === option
                      ? "border-[#1c0f0a] bg-[#1c0f0a] text-[#faf6ee]"
                      : "border-[#1c0f0a]/15 text-[#1c0f0a] hover:border-[#1c0f0a]/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1c0f0a]/60">
              Grind
            </p>
            <div className="flex flex-wrap gap-2">
              {grindOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedGrind(option)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedGrind === option
                      ? "border-[#1c0f0a] bg-[#1c0f0a] text-[#faf6ee]"
                      : "border-[#1c0f0a]/15 text-[#1c0f0a] hover:border-[#1c0f0a]/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-[#1c0f0a]/15">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-sm"
              >
                -
              </button>
              <span className="px-3 text-sm font-medium">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                addItem(product, {
                  quantity,
                  selectedWeight,
                  selectedGrind,
                });
              }}
              className="rounded-full bg-[#1c0f0a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition-colors hover:bg-[#2d1a13]"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => setWishlisted((prev) => !prev)}
              className={`rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                wishlisted
                  ? "border-[#c9973a] bg-[#c9973a]/15 text-[#1c0f0a]"
                  : "border-[#1c0f0a]/20 text-[#1c0f0a] hover:border-[#1c0f0a]/40"
              }`}
            >
              {wishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        </div>

        <p className="mt-5 text-sm text-[#1c0f0a]/65">
          Free worldwide shipping on orders over $75
        </p>
      </div>
    </section>
  );
}
