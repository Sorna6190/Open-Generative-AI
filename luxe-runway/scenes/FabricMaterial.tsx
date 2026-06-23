"use client";

import * as THREE from "three";
import { useMemo } from "react";
import type { Fabric } from "@/lib/products";

/**
 * PBR material profiles approximating luxury fabrics using MeshPhysicalMaterial:
 *  - silk   → high sheen, low roughness, soft anisotropic highlight
 *  - satin  → mirror-like clearcoat, very low roughness, strong specular
 *  - velvet → light-drinking, high roughness + sheen for the fuzzy back-scatter
 *
 * These are real materials (not placeholders) — they respond to the runway HDRI
 * and spotlights to read as silk/satin/velvet without any texture downloads.
 */

interface FabricProps {
  fabric: Fabric;
  color: string;
  accent?: string;
}

export function fabricParams(fabric: Fabric, color: string, accent?: string) {
  const base = new THREE.Color(color);
  const sheenColor = new THREE.Color(accent ?? color).lerp(new THREE.Color("#ffffff"), 0.4);

  switch (fabric) {
    case "satin":
      return {
        color: base,
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 0.9,
        clearcoatRoughness: 0.12,
        sheen: 0.4,
        sheenRoughness: 0.3,
        sheenColor,
        reflectivity: 0.6,
        envMapIntensity: 1.35,
      };
    case "velvet":
      return {
        color: base,
        roughness: 0.92,
        metalness: 0.0,
        clearcoat: 0.0,
        sheen: 1.0,
        sheenRoughness: 0.85,
        sheenColor,
        reflectivity: 0.15,
        envMapIntensity: 0.55,
      };
    case "silk":
    default:
      return {
        color: base,
        roughness: 0.32,
        metalness: 0.02,
        clearcoat: 0.45,
        clearcoatRoughness: 0.35,
        sheen: 0.7,
        sheenRoughness: 0.45,
        sheenColor,
        reflectivity: 0.5,
        envMapIntensity: 1.0,
      };
  }
}

/** Declarative material for use inside a mesh. Memoised on its inputs. */
export function FabricMaterial({ fabric, color, accent }: FabricProps) {
  const params = useMemo(() => fabricParams(fabric, color, accent), [fabric, color, accent]);
  return <meshPhysicalMaterial {...params} side={THREE.DoubleSide} />;
}
