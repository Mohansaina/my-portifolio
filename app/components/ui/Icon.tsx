import React from "react";

/**
 * Inline SVG icon set.
 *
 * Replaces the Material Symbols webfont, which was a render-blocking request
 * to fonts.googleapis.com for a full variable icon font in order to use a
 * dozen glyphs. These ship with the HTML: no extra request, no icon FOUT.
 */
export type IconName =
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "close"
  | "menu"
  | "copy"
  | "check"
  | "mail"
  | "github"
  | "linkedin"
  | "instagram"
  | "x";

const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-right": <path d="M4 12h16M14 6l6 6-6 6" />,
  "arrow-up": <path d="M12 20V4M6 10l6-6 6 6" />,
  "arrow-down": <path d="M12 4v16M18 14l-6 6-6-6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M3 7h18M3 17h18" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  check: <path d="M4 12.5 9.5 18 20 6.5" />,
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  github: (
    <path
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5V17M7.5 7.2v.01M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4 4 20" />,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  className = "",
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={`shrink-0 ${className}`}
    {...rest}
  >
    {PATHS[name]}
  </svg>
);
