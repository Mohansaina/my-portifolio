"use client";

import React, { useRef, useState } from "react";
import { Section, SectionHeader } from "./ui/Section";
import { useReveal } from "../lib/motion";

const TABS = [
  { id: "bio", label: "Bio" },
  { id: "approach", label: "Approach" },
  { id: "base", label: "Base" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* The stats grid that used to close this section — "15+ projects delivered",
   "10+ clients served" — is gone. It sat a few hundred pixels below four
   visible projects, and a claim the page itself contradicts is worse than no
   claim. Verifiable figures now open the page instead, in <Proof>. */

export const About: React.FC = () => {
  const [tab, setTab] = useState<TabId>("bio");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useReveal([tab]);

  /* Arrow-key navigation, as a tablist is expected to have. Previously these
     were three unlabelled buttons with no roles. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const order = TABS.map((t) => t.id);
    const i = order.indexOf(tab);
    let next: TabId | null = null;

    if (e.key === "ArrowRight") next = order[(i + 1) % order.length];
    if (e.key === "ArrowLeft") next = order[(i - 1 + order.length) % order.length];
    if (e.key === "Home") next = order[0];
    if (e.key === "End") next = order[order.length - 1];

    if (next) {
      e.preventDefault();
      setTab(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <Section id="about" className="border-t border-edge">
      <SectionHeader eyebrow="About" title="Who you would be working with." />

      <div
        role="tablist"
        aria-label="About Mohan"
        onKeyDown={onKeyDown}
        className="reveal mb-8 flex gap-1 border-b border-edge"
      >
        {TABS.map((t) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t.id)}
              className={`-mb-px cursor-pointer border-b px-4 py-3 text-[13px]
                transition-colors duration-[var(--dur-2)]
                ${
                  selected
                    ? "border-lume text-text-hi"
                    : "border-transparent text-text-lo hover:text-text-mid"
                }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
        className="reveal min-h-[9rem] rounded-xs"
      >
        {tab === "bio" && (
          <p className="t-body-l">
            I am a full-stack engineer based in Visakhapatnam. Most of my work
            is early: joining a small team as a core engineer and building the
            0-to-1 web application, or building a jewelry storefront from the
            product photography up. I like the part of the job where the
            product does not exist yet.
          </p>
        )}

        {tab === "approach" && (
          <div className="max-w-[62ch] space-y-4">
            <p className="t-body-l">
              Good software is clean code, an architecture that survives
              contact with growth, and interactions that feel considered.
            </p>
            <ul className="space-y-3 border-t border-edge pt-4">
              {[
                "Fast rendering, accessible interfaces, a component hierarchy that stays legible.",
                "Backend services with strict types and queries that stay fast as the table grows.",
                "Ship, measure, iterate — with monitoring in place before it is needed.",
              ].map((line) => (
                <li key={line} className="flex gap-4 text-[15px] text-text-mid">
                  <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-edge-hi" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "base" && (
          <div className="max-w-[62ch]">
            <p className="t-body-l">
              Visakhapatnam, Andhra Pradesh, India — IST, UTC+5:30.
            </p>
            <p className="t-body mt-4">
              I work remotely with clients in other timezones and keep a
              reliable overlap with European and US mornings. Most of my
              collaborations to date have been fully remote.
            </p>
          </div>
        )}
      </div>

    </Section>
  );
};
