"use client";

import Image from "next/image";
import { useState } from "react";

import { formatProductPrice } from "@/lib/currency";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

export function CartDrawer() {
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const closeCart = useUIStore((state) => state.closeCart);
  const currency = useUIStore((state) => state.currency);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  const shippingEstimate = total >= 1200000 ? 0 : 50000;
  const grandTotal = total + shippingEstimate;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsLoadingCheckout(true);

    try {
      const response = await fetch("/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Unable to create checkout session");
      setIsLoadingCheckout(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-60 bg-black/50 transition-opacity ${
          isCartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />
      <aside
        aria-label="Cart drawer"
        className={`fixed right-0 top-0 z-70 flex h-dvh w-full max-w-md flex-col border-l border-[#1c0f0a]/10 bg-[#faf6ee] shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-[#1c0f0a]/10 px-5 py-4">
          <h2 className="font-display text-3xl text-[#1c0f0a]">Your Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full border border-[#1c0f0a]/20 px-3 py-1 text-sm hover:bg-[#1c0f0a]/5"
          >
            Close
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#1c0f0a]/20 p-6 text-center text-sm text-[#1c0f0a]/60">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <article
                key={`${item.id}-${item.selectedWeight ?? "default"}-${item.selectedGrind ?? "default"}`}
                className="grid grid-cols-[84px_1fr] gap-3 rounded-2xl border border-[#1c0f0a]/10 bg-white p-3"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="84px"
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-display text-xl leading-tight text-[#1c0f0a]">{item.name}</p>
                  <p className="text-xs text-[#1c0f0a]/60">
                    {item.selectedWeight ?? "-"} · {item.selectedGrind ?? "-"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-[#1c0f0a]/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-2 py-1 text-xs"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-2 py-1 text-xs"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-[#1c0f0a]">
                      {formatProductPrice(item.price * item.quantity, currency)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-semibold uppercase tracking-wide text-[#1c0f0a]/60 hover:text-[#1c0f0a]"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className="space-y-4 border-t border-[#1c0f0a]/10 p-5">
          <div className="space-y-2 rounded-2xl border border-[#1c0f0a]/10 bg-white p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#1c0f0a]/65">Subtotal</span>
              <span className="font-medium">{formatProductPrice(total, currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#1c0f0a]/65">Shipping estimate</span>
              <span className="font-medium">
                {shippingEstimate === 0 ? "Free" : formatProductPrice(shippingEstimate, currency)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[#1c0f0a]/10 pt-2 font-semibold">
              <span>Total</span>
              <span>{formatProductPrice(grandTotal, currency)}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={items.length === 0 || isLoadingCheckout}
            onClick={handleCheckout}
            className="w-full rounded-full bg-[#1c0f0a] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#faf6ee] transition-colors hover:bg-[#2d1a13] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoadingCheckout ? "Preparing checkout..." : "Checkout"}
          </button>
          <button
            type="button"
            onClick={closeCart}
            className="w-full rounded-full border border-[#1c0f0a]/20 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#1c0f0a] transition-colors hover:bg-[#1c0f0a]/5"
          >
            Continue Shopping
          </button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-center text-xs font-semibold uppercase tracking-wide text-[#1c0f0a]/60 hover:text-[#1c0f0a]"
            >
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
