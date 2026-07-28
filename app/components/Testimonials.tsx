"use client";

import React from "react";
import { Section, SectionHeader } from "./ui/Section";
import { useReveal } from "../lib/motion";

/**
 * Quotes, set as quotes.
 *
 * The five-star rows and coloured initial avatars are gone: a row of stars on
 * every single card carries no information, and decoration around a
 * testimonial makes it read as marketing rather than as something a person
 * said.
 */
const QUOTES = [
  {
    quote:
      "Mohan built our AI sentiment analysis dashboard with remarkable speed and precision. The response generator transformed our customer feedback operations.",
    name: "Srinivas Rao",
    role: "Founder, Business Analytics India",
  },
  {
    quote:
      "The OCR scanning accuracy and dosage calculation formulas in AgriScan exceeded our expectations. His attention to mobile usability is outstanding.",
    name: "Anand Kumar",
    role: "AgriTech lead",
  },
  {
    quote:
      "Working with Mohan on custom backend APIs and Next.js frontends was seamless. Highly communicative, technical and punctual.",
    name: "Priya Sharma",
    role: "E-commerce director",
  },
];

export const Testimonials: React.FC = () => {
  useReveal();

  return (
    <Section width="wide" className="border-t border-edge">
      <SectionHeader eyebrow="References" title="What working together is like." />

      <ul className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3">
        {QUOTES.map((item, i) => (
          <li
            key={item.name}
            className="reveal"
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
          >
            <figure>
              <blockquote className="font-display text-[19px] font-normal leading-[1.5] tracking-[-0.01em] text-text-hi">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-edge pt-4">
                <span className="block text-[14px] text-text-mid">
                  {item.name}
                </span>
                <span className="t-label mt-1 block">{item.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
};
