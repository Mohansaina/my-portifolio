/**
 * One source of truth for identity.
 *
 * The email address, social URLs and bio used to be written out separately in
 * the contact section, the terminal, and the page metadata — three copies that
 * had already drifted apart. Everything that needs them now reads from here.
 */

export const site = {
  name: "Mohan Ruttala",
  role: "Full-stack engineer",
  email: "ruttalamohan23@gmail.com",
  location: "Visakhapatnam, Andhra Pradesh, India",
  locationShort: "Visakhapatnam, IN",
  timezone: "Asia/Kolkata",

  tagline: "I build the whole product.",
  description:
    "Full-stack engineer in Visakhapatnam, India. Founders bring me 0-to-1 web applications. Jewelry brands bring me storefronts that sell.",

  /**
   * Set NEXT_PUBLIC_SITE_URL in the deployment environment. The fallback keeps
   * local builds and previews working, but canonical URLs, the sitemap and
   * social card links all resolve against this — so it must be correct in
   * production or shared links will point at the wrong host.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohansaina.github.io"
  ).replace(/\/$/, ""),

  socials: [
    { label: "GitHub", href: "https://github.com/Mohansaina", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohan-sai-ruttala-a73484309/",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mohan_23_03_/",
      icon: "instagram",
    },
    { label: "X", href: "https://x.com/MohanRutta17691", icon: "x" },
  ],

  /** Also drives the nav, the command palette and the sitemap. */
  sections: [
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Stack" },
    { id: "code", label: "Code" },
    { id: "contact", label: "Contact" },
  ],
} as const;

export type SocialLink = (typeof site.socials)[number];
