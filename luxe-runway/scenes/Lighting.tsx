"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

/**
 * Fashion-photography lighting rig:
 *   - two large RectAreaLight softboxes (warm key + cool fill)
 *   - a tight spotlight from above for runway drama + shadows
 *   - a champagne rim light to separate the gown from the dark backdrop
 *   - low ambient so the HDRI environment does the gentle fill
 */
export function Lighting({ shadowMapSize = 2048 }: { shadowMapSize?: number }) {
  const keySpot = useRef<THREE.SpotLight>(null);

  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, []);

  return (
    <>
      <ambientLight intensity={0.18} color="#f6f1e7" />
      <hemisphereLight args={["#cdb892", "#0a0810", 0.25]} />

      {/* Warm key softbox, front-left */}
      <rectAreaLight
        intensity={6}
        width={6}
        height={9}
        color="#ffe9c4"
        position={[-5, 6, 6]}
        rotation={[-0.4, -0.6, 0]}
      />

      {/* Cool fill softbox, front-right */}
      <rectAreaLight
        intensity={3.2}
        width={5}
        height={8}
        color="#cfe0ff"
        position={[5.5, 5, 5]}
        rotation={[-0.35, 0.7, 0]}
      />

      {/* Dramatic top spotlight casting the runway shadow */}
      <spotLight
        ref={keySpot}
        position={[0, 11, 2.5]}
        angle={0.5}
        penumbra={0.85}
        intensity={140}
        distance={40}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={30}
      />

      {/* Champagne rim from behind */}
      <spotLight
        position={[0, 5, -7]}
        angle={0.8}
        penumbra={1}
        intensity={90}
        distance={30}
        color="#c8a45d"
      />
    </>
  );
}
