"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useGPUTier, QUALITY_PRESETS } from "@/hooks/useGPUTier";
import { ProductStage } from "@/scenes/ProductStage";
import { Effects } from "@/scenes/Effects";
import { CanvasLoader } from "./LoadingFallback";
import type { Product } from "@/lib/products";

/** Interactive 3D viewer: orbit, zoom, inspect fabric; color switches live. */
export function ProductViewer({
  product,
  colorIndex,
}: {
  product: Product;
  colorIndex: number;
}) {
  const quality = useGPUTier();
  const preset = QUALITY_PRESETS[quality];

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
      camera={{ position: [0, 2.6, 6], fov: 40, near: 0.1, far: 100 }}
      className="h-full w-full"
    >
      <fog attach="fog" args={["#07060a", 11, 30]} />
      <Suspense fallback={<CanvasLoader />}>
        <ProductStage
          product={product}
          colorIndex={colorIndex}
          reflective={quality === "high"}
          effects={preset.effects}
          shadowMapSize={preset.shadowMap}
        />
        {preset.effects && <Effects dof={false} />}
        <Preload all />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, 2.1, 0]}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.08}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
