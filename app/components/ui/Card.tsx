"use client";

import React from "react";
import { usePointerLight } from "../../lib/motion";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Lift and deepen the shadow on hover. Off for static panels. */
  raise?: boolean;
  as?: "div" | "article" | "li" | "figure";
  children: React.ReactNode;
}

/**
 * A raised surface that participates in the page's single lighting model:
 * top-edge highlight from the key light, plus the specular edge that follows
 * the pointer. Padding is the card's structure — borders stay at 1px and very
 * low contrast.
 */
export const Card: React.FC<CardProps> = ({
  raise = true,
  as = "div",
  className = "",
  children,
  ...rest
}) => {
  const { ref, onPointerMove } = usePointerLight<HTMLElement>();

  // Widened to ElementType so the props of every allowed tag are not
  // intersected into an unsatisfiable type.
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      className={`lit surface ${raise ? "surface-raise" : ""} rounded-lg ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};
