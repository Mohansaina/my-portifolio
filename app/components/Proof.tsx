"use client";

import React from "react";
import { Icon, IconName } from "./ui/Icon";
import { useCountUp, useReveal } from "../lib/motion";

/**
 * Proof, placed early.
 *
 * The strongest thing this page can say is not a claim about volume — it is
 * that the work is standing up in public right now and the source is readable.
 * Every figure here is checkable in one click, which is the point: a number a
 * visitor can verify is worth more than a larger one they have to take on
 * faith.
 *
 * Deliberately no "projects completed" or "happy clients" counts. Those were
 * previously asserted further down the page at 15+ and 10+ alongside four
 * shown projects, and an unverifiable number sitting next to visible evidence
 * that contradicts it costs more credibility than it buys.
 */
interface Fact {
  value: number | string;
  suffix?: string;
  label: string;
  detail: string;
  href?: string;
  icon?: IconName;
}

const FACTS: Fact[] = [
  {
    value: 3,
    label: "Live products",
    detail: "Running in public, not mockups",
    href: "#work",
    icon: "arrow-right",
  },
  {
    value: 3,
    label: "Public repositories",
    detail: "Read the source before you call",
    href: "https://github.com/Mohansaina",
    icon: "github",
  },
  {
    value: 2022,
    label: "Building since",
    detail: "Frontend through database",
  },
  {
    value: "< 24",
    suffix: "h",
    label: "Typical reply",
    detail: "Visakhapatnam · UTC+5:30",
    href: "#contact",
    icon: "arrow-right",
  },
];

export const Proof: React.FC = () => {
  useReveal();

  return (
    <section
      aria-label="Track record"
      className="relative border-b border-edge px-6 py-16 md:px-16 md:py-20"
    >
      <ul className="reveal-rows mx-auto grid max-w-wide grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
        {FACTS.map((fact) => (
          <FactItem key={fact.label} fact={fact} />
        ))}
      </ul>
    </section>
  );
};

const FactItem: React.FC<{ fact: Fact }> = ({ fact }) => {
  const body = (
    <>
      <p className="font-editorial text-[40px] tabular-nums leading-none tracking-[-0.015em] text-text-hi md:text-[52px]">
        <FactValue fact={fact} />
        {fact.suffix}
      </p>
      <p className="t-label mt-3">{fact.label}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-text-lo">
        {fact.detail}
        {fact.icon && <Icon name={fact.icon} size={12} />}
      </p>
    </>
  );

  return (
    <li>
      {fact.href ? (
        <a
          href={fact.href}
          {...(fact.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group block rounded-xs transition-colors duration-[var(--dur-2)]
            [&:hover_p:last-child]:text-text-mid"
        >
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
};

/** Counts only the plain integers; "< 24" and the like are printed as written. */
const FactValue: React.FC<{ fact: Fact }> = ({ fact }) => {
  const numeric = typeof fact.value === "number";
  const { ref, value } = useCountUp(numeric ? (fact.value as number) : 0);

  if (!numeric) return <>{fact.value}</>;

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>}>
      {/* Years read as a year, not as a quantity ramping from zero. */}
      {fact.value === 2022 ? fact.value : value}
    </span>
  );
};
