import Link from "next/link";
import { redirect } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getStripe } from "@/lib/stripe";

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) redirect("/shop");
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product", "customer_details"],
  });

  const lineItems = session.line_items?.data ?? [];
  const orderNumber = session.id.slice(-10).toUpperCase();
  const estimatedDelivery = new Date(
    (session.created + 7 * 24 * 60 * 60) * 1000,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-[#faf6ee] text-[#1c0f0a]">
      <Navbar alwaysSolid />
      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-[#1c0f0a]/10 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9973a]">
            Payment successful
          </p>
          <h1 className="mt-2 font-display text-5xl">Order Confirmed</h1>
          <p className="mt-3 text-sm text-[#1c0f0a]/65">Order number: {orderNumber}</p>

          <div className="mt-8 space-y-3">
            {lineItems.map((item) => {
              const product = item.price?.product;
              const productName =
                typeof product === "string" ? item.description || "Coffee" : product.name;
              const unitAmount = item.price?.unit_amount ?? 0;
              const quantity = item.quantity ?? 1;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-[#1c0f0a]/10 px-4 py-3"
                >
                  <p className="text-sm font-medium">{productName}</p>
                  <p className="text-sm text-[#1c0f0a]/70">
                    {quantity} x {formatIDR(unitAmount)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-[#1c0f0a]/10 bg-[#faf6ee] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1c0f0a]/65">Total paid</span>
              <span className="text-sm font-semibold">
                {formatIDR(session.amount_total ?? 0)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-[#1c0f0a]/65">Estimated delivery</span>
              <span className="text-sm font-semibold">{estimatedDelivery}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-full bg-[#1c0f0a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition-colors hover:bg-[#2d1a13]"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account"
              className="rounded-full border border-[#1c0f0a]/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1c0f0a] transition-colors hover:bg-[#1c0f0a]/5"
            >
              View Your Account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
