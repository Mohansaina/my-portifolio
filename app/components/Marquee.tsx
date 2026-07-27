"use client";

import React, { useRef, useEffect } from "react";

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (containerRef.current) {
        const duration = Math.max(12, 38 - scrollY * 0.015);
        containerRef.current.style.setProperty("--marquee-duration", `${duration}s`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const marqueeRow1 = [
    {
      icon: "layers",
      category: "FRONTEND",
      title: "React & Next.js",
      desc: "Declarative UI architectures, App Router, SSR/SSG rendering optimizations.",
    },
    {
      icon: "code",
      category: "LANGUAGES",
      title: "JS & TypeScript",
      desc: "Strong typing, async programming, data structures, and modern ES6+ paradigms.",
    },
    {
      icon: "api",
      category: "BACKEND",
      title: "Node.js & Express",
      desc: "Event-driven backend servers, database integrations, RESTful gateways.",
    },
    {
      icon: "terminal",
      category: "SCRIPTS",
      title: "Python Automation",
      desc: "Data scrapers, script automation, OCR labels, and mathematical calculators.",
    },
  ];

  const marqueeRow2 = [
    {
      icon: "database",
      category: "STORAGE",
      title: "PostgreSQL & DBs",
      desc: "Relational schemas, SQL queries, ACID transactions, data normalization.",
    },
    {
      icon: "psychology",
      category: "AI & ML",
      title: "AI Review Engine",
      desc: "Business reputation dashboard with sentiment analysis and auto-replies.",
    },
    {
      icon: "document_scanner",
      category: "VISION",
      title: "AgriScan Mobile",
      desc: "Smart label reader helper enabling precise dosage calculator formulas.",
    },
    {
      icon: "schema",
      category: "PIPELINE",
      title: "Git & CI/CD",
      desc: "Version control, collaborative codebases, and continuous integration flows.",
    },
  ];

  return (
    <section ref={containerRef} className="py-16 bg-[#07080c] overflow-hidden border-t border-b border-white/5">
      {/* Row 1: Moving Right */}
      <div className="marquee-container mb-6">
        <div className="marquee-track">
          <div className="flex gap-6 px-3">
            {marqueeRow1.map((item, idx) => (
              <MarqueeCard key={idx} {...item} />
            ))}
          </div>
          <div className="flex gap-6 px-3">
            {marqueeRow1.map((item, idx) => (
              <MarqueeCard key={`dup1-${idx}`} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Moving Left */}
      <div className="marquee-container">
        <div className="marquee-track-reverse">
          <div className="flex gap-6 px-3">
            {marqueeRow2.map((item, idx) => (
              <MarqueeCard key={idx} {...item} />
            ))}
          </div>
          <div className="flex gap-6 px-3">
            {marqueeRow2.map((item, idx) => (
              <MarqueeCard key={`dup2-${idx}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MarqueeCard: React.FC<{
  icon: string;
  category: string;
  title: string;
  desc: string;
}> = ({ icon, category, title, desc }) => {
  return (
    <div className="w-72 h-38 bg-[#12141c]/60 border border-white/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-5 flex flex-col justify-between hover:border-cyan-400/40 hover:bg-[#181a24] transition-all duration-300 cursor-pointer select-none">
      <div className="flex justify-between items-start">
        <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <span className="font-label-caps text-[9px] text-white/40 tracking-wider">
          {category}
        </span>
      </div>
      <div>
        <h4 className="font-display-lg text-sm text-white tracking-wider uppercase mb-1 font-bold">
          {title}
        </h4>
        <p className="font-body-md text-[11px] text-on-surface-variant/75 leading-normal line-clamp-2">
          {desc}
        </p>
      </div>
    </div>
  );
};
