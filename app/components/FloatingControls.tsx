"use client";

import React, { useState, useEffect } from "react";

export const FloatingControls: React.FC = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showTop) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3 animate-in fade-in duration-300">
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full bg-[#161822]/90 border border-white/10 hover:border-cyan-400 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer"
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
      </button>
    </div>
  );
};
