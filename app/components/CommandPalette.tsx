"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon, IconName } from "./ui/Icon";
import { useToast } from "./Toast";
import { useIsMac, useModal } from "../lib/motion";
import { site } from "../lib/site";

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: "Jump to" | "Actions" | "Elsewhere";
  icon: IconName;
  /** Extra words that should match this command without being displayed. */
  keywords?: string;
  run: () => void;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? "auto" : "smooth";

/**
 * Subsequence match, the behaviour people expect from a palette: "jwl" finds
 * "Jewelry", "cnt" finds "Contact". Nothing cleverer — this is a dozen items,
 * not a search engine.
 */
function matches(query: string, haystack: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const h = haystack.toLowerCase();
  if (h.includes(q)) return true;

  let i = 0;
  for (const char of h) {
    if (char === q[i]) i++;
    if (i === q.length) return true;
  }
  return false;
}

/**
 * ⌘K navigation.
 *
 * VISUAL.md asks for something "closer to a modern operating system than a
 * marketing website", and names Linear and Raycast. This is that idea taken
 * literally, and it is genuinely useful rather than decorative: someone
 * evaluating the page can reach the work, or put the email on their clipboard,
 * without touching the mouse.
 *
 * The dialog is a separate component so it mounts fresh every time — its
 * search state starts empty by construction instead of being reset by effects.
 */
export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // "/" is a secondary trigger, but must never hijack real typing.
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <PaletteHint onOpen={() => setOpen(true)} />
      {open && <PaletteDialog onClose={close} />}
    </>
  );
};

const PaletteDialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const toast = useToast();
  const dialogRef = useModal(true, onClose);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => {
      onClose();
      // Let the dialog unmount and restore focus first, otherwise the focus
      // restore fights the smooth scroll.
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: scrollBehavior() });
      });
    };

    return [
      ...site.sections.map<Command>((section) => ({
        id: `go-${section.id}`,
        label: section.label,
        group: "Jump to",
        icon: "arrow-right",
        run: go(section.id),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: site.email,
        group: "Actions",
        icon: "copy",
        keywords: "mail contact hire reach",
        run: async () => {
          onClose();
          try {
            await navigator.clipboard.writeText(site.email);
            toast("Email copied", site.email);
          } catch {
            toast("Could not copy", "Opening your mail app instead.");
            window.location.href = `mailto:${site.email}`;
          }
        },
      },
      {
        id: "send-email",
        label: "Send an email",
        hint: site.email,
        group: "Actions",
        icon: "mail",
        keywords: "contact hire write message",
        run: () => {
          onClose();
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "top",
        label: "Back to top",
        group: "Actions",
        icon: "arrow-up",
        keywords: "start hero home",
        run: () => {
          onClose();
          window.scrollTo({ top: 0, behavior: scrollBehavior() });
        },
      },
      ...site.socials.map<Command>((social) => ({
        id: `social-${social.label}`,
        label: social.label,
        hint: social.href.replace(/^https?:\/\/(www\.)?/, ""),
        group: "Elsewhere",
        icon: social.icon as IconName,
        run: () => {
          onClose();
          window.open(social.href, "_blank", "noopener,noreferrer");
        },
      })),
    ];
  }, [onClose, toast]);

  const results = useMemo(
    () =>
      commands.filter((c) =>
        matches(query, `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""}`),
      ),
    [commands, query],
  );

  /* Guard against the highlight pointing past a shortened result list. */
  const activeIndex = Math.min(active, Math.max(0, results.length - 1));

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  /* Keep the highlighted row in view when arrowing past the fold. */
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIndex + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((activeIndex - 1 + results.length) % results.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(results.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[activeIndex]?.run();
    }
  };

  let index = -1;
  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-ink-0/80 px-4 pt-[12vh] backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        tabIndex={-1}
        className="surface w-full max-w-lg overflow-hidden rounded-xl shadow-[var(--shadow-3),var(--lit-top)]"
        style={{ animation: "palette-in var(--dur-4) var(--ease) both" }}
      >
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <span className="text-text-lo">
            <Icon name="arrow-right" size={15} />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Jump to a section, copy the email…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={
              results[activeIndex] ? `cmd-${results[activeIndex].id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
            className="h-14 flex-1 bg-transparent text-[15px] text-text-hi placeholder:text-text-lo focus:outline-none"
          />
          <kbd className="t-label rounded-xs border border-edge px-1.5 py-0.5">
            Esc
          </kbd>
        </div>

        <ul
          ref={listRef}
          id="palette-list"
          role="listbox"
          aria-label="Commands"
          className="scroll-shadow max-h-[46vh] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-[13px] text-text-lo">
              Nothing matches &ldquo;{query}&rdquo;.
            </li>
          )}

          {results.map((command) => {
            index += 1;
            const i = index;
            const isActive = i === activeIndex;
            const newGroup = command.group !== lastGroup;
            lastGroup = command.group;

            return (
              <React.Fragment key={command.id}>
                {newGroup && (
                  <li
                    role="presentation"
                    className="t-label px-3 pb-1.5 pt-3 first:pt-1"
                  >
                    {command.group}
                  </li>
                )}
                <li
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={isActive}
                  data-active={isActive}
                  onMouseMove={() => setActive(i)}
                  onClick={() => command.run()}
                  className={`flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5
                    text-[14px] transition-colors duration-[var(--dur-1)]
                    ${
                      isActive
                        ? "bg-ink-3 text-text-hi"
                        : "text-text-mid hover:text-text-hi"
                    }`}
                >
                  <span className={isActive ? "text-lume" : "text-text-lo"}>
                    <Icon name={command.icon} size={15} />
                  </span>
                  <span className="flex-1 truncate">{command.label}</span>
                  {command.hint && (
                    <span className="t-mono hidden truncate sm:block">
                      {command.hint}
                    </span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-edge px-4 py-2.5">
          <span className="t-label">{site.name}</span>
          <span className="flex items-center gap-3">
            <Legend keys="↑↓" label="Navigate" />
            <Legend keys="↵" label="Open" />
          </span>
        </div>
      </div>
    </div>
  );
};

const Legend: React.FC<{ keys: string; label: string }> = ({ keys, label }) => (
  <span className="flex items-center gap-1.5">
    <kbd className="t-mono rounded-xs border border-edge px-1.5 !text-[11px]">
      {keys}
    </kbd>
    <span className="t-label hidden sm:inline">{label}</span>
  </span>
);

/**
 * A palette nobody can find is decoration. This states the shortcut, and is
 * itself a button so pointer and touch users get in too.
 */
const PaletteHint: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const isMac = useIsMac();

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="lit surface inset-safe-b inset-safe-l fixed z-40 hidden items-center gap-2
        rounded-md px-3 py-2 text-[12px] text-text-lo transition-colors
        duration-[var(--dur-2)] hover:text-text-hi active:translate-y-px md:inline-flex"
    >
      <span>Quick nav</span>
      <kbd className="t-mono rounded-xs border border-edge px-1.5 !text-[11px]">
        {isMac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
};
