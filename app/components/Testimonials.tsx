"use client";

import React from "react";
import { ScrambleText } from "./ScrambleText";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Srinivas Rao",
      role: "Founder, Business Analytics India",
      content: "Mohan built our AI sentiment analysis dashboard with remarkable speed and precision. The response generator transformed our customer feedback operations.",
      stars: 5,
    },
    {
      name: "Anand Kumar",
      role: "AgriTech Lead",
      content: "The OCR scanning accuracy and dosage calculation formulas in AgriScan exceeded our expectations. Mohan's attention to mobile UI usability is outstanding.",
      stars: 5,
    },
    {
      name: "Priya Sharma",
      role: "E-Commerce Director",
      content: "Working with Mohan on custom backend APIs and Next.js frontends was seamless. Highly communicative, technical, and punctual.",
      stars: 5,
    },
  ];

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#07080c] border-t border-white/5">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-2">
            CLIENT FEEDBACK
          </span>
          <h2 className="hero-heading font-display-lg text-4xl md:text-5xl uppercase cursor-default">
            <ScrambleText text="Testimonials" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                {/* Stars */}
                <div className="flex gap-1 text-amber-400 mb-4">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-sm text-on-surface-variant/90 leading-relaxed italic mb-6">
                  "{rev.content}"
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-display-lg text-sm text-white font-bold">{rev.name}</h4>
                  <p className="font-label-caps text-[11px] text-on-surface-variant/60">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
