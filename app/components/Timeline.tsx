"use client";

import React from "react";
import { ScrambleText } from "./ScrambleText";

export const Timeline: React.FC = () => {
  const milestones = [
    {
      year: "2024 - PRESENT",
      title: "Senior Full Stack Freelance Developer",
      role: "Independent Software Consultant",
      description:
        "Building AI reputation dashboards (businesshelp), custom mobile OCR web apps (AgriScan), and weather tracking utilities. Partnering with business owners globally to audit, design, and deploy web applications.",
      tags: ["Next.js", "TypeScript", "Node.js", "AI Integration", "PostgreSQL"],
    },
    {
      year: "2023 - 2024",
      title: "Lead Frontend & Web Utility Engineer",
      role: "Product Engineering",
      description:
        "Engineered real-time weather alert utilities for clothes drying schedules and smart dosage calculators for agricultural OCR scans. Focused on responsive PWAs, optimized bundle sizes, and seamless offline caching.",
      tags: ["React", "Tailwind CSS", "REST APIs", "PWA", "Python Automation"],
    },
    {
      year: "2022 - 2023",
      title: "Full Stack Developer & Systems Student",
      role: "Technical Foundations",
      description:
        "Completed intensive computer science and full-stack software development projects in Visakhapatnam. Mastered relational database design, SQL normalizations, backend security headers, and asynchronous event loops.",
      tags: ["JavaScript", "Express.js", "PostgreSQL", "Git Workflows", "Data Structures"],
    },
  ];

  return (
    <section id="timeline" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#08090e] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-2">
            EXPERIENCE & MILESTONES
          </span>
          <h2 className="hero-heading font-display-lg text-4xl md:text-5xl uppercase cursor-default">
            <ScrambleText text="Career Journey" />
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pl-6 md:pl-10">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#12141c] border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-[0_0_12px_var(--accent-glow)]" />

              <div className="glass-card p-6 md:p-8 rounded-3xl group-hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                  <span className="font-code text-xs accent-text font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {item.year}
                  </span>
                  <span className="font-label-caps text-xs text-on-surface-variant/60 uppercase">
                    {item.role}
                  </span>
                </div>

                <h3 className="font-display-lg text-xl md:text-2xl text-white uppercase font-bold mb-3">
                  {item.title}
                </h3>

                <p className="font-body-md text-sm text-on-surface-variant/85 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-label-caps tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-on-surface-variant/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
