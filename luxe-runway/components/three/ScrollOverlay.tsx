"use client";

import Link from "next/link";

/**
 * HTML storytelling that scrolls in lockstep with the 3D camera (Apple-style).
 * Rendered inside drei's <Scroll html>; each <section> is one full viewport page.
 */
export function ScrollOverlay() {
  return (
    <div className="w-screen text-ivory">
      {/* PAGE 1 — Hero */}
      <section className="flex h-screen w-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs tracking-luxe text-champagne/80">
          MAISON LUMEN × ATELIER VOILE
        </p>
        <h1 className="font-serif text-6xl leading-[0.95] sm:text-8xl">
          LUXE <span className="gold-text">RUNWAY</span>
        </h1>
        <p className="mt-6 max-w-md text-balance text-sm text-ivory-dim sm:text-base">
          Step onto the digital catwalk. Couture evening wear, rendered in real time.
        </p>
        <div className="mt-10 flex animate-bounce flex-col items-center text-champagne/70">
          <span className="text-[10px] tracking-luxe">SCROLL</span>
          <span className="mt-1 text-lg">↓</span>
        </div>
      </section>

      {/* PAGE 2 — Craft story */}
      <section className="flex h-screen w-screen items-center px-8 sm:px-20">
        <div className="max-w-sm">
          <p className="mb-4 text-xs tracking-luxe text-champagne/80">THE ATELIER</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Light, woven into <span className="gold-text">fabric</span>.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ivory-dim">
            Every gown is sculpted from physically-based silk, satin and velvet —
            materials that drink light and move with you. Rotate, inspect, and watch
            the cloth catch the runway spotlight.
          </p>
        </div>
      </section>

      {/* PAGE 3 — Detail */}
      <section className="flex h-screen w-screen items-center justify-end px-8 text-right sm:px-20">
        <div className="max-w-sm">
          <p className="mb-4 text-xs tracking-luxe text-champagne/80">RED CARPET READY</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            A silhouette for every <span className="gold-text">spotlight</span>.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ivory-dim">
            Mermaid, ballgown, column or A-line — switch colors in real time and find
            the gown that moves the room.
          </p>
        </div>
      </section>

      {/* PAGE 4 — CTA */}
      <section className="flex h-screen w-screen flex-col items-center justify-center px-6 text-center">
        <h2 className="font-serif text-5xl sm:text-7xl">
          Enter the <span className="gold-text">collection</span>
        </h2>
        <p className="mt-5 max-w-md text-sm text-ivory-dim">
          Eight couture gowns. Infinite ways to shine.
        </p>
        <Link
          href="/shop"
          className="pointer-events-auto mt-10 rounded-full border border-champagne/40 bg-champagne/10 px-10 py-4 text-xs tracking-luxe text-champagne transition-all duration-500 hover:bg-champagne hover:text-noir"
          style={{ transitionTimingFunction: "var(--ease-luxe)" }}
        >
          EXPLORE THE BOUTIQUE
        </Link>
      </section>
    </div>
  );
}
