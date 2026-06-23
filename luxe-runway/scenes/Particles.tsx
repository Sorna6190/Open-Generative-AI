"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/** Soft drifting dust / sparkle motes for a luxe atmospheric haze. */
export function Particles({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Deterministic-ish scatter (no Math.random dependency on SSR) using a hash.
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const b = Math.sin(i * 78.233) * 43758.5453;
      const c = Math.sin(i * 39.425) * 43758.5453;
      const fx = a - Math.floor(a);
      const fy = b - Math.floor(b);
      const fz = c - Math.floor(c);
      positions[i * 3] = (fx - 0.5) * 16;
      positions[i * 3 + 1] = fy * 9;
      positions[i * 3 + 2] = (fz - 0.5) * 14;
      speeds[i] = 0.05 + fy * 0.12;
    }
    return { positions, speeds };
  }, [count]);

  const sprite = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,244,224,0.9)");
    g.addColorStop(0.3, "rgba(200,164,93,0.5)");
    g.addColorStop(1, "rgba(200,164,93,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = 0;
      // gentle lateral drift
      arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.2 + i) * delta * 0.02;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={sprite}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
