"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  colorName: string;
  colorHex: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product, colorIndex?: number) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

/** A cart line is keyed by product + chosen color, so two colors of the same gown stack separately. */
function lineId(productId: string, colorName: string): string {
  return `${productId}::${colorName}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, colorIndex = 0) => {
        const color = product.colors[colorIndex] ?? product.colors[0];
        const id = lineId(product.id, color.name);
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                colorName: color.name,
                colorHex: color.hex,
                qty: 1,
              },
            ],
          };
        });
      },

      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      setQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i))
            .filter((i) => i.qty > 0),
        })),

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((n, i) => n + i.qty, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: "luxe-runway-cart" }
  )
);
