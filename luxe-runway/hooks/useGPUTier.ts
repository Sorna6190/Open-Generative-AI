"use client";

import { useEffect } from "react";
import { useUIStore, type QualityLevel } from "@/store/uiStore";
import { webgl2Available } from "@/lib/renderer";

/**
 * Lightweight, dependency-free GPU/device tiering. Inspects core count, device
 * memory and the WebGL renderer string to pick an adaptive quality level that
 * drives DPR, shadow resolution, post-processing and particle counts.
 *
 * Runs once on mount and writes the result into the UI store.
 */
export function useGPUTier(): QualityLevel {
  const quality = useUIStore((s) => s.quality);
  const setQuality = useUIStore((s) => s.setQuality);

  useEffect(() => {
    let level: QualityLevel = "high";

    const cores = navigator.hardwareConcurrency ?? 4;
    // deviceMemory is non-standard but widely available on Chromium.
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

    let renderer = "";
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) {
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        if (dbg) renderer = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) ?? "");
      }
    } catch {
      /* ignore */
    }

    const lowGpu = /(intel|swiftshader|llvmpipe|mali-4|adreno 3|powervr)/i.test(renderer);

    if (!webgl2Available() || cores <= 2 || memory <= 2) {
      level = "low";
    } else if (lowGpu || cores <= 4 || memory <= 4) {
      level = "medium";
    } else {
      level = "high";
    }

    setQuality(level);
  }, [setQuality]);

  return quality;
}

/** Per-quality knobs consumed by the scene + effects. */
export const QUALITY_PRESETS: Record<
  QualityLevel,
  { dpr: [number, number]; shadowMap: number; effects: boolean; particles: number }
> = {
  low: { dpr: [1, 1], shadowMap: 512, effects: false, particles: 120 },
  medium: { dpr: [1, 1.5], shadowMap: 1024, effects: true, particles: 350 },
  high: { dpr: [1, 2], shadowMap: 2048, effects: true, particles: 700 },
};
