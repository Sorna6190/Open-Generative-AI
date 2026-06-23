"use client";

import { ContactShadows } from "@react-three/drei";
import type { Product } from "@/lib/products";
import { StudioEnvironment, RunwayFloor } from "./RunwayScene";
import { Mannequin } from "./Mannequin";
import { Dress } from "./Dress";
import { Lighting } from "./Lighting";

/**
 * Inspection stage for a single gown on the product page. The camera is driven
 * by OrbitControls (set up in the Canvas wrapper); color variants switch live
 * via the `colorIndex` prop.
 */
export function ProductStage({
  product,
  colorIndex,
  reflective = true,
  effects = true,
  shadowMapSize = 2048,
}: {
  product: Product;
  colorIndex: number;
  reflective?: boolean;
  effects?: boolean;
  shadowMapSize?: number;
}) {
  const color = product.colors[colorIndex] ?? product.colors[0];

  return (
    <group>
      <StudioEnvironment />
      <Lighting shadowMapSize={shadowMapSize} />
      <RunwayFloor reflective={reflective && effects} />

      {/* podium */}
      <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.45, 1.6, 0.1, 48]} />
        <meshStandardMaterial color="#14121a" roughness={0.35} metalness={0.75} />
      </mesh>

      <group position={[0, 0.1, 0]}>
        <Mannequin />
        <Dress
          fabric={product.fabric}
          silhouette={product.silhouette}
          color={color.hex}
          accent={color.accent}
          sway
        />
      </group>

      <ContactShadows
        position={[0, 0.11, 0]}
        opacity={0.55}
        scale={9}
        blur={2.4}
        far={6}
        resolution={effects ? 512 : 256}
        color="#000000"
      />
    </group>
  );
}
