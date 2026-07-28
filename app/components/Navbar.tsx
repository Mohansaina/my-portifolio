"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./ui/Icon";
import { Button, ButtonLink } from "./ui/Button";
import { useModal } from "../lib/motion";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  /* The nav gains its hairline and glass only once content is behind it. */
  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        setScrolled(window.scrollY > 24);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  /* Scroll spy. Topmost section intersecting the upper band of the viewport
     wins, which keeps the marker stable rather than flickering between two
     sections that are both partly visible. */
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Move the underline to the active link. One shared marker that travels,
     rather than a border toggling on each item. */
  const positionMarker = useCallback(() => {
    const list = listRef.current;
    const marker = markerRef.current;
    if (!list || !marker) return;

    const current = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!current) {
      marker.style.opacity = "0";
      return;
    }

    marker.style.opacity = "1";
    marker.style.width = `${current.offsetWidth}px`;
    marker.style.transform = `translate3d(${current.offsetLeft}px, 0, 0)`;
  }, [active]);

  useEffect(() => {
    positionMarker();
    window.addEventListener("resize", positionMarker);
    return () => window.removeEventListener("resize", positionMarker);
  }, [positionMarker]);

  /* Close the mobile drawer when the viewport grows past the breakpoint,
     otherwise it stays mounted and traps scroll on desktop. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const closeResume = useCallback(() => setResumeOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const resumeRef = useModal(resumeOpen, closeResume);
  const menuRef = useModal(menuOpen, closeMenu);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80]
          focus:rounded-md focus:bg-ink-2 focus:px-4 focus:py-2 focus:text-[13px] focus:text-text-hi"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-3)] ease-[var(--ease)]
          ${scrolled ? "glass border-b border-edge" : "border-b border-transparent"}`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-wide items-center justify-between gap-8 px-6 md:px-16"
        >
          <a
            href="#top"
            className="rounded-xs font-display text-[15px] font-medium tracking-tight text-text-hi"
          >
            Mohan Ruttala
          </a>

          <div
            ref={listRef}
            className="relative hidden items-center gap-8 lg:flex"
          >
            {LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-id={id}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-xs py-1 text-[13px] transition-colors duration-[var(--dur-2)]
                    ${isActive ? "text-text-hi" : "text-text-lo hover:text-text-mid"}`}
                >
                  {link.label}
                </a>
              );
            })}
            <span
              ref={markerRef}
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 left-0 h-px bg-lume opacity-0
                transition-[transform,width,opacity] duration-[var(--dur-3)] ease-[var(--ease)]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="md"
              variant="secondary"
              onClick={() => setResumeOpen(true)}
              className="hidden sm:inline-flex"
            >
              Résumé
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-md text-text-mid
                transition-colors duration-[var(--dur-2)] hover:text-text-hi lg:hidden"
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          className="fixed inset-0 z-[75] bg-ink-0/95 backdrop-blur-md lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-6">
            <span className="t-label">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-md text-text-mid
                transition-colors duration-[var(--dur-2)] hover:text-text-hi"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex flex-col gap-1 px-6 pt-8"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="t-display-l rounded-sm py-2 !text-[36px] text-text-mid
                  transition-colors duration-[var(--dur-2)] hover:text-text-hi"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="secondary"
              size="lg"
              className="mt-8 w-full"
              onClick={() => {
                setMenuOpen(false);
                setResumeOpen(true);
              }}
            >
              Résumé
            </Button>
          </nav>
        </div>
      )}

      {resumeOpen && (
        <div className="fixed inset-0 z-[75] grid place-items-center bg-ink-0/80 p-6 backdrop-blur-md">
          <div
            ref={resumeRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
            tabIndex={-1}
            className="surface w-full max-w-lg rounded-xl p-8 shadow-[var(--shadow-3),var(--lit-top)]"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="t-label mb-2">Résumé</p>
                <h2 id="resume-title" className="t-heading">
                  Mohan Ruttala
                </h2>
              </div>
              <button
                type="button"
                onClick={closeResume}
                aria-label="Close"
                className="-mr-2 -mt-2 grid h-9 w-9 place-items-center rounded-md text-text-lo
                  transition-colors duration-[var(--dur-2)] hover:text-text-hi"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <dl className="divide-y divide-edge border-y border-edge text-[13px]">
              {[
                ["Role", "Full-stack software engineer"],
                ["Based in", "Visakhapatnam, India · UTC+5:30"],
                ["Core stack", "React, Next.js, TypeScript, Node.js, Python"],
                ["Available for", "Full-time, contract and freelance"],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-8"
                >
                  <dt className="t-label">{term}</dt>
                  <dd className="text-text-hi sm:text-right">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="#contact"
                variant="primary"
                size="lg"
                icon="arrow-right"
                onClick={closeResume}
                className="flex-1"
              >
                Get in touch
              </ButtonLink>
              <Button variant="secondary" size="lg" onClick={closeResume}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
