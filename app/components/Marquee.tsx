import React from "react";

/**
 * A quiet ticker of the stack.
 *
 * This used to be eight large cards with icons, headings and descriptions —
 * a second Skills section that happened to move. Reduced to one low-contrast
 * mono row, it stops competing for attention and does the job a marquee is
 * actually good at: giving the page a change of texture between the hero and
 * the work.
 *
 * The speed used to be recomputed from scroll position on every scroll event.
 * Now it is constant, pauses on hover, and stops entirely under reduced
 * motion.
 */
const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Redis",
  "Tailwind CSS",
  "FastAPI",
  "Docker",
  "AWS",
  "Stripe",
  "Shopify",
  "OpenAI",
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {STACK.map((item) => (
      <span key={item} className="flex items-center whitespace-nowrap">
        <span className="t-mono px-6 !text-[13px] text-text-lo">{item}</span>
        <span aria-hidden className="h-1 w-1 rounded-full bg-edge-hi" />
      </span>
    ))}
  </div>
);

export const Marquee: React.FC = () => (
  <div className="relative border-y border-edge py-5">
    <h2 className="sr-only">Technologies</h2>
    <div className="marquee">
      <div className="marquee-track">
        <Row />
      </div>
      <div className="marquee-track" aria-hidden>
        <Row />
      </div>
    </div>
  </div>
);
