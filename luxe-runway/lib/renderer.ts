/**
 * Renderer capability detection.
 *
 * WebGPU support in React Three Fiber (three's WebGPURenderer) is still experimental
 * and inconsistent across browsers, so LUXE RUNWAY ships WebGL2 by default and only
 * opts into WebGPU when (a) the browser exposes `navigator.gpu` AND (b) the user has
 * explicitly enabled the flag in the UI store.
 *
 * The R3F <Canvas> here always uses the stable WebGL2 path; `webgpuAvailable()` is
 * surfaced in the UI so the WebGPU toggle is only shown on capable hardware. Wiring a
 * live WebGPURenderer is a drop-in extension point documented in the README.
 */

export function webgpuAvailable(): boolean {
  if (typeof navigator === "undefined") return false;
  return "gpu" in navigator && (navigator as Navigator & { gpu?: unknown }).gpu != null;
}

export function webgl2Available(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}
