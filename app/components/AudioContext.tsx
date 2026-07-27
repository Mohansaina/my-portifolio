"use client";

import React, { createContext, useContext, useState } from "react";

interface AudioContextType {
  isMuted: boolean;
  setIsMuted: (muted: boolean | ((prev: boolean) => boolean)) => void;
  playBeep: (freq?: number, type?: OscillatorType, duration?: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  setIsMuted: () => {},
  playBeep: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);

  const playBeep = (freq = 800, type: OscillatorType = "sine", duration = 0.05) => {
    if (typeof window === "undefined" || isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context silenced or not allowed without user interaction
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, setIsMuted, playBeep }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
