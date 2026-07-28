import React from "react";

interface SplitTextProps {
  children: string;
  /** Words already revealed before this one, so several lines can share one sequence. */
  offset?: number;
  className?: string;
}

/**
 * Splits a heading into words so each can rise out of its own clipping box.
 *
 * Word-level rather than character-level on purpose: characters read as an
 * effect, words read as typesetting. The index drives the stagger through a
 * CSS custom property, so the timing lives in the stylesheet with the rest of
 * the motion tokens.
 *
 * Screen readers get the original string — the word spans are presentational.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  children,
  offset = 0,
  className = "",
}) => {
  const words = children.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span
              className="split-word"
              style={{ ["--i" as string]: i + offset }}
            >
              <span>{word}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
};
