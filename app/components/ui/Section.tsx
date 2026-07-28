import React from "react";
import { SplitText } from "./SplitText";

/**
 * One section rhythm for the whole page. Every section uses this wrapper, so
 * vertical spacing can never drift the way it does when each section picks its
 * own padding utility.
 */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  /** `narrow` for reading-led sections, `wide` for grids and galleries. */
  width?: "narrow" | "wide";
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  width = "narrow",
  className = "",
  children,
  ...rest
}) => (
  <section
    id={id}
    className={`relative px-6 md:px-16 py-[var(--section-y)] ${className}`}
    {...rest}
  >
    <div
      className={`mx-auto w-full ${
        width === "narrow" ? "max-w-narrow" : "max-w-wide"
      }`}
    >
      {children}
    </div>
  </section>
);

/** The mono utility label. The only place uppercase is used. */
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <p className={`t-label ${className}`}>{children}</p>;

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  /** Optional supporting line. Kept short — the brief asks for no long copy. */
  lede?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  lede,
  className = "",
}) => (
  <header className={`reveal reveal-split mb-12 md:mb-16 ${className}`}>
    <Eyebrow className="mb-4">{eyebrow}</Eyebrow>

    <h2 className="t-display-l max-w-[18ch]">
      <SplitText>{title}</SplitText>
    </h2>

    {/* Draws in after the words have landed. */}
    <div className="draw-rule mt-8 h-px w-24 bg-lume/40" />

    {lede && <p className="t-body-l mt-8">{lede}</p>}
  </header>
);
