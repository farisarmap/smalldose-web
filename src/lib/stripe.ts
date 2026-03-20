import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set. Add it to your .env.local file.");
  }

  // Use Stripe SDK default pinned API version to avoid TS literal mismatch.
  stripeClient = new Stripe(secretKey);

  return stripeClient;
}
