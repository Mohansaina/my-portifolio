"use client";

import React, { useState } from "react";
import { Eyebrow } from "./ui/Section";
import { SplitText } from "./ui/SplitText";
import { Icon, IconName } from "./ui/Icon";
import { site } from "../lib/site";
import { useToast } from "./Toast";
import { useReveal } from "../lib/motion";

const EMAIL = site.email;

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
      {/* Rises into place as the footer enters — the last thing on the page
          arrives rather than simply being there. */}
      <div className="footer-parallax mx-auto max-w-wide">
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
            className="font-editorial text-[clamp(23px,4vw,46px)] tracking-[-0.012em]
              text-text-hi underline decoration-edge-hi underline-offset-[12px]
              transition-colors duration-[var(--dur-2)] hover:decoration-lume"
          >
            {EMAIL}
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 self-start
              rounded-md border border-edge px-4 text-[13px] text-text-mid
              transition-[color,border-color,background-color,transform] duration-[var(--dur-2)]
              hover:border-edge-hi hover:bg-ink-2 hover:text-text-hi
              active:translate-y-px sm:self-auto"
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
            {/* Fixed width across both labels so the button does not resize
                under the cursor at the moment it is clicked. */}
            <span className="w-[6.5rem] text-left">
              {copied ? "Copied" : "Copy address"}
            </span>
          </button>
        </div>

        <ul className="reveal mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="-mx-2 inline-flex h-11 items-center gap-2 rounded-sm px-2
                  text-[14px] text-text-lo transition-colors duration-[var(--dur-2)]
                  hover:text-text-hi active:translate-y-px"
              >
                <Icon name={social.icon as IconName} size={15} />
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
