"use client";

import React, { useState } from "react";
import { useAudio } from "./AudioContext";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface NavbarProps {
  onShowToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowToast }) => {
  const { isMuted, setIsMuted, playBeep } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (nextState === false) {
      // Sound turned on!
      playBeep(880, "sine", 0.08);
      onShowToast("Sound FX Enabled");
    } else {
      onShowToast("Sound FX Muted");
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Timeline", href: "#timeline" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Playground", href: "#playground" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-nav px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center max-w-container-max left-1/2 -translate-x-1/2">
        <a href="#" className="flex items-center gap-2 group cursor-pointer">
          <div className="font-display-lg text-2xl font-bold tracking-tighter text-white group-hover:text-primary transition-colors">
            MR
          </div>
          <span className="w-2 h-2 rounded-full accent-bg animate-pulse shadow-[0_0_10px_var(--accent-color)]" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className="font-label-caps text-xs uppercase tracking-[0.2em] text-on-surface-variant/80 hover:text-white transition-all hover:scale-105 duration-200"
              href={link.href}
              onClick={() => playBeep(600, "sine", 0.03)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-surface-container-high/60 border border-white/10 hover:border-white/20 text-on-surface-variant hover:text-white transition-all flex items-center justify-center cursor-pointer"
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
            aria-label="Toggle Sound Effects"
          >
            <span className="material-symbols-outlined text-sm">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>

          {/* Theme Switcher */}
          <ThemeSwitcher onThemeChange={onShowToast} />

          {/* Resume Button */}
          <button
            onClick={() => {
              playBeep(750, "sine", 0.04);
              setResumeModalOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-label-caps uppercase tracking-wider text-white transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">description</span>
            Resume
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080c]/95 backdrop-blur-3xl flex flex-col justify-center items-center gap-8 lg:hidden animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className="font-display-lg text-2xl uppercase tracking-[0.1em] text-white hover:text-cyan-400 transition-colors"
              href={link.href}
              onClick={() => {
                playBeep(600, "sine", 0.03);
                setMobileMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setResumeModalOpen(true);
            }}
            className="mt-4 px-6 py-3 rounded-full bg-white/10 text-white font-label-caps text-sm uppercase tracking-wider flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            View Resume Specs
          </button>
        </div>
      )}

      {/* Quick Resume Overview Modal */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#14161d] border border-white/10 max-w-lg w-full rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setResumeModalOpen(false)}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-white p-2"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl">
                <span className="material-symbols-outlined text-2xl">badge</span>
              </div>
              <div>
                <h3 className="font-display-lg text-xl uppercase font-bold text-white">Mohan Ruttala</h3>
                <p className="font-label-caps text-xs text-on-surface-variant/70">Full Stack Software Engineer</p>
              </div>
            </div>
            <div className="space-y-4 font-body-md text-xs text-on-surface-variant/90 border-t border-b border-white/5 py-4">
              <div className="flex justify-between">
                <span className="text-white/60">Location:</span>
                <span className="text-white font-bold">Visakhapatnam, Andhra Pradesh, India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Primary Stack:</span>
                <span className="text-white font-bold">React, Next.js, TypeScript, Node.js, Python</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Experience Level:</span>
                <span className="text-white font-bold">3+ Years Building Production Apps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Availability:</span>
                <span className="accent-text font-bold">Freelance / Full-Time Contract</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={() => setResumeModalOpen(false)}
                className="flex-1 text-center py-3 rounded-full ignition-gradient font-label-caps text-xs uppercase tracking-wider text-black font-bold hover:scale-105 transition-transform"
              >
                Hire Mohan Now
              </a>
              <button
                onClick={() => {
                  setResumeModalOpen(false);
                  onShowToast("Resume details requested!");
                }}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-label-caps text-xs uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
