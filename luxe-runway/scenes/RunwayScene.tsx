"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshReflectorMaterial, Float } from "@react-three/drei";
import type { Product } from "@/lib/products";
import { Dress } from "./Dress";
import { Mannequin } from "./Mannequin";

/**
 * Procedural studio environment — reflections are generated in-engine from
 * Lightformers (NO HDRI download), so the showroom works fully offline.
 */
export function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#07060a"]} />
      {/* Large soft key */}
      <Lightformer
        intensity={3}
        color="#ffe9c4"
        position={[-5, 6, 6]}
        rotation={[0, Math.PI / 3, 0]}
        scale={[10, 12, 1]}
      />
      {/* Cool fill */}
      <Lightformer
        intensity={1.4}
        color="#cfe0ff"
        position={[6, 4, 5]}
        rotation={[0, -Math.PI / 3, 0]}
        scale={[8, 10, 1]}
      />
      {/* Champagne rim ring behind */}
      <Lightformer
        form="ring"
        intensity={2}
        color="#c8a45d"
        position={[0, 5, -8]}
        scale={[6, 6, 1]}
      />
      <Lightformer intensity={0.6} color="#ffffff" position={[0, 10, 0]} scale={[12, 12, 1]} />
    </Environment>
  );
}

/** Polished runway floor with subtle real-time reflections. */
export function RunwayFloor({ reflective = true }: { reflective?: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      {reflective ? (
        <MeshReflectorMaterial
          resolution={1024}
          mixBlur={1}
          mixStrength={18}
          roughness={0.85}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#0a0810"
          metalness={0.6}
          mirror={0.45}
        />
      ) : (
        <meshStandardMaterial color="#0a0810" roughness={0.7} metalness={0.4} />
      )}
    </mesh>
  );
}

/** A single dress + mannequin on a slow turntable. */
export function DressStand({
  product,
  colorIndex = 0,
  position = [0, 0, 0],
  spin = true,
  sway = true,
  onSelect,
}: {
  product: Product;
  colorIndex?: number;
  position?: [number, number, number];
  spin?: boolean;
  sway?: boolean;
  onSelect?: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const color = product.colors[colorIndex] ?? product.colors[0];

  useFrame((_, delta) => {
    if (spin && group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group position={position}>
      {/* podium */}
      <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.4, 1.55, 0.1, 48]} />
        <meshStandardMaterial color="#14121a" roughness={0.4} metalness={0.7} />
      </mesh>
      <group ref={group} onPointerDown={onSelect}>
        <Mannequin />
        <Dress
          fabric={product.fabric}
          silhouette={product.silhouette}
          color={color.hex}
          accent={color.accent}
          sway={sway}
        />
      </group>
    </group>
  );
}

/**
 * The full home-page runway: a line of featured gowns receding down the catwalk.
 */
export function RunwayShowroom({
  products,
  reflective = true,
  sway = true,
  onSelect,
}: {
  products: Product[];
  reflective?: boolean;
  sway?: boolean;
  onSelect?: (slug: string) => void;
}) {
  return (
    <group>
      <StudioEnvironment />
      <RunwayFloor reflective={reflective} />

      {products.map((product, i) => (
        <Float
          key={product.id}
          speed={1}
          rotationIntensity={0}
          floatIntensity={0.25}
          floatingRange={[0, 0.06]}
        >
          <DressStand
            product={product}
            position={[0, 0, -i * 6]}
            spin
            sway={sway}
            onSelect={() => onSelect?.(product.slug)}
          />
        </Float>
      ))}

      {/* runway carpet strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, -((products.length - 1) * 6) / 2]}>
        <planeGeometry args={[3.2, products.length * 6 + 6]} />
        <meshStandardMaterial color="#1a0a12" roughness={0.6} metalness={0.2} emissive="#2a0d18" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}
