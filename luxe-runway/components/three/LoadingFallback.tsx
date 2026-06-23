"use client";

import { Html, useProgress } from "@react-three/drei";

/** In-canvas loader shown via <Suspense> while geometry/materials compile. */
export function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-ivory">
        <div className="h-10 w-10 animate-spin rounded-full border border-champagne/30 border-t-champagne" />
        <p className="font-serif text-sm tracking-luxe text-champagne">
          {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

/** Full-bleed loader used by next/dynamic before the Canvas hydrates. */
export function SceneSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-noir">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border border-champagne/30 border-t-champagne" />
        <p className="font-serif text-xs tracking-luxe text-ivory-dim">
          PREPARING THE RUNWAY
        </p>
      </div>
    </div>
  );
}
