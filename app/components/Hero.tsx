"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "./ui/Button";
import { usePrefersReducedMotion } from "../lib/motion";

/**
 * The hero is the thesis: what he does, for whom, and one lit object.
 *
 * Everything that used to compete here — the orbiting tech tiles, two pulsing
 * aura rings, a particle canvas, a cursor spotlight and an ambient glow — is
 * gone. What remains is a sentence, a portrait, and one way in.
 */
export const Hero: React.FC = () => {
  const portraitRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();
  const [localTime, setLocalTime] = useState<string | null>(null);

  /* His actual local time. Small, true, and quietly says "there is a person
     at the other end of this". Rendered only after mount so the server and
     client markup agree. */
  useEffect(() => {
    const tick = () =>
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  /* Parallax capped at 10px — the brief allows 8–12px and calls dramatic
     parallax out explicitly. */
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced || e.pointerType === "touch") return;
      const el = portraitRef.current;
      if (!el) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        el.style.transform = `translate3d(${(x * -10).toFixed(2)}px, ${(y * -10).toFixed(2)}px, 0)`;
      });
    },
    [reduced],
  );

  const onPointerLeave = useCallback(() => {
    const el = portraitRef.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  }, []);

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative px-6 pb-24 pt-40 md:px-16 md:pb-32 md:pt-48"
    >
      <div className="mx-auto grid max-w-wide grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="reveal mb-8 inline-flex items-center gap-2.5 rounded-full border border-edge bg-ink-2/60 py-1.5 pl-3 pr-4">
            <span className="h-1.5 w-1.5 rounded-full bg-jade" />
            <span className="t-label !text-text-mid">Available for work</span>
          </p>

          <h1
            className="reveal t-display-xl text-balance"
            style={{ ["--reveal-delay" as string]: "60ms" }}
          >
            I build the whole product.
          </h1>

          <p
            className="reveal t-body-l mt-8"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            Full-stack engineer in Visakhapatnam, India. Founders bring me
            0-to-1 web applications. Jewelry brands bring me storefronts that
            sell.
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-6"
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            <ButtonLink
              href="#contact"
              variant="primary"
              size="lg"
              icon="arrow-right"
            >
              Start a project
            </ButtonLink>
            <ButtonLink href="#work" variant="ghost" icon="arrow-down">
              See the work
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure
            ref={portraitRef}
            className="reveal transition-transform duration-[var(--dur-5)] ease-[var(--ease)] will-change-transform"
            style={{ ["--reveal-delay" as string]: "240ms" }}
          >
            <div className="lit relative overflow-hidden rounded-xl border border-edge shadow-[var(--shadow-3),var(--lit-top)]">
              <Image
                src="/myprofile.jpg"
                alt="Mohan Ruttala"
                width={720}
                height={860}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(232,217,184,0.10),transparent_45%)]"
              />
            </div>

            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="t-label">Mohan Ruttala · Visakhapatnam, IN</span>
              <span className="t-mono tabular-nums">
                {localTime ? `${localTime} local` : " "}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
