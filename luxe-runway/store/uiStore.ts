"use client";

import { create } from "zustand";

export type QualityLevel = "low" | "medium" | "high";

interface UIState {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  /** Increments each time an item is added — drives the cart-button "pop" animation. */
  cartPulse: number;
  pulseCart: () => void;

  /** Adaptive render quality, set once by the GPU tier detector. */
  quality: QualityLevel;
  setQuality: (q: QualityLevel) => void;

  /** User-controlled opt-in for the experimental WebGPU path. */
  webgpuEnabled: boolean;
  setWebgpu: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),

  cartPulse: 0,
  pulseCart: () => set((s) => ({ cartPulse: s.cartPulse + 1 })),

  quality: "high",
  setQuality: (quality) => set({ quality }),

  webgpuEnabled: false,
  setWebgpu: (webgpuEnabled) => set({ webgpuEnabled }),
}));
