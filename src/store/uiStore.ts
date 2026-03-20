import { create } from "zustand";

export type CurrencyCode = "IDR" | "USD";

interface UIState {
  currency: CurrencyCode;
  isCartOpen: boolean;
  setCurrency: (currency: CurrencyCode) => void;
  toggleCurrency: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currency: "IDR",
  isCartOpen: false,
  setCurrency: (currency) => set({ currency }),
  toggleCurrency: () =>
    set((state) => ({ currency: state.currency === "IDR" ? "USD" : "IDR" })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
