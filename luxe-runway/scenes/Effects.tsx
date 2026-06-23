"use client";

import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  SMAA,
  BrightnessContrast,
} from "@react-three/postprocessing";

/**
 * Cinematic post stack. Enabled only on medium/high quality tiers (see useGPUTier).
 *  - Bloom        → soft glow on highlights / champagne sheen
 *  - DepthOfField → camera-style focus falloff for product close-ups
 *  - Vignette     → editorial darkened edges
 *  - SMAA         → clean anti-aliasing
 */
export function Effects({ dof = true }: { dof?: boolean }) {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.65}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.25}
        mipmapBlur
        radius={0.7}
      />
      {dof ? (
        <DepthOfField
          focusDistance={0.012}
          focalLength={0.045}
          bokehScale={3.5}
          height={480}
        />
      ) : (
        <></>
      )}
      <BrightnessContrast brightness={0.0} contrast={0.08} />
      <Vignette eskil={false} offset={0.28} darkness={0.78} />
      <SMAA />
    </EffectComposer>
  );
}
