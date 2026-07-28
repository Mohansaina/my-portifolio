"use client";

import React, { useState } from "react";
import { Eyebrow } from "./ui/Section";
import { SplitText } from "./ui/SplitText";
import { Icon, IconName } from "./ui/Icon";
import { useToast } from "./Toast";
import { useReveal } from "../lib/motion";

const EMAIL = "ruttalamohan23@gmail.com";

const SOCIALS: { label: string; href: string; icon: IconName }[] = [
  {
    label: "GitHub",
    href: "https://github.com/Mohansaina",
    icon: "github",
  },
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
  {
    label: "X",
    href: "https://x.com/MohanRutta17691",
    icon: "x",
  },
];

/**
 * The contact form is gone.
 *
 * It never sent anything — it ran a setTimeout and then told the visitor
 * their message had been delivered. A page built to demonstrate craft cannot
 * open with a lie in its most important interaction. The email address is now
 * the primary action: one click to copy, one click to open a mail client, and
 * nothing in between that can silently fail.
 */
export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  useReveal();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast("Email copied", EMAIL);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Insecure origin or denied permission — fall back to the mail client
      // rather than reporting a success that did not happen.
      toast("Could not copy", "Opening your mail app instead.");
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-edge px-6 py-[var(--section-y)] md:px-16"
    >
      <div className="mx-auto max-w-wide">
        <Eyebrow className="reveal mb-6">Contact</Eyebrow>

        <h2 className="reveal reveal-split t-display-l max-w-[16ch]">
          <SplitText>Tell me what you are building.</SplitText>
        </h2>

        <p className="reveal t-body-l mt-6">
          Open to full-time engineering roles, jewelry and luxury retail
          storefronts, and freelance projects. I reply within a day.
        </p>

        <div className="reveal mt-12 flex flex-col gap-4 border-y border-edge py-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-[clamp(22px,4vw,44px)] font-medium tracking-[-0.02em]
              text-text-hi underline decoration-edge-hi underline-offset-[10px]
              transition-colors duration-[var(--dur-2)] hover:decoration-lume"
          >
            {EMAIL}
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-md
              border border-edge px-4 py-2.5 text-[13px] text-text-mid transition-colors
              duration-[var(--dur-2)] hover:border-edge-hi hover:text-text-hi sm:self-auto"
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>

        <ul className="reveal mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xs text-[14px] text-text-lo
                  transition-colors duration-[var(--dur-2)] hover:text-text-hi"
              >
                <Icon name={social.icon} size={15} />
                {social.label}
                <Icon name="arrow-up-right" size={12} />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-24 flex flex-col gap-4 border-t border-edge pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label">
            © {new Date().getFullYear()} Mohan Ruttala · Visakhapatnam, India
          </p>
          <p className="t-label">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
};
