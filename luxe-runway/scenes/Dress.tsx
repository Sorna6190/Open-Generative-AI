"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Fabric, Silhouette } from "@/lib/products";
import { fabricParams } from "./FabricMaterial";

/**
 * Fully procedural couture gown. The silhouette is a revolved (lathe) profile —
 * bodice + skirt in a single mesh — and the skirt is animated with a GPU vertex
 * sway injected via onBeforeCompile, so cloth-like movement costs ~zero CPU.
 *
 * No external assets: geometry + PBR fabric material are generated from the
 * product's `silhouette`, `fabric` and chosen color in real time.
 */

const WAIST_Y = 2.0;
const TOP_Y = 3.25;

/** Skirt radius as a function of t (0 = hem, 1 = waist) for each silhouette. */
function skirtRadius(silhouette: Silhouette, t: number): number {
  const inv = 1 - t; // 1 at hem, 0 at waist
  switch (silhouette) {
    case "sheath":
      return 0.33 + 0.1 * Math.pow(inv, 3);
    case "aline":
      return 0.33 + 0.62 * inv;
    case "ballgown":
      return 0.34 + 1.15 * Math.pow(inv, 1.7);
    case "empire":
      return 0.34 + 0.42 * inv;
    case "mermaid": {
      const kneeT = 0.42;
      if (t >= kneeT) {
        // knee → waist: hugging, slim
        return 0.29 + 0.04 * ((t - kneeT) / (1 - kneeT));
      }
      // hem → knee: dramatic fishtail flare
      const k = (kneeT - t) / kneeT;
      return 0.29 + 0.78 * Math.pow(k, 1.4);
    }
    default:
      return 0.33 + 0.5 * inv;
  }
}

function buildProfile(silhouette: Silhouette): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];

  // Skirt: hem (y=0) up to waist (y=WAIST_Y)
  const skirtSteps = 56;
  for (let i = 0; i <= skirtSteps; i++) {
    const t = i / skirtSteps;
    const r = skirtRadius(silhouette, t);
    pts.push(new THREE.Vector2(Math.max(r, 0.02), t * WAIST_Y));
  }

  // Bodice: waist up to a sweetheart neckline. Cinch at waist, gentle bust, strapless top.
  const bodice: Array<[number, number]> = [
    [0.3, WAIST_Y + 0.05],
    [0.31, WAIST_Y + 0.18],
    [0.33, WAIST_Y + 0.42],
    [0.335, WAIST_Y + 0.7],
    [0.31, WAIST_Y + 0.95],
    [0.28, TOP_Y],
  ];
  for (const [r, y] of bodice) pts.push(new THREE.Vector2(r, y));

  return pts;
}

interface DressProps {
  fabric: Fabric;
  silhouette: Silhouette;
  color: string;
  accent?: string;
  sway?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onPointerDown?: () => void;
}

export function Dress({
  fabric,
  silhouette,
  color,
  accent,
  sway = true,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  onPointerDown,
}: DressProps) {
  const shaderRef = useRef<{ uniforms: { uTime: { value: number }; uSway: { value: number } } } | null>(null);

  const geometry = useMemo(() => {
    const profile = buildProfile(silhouette);
    const geo = new THREE.LatheGeometry(profile, 96);
    geo.computeVertexNormals();
    return geo;
  }, [silhouette]);

  const material = useMemo(() => {
    const params = fabricParams(fabric, color, accent);
    const mat = new THREE.MeshPhysicalMaterial({ ...params, side: THREE.DoubleSide });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uSway = { value: sway ? 0.09 : 0 };
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
           uniform float uTime;
           uniform float uSway;`
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           float hgt = clamp(transformed.y / ${WAIST_Y.toFixed(2)}, 0.0, 1.0);
           float fall = pow(1.0 - hgt, 1.5);
           float amt = fall * uSway;
           transformed.x += sin(uTime * 1.3 + transformed.y * 1.6 + transformed.z * 2.0) * amt;
           transformed.z += cos(uTime * 1.05 + transformed.y * 1.3 + transformed.x * 2.0) * amt;`
        );
      shaderRef.current = shader as unknown as typeof shaderRef.current;
    };
    mat.customProgramCacheKey = () => `dress-${fabric}-${sway}`;
    return mat;
  }, [fabric, color, accent, sway]);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
      onPointerDown={onPointerDown}
    />
  );
}
