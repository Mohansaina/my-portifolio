"use client";

import React from "react";
import { Icon, IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

/**
 * Padding sits on the 8px grid. Press feedback is a 1px settle at 120ms —
 * fast enough to feel like the surface responded, too small to read as motion.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-[var(--dur-2)] ease-[var(--ease)] active:translate-y-px " +
  "disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const VARIANTS: Record<Variant, string> = {
  // The one place the specular colour is used as a fill.
  primary:
    "bg-lume text-ink-0 shadow-[var(--shadow-1)] hover:bg-[#f2e6cb] hover:shadow-[var(--shadow-2)]",
  secondary:
    "bg-ink-2 text-text-hi border border-edge shadow-[var(--lit-top)] " +
    "hover:bg-ink-3 hover:border-edge-hi",
  ghost:
    "text-text-mid hover:text-text-hi bg-transparent px-0 " +
    "underline decoration-edge-hi underline-offset-[6px] hover:decoration-lume",
};

const SIZES: Record<Size, string> = {
  md: "h-10 px-4 text-[13px] rounded-md",
  lg: "h-12 px-6 text-[14px] rounded-md",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

type LinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

function classes(variant: Variant, size: Size, className: string) {
  // `ghost` sets its own horizontal padding, so it opts out of the size box.
  const sized = variant === "ghost" ? "text-[14px] gap-1.5" : SIZES[size];
  return `${BASE} ${VARIANTS[variant]} ${sized} ${className}`;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  icon,
  className = "",
  children,
  ...rest
}) => (
  <button className={classes(variant, size, className)} {...rest}>
    {children}
    {icon && <Icon name={icon} size={15} />}
  </button>
);

export const ButtonLink: React.FC<LinkProps> = ({
  variant = "secondary",
  size = "md",
  icon,
  className = "",
  children,
  ...rest
}) => (
  <a className={classes(variant, size, className)} {...rest}>
    {children}
    {icon && <Icon name={icon} size={15} />}
  </a>
);
