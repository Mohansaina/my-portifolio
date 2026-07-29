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

/* Doubled so a single track is always wider than the viewport — otherwise the
   loop shows a gap on very wide screens. */
const ROW = [...STACK, ...STACK];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {ROW.map((item, i) => (
      <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
        <span className="t-mono px-6 !text-[13px] text-text-lo">{item}</span>
        <span className="h-1 w-1 rounded-full bg-edge-hi" />
      </span>
    ))}
  </div>
);

/**
 * Decorative: the Stack section lists all of this properly and in a readable
 * order, so this is hidden from assistive technology rather than read out as
 * twenty-eight duplicated list items.
 */
export const Marquee: React.FC = () => (
  <div aria-hidden className="relative select-none overflow-hidden border-y border-edge py-5">
    {/* Eases along with the scroll on top of its own constant travel. Two
        timelines cannot compose on one element, so the drift sits here and
        the loop stays on the tracks. */}
    <div className="marquee-drift">
      <div className="marquee">
        <div className="marquee-track">
          <Row />
        </div>
        <div className="marquee-track">
          <Row />
        </div>
      </div>
    </div>
  </div>
);
