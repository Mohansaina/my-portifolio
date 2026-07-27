"use client";

import React, { useState } from "react";
import { ScrambleText } from "./ScrambleText";

interface Snippet {
  id: string;
  name: string;
  language: string;
  code: string;
  description: string;
}

const snippets: Snippet[] = [
  {
    id: "hook",
    name: "useSentimentScanner.ts",
    language: "typescript",
    description: "Custom React Hook for real-time sentiment analysis parsing and score calculation.",
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
    language: "typescript",
    description: "Node.js & Express REST controller for processing business reviews with rate-limiting.",
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
    language: "python",
    description: "Python utility algorithm calculating clothes drying efficiency index from weather telemetry.",
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

export const CodePlayground: React.FC<{ onShowToast: (msg: string) => void }> = ({ onShowToast }) => {
  const [activeId, setActiveId] = useState("hook");
  const activeSnippet = snippets.find((s) => s.id === activeId) || snippets[0];

  const copyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    onShowToast(`Copied ${activeSnippet.name} to clipboard!`);
  };

  return (
    <section id="playground" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#07080c] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-2">
              CODE UTILITIES
            </span>
            <h2 className="hero-heading font-display-lg text-4xl md:text-5xl uppercase cursor-default">
              <ScrambleText text="Code Playground" />
            </h2>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant/80 max-w-sm">
            Inspect clean full-stack snippet architecture written by Mohan.
          </p>
        </div>

        {/* Sandbox Window */}
        <div className="bg-[#0f1118] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between bg-[#161822] border-b border-white/10 px-4 py-3 gap-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {snippets.map((snip) => (
                <button
                  key={snip.id}
                  onClick={() => setActiveId(snip.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-code text-xs transition-all flex items-center gap-2 ${
                    activeId === snip.id
                      ? "bg-white/15 text-cyan-400 font-bold border border-cyan-500/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  {snip.name}
                </button>
              ))}
            </div>

            {/* Copy Button */}
            <button
              onClick={copyCode}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white font-label-caps text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
              Copy Code
            </button>
          </div>

          {/* Description bar */}
          <div className="px-6 py-3 bg-[#12141e] border-b border-white/5 font-body-md text-xs text-on-surface-variant/75 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-cyan-400">info</span>
            {activeSnippet.description}
          </div>

          {/* Code Viewer */}
          <div className="p-6 overflow-x-auto max-h-[380px] font-code text-xs leading-relaxed text-on-surface select-text bg-[#090a0f]">
            <pre className="whitespace-pre">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
