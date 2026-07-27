"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrambleText } from "./ScrambleText";

export const About: React.FC = () => {
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ exp: 0, projects: 0, clients: 0 });
  const [activeTab, setActiveTab] = useState<"bio" | "philosophy" | "location">("bio");

  useEffect(() => {
    const scrollText = scrollTextRef.current;
    let chars: NodeListOf<HTMLSpanElement> | null = null;
    if (scrollText) {
      const content = scrollText.textContent || "";
      scrollText.innerHTML = content
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
      chars = scrollText.querySelectorAll("span") as NodeListOf<HTMLSpanElement>;
      chars.forEach((span) => {
        span.style.opacity = "0.15";
        span.style.transition = "opacity 0.2s ease";
      });
    }

    const handleScroll = () => {
      if (scrollText && chars) {
        const rect = scrollText.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(1, (viewHeight - rect.top) / (viewHeight + rect.height))
        );
        const activeCount = Math.floor(progress * chars.length * 1.5);
        chars.forEach((char, index) => {
          if (index < activeCount) {
            char.classList.add("active");
            char.style.opacity = "1";
          } else {
            char.classList.remove("active");
            char.style.opacity = "0.15";
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    // Stats count up observer
    const container = document.querySelector("#about");
    let animated = false;
    let observer: IntersectionObserver | null = null;
    if (container && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !animated) {
            animated = true;
            const duration = 1600;
            const steps = 40;
            const stepTime = duration / steps;
            let currentStep = 0;
            const timer = setInterval(() => {
              currentStep++;
              setStats({
                exp: Math.min(3, Math.floor((3 / steps) * currentStep)),
                projects: Math.min(15, Math.floor((15 / steps) * currentStep)),
                clients: Math.min(10, Math.floor((10 / steps) * currentStep)),
              });
              if (currentStep >= steps) {
                clearInterval(timer);
              }
            }, stepTime);
            observer?.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(container);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      className="relative py-section-gap px-margin-mobile md:px-margin-desktop bg-[#07080c] developer-grid overflow-hidden"
    >
      <div className="absolute inset-0 ambient-glow pointer-events-none" />

      {/* Floating Watermark Icons */}
      <div className="absolute top-20 left-10 opacity-10 pointer-events-none select-none">
        <span className="material-symbols-outlined text-[120px]">code</span>
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 pointer-events-none select-none">
        <span className="material-symbols-outlined text-[120px]">database</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
          <h2 className="hero-heading font-display-lg text-4xl md:text-5xl uppercase cursor-default">
            <ScrambleText text="About me" />
          </h2>

          {/* Quick Bio Tab Selector */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 text-xs font-label-caps">
            <button
              onClick={() => setActiveTab("bio")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeTab === "bio" ? "bg-white/15 text-white font-bold" : "text-white/50 hover:text-white"
              }`}
            >
              Bio
            </button>
            <button
              onClick={() => setActiveTab("philosophy")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeTab === "philosophy" ? "bg-white/15 text-white font-bold" : "text-white/50 hover:text-white"
              }`}
            >
              Philosophy
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeTab === "location" ? "bg-white/15 text-white font-bold" : "text-white/50 hover:text-white"
              }`}
            >
              Base
            </button>
          </div>
        </div>

        {/* Dynamic Bio Box */}
        {activeTab === "bio" && (
          <div
            ref={scrollTextRef}
            className="char-reveal font-display-lg text-2xl md:text-3xl leading-relaxed text-on-surface mb-12"
          >
            Hello! I'm Mohan Ruttala, a passionate Full Stack Developer based in Visakhapatnam, Andhra Pradesh.
            I specialize in building modern, high-performance web applications with cutting-edge tech stacks and a focus on pixel-perfect user experience.
            With a strong foundation in both frontend interfaces and backend architecture, I transform complex business challenges into sleek, robust digital solutions.
          </div>
        )}

        {activeTab === "philosophy" && (
          <div className="glass-card p-8 rounded-3xl mb-12 animate-in fade-in duration-300">
            <h3 className="font-display-lg text-xl text-white uppercase font-bold mb-4 accent-gradient-text">
              Engineering Philosophy
            </h3>
            <p className="font-body-md text-base text-on-surface-variant/90 leading-relaxed mb-4">
              "Great software lies at the intersection of ultra-clean code, thoughtful system architecture, and delightful micro-interactions."
            </p>
            <ul className="space-y-2 text-xs font-label-caps text-on-surface-variant/80">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined accent-text text-sm">check_circle</span>
                Prioritize fast rendering, accessible UI, and clean component hierarchy.
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined accent-text text-sm">check_circle</span>
                Build scalable backend services with strict type safety and optimized database queries.
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined accent-text text-sm">check_circle</span>
                Iterate rapidly with end-to-end testing and production monitoring.
              </li>
            </ul>
          </div>
        )}

        {activeTab === "location" && (
          <div className="glass-card p-8 rounded-3xl mb-12 animate-in fade-in duration-300 flex flex-col md:flex-row gap-6 items-center">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
              <span className="material-symbols-outlined text-4xl">location_on</span>
            </div>
            <div>
              <h3 className="font-display-lg text-xl text-white uppercase font-bold mb-2">
                Visakhapatnam, Andhra Pradesh, India
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant/80">
                Operating globally for remote software development, freelance projects, and tech consulting. IST timezone (UTC+5:30) with flexible overlap for international client hours.
              </p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-10 scroll-reveal">
          <div className="text-center md:text-left">
            <div className="text-4xl md:text-5xl font-display-lg text-white font-black leading-none">
              {stats.exp}+
            </div>
            <div className="font-label-caps text-xs text-on-surface-variant/70 mt-2 uppercase tracking-wider">
              Years Exp.
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-4xl md:text-5xl font-display-lg text-white font-black leading-none">
              {stats.projects}+
            </div>
            <div className="font-label-caps text-xs text-on-surface-variant/70 mt-2 uppercase tracking-wider">
              Projects Completed
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-4xl md:text-5xl font-display-lg text-white font-black leading-none">
              {stats.clients}+
            </div>
            <div className="font-label-caps text-xs text-on-surface-variant/70 mt-2 uppercase tracking-wider">
              Happy Clients
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
