"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on narrow / coarse-pointer devices. Used to swap the heavy 3D
 * showroom for an elegant 2D fallback on phones.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${breakpoint}px), (pointer: coarse) and (max-width: 900px)`
    );
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
