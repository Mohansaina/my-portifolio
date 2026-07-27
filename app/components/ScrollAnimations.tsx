"use client";

import React, { useEffect, useState } from "react";

export const ScrollAnimations: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // 1. Scroll Progress & Top Button Handler
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. IntersectionObserver for Reveal Animations
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    });

    const revealElements = document.querySelectorAll(
      ".reveal-up, .reveal-scale, .reveal-left, .reveal-right, .reveal-stagger"
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[100] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-purple-500 shadow-[0_0_15px_rgba(0,242,254,0.9)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-[#11131c]/90 border border-cyan-400/40 text-cyan-400 backdrop-blur-md shadow-[0_0_25px_rgba(0,242,254,0.25)] hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500 hover:text-black transition-all duration-300 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-y-1 transition-transform">
            arrow_upward
          </span>
          <span className="sr-only">Scroll to Top ({Math.round(scrollProgress)}%)</span>
        </button>
      )}
    </>
  );
};
