"use client";

import * as THREE from "three";
import { useMemo } from "react";

/**
 * A stylised, matte couture mannequin — head, neck, shoulders and slender arms
 * emerging above a strapless bodice. Deliberately abstract (no facial features)
 * for an editorial, atelier feel. All primitive geometry, no assets.
 */
export function Mannequin({ tone = "#1b1820" }: { tone?: string }) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(tone),
        roughness: 0.55,
        metalness: 0.15,
        envMapIntensity: 0.6,
      }),
    [tone]
  );

  return (
    <group>
      {/* Torso core (mostly hidden by the bodice) */}
      <mesh material={material} position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.27, 0.3, 1.3, 24]} />
      </mesh>

      {/* Shoulders */}
      <mesh material={material} position={[0, 3.32, 0]} scale={[1, 0.5, 0.7]} castShadow>
        <sphereGeometry args={[0.32, 24, 18]} />
      </mesh>

      {/* Neck */}
      <mesh material={material} position={[0, 3.6, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.1, 0.32, 18]} />
      </mesh>

      {/* Head */}
      <mesh material={material} position={[0, 3.95, 0]} scale={[1, 1.25, 1]} castShadow>
        <sphereGeometry args={[0.17, 28, 24]} />
      </mesh>

      {/* Slender arms, resting close to the body */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          material={material}
          position={[side * 0.33, 2.85, 0.02]}
          rotation={[0, 0, side * 0.08]}
          castShadow
        >
          <capsuleGeometry args={[0.055, 1.0, 6, 12]} />
        </mesh>
      ))}
    </group>
  );
}
