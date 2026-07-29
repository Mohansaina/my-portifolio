"use client";

import React, { useMemo, useState } from "react";
import { Section, SectionHeader } from "./ui/Section";
import { Icon } from "./ui/Icon";
import { useToast } from "./Toast";
import { useReveal } from "../lib/motion";

interface Snippet {
  id: string;
  name: string;
  language: string;
  description: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: "hook",
    name: "useSentimentScanner.ts",
    language: "TypeScript",
    description:
      "The hook behind the review tool: one call site, loading state that cannot get stuck.",
    code: `import { useState, useCallback } from "react";

export interface SentimentResult {
  score: number; // -1.0 to 1.0
  label: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  keywords: string[];
}

export function useSentimentScanner() {
  const [isScanning, setIsScanning] = useState(false);

  const scanText = useCallback(async (text: string): Promise<SentimentResult> => {
    setIsScanning(true);
    try {
      const response = await fetch("/api/ai/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      return data.result;
    } finally {
      setIsScanning(false);
    }
  }, []);

  return { scanText, isScanning };
}`,
  },
  {
    id: "express",
    name: "reviewController.ts",
    language: "TypeScript",
    description:
      "Review analytics in one aggregate query rather than three round trips.",
    code: `import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";

export const getReviewAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { businessId } = req.params;
    const analytics = await db.query(\`
      SELECT
        COUNT(*) as total_reviews,
        AVG(rating) as avg_rating,
        COUNT(CASE WHEN sentiment = 'POSITIVE' THEN 1 END) as positive_count,
        COUNT(CASE WHEN sentiment = 'NEGATIVE' THEN 1 END) as negative_count
      FROM reviews
      WHERE business_id = $1
      GROUP BY business_id
    \`, [businessId]);

    return res.status(200).json({ success: true, data: analytics.rows[0] });
  } catch (error) {
    next(error);
  }
};`,
  },
  {
    id: "python",
    name: "dryerCalculator.py",
    language: "Python",
    description:
      "The drying index: three weather factors, clamped and weighted.",
    code: `import math

def calculate_drying_index(temp_c: float, humidity_pct: float, wind_speed_kmh: float) -> dict:
    """Calculates drying score index out of 100."""
    temp_factor = max(0, min(1.0, (temp_c - 10) / 25))
    humidity_factor = max(0, min(1.0, (100 - humidity_pct) / 70))
    wind_factor = max(0, min(1.0, wind_speed_kmh / 40))

    score = (temp_factor * 0.4 + humidity_factor * 0.45 + wind_factor * 0.15) * 100
    score = round(score, 1)

    return {
        "drying_score": score,
        "efficiency": "EXCELLENT" if score > 75 else "MODERATE" if score > 45 else "POOR",
        "est_hours": round(max(1.0, (100 - score) / 15), 1)
    }`,
  },
];

/**
 * Three tones, all low saturation. Rainbow highlighting would fight the rest
 * of the page for attention and reads as decoration; this is just enough
 * contrast to find your place in the code.
 */
const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|("""[\s\S]*?"""|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(import|from|export|const|let|var|function|return|async|await|if|elif|else|try|catch|finally|interface|type|class|def|new|for|while|in|of|as|not|is|None|True|False|null|undefined|public|private)\b/g;

function highlight(line: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;

  // `TOKEN` is module-level and stateful because of the /g flag; reset it
  // before each line so matching always starts from the beginning.
  TOKEN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TOKEN.exec(line)) !== null) {
    if (match.index > last) nodes.push(line.slice(last, match.index));

    const [text, comment, string] = match;
    const className = comment
      ? "text-text-lo italic"
      : string
        ? "text-lume-dim"
        : "font-semibold text-text-hi";

    nodes.push(
      <span key={key++} className={className}>
        {text}
      </span>,
    );
    last = match.index + text.length;
  }

  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

export const CodePlayground: React.FC = () => {
  const [activeId, setActiveId] = useState(SNIPPETS[0].id);
  const active = SNIPPETS.find((s) => s.id === activeId) ?? SNIPPETS[0];
  const toast = useToast();

  useReveal();

  const lines = useMemo(() => active.code.split("\n"), [active.code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(active.code);
      toast("Copied", `${active.name} is on your clipboard.`);
    } catch {
      // Clipboard access fails on insecure origins and when the user has
      // denied permission. Say so rather than claiming success.
      toast("Copy failed", "Select the code and copy it manually.");
    }
  };

  return (
    <Section id="code" className="border-t border-edge">
      <SectionHeader
        eyebrow="Code"
        title="How the work reads up close."
        lede="Three pieces pulled from the projects above."
      />

      <div className="reveal overflow-hidden rounded-lg border border-edge bg-ink-1 shadow-[var(--shadow-2),var(--lit-top)]">
        <div
          role="tablist"
          aria-label="Code samples"
          className="flex overflow-x-auto border-b border-edge"
        >
          {SNIPPETS.map((snippet) => {
            const selected = snippet.id === activeId;
            return (
              <button
                key={snippet.id}
                role="tab"
                aria-selected={selected}
                aria-controls="code-panel"
                onClick={() => setActiveId(snippet.id)}
                className={`shrink-0 cursor-pointer border-b px-4 py-3 font-mono text-[12px]
                  transition-colors duration-[var(--dur-2)]
                  ${
                    selected
                      ? "border-lume bg-ink-2 text-text-hi"
                      : "border-transparent text-text-lo hover:text-text-mid"
                  }`}
              >
                {snippet.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge px-4 py-3">
          <p className="text-[13px] text-text-mid">{active.description}</p>
          <div className="flex items-center gap-3">
            <span className="t-label">{active.language}</span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xs px-2 py-1
                font-mono text-[11px] uppercase tracking-[0.14em] text-text-lo
                transition-colors duration-[var(--dur-2)] hover:text-text-hi"
            >
              <Icon name="copy" size={13} />
              Copy
            </button>
          </div>
        </div>

        <div
          id="code-panel"
          role="tabpanel"
          tabIndex={0}
          className="scroll-shadow max-h-[28rem] overflow-auto
            [--scroll-bg-fade:rgba(16,17,20,0)] [--scroll-bg:var(--color-ink-1)]"
        >
          <pre className="min-w-max py-4 font-mono text-[12.5px] leading-[1.7]">
            <code>
              {lines.map((line, i) => (
                <span key={i} className="flex">
                  <span
                    aria-hidden
                    className="sticky left-0 w-12 shrink-0 select-none bg-ink-1 pr-4
                      text-right text-text-lo/50"
                  >
                    {i + 1}
                  </span>
                  <span className="pr-6 text-text-mid">
                    {line ? highlight(line) : " "}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </Section>
  );
};
