"use client";

import React from "react";
import { Section, SectionHeader } from "./ui/Section";
import { useReveal } from "../lib/motion";

/**
 * The stack, as a list.
 *
 * This used to be twelve progress bars with invented percentages — "React
 * 88%", "Python 80%" — each filled with its own saturated gradient. The
 * numbers measured nothing, and a reader who knows the field reads them as a
 * tell. Grouping the same information and setting it well says more, and it
 * is true.
 */
const GROUPS = [
  {
    label: "Frontend",
    note: "Where most of my hours go.",
    items: [
      "TypeScript",
      "React 19",
      "Next.js (App Router)",
      "Tailwind CSS",
      "HTML5 & CSS3",
      "Canvas & Web Animations",
    ],
  },
  {
    label: "Backend",
    note: "APIs and the services behind them.",
    items: [
      "Node.js",
      "Express",
      "Python",
      "FastAPI",
      "Django",
      "REST & GraphQL",
    ],
  },
  {
    label: "Data & infrastructure",
    note: "Storage, caching and deployment.",
    items: [
      "PostgreSQL",
      "SQL optimisation",
      "Redis",
      "Docker",
      "AWS",
      "Vercel",
    ],
  },
  {
    label: "AI & automation",
    note: "Language models inside real products.",
    items: [
      "OpenAI & Gemini APIs",
      "Sentiment analysis",
      "Tesseract OCR",
      "Data scraping pipelines",
    ],
  },
];

export const Skills: React.FC = () => {
  useReveal();

  return (
    <Section id="skills" className="border-t border-edge">
      <SectionHeader eyebrow="Stack" title="What I work with." />

      <dl className="grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2">
        {GROUPS.map((group, i) => (
          <div
            key={group.label}
            className="reveal"
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
          >
            <dt className="border-b border-edge pb-3">
              <span className="t-label">{group.label}</span>
              <span className="mt-1.5 block text-[13px] text-text-lo">
                {group.note}
              </span>
            </dt>
            <dd>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-edge py-2.5 text-[15px] text-text-mid
                      transition-colors duration-[var(--dur-2)] hover:text-text-hi"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
};
