"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Tracks the OS reduced-motion setting and reacts to changes at runtime.
 *
 * `useSyncExternalStore` rather than state-in-an-effect: matchMedia is an
 * external store, and this keeps the hydration render matching the server
 * before switching to the real value.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

const noopSubscribe = () => () => {};

/**
 * Whether the platform uses ⌘ rather than Ctrl, for rendering shortcut hints.
 *
 * A non-reactive external value, so it goes through `useSyncExternalStore`
 * with a server snapshot of `false` — that keeps hydration matching and avoids
 * setting state from an effect.
 */
export function useIsMac(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const platform =
        (navigator as Navigator & { userAgentData?: { platform?: string } })
          .userAgentData?.platform ??
        navigator.platform ??
        "";
      return /mac|iphone|ipad/i.test(platform);
    },
    () => false,
  );
}

/**
 * The signature interaction: light raking across an edge.
 *
 * Publishes the pointer position as `--lx` / `--ly` on the element so the
 * `.lit` gradient border-mask can follow it. Writes are coalesced into one
 * rAF per frame, so a burst of pointermove events costs a single style write.
 */
export function usePointerLight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const frame = useRef<number | null>(null);
  const next = useRef<{ x: number; y: number } | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      // Coarse pointers have no hover, so there is no light to move.
      if (reduced || e.pointerType === "touch") return;

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      next.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };

      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const pos = next.current;
        if (!pos || !el.isConnected) return;
        el.style.setProperty("--lx", `${pos.x}%`);
        el.style.setProperty("--ly", `${pos.y}%`);
      });
    },
    [reduced],
  );

  return { ref, onPointerMove };
}

/**
 * Magnetic attraction for important controls.
 *
 * The brief allows this for important buttons specifically, so it is opt-in
 * rather than a default. Pull is capped at `max` px and eased by `strength`,
 * which keeps it reading as weight rather than as the button running away from
 * the cursor. Writes are coalesced into one rAF per frame; the release is left
 * to a CSS transition so letting go settles instead of snapping.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3, max = 8) {
  const frame = useRef<number | null>(null);
  const next = useRef<{ x: number; y: number } | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (reduced || e.pointerType === "touch") return;

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;

      next.current = {
        x: Math.max(-max, Math.min(max, dx)),
        y: Math.max(-max, Math.min(max, dy)),
      };

      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const pos = next.current;
        if (!pos || !el.isConnected) return;
        // No transition while tracking, so the pull follows the pointer
        // exactly; the class transition governs only the release.
        el.style.transition = "none";
        el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      });
    },
    [reduced, strength, max],
  );

  const onPointerLeave = useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget;
    el.style.transition = "";
    el.style.transform = "";
  }, []);

  return { onPointerMove, onPointerLeave };
}

/**
 * One IntersectionObserver for the entire page, shared by every caller.
 *
 * Sections each call `useReveal()`, and content that mounts later (tab panels,
 * filtered lists) re-registers via `deps` — but they all feed the same
 * observer rather than each standing up its own.
 */
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver(): IntersectionObserver {
  revealObserver ??= new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        // Reveal once. Nothing re-hides on the way back up.
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  return revealObserver;
}

export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.is-in), .reveal-rows:not(.is-in)",
    );
    if (nodes.length === 0) return;

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      nodes.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = getRevealObserver();
    nodes.forEach((el) => observer.observe(el));
    // Intentionally no teardown: the observer lives for the page, and
    // unobserving here would undo registrations made by other sections.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Counts up to `target` once the element scrolls into view.
 *
 * Driven by rAF against a wall clock rather than setInterval, so the duration
 * holds regardless of frame rate and the value always lands exactly on target.
 */
export function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    let frame: number;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast arrival, gentle settle. No overshoot.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setAnimated(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration, reduced]);

  // With motion reduced the number is simply the number, no ramp.
  return { ref, value: reduced ? target : animated };
}

/**
 * Modal plumbing: Esc to close, focus trapped inside, focus restored to
 * whatever opened it, and the page behind locked without shifting when the
 * scrollbar disappears.
 */
export function useModal(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`;
      // Padding on <body> cannot move a position: fixed element, so the
      // navbar would slide sideways as the scrollbar disappears. Publish the
      // width for fixed chrome to compensate with.
      documentElement.style.setProperty("--scroll-lock-pad", `${scrollbar}px`);
    }

    const FOCUSABLE =
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

    // Move focus into the dialog so the next Tab stays inside it.
    requestAnimationFrame(() => {
      const first = ref.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? ref.current)?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab" || !ref.current) return;

      const items = Array.from(
        ref.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      documentElement.style.removeProperty("--scroll-lock-pad");
      opener?.focus?.();
    };
  }, [open, onClose]);

  return ref;
}
