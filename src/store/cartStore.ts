import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem, Product } from "@/types";

interface AddItemOptions {
  quantity?: number;
  selectedWeight?: string;
  selectedGrind?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (product: Product, options?: AddItemOptions) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

function calculateTotals(items: CartItem[]) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      addItem: (product, options) => {
        const quantityToAdd = Math.max(1, options?.quantity ?? 1);
        const selectedWeight = options?.selectedWeight;
        const selectedGrind = options?.selectedGrind;
        const items = get().items;

        const existing = items.find(
          (item) =>
            item.id === product.id &&
            item.selectedWeight === selectedWeight &&
            item.selectedGrind === selectedGrind,
        );

        let nextItems: CartItem[];

        if (existing) {
          nextItems = items.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + quantityToAdd } : item,
          );
        } else {
          nextItems = [
            ...items,
            {
              ...product,
              quantity: quantityToAdd,
              selectedWeight,
              selectedGrind,
            },
          ];
        }

        set({ items: nextItems, ...calculateTotals(nextItems) });
      },
      removeItem: (productId) =>
        set((state) => {
          const nextItems = state.items.filter((item) => item.id !== productId);
          return { items: nextItems, ...calculateTotals(nextItems) };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const nextItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
          );
          return { items: nextItems, ...calculateTotals(nextItems) };
        }),
      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    {
      name: "smalldose-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    },
  ),
);
