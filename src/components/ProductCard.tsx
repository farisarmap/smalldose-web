"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { formatProductPrice } from "@/lib/currency";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const currency = useUIStore((state) => state.currency);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1c0f0a]/10 bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-0.5"
      role="button"
      tabIndex={0}
      aria-label={`Open ${product.name}`}
      onClick={() => router.push(`/shop/${product.slug}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(`/shop/${product.slug}`);
        }
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-300 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#1c0f0a]/0 transition duration-300 ease-out group-hover:bg-[#1c0f0a]/40" />
        <button
          type="button"
          aria-label={`Quick view ${product.name}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white opacity-0 transition duration-300 ease-out group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/shop/${product.slug}`);
          }}
        >
          Quick View
        </button>
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#faf6ee] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#1c0f0a]/75">
            {product.origin ?? product.category.replace("-", " ")}
          </span>
          <span className="text-sm font-semibold text-[#1c0f0a]">
            {formatProductPrice(product.price, currency)}
          </span>
        </div>
        <h3 className="font-display text-2xl text-[#1c0f0a]">{product.name}</h3>
        <p className="line-clamp-2 text-xs italic leading-relaxed text-[#1c0f0a]/70">
          {product.tastingNotes?.join(", ") ?? product.description}
        </p>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          className="mt-auto w-full translate-y-4 rounded-full bg-[#1c0f0a] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#faf6ee] opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#2d1a13]"
          onClick={(event) => {
            event.stopPropagation();
            addItem(product, { quantity: 1 });
          }}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
