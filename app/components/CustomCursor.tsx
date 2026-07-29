"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * A dot at the pointer and a ring that trails it.
 *
 * Deliberately quiet: champagne at low opacity rather than a neon glow, and
 * it augments the system cursor instead of replacing it, so nobody loses
 * track of where they are pointing.
 *
 * Suppressed entirely for coarse pointers and for reduced-motion users. Both
 * elements are positioned from inside one rAF loop, so the component renders
 * once and then never re-renders while the pointer moves.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(fine.matches && !calm.matches);
    sync();

    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;
    let frame: number;
    let seen = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        ringX = x;
        ringY = y;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const hide = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    // Spring rather than a plain lerp, so the ring carries momentum into a
    // stop instead of easing to it. Damping is set high enough that it
    // settles without visible oscillation.
    let vx = 0;
    let vy = 0;
    const stiffness = 0.14;
    const damping = 0.76;

    const render = () => {
      vx = (vx + (x - ringX) * stiffness) * damping;
      vy = (vy + (y - ringY) * stiffness) * damping;
      ringX += vx;
      ringY += vy;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    /* `mix-blend-mode: exclusion` inverts whatever sits under the cursor, so
       it stays visible over the portrait, the code block and the champagne
       button alike without needing a colour of its own. Exclusion rather than
       difference: the same behaviour, softer at the midtones. */
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] select-none mix-blend-exclusion"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1 w-1 rounded-full bg-white opacity-0 transition-opacity duration-[var(--dur-3)]"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-white/70 opacity-0 transition-opacity duration-[var(--dur-3)]"
      />
    </div>
  );
};
