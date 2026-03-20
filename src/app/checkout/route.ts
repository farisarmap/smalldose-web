import { NextResponse } from "next/server";

import { getStripe } from "@/lib/stripe";

interface CheckoutItemPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
  selectedWeight?: string;
  selectedGrind?: string;
}

interface CheckoutPayload {
  items: CheckoutItemPayload[];
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const body = (await request.json()) as CheckoutPayload;
    const items = body.items ?? [];

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "idr",
          unit_amount: item.price,
          product_data: {
            name: item.name,
            metadata: {
              weight: item.selectedWeight ?? "",
              grind: item.selectedGrind ?? "",
            },
          },
        },
      })),
      metadata: {
        cart_item_count: String(items.length),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    console.error("Checkout session error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
