import type { CurrencyCode } from "@/store/uiStore";

const IDR_TO_USD_RATE = 1 / 16000;

export function formatProductPrice(priceInIdr: number, currency: CurrencyCode): string {
  if (currency === "USD") {
    const usdValue = priceInIdr * IDR_TO_USD_RATE;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(usdValue);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInIdr);
}
