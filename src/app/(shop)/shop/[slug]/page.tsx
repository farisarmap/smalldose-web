import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailView } from "@/components/ProductDetailView";
import { ProductTabs } from "@/components/ProductTabs";
import { products } from "@/data/products";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Smalldose",
      description: "The requested product could not be found.",
    };
  }

  const tastingLine = product.tastingNotes?.join(", ") ?? "specialty coffee";
  return {
    title: `${product.name} | ${product.origin ?? "Single Origin"} | Smalldose`,
    description: `${product.name} from ${product.origin ?? "origin"} with notes of ${tastingLine}.`,
    openGraph: {
      title: `${product.name} | Smalldose`,
      description: `${product.origin ?? "Single Origin"} · ${tastingLine}`,
      images: [{ url: product.images[0] }],
    },
  };
}

function MetaItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex min-h-20 flex-col items-center justify-center px-3 py-2 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1c0f0a]/55">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-medium text-[#1c0f0a]">{value || "-"}</p>
    </div>
  );
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductDetailView product={product} />

        <section className="mt-10 border-y border-[#1c0f0a]/10 py-5">
          <div className="grid grid-cols-2 divide-x divide-[#1c0f0a]/10 sm:grid-cols-4">
            <MetaItem label="Origin" value={product.origin} />
            <MetaItem label="Process" value={product.processingMethod} />
            <MetaItem label="Variety" value={product.variety} />
            <MetaItem label="Elevation" value={product.elevation} />
          </div>
        </section>

        <ProductTabs product={product} />

        <section className="mt-14 border-t border-[#1c0f0a]/10 pt-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-4xl text-[#1c0f0a]">You May Also Like</h2>
            <Link
              href="/shop"
              className="text-sm font-semibold uppercase tracking-wide text-[#1c0f0a]/60 transition-colors hover:text-[#c9973a]"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
