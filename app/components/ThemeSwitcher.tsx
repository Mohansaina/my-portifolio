"use client";

import React, { useState, useEffect } from "react";

export type ThemeName = "cyan" | "emerald" | "violet" | "amber" | "crimson";

const themes: Array<{ name: ThemeName; label: string; color: string }> = [
  { name: "cyan", label: "Cyber Cyan", color: "#00f2fe" },
  { name: "emerald", label: "Emerald Glow", color: "#10b981" },
  { name: "violet", label: "Electric Violet", color: "#a855f7" },
  { name: "amber", label: "Solar Amber", color: "#f59e0b" },
  { name: "crimson", label: "Crimson Red", color: "#f43f5e" },
];

export const ThemeSwitcher: React.FC<{ onThemeChange?: (themeName: string) => void }> = ({
  onThemeChange,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("cyan");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mohan_theme") as ThemeName;
    if (saved && themes.some((t) => t.name === saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const changeTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mohan_theme", theme);
    setIsOpen(false);
    if (onThemeChange) {
      const found = themes.find((t) => t.name === theme);
      onThemeChange(`Theme accent changed to ${found?.label || theme}`);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/60 border border-white/10 hover:border-white/20 transition-all text-xs font-label-caps uppercase tracking-wider text-on-surface-variant hover:text-white"
        title="Customize Theme Color"
      >
        <span
          className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: themes.find((t) => t.name === currentTheme)?.color }}
        />
        <span className="hidden sm:inline">Theme</span>
        <span className="material-symbols-outlined text-xs">palette</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#15171e]/95 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant/50 px-3 py-1 mb-1">
            Choose Accent Color
          </div>
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => changeTheme(t.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-label-caps transition-all ${
                currentTheme === t.name
                  ? "bg-white/10 text-white font-bold"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: t.color }}
                />
                <span>{t.label}</span>
              </div>
              {currentTheme === t.name && (
                <span className="material-symbols-outlined text-sm accent-text">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
