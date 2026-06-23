"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { useGPUTier, QUALITY_PRESETS } from "@/hooks/useGPUTier";
import { getFeatured } from "@/lib/products";
import { RunwayShowroom } from "@/scenes/RunwayScene";
import { Lighting } from "@/scenes/Lighting";
import { Particles } from "@/scenes/Particles";
import { Effects } from "@/scenes/Effects";
import { CinematicRig } from "@/scenes/CinematicRig";
import { CanvasLoader } from "./LoadingFallback";
import { ScrollOverlay } from "./ScrollOverlay";

/**
 * The home-page WebGL stage: a cinematic, scroll-driven runway showroom.
 * Quality (DPR, shadows, post-processing, particle count) adapts to the device
 * via useGPUTier. WebGL2 is the stable default renderer.
 */
export function RunwayCanvas() {
  const quality = useGPUTier();
  const preset = QUALITY_PRESETS[quality];
  const router = useRouter();
  const featured = getFeatured();

  return (
    <Canvas
      shadows
      dpr={preset.dpr}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0, 3.4, 9.5], fov: 42, near: 0.1, far: 100 }}
      className="!fixed inset-0 h-screen w-screen"
    >
      <fog attach="fog" args={["#07060a", 9, 26]} />

      <Suspense fallback={<CanvasLoader />}>
        <ScrollControls pages={4} damping={0.28}>
          <CinematicRig />

          <Lighting shadowMapSize={preset.shadowMap} />
          <RunwayShowroom
            products={featured}
            reflective={quality === "high"}
            sway={quality !== "low"}
            onSelect={(slug) => router.push(`/product/${slug}`)}
          />
          <Particles count={preset.particles} />

          {preset.effects && <Effects dof={quality === "high"} />}

          {/* HTML storytelling layer, scrolls in sync with the 3D camera */}
          <Scroll html>
            <ScrollOverlay />
          </Scroll>
        </ScrollControls>
        <Preload all />
      </Suspense>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
