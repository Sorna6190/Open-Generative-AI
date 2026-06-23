"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

/**
 * Apple-style scroll storytelling. Reads the normalized ScrollControls offset
 * and eases the camera through a sequence of keyframes:
 *   runway establishing → hero close-up → detail orbit → CTA pull-back.
 */

interface Keyframe {
  at: number; // scroll offset 0..1
  pos: [number, number, number];
  look: [number, number, number];
}

const KEYFRAMES: Keyframe[] = [
  { at: 0.0, pos: [0, 3.4, 9.5], look: [0, 2.4, 0] },
  { at: 0.3, pos: [2.6, 2.7, 4.2], look: [0, 2.3, 0] },
  { at: 0.55, pos: [-2.2, 2.4, 3.6], look: [0, 2.1, -0.2] },
  { at: 0.8, pos: [0, 2.8, 5.5], look: [0, 2.2, -3] },
  { at: 1.0, pos: [0, 4.2, 11], look: [0, 2.0, -4] },
];

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _tmpPos = new THREE.Vector3();
const _tmpLook = new THREE.Vector3();

function sample(offset: number, outPos: THREE.Vector3, outLook: THREE.Vector3) {
  const clamped = THREE.MathUtils.clamp(offset, 0, 1);
  let a = KEYFRAMES[0];
  let b = KEYFRAMES[KEYFRAMES.length - 1];
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (clamped >= KEYFRAMES[i].at && clamped <= KEYFRAMES[i + 1].at) {
      a = KEYFRAMES[i];
      b = KEYFRAMES[i + 1];
      break;
    }
  }
  const span = b.at - a.at || 1;
  const t = THREE.MathUtils.smoothstep((clamped - a.at) / span, 0, 1);
  outPos.fromArray(a.pos).lerp(_tmpPos.fromArray(b.pos), t);
  outLook.fromArray(a.look).lerp(_tmpLook.fromArray(b.look), t);
}

export function CinematicRig() {
  const scroll = useScroll();
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3(0, 2.4, 0));

  useFrame((_, delta) => {
    sample(scroll.offset, _pos, _look);
    const k = 1 - Math.pow(0.0015, delta); // frame-rate independent damping
    camera.position.lerp(_pos, k);
    lookTarget.current.lerp(_look, k);
    camera.lookAt(lookTarget.current);
  });

  return null;
}
