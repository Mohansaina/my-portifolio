"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "./ui/Icon";
import { useReveal } from "../lib/motion";

/**
 * Scroll progress hairline and the single back-to-top control.
 *
 * Progress is written straight to a CSS custom property inside rAF rather than
 * through React state, so scrolling never triggers a render. The back-to-top
 * button is state-driven, but only flips at one threshold.
 *
 * There used to be two back-to-top buttons on screen at once — this one and a
 * second in FloatingControls, both appearing at scrollY > 400 on opposite
 * sides. This is now the only one.
 */
export const ScrollAnimations: React.FC = () => {
  const [showTop, setShowTop] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      barRef.current?.style.setProperty(
        "transform",
        `scaleX(${progress.toFixed(4)})`,
      );
      setShowTop(window.scrollY > 600);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
      >
        <div
          ref={barRef}
          className="h-full origin-left bg-lume/70"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
        aria-label="Back to top"
        className={`lit surface inset-safe-b inset-safe-r fixed z-40 grid h-11 w-11 place-items-center
          rounded-md text-text-mid transition-[opacity,transform,color,background-color,border-color]
          duration-[var(--dur-3)] ease-[var(--ease)] hover:bg-ink-3 hover:text-text-hi
          ${
            showTop
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
      >
        <Icon name="arrow-up" size={16} />
      </button>
    </>
  );
};
