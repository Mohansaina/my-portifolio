"use client";

import React, { useRef } from "react";
import { ParticleCanvas } from "./ParticleCanvas";
import { ScrambleText } from "./ScrambleText";

interface HeroProps {
  onMagnetButton: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  onMagnetButtonReset: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export const Hero: React.FC<HeroProps> = ({ onMagnetButton, onMagnetButtonReset }) => {
  const magnetWrapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    if (magnetWrapRef.current) {
      magnetWrapRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (magnetWrapRef.current) {
      magnetWrapRef.current.style.transform = "translate(0, 0)";
    }
  };

  const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      onMouseMove={handleSpotlightMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-[#07080c] developer-grid flashlight-spotlight"
    >
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <ParticleCanvas />

      {/* Main Content */}
      <div className="text-center z-10 px-margin-mobile max-w-4xl mx-auto flex flex-col items-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-high/60 border border-white/10 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-label-caps text-xs text-on-surface-variant/90 tracking-widest uppercase">
            Available for Freelance & Full-time Roles
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-heading font-display-2xl text-[54px] sm:text-[84px] md:text-[100px] uppercase italic leading-none mb-8 tracking-tighter cursor-default select-none">
          <ScrambleText text="Hi, i'm Mohan" />
        </h1>

        {/* Magnetic Profile Container */}
        <div
          className="magnet-container relative w-64 h-64 sm:w-80 sm:h-80 md:w-[340px] md:h-[340px] mx-auto group cursor-pointer mb-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Pulsing Aura Rings */}
          <div className="absolute inset-0 rounded-full border border-white/10 scale-105 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-700 animate-pulse pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-white/5 scale-110 group-hover:scale-120 group-hover:border-cyan-500/20 transition-all duration-1000 animate-ping pointer-events-none [animation-duration:4s]" />

          <div ref={magnetWrapRef} className="magnet-wrap w-full h-full">
            <img
              className="w-full h-full object-cover rounded-full border-4 border-white/10 group-hover:border-cyan-400/40 transition-all duration-500 shadow-[0_0_60px_rgba(0,242,254,0.12)]"
              alt="Mohan Ruttala Portrait - Full Stack Developer based in Visakhapatnam, Andhra Pradesh, India."
              src="/myprofile.jpg"
            />
          </div>

          {/* Interactive Tech Orbits */}
          <div className="absolute -top-4 -left-4 w-14 h-14 bg-[#14161f]/80 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl group-hover:border-cyan-400/40 transition-all duration-300 animate-float-slow select-none">
            <span className="material-symbols-outlined accent-text text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              terminal
            </span>
          </div>
          <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-[#14161f]/80 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl group-hover:border-cyan-400/40 transition-all duration-300 animate-float-medium select-none">
            <span className="material-symbols-outlined accent-text text-2xl">
              database
            </span>
          </div>
          <div className="absolute top-10 -right-10 w-12 h-12 bg-[#14161f]/80 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl group-hover:border-cyan-400/40 transition-all duration-300 animate-float-fast select-none">
            <span className="material-symbols-outlined accent-text text-xl">
              cloud
            </span>
          </div>
          <div className="absolute bottom-10 -left-10 w-12 h-12 bg-[#14161f]/80 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl group-hover:border-cyan-400/40 transition-all duration-300 animate-float-slow select-none">
            <span className="material-symbols-outlined accent-text text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              layers
            </span>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-wrap justify-center gap-4 z-20">
          <a
            href="#contact"
            onMouseMove={onMagnetButton}
            onMouseLeave={onMagnetButtonReset}
            className="ignition-gradient px-8 py-4 rounded-full font-label-caps text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-2 cursor-pointer select-none"
          >
            CONTACT ME{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_outward
            </span>
          </a>
          <a
            href="#projects"
            onMouseMove={onMagnetButton}
            onMouseLeave={onMagnetButtonReset}
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-label-caps text-xs uppercase tracking-widest text-white transition-transform flex items-center gap-2 cursor-pointer select-none"
          >
            EXPLORE WORKS
            <span className="material-symbols-outlined text-sm">
              keyboard_arrow_down
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
