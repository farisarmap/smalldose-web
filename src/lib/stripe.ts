import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set. Add it to your .env.local file.");
  }

  stripeClient = new Stripe(secretKey, {
    apiVersion: "2025-08-27.basil",
  });

  return stripeClient;
}
