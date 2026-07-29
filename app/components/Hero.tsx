"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "./ui/Button";
import { SplitText } from "./ui/SplitText";
import { usePrefersReducedMotion } from "../lib/motion";
import { site } from "../lib/site";

/* What he does, in three words each. Answers "is this the right person"
   before the visitor has scrolled. */
const SPECIALISMS = [
  "0-to-1 web apps",
  "Luxury e-commerce",
  "AI integration",
];

/**
 * The hero is the thesis: what he does, for whom, and one lit object.
 *
 * Depth comes from three layers moving at different rates under the pointer —
 * light slowest, portrait next, the floating panel fastest — which is what
 * reads as parallax rather than as an element sliding around. The furthest
 * layer travels 4px and the nearest 12px, inside the brief's 8–12px ceiling.
 */
export const Hero: React.FC = () => {
  const bloomRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const reduced = usePrefersReducedMotion();
  const [localTime, setLocalTime] = useState<string | null>(null);

  /* His actual local time. Small, true, and quietly says there is a person at
     the other end of this. Rendered only after mount so server and client
     markup agree. */
  useEffect(() => {
    const tick = () =>
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: site.timezone,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const applyParallax = useCallback(() => {
    frame.current = null;
    const { x, y } = pointer.current;

    // One write per layer per frame, all transform-only.
    if (bloomRef.current) {
      bloomRef.current.style.transform = `translate3d(${x * 4}px, ${y * 4}px, 0)`;
    }
    if (portraitRef.current) {
      portraitRef.current.style.transform = `translate3d(${x * -8}px, ${y * -8}px, 0)`;
    }
    if (panelRef.current) {
      panelRef.current.style.transform = `translate3d(${x * -12}px, ${y * -12}px, 0)`;
    }
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced || e.pointerType === "touch") return;

      pointer.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };

      if (frame.current === null) {
        frame.current = requestAnimationFrame(applyParallax);
      }
    },
    [reduced, applyParallax],
  );

  const onPointerLeave = useCallback(() => {
    pointer.current = { x: 0, y: 0 };
    if (frame.current === null) {
      frame.current = requestAnimationFrame(applyParallax);
    }
  }, [applyParallax]);

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden px-6 pb-24 pt-40 md:px-16 md:pb-32 md:pt-48"
    >
      {/* Ambient layer. Both are decorative and never intercept the pointer. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid" />
        <div
          ref={bloomRef}
          className="hero-bloom transition-transform duration-[var(--dur-5)] ease-[var(--ease)] will-change-transform"
        />
      </div>

      <div className="hero-depart relative mx-auto grid max-w-wide grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {/* Glass: low opacity, soft blur, thin border, one top highlight. */}
          <p className="reveal mb-8 inline-flex items-center gap-2.5 rounded-full border border-edge bg-ink-2/50 py-1.5 pl-3 pr-4 shadow-[var(--lit-top)] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="status-halo absolute -inset-1 rounded-full bg-jade/40" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-jade" />
            </span>
            <span className="t-label !text-text-mid">Available for work</span>
          </p>

          {/* Hierarchy inside the sentence: the claim lands brighter than the
              set-up, so the eye reaches the point first. */}
          <h1
            className="reveal reveal-split t-display-xl text-balance"
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            <span className="text-text-mid">
              <SplitText>I build the</SplitText>
            </span>{" "}
            <SplitText offset={3}>whole product.</SplitText>
          </h1>

          <p
            className="reveal t-body-l mt-8"
            style={{ ["--reveal-delay" as string]: "260ms" }}
          >
            Full-stack engineer in Visakhapatnam, India. Founders bring me
            0-to-1 web applications. Jewelry brands bring me storefronts that
            sell.
          </p>

          {/* Arrive one at a time — three separate claims, not one block. */}
          <ul
            className="reveal-rows mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            style={{ ["--reveal-delay" as string]: "320ms" }}
          >
            {SPECIALISMS.map((item, i) => (
              <li key={item} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden className="h-3 w-px bg-edge-hi" />}
                <span className="t-label !text-text-mid transition-colors duration-[var(--dur-2)] hover:!text-text-hi">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="reveal mt-12 flex flex-wrap items-center gap-6"
            style={{ ["--reveal-delay" as string]: "380ms" }}
          >
            <ButtonLink
              href="#contact"
              variant="primary"
              size="lg"
              icon="arrow-right"
              className="sheen cta-travel !h-14 !px-8 !text-[15px] shadow-[var(--shadow-2)]"
            >
              Start a project
            </ButtonLink>
            <ButtonLink
              href="#work"
              variant="ghost"
              icon="arrow-down"
              className="cta-travel"
            >
              See the work
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative">
            {/* Reveal and parallax are deliberately on different elements:
                both animate `transform`, and sharing one node means an inline
                parallax write cancels the entrance mid-flight. */}
            <figure
              className="reveal hero-portrait"
              style={{ ["--reveal-delay" as string]: "440ms" }}
            >
              <div
                ref={portraitRef}
                className="lit relative overflow-hidden rounded-xl border border-edge shadow-[var(--shadow-3),var(--lit-top)] transition-transform duration-[var(--dur-5)] ease-[var(--ease)] will-change-transform"
              >
                <Image
                  src="/myprofile.jpg"
                  alt={`${site.name}, ${site.role.toLowerCase()}`}
                  width={720}
                  height={860}
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-full w-full object-cover"
                />

                {/* Key light from above-left. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(232,217,184,0.14),transparent_46%)]"
                />
                {/* Vignette, so the bright photograph settles into the page
                    instead of glowing off it. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_95%_at_50%_35%,transparent_42%,rgba(11,12,14,0.55)_100%)]"
                />
                {/* One pass of light across the surface, just after it lands. */}
                <div aria-hidden className="specular" />
              </div>
            </figure>

            {/* Nearest layer. Holds the local time, which is why the caption
                row underneath is gone — one home for one fact. */}
            <div
              className="reveal absolute -bottom-6 -left-4 sm:-left-6"
              style={{ ["--reveal-delay" as string]: "540ms" }}
            >
              <div
                ref={panelRef}
                className="lit rounded-lg border border-edge bg-ink-2/70 px-4 py-3 shadow-[var(--shadow-2),var(--lit-top)] backdrop-blur-lg transition-transform duration-[var(--dur-5)] ease-[var(--ease)] will-change-transform"
              >
                <p className="t-label">{site.locationShort}</p>
                <p className="mt-1 font-mono text-[13px] tabular-nums text-text-hi">
                  {/* Keyed on the value so each new minute arrives rather
                      than blinking into place. */}
                  <span
                    key={localTime ?? "pending"}
                    className="inline-block animate-[value-in_var(--dur-3)_var(--ease)_both]"
                  >
                    {localTime ? `${localTime} IST` : "—"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
