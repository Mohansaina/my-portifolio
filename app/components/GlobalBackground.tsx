"use client";

import React, { useEffect, useRef } from "react";

/**
 * Ultra-Premium Global Background Engine.
 *
 * Combines soft studio lighting wash, micro-grid matrix, interactive
 * pointer-following ambient aura, fine film grain, and subtle high-end
 * 3D tech artwork refraction layer that stays constant across all pages.
 */
export const GlobalBackground = () => {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = () => {
      // Liquid lerp interpolation for weightless cursor light aura
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    render();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden">
      {/* Studio Lighting Wash & Micro-Grid Matrix */}
      <div className="studio-wash" />

      {/* Interactive Cursor Light Aura */}
      <div
        ref={auraRef}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/10 via-amber-500/5 to-purple-500/10 blur-[120px] opacity-70 transition-opacity duration-500 pointer-events-none"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* Luxury 3D Tech Visual Artwork Layer */}
      <div className="absolute inset-0 opacity-[0.11] bg-[url('/hero_premium_visual.png')] bg-cover bg-center mix-blend-screen blur-[10px] scale-105 pointer-events-none" />

      {/* Fine Film Grain Texture */}
      <div className="grain" />
    </div>
  );
};
