"use client";

import React from "react";
import { Section, SectionHeader } from "./ui/Section";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";
import { ButtonLink } from "./ui/Button";
import { useReveal } from "../lib/motion";

/**
 * Four ways to work together.
 *
 * These were previously numbered 01–04 and given four different accent hues.
 * Neither survived: the list is not a sequence, so numbering implied an order
 * that does not exist, and four hues turned a comparison into a colour chart.
 * One shared neutral treatment lets the reader compare the actual content.
 */
const SERVICES = [
  {
    title: "Joining a startup",
    summary: "Full-stack or founding engineer, full-time.",
    body: "Turning a product vision into something in front of users. I take ownership across the stack and ship the first version, then the version that scales.",
    points: [
      "Founding and full-time engineering roles",
      "Rapid MVP development",
      "Scalable backend and cloud infrastructure",
    ],
  },
  {
    title: "Jewelry & luxury retail",
    summary: "Storefronts built for high-consideration purchases.",
    body: "Online stores for jewelers and premium retailers, with 3D product preview, gemstone configurators and checkout that holds up at high order values.",
    points: [
      "Interactive 3D product viewers",
      "Stripe and Shopify integration",
      "Multi-currency checkout",
    ],
  },
  {
    title: "Freelance & contract",
    summary: "Scoped projects, audits and rescue work.",
    body: "Working directly with founders and agencies to build applications, refactor codebases that have outgrown themselves, and fix what is slow.",
    points: [
      "End-to-end web applications",
      "Performance and SEO audits",
      "Custom API and database work",
    ],
  },
  {
    title: "AI & automation",
    summary: "LLM features and pipelines that remove manual work.",
    body: "Integrating language models into real products, automating data collection, and building the backend services that keep them fed.",
    points: [
      "LLM and AI agent integration",
      "Automated data pipelines",
      "REST and GraphQL APIs",
    ],
  },
];

export const Services: React.FC = () => {
  useReveal();

  return (
    <Section id="services" width="wide" className="border-t border-edge">
      <SectionHeader
        eyebrow="Services"
        title="How we can work together."
        lede="Whether you are hiring an engineer, launching a store, or need an existing codebase to behave — the work below is what I do most."
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SERVICES.map((service, i) => (
          <Card
            as="li"
            key={service.title}
            className="reveal flex flex-col p-8"
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
          >
            <h3 className="t-subheading">{service.title}</h3>
            <p className="mt-1 text-[14px] text-lume/90">{service.summary}</p>
            <p className="t-body mt-4 !text-[14px]">{service.body}</p>

            <ul className="reveal-rows mt-6 space-y-2 border-t border-edge pt-6">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[13px] text-text-mid"
                >
                  <span className="mt-1 text-text-lo">
                    <Icon name="check" size={12} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </ul>

      <div className="reveal mt-4 flex flex-col items-start justify-between gap-6 rounded-lg border border-edge bg-ink-1 p-8 sm:flex-row sm:items-center">
        <div>
          <h3 className="t-subheading">Not sure which of these you need?</h3>
          <p className="t-body mt-2 !text-[14px]">
            Describe the problem and I will tell you what it would take. I reply
            within a day.
          </p>
        </div>
        <ButtonLink
          href="#contact"
          variant="primary"
          size="lg"
          icon="arrow-right"
        >
          Get in touch
        </ButtonLink>
      </div>
    </Section>
  );
};
