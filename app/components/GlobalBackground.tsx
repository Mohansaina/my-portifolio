"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../lib/motion";

/**
 * Premium Operating System Global Background Engine.
 *
 * Architecture & Atmosphere:
 * 1. Base Graphite/Charcoal Canvas (`#0b0c0e`)
 * 2. Top-Center Studio & Hero Ambient Glow (Key illumination behind headline)
 * 3. Low-Opacity Drifting Ambient Mesh Blobs (Slow GPU animated movement)
 * 4. Fine Dot Raster Matrix (48px spatial grid)
 * 5. Soft Studio Edge Vignette (Natural falloff)
 * 6. Subtle Interactive Spotlight (Lerped pointer illumination)
 * 7. Ultra-Light Tactile Film Grain (1.8% SVG noise layer)
 */
export const GlobalBackground: React.FC = () => {
  const auraRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animId: number | null = null;

    const render = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      currentX += dx * 0.05;
      currentY += dy * 0.05;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (animId === null) {
        animId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      startLoop();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    startLoop();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden
      className="os-background-canvas"
    >
      {/* 1. Top-Center Studio & Hero Focal Glow
             On its own parallax layer: the canvas is position: fixed, so
             without this the backdrop has no relationship to scrolling at
             all. The drift sits on the wrapper because the glow already
             uses transform to centre itself, and a second animation on the
             same property would override that rather than compose with it. */}
      <div className="bg-drift absolute inset-0">
        <div className="os-hero-glow" />
      </div>

      {/* The key light walks the set as you scroll, rather than the page
          sliding past a fixed lamp. This is the jewelry-photography model the
          whole palette is built on, made literal — and because every `.lit`
          edge, top highlight and shadow already answers to the same source,
          the page reads as one room being walked through. */}
      <div className="studio-key" />


      {/* 4. Studio Edge Vignette */}
      <div className="os-vignette" />

      {/* 5. Subtle Interactive Pointer Spotlight
             No blur() filter: a radial gradient is already soft, and an
             element that both moves and blurs has to be re-rasterised every
             frame. Transform-only keeps this on the compositor. */}
      {!reducedMotion && <div ref={auraRef} className="aura" />}

      {/* 6. Ultra-Fine Film Grain Overlay */}
      <div className="grain" />
    </div>
  );
};
