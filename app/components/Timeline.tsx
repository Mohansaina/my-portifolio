"use client";

import React from "react";
import { Section, SectionHeader } from "./ui/Section";
import { useReveal } from "../lib/motion";

/**
 * The one section where sequence is real information, so it is the one
 * section that keeps an explicit ordering device — a hairline rail and mono
 * years, rather than the glowing dots it had before.
 */
const MILESTONES = [
  {
    period: "2024 — now",
    role: "Independent full-stack engineer",
    context: "Freelance & contract",
    body: "Building AI reputation dashboards, camera OCR tools and weather utilities. Working directly with business owners to audit, design and deploy web applications.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    period: "2023 — 2024",
    role: "Frontend & web utility engineer",
    context: "Product engineering",
    body: "Real-time weather alerting for drying schedules, and dosage calculators driven by OCR of agricultural labels. Focused on responsive PWAs, small bundles and offline caching.",
    tags: ["React", "Tailwind CSS", "REST APIs", "PWA"],
  },
  {
    period: "2022 — 2023",
    role: "Full-stack developer",
    context: "Technical foundations",
    body: "Computer science and full-stack project work in Visakhapatnam. Relational schema design, SQL normalisation, backend security and asynchronous event loops.",
    tags: ["JavaScript", "Express.js", "PostgreSQL", "Data structures"],
  },
];

export const Timeline: React.FC = () => {
  useReveal();

  return (
    <Section id="experience" className="border-t border-edge">
      <SectionHeader eyebrow="Experience" title="How I got here." />

      <ol className="relative border-l border-edge">
        {/* Fills as you read down the list. Native scroll-driven animation,
            so there is no scroll listener and no main-thread work. */}
        <span
          aria-hidden
          className="rail-progress absolute -left-px top-0 h-full w-px bg-lume/50"
        />

        {MILESTONES.map((item, i) => (
          <li
            key={item.period}
            className="reveal relative pb-12 pl-8 last:pb-0 md:pl-12"
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
          >
            <span
              aria-hidden
              className="absolute -left-px top-2.5 h-px w-5 bg-edge-hi md:w-8"
            />

            <p className="t-mono mb-3 text-text-lo">{item.period}</p>
            <h3 className="t-subheading">{item.role}</h3>
            <p className="t-label mt-1.5">{item.context}</p>
            <p className="t-body mt-4 !text-[14px]">{item.body}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-xs border border-edge px-2.5 py-1 font-mono text-[11px] text-text-lo"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
};
