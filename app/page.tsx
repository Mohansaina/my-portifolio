"use client";

import React, { useState } from "react";
import { AudioProvider } from "./components/AudioContext";
import { CustomCursor } from "./components/CustomCursor";
import { GlobalBackground } from "./components/GlobalBackground";
import { ScrollAnimations } from "./components/ScrollAnimations";
import { Toast, ToastMessage } from "./components/Toast";
import { FloatingControls } from "./components/FloatingControls";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Terminal } from "./components/Terminal";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Timeline } from "./components/Timeline";
import { Skills } from "./components/Skills";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { CodePlayground } from "./components/CodePlayground";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";

export default function Home() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
    };
    setToasts((prev) => [...prev.slice(-3), newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Silky Magnetic Button Hover Helper
  const handleMagnetButton = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0) scale(1.04)`;
    btn.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  const handleMagnetButtonReset = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = "translate3d(0px, 0px, 0) scale(1)";
    btn.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  return (
    <AudioProvider>
      <div className="relative min-h-screen bg-[#07080c] text-on-surface">
        <GlobalBackground />
        <ScrollAnimations />
        <CustomCursor />
        <Toast toasts={toasts} onDismiss={removeToast} />
        <FloatingControls />

        <Navbar onShowToast={(msg) => addToast(msg)} />

        <main className="relative">
          <Hero
            onMagnetButton={handleMagnetButton}
            onMagnetButtonReset={handleMagnetButtonReset}
          />
          <Terminal />
          <Marquee />
          <About />
          <Timeline />
          <Skills />
          <Services />
          <Projects />
          <CodePlayground onShowToast={(msg) => addToast(msg)} />
          <Testimonials />
          <Contact
            onMagnetButton={handleMagnetButton}
            onMagnetButtonReset={handleMagnetButtonReset}
            onShowToast={addToast}
          />
        </main>
      </div>
    </AudioProvider>
  );
}
