"use client";

import { useCallback } from "react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import type { Product } from "@/lib/products";

/**
 * Adds a product (with chosen color) to the cart and fires the cart-button
 * pulse animation. Centralised so every "add to cart" affordance behaves
 * identically across the product grid, viewer and recommendations.
 */
export function useAddToCart() {
  const add = useCartStore((s) => s.add);
  const pulseCart = useUIStore((s) => s.pulseCart);

  return useCallback(
    (product: Product, colorIndex = 0) => {
      add(product, colorIndex);
      pulseCart();
    },
    [add, pulseCart]
  );
}
