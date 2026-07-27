"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScrambleText } from "./ScrambleText";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "database" | "ai">("all");
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const skillsData = [
    // Frontend
    { name: "HTML5 / CSS3 / Tailwind CSS v4", category: "frontend", level: 95, color: "from-[#00b4db] to-[#0083b0]" },
    { name: "JavaScript (ES6+) / TypeScript", category: "frontend", level: 92, color: "from-[#f12711] to-[#f5af19]" },
    { name: "React 19 / Next.js (App Router)", category: "frontend", level: 88, color: "from-[#3a7bd5] to-[#3a6073]" },
    { name: "Responsive UI & Animations (Framer/Canvas)", category: "frontend", level: 85, color: "from-[#a855f7] to-[#ec4899]" },

    // Backend
    { name: "Node.js / Express.js REST APIs", category: "backend", level: 85, color: "from-[#11998e] to-[#38ef7d]" },
    { name: "Python / FastAPI / Django", category: "backend", level: 80, color: "from-[#8a2387] to-[#e94057]" },
    { name: "Asynchronous Workflows & Serverless", category: "backend", level: 82, color: "from-[#f43f5e] to-[#fb7185]" },

    // Database & Cloud
    { name: "PostgreSQL & SQL Query Optimization", category: "database", level: 88, color: "from-[#ff00cc] to-[#333399]" },
    { name: "SQLite, Redis Caching, & Schema Design", category: "database", level: 84, color: "from-[#00c6ff] to-[#0072ff]" },
    { name: "Git, Docker, AWS & Vercel Deployments", category: "database", level: 85, color: "from-[#f12711] to-[#f5af19]" },

    // AI & Automation
    { name: "AI Sentiment Analysis & Auto-Reply Prompts", category: "ai", level: 85, color: "from-[#10b981] to-[#3b82f6]" },
    { name: "Mobile OCR Label Readers (AgriScan)", category: "ai", level: 82, color: "from-[#a855f7] to-[#06b6d4]" },
  ];

  const filteredSkills = activeCategory === "all" ? skillsData : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-section-gap px-margin-mobile md:px-margin-desktop bg-[#07080c] developer-grid overflow-hidden border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-2">
              TECHNICAL COMPETENCY
            </span>
            <h2 className="hero-heading font-display-lg text-4xl md:text-5xl uppercase cursor-default">
              <ScrambleText text="My Skills" />
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 text-xs font-label-caps">
            {[
              { id: "all", label: "All" },
              { id: "frontend", label: "Frontend" },
              { id: "backend", label: "Backend" },
              { id: "database", label: "Database & DevOps" },
              { id: "ai", label: "AI & OCR" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeCategory === cat.id
                    ? "bg-white/15 text-white font-bold shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Progress Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkills.map((skill, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl hover:border-white/20 transition-all">
              <div className="flex justify-between items-center mb-2 font-label-caps text-xs text-white">
                <span className="font-bold">{skill.name}</span>
                <span className="accent-text font-code font-bold">{skill.level}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out shadow-sm`}
                  style={{
                    width: animate ? `${skill.level}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
