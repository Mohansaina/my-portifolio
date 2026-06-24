"use client";

import { useEffect, useRef, useState } from "react";

// Interactive HTML5 Neural Network Particle Backdrop
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const particleCount = Math.min(70, Math.floor((width * height) / 18000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Particle motion
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundary bounce
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(252, 253, 255, ${0.06 * (1 - dist / 110)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw line to mouse
        if (mouse.x > -500) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < 130) {
            ctx.strokeStyle = `rgba(252, 253, 255, ${0.12 * (1 - mDist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gravity pull toward mouse
            const force = (130 - mDist) * 0.0003;
            p1.x += (mouse.x - p1.x) * force;
            p1.y += (mouse.y - p1.y) * force;
          }
        }

        // Draw particle
        ctx.fillStyle = "rgba(252, 253, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
}

// Scramble Text Hover Effect Component
function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        isScrambling.current = false;
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span onMouseEnter={scramble} className={className}>
      {displayText}
    </span>
  );
}

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animateSkills, setAnimateSkills] = useState(false);
  const [stats, setStats] = useState({ exp: 0, projects: 0, clients: 0 });

  // Terminal Simulator State
  const [terminalInputText, setTerminalInputText] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; isCmd?: boolean }>>([
    { text: "MohanOS v4.2.0 initialized successfully.", isCmd: false },
    { text: "Type 'help' to list diagnostics commands.", isCmd: false }
  ]);
  const [terminalOutput, setTerminalOutput] = useState("");

  const magnetWrapRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);

  // Web Audio Synthesizer (No external assets required!)
  const playBeep = (freq = 800, type: OscillatorType = "sine", duration = 0.05) => {
    if (typeof window === "undefined" || isMuted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Magnetic Portrait Effect
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

  // Cursor-tracking spotlight function
  const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  // Quick Action Console Scripts
  const runTerminalCommand = (cmd: string) => {
    playBeep(900, "sine", 0.04);
    const newHistory = [...terminalHistory, { text: `$ run ${cmd}`, isCmd: true }];
    
    if (cmd === "view_skills.sh" || cmd === "skills") {
      newHistory.push({
        text: "> FE: React, Next.js, TS, Tailwind\n> BE: Node.js, Express, Python, Django/FastAPI\n> DB: PostgreSQL, SQL Query Optimization, Redis",
        isCmd: false
      });
    } else if (cmd === "list_projects.py" || cmd === "projects") {
      newHistory.push({
        text: "> Projects:\n  1. AI Review Tool (businesshelp) - Active\n  2. AgriScan Mobile OCR App - Completed\n  3. Clothes Dryer Alert Utility - Active",
        isCmd: false
      });
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      return;
    }
    setTerminalHistory(newHistory);
  };

  // Keyboard Submission Shell command simulator
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInputText.trim().toLowerCase();
    if (!cmd) return;

    playBeep(800, "square", 0.06);
    const newHistory = [...terminalHistory, { text: `$ ${terminalInputText}`, isCmd: true }];

    if (cmd === "help") {
      newHistory.push({
        text: "Commands:\n  help      - List commands\n  skills    - List tech stack\n  projects  - Show recent builds\n  matrix    - Load cipher code stream\n  clear     - Clear shell",
        isCmd: false
      });
    } else if (cmd === "skills") {
      newHistory.push({
        text: "FE:  React, Next.js, TypeScript, Tailwind\nBE:  Node.js, Express, Python, Django/FastAPI\nDB:  PostgreSQL, SQLite, SQL Normalization\nSys: Git, Docker Container, AWS deployment",
        isCmd: false
      });
    } else if (cmd === "projects") {
      newHistory.push({
        text: "Recent:\n  • businesshelp - AI Reviews\n  • AgriScan     - Smart dosage\n  • ClothesDryer - Weather tracking API",
        isCmd: false
      });
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInputText("");
      return;
    } else if (cmd === "matrix" || cmd === "secret") {
      newHistory.push({
        text: "Mohan is a code wizard. System online.\n====================================\n01001101 01001111 01001000 01000001 01001110",
        isCmd: false
      });
    } else {
      newHistory.push({
        text: `Error: command not found '${cmd}'. Type 'help' for info.`,
        isCmd: false
      });
    }

    setTerminalHistory(newHistory);
    setTerminalInputText("");
  };

  const handleTerminalTab = (tab: string) => {
    playBeep(900, "sine", 0.04);
    if (tab === "skills") {
      setTerminalOutput(
        "> FE: React, Next.js, TS, Tailwind\n> BE: Node.js, Express, Python, Django/FastAPI\n> DB: PostgreSQL, SQL Query Optimization, Redis"
      );
    } else if (tab === "projects") {
      setTerminalOutput(
        "> Projects:\n  1. AI Review Tool (businesshelp) - Active\n  2. AgriScan Mobile OCR App - Completed\n  3. Clothes Dryer Alert Utility - Active"
      );
    } else if (tab === "clear") {
      setTerminalOutput("");
    }
  };

  // 3D Card Hover Tilt Effects
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 22; // max tilt vertically
    const angleY = (x - xc) / 22; // max tilt horizontally
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Snappy Magnetic Button Hover
  const handleMagnetButton = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
    btn.style.transition = "transform 0.1s ease-out";
  };

  const handleMagnetButtonReset = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = "translate(0px, 0px) scale(1)";
    btn.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
  };




  useEffect(() => {
    // About Text Character Reveal Animation
    const scrollText = scrollTextRef.current;
    let chars: NodeListOf<HTMLSpanElement> | null = null;
    if (scrollText) {
      const content = scrollText.textContent || "";
      scrollText.innerHTML = content
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
      chars = scrollText.querySelectorAll("span") as NodeListOf<HTMLSpanElement>;
      // Initially set low opacity
      chars.forEach((span) => {
        span.style.opacity = "0.1";
        span.style.transition = "opacity 0.25s ease";
      });
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Marquee Velocity Control
      if (marqueeContainerRef.current) {
        const duration = Math.max(10, 40 - scrollY * 0.02);
        marqueeContainerRef.current.style.setProperty(
          "--marquee-duration",
          `${duration}s`
        );
      }

      // 2. About Character Reveal
      if (scrollText && chars) {
        const rect = scrollText.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        // Calculate progress through the section
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
            char.style.opacity = "0.1";
          }
        });
      }

      // 3. Project Cards Stacking/Scaling
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".project-card") as NodeListOf<HTMLElement>;
        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          if (rect.top <= 160 && rect.top > -rect.height) {
            // Start scaling down slightly as it's sticky and more content scrolls over
            const scale = 1 - Math.abs(rect.top - 160) * 0.0001 * (index + 1);
            card.style.transform = `scale(${Math.max(0.9, scale)})`;
          } else {
            card.style.transform = "scale(1)";
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to establish correct states
    setTimeout(handleScroll, 100);

    // Skills Section Animate Trigger on Scroll/Viewport Entry
    const skillsSection = skillsSectionRef.current;
    let skillsObserver: IntersectionObserver | null = null;
    if (skillsSection && typeof IntersectionObserver !== "undefined") {
      skillsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setAnimateSkills(true);
            skillsObserver?.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      skillsObserver.observe(skillsSection);
    }

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // Stats Count Up Observer
    const statsContainer = document.querySelector("#about");
    let statsAnimated = false;
    let statsObserver: IntersectionObserver | null = null;
    if (statsContainer && typeof IntersectionObserver !== "undefined") {
      statsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const duration = 1600; // 1.6s
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
            statsObserver?.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      statsObserver.observe(statsContainer);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (skillsObserver) {
        skillsObserver.disconnect();
      }
      revealObserver.disconnect();
      if (statsObserver) {
        statsObserver.disconnect();
      }
    };
  }, []);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-surface/30 border-b border-outline/10 px-margin-mobile md:px-margin-desktop py-6 flex justify-between items-center max-w-container-max left-1/2 -translate-x-1/2 glass-nav">
        <div className="font-display-lg text-headline-md tracking-tighter text-primary">
          MR
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a
            className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant transition-all hover:opacity-100 opacity-70 hover:scale-105 duration-300"
            href="#about"
          >
            About
          </a>
          <a
            className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant transition-all hover:opacity-100 opacity-70 hover:scale-105 duration-300"
            href="#skills"
          >
            Skills
          </a>
          <a
            className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant transition-all hover:opacity-100 opacity-70 hover:scale-105 duration-300"
            href="#services"
          >
            Services
          </a>
          <a
            className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant transition-all hover:opacity-100 opacity-70 hover:scale-105 duration-300"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-on-surface-variant transition-all hover:opacity-100 opacity-70 hover:scale-105 duration-300"
            href="#contact"
          >
            Contact
          </a>
        </div>
        <button
          className="md:hidden text-primary p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 md:hidden">
          <a
            className="font-display-lg text-headline-md uppercase tracking-[0.1em] text-primary hover:text-primary-container transition-colors"
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            className="font-display-lg text-headline-md uppercase tracking-[0.1em] text-primary hover:text-primary-container transition-colors"
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
          >
            Skills
          </a>
          <a
            className="font-display-lg text-headline-md uppercase tracking-[0.1em] text-primary hover:text-primary-container transition-colors"
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </a>
          <a
            className="font-display-lg text-headline-md uppercase tracking-[0.1em] text-primary hover:text-primary-container transition-colors"
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a
            className="font-display-lg text-headline-md uppercase tracking-[0.1em] text-primary hover:text-primary-container transition-colors"
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section 
        onMouseMove={handleSpotlightMouseMove}
        className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden bg-[#0C0C0C] developer-grid flashlight-spotlight"
      >
        <div className="absolute inset-0 ambient-glow pointer-events-none" />
        <ParticleCanvas />
        <div className="text-center z-10 px-margin-mobile">
          <h1 className="hero-heading font-display-2xl text-[60px] sm:text-[90px] md:text-display-2xl uppercase italic leading-none mb-8 tracking-tighter cursor-default">
            <ScrambleText text="Hi, i'm Mohan" />
          </h1>
          <div
            className="magnet-container relative w-64 h-64 sm:w-80 sm:h-80 md:w-80 md:h-[400px] mx-auto group cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Pulsing Aura Rings */}
            <div className="absolute inset-0 rounded-full border border-primary/10 scale-105 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-700 animate-pulse pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-primary/5 scale-110 group-hover:scale-120 group-hover:border-primary/10 transition-all duration-1000 animate-ping pointer-events-none [animation-duration:3s]" />
            
            <div
              ref={magnetWrapRef}
              className="magnet-wrap w-full h-full"
            >
              <img
                className="w-full h-full object-cover rounded-full border-4 border-outline/20 group-hover:border-primary/30 transition-all duration-500 shadow-[0_0_50px_rgba(252,253,255,0.03)]"
                alt="Mohan Ruttala Portrait - Full Stack Developer based in Visakhapatnam, Andhra Pradesh, India."
                src="/myprofile.jpg"
              />
            </div>
            
            {/* Interactive Orbits */}
            {/* Top-Left: Code/Terminal */}
            <div className="absolute -top-6 -left-6 w-14 h-14 bg-surface-container-high/70 border border-outline/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:border-primary/30 transition-all duration-300 animate-float-slow select-none">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                terminal
              </span>
            </div>
            {/* Bottom-Right: Database */}
            <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-surface-container-high/70 border border-outline/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:border-primary/30 transition-all duration-300 animate-float-medium select-none">
              <span className="material-symbols-outlined text-primary text-2xl">
                database
              </span>
            </div>
            {/* Top-Right: Cloud */}
            <div className="absolute top-12 -right-12 w-12 h-12 bg-surface-container-high/70 border border-outline/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:border-primary/30 transition-all duration-300 animate-float-fast select-none">
              <span className="material-symbols-outlined text-primary text-xl">
                cloud
              </span>
            </div>
            {/* Bottom-Left: Frontend Layers */}
            <div className="absolute bottom-12 -left-12 w-12 h-12 bg-surface-container-high/70 border border-outline/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:border-primary/30 transition-all duration-300 animate-float-slow select-none">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                layers
              </span>
            </div>
          </div>
        </div>
        {/* Bottom Hero Bar */}
        <div className="absolute bottom-10 left-0 w-full px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center md:items-end gap-6 z-10">
          <div className="max-w-md w-full text-left bg-surface-container/60 border border-outline/15 backdrop-blur-md rounded-2xl p-5 shadow-2xl relative overflow-hidden group/term scroll-reveal reveal-active">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-outline/10 pb-3 mb-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-label-caps text-[9px] text-on-surface-variant/40 tracking-widest">mohan@visakhapatnam:~</span>
            </div>
            
            {/* Terminal output */}
            <div className="font-body-md text-[11px] leading-relaxed space-y-2.5 text-on-surface-variant/90 select-none">
              <div className="flex items-center gap-2">
                <span className="text-[#38ef7d] font-bold">$</span>
                <span className="text-[#fcfdff] font-bold">whoami</span>
              </div>
              <p className="text-on-surface-variant/80 pl-4">
                Mohan Ruttala — Full Stack Developer based in Visakhapatnam, AP, India.
              </p>
              
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[#38ef7d] font-bold">$</span>
                <span className="text-[#fcfdff] font-bold">cat availability.json</span>
              </div>
              <div className="pl-4 border-l-2 border-primary/10 space-y-1 py-1 text-on-surface-variant/75 bg-surface-container-low/30 rounded-r-lg">
                <p>{"{"}</p>
                <p className="pl-4">"role": "Full Stack Engineer",</p>
                <p className="pl-4">"experience": "3+ Years",</p>
                <p className="pl-4">"availability": "Freelance"</p>
                <p>{"}"}</p>
              </div>

              {/* Interactive terminal tabs */}
              <div className="pt-3 border-t border-outline/5 flex flex-wrap gap-2 text-[9px] font-label-caps">
                <button 
                  onClick={() => handleTerminalTab("skills")} 
                  className="px-2.5 py-1 rounded bg-[#27c93f]/10 text-[#38ef7d] border border-[#27c93f]/20 hover:bg-[#27c93f]/25 transition-all cursor-pointer select-none"
                >
                  view_skills.sh
                </button>
                <button 
                  onClick={() => handleTerminalTab("projects")} 
                  className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/25 transition-all cursor-pointer select-none"
                >
                  list_projects.py
                </button>
                <button 
                  onClick={() => handleTerminalTab("clear")} 
                  className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25 transition-all cursor-pointer select-none ml-auto"
                >
                  clear
                </button>
              </div>

              {/* Dynamic Console Output */}
              {terminalOutput && (
                <div className="mt-3 p-3 bg-surface-container-lowest/80 border border-outline/10 rounded-lg text-primary text-[10px] font-mono whitespace-pre-line leading-relaxed">
                  {terminalOutput}
                </div>
              )}
            </div>
          </div>
          <a
            href="#contact"
            onMouseMove={handleMagnetButton}
            onMouseLeave={handleMagnetButtonReset}
            className="ignition-gradient px-8 py-4 rounded-full font-label-caps text-label-caps text-background hover:scale-110 transition-transform shadow-xl shadow-error/20 flex items-center gap-2 select-none"
          >
            CONTACT ME{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_outward
            </span>
          </a>
        </div>
      </section>

      {/* Marquee Section */}
      <section
        ref={marqueeContainerRef}
        className="py-20 bg-surface-container-lowest overflow-hidden"
      >
        {/* Row 1: Right Moving */}
        <div className="marquee-container mb-8">
          <div className="marquee-track">
            {/* Duplicate items for seamless loop */}
            <div className="flex gap-8 px-4">
              {/* Card 1: React & Next.js */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">layers</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">FRONTEND</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">React & Next.js</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Declarative UI architectures, App Router, SSR/SSG rendering optimizations.</p>
                </div>
              </div>

              {/* Card 2: JavaScript & TypeScript */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">code</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">LANGUAGES</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">JS & TypeScript</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Strong typing, async programming, data structures, and modern ES6+ paradigms.</p>
                </div>
              </div>

              {/* Card 3: Node.js & APIs */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">api</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">BACKEND</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">Node.js & Express</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Event-driven backend servers, database integrations, RESTful gateways.</p>
                </div>
              </div>

              {/* Card 4: Python Services */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">terminal</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">SCRIPTS</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">Python Automation</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Data scrapers, script automation, OCR labels, and mathematical calculators.</p>
                </div>
              </div>
            </div>

            {/* Duplicate track for seamless infinite scroll */}
            <div className="flex gap-8 px-4">
              {/* Card 1 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">layers</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">FRONTEND</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">React & Next.js</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Declarative UI architectures, App Router, SSR/SSG rendering optimizations.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">code</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">LANGUAGES</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">JS & TypeScript</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Strong typing, async programming, data structures, and modern ES6+ paradigms.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">api</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">BACKEND</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">Node.js & Express</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Event-driven backend servers, database integrations, RESTful gateways.</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">terminal</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">SCRIPTS</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">Python Automation</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Data scrapers, script automation, OCR labels, and mathematical calculators.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Left Moving */}
        <div className="marquee-container">
          <div className="marquee-track-reverse">
            <div className="flex gap-8 px-4">
              {/* Card 5: PostgreSQL Database */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">database</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">STORAGE</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">PostgreSQL & DBs</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Relational schemas, SQL queries, ACID transactions, data normalization.</p>
                </div>
              </div>

              {/* Card 6: AI Reputation Tool */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">psychology</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">PROJECT</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">AI Review Tool</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Business reputation dashboard with sentiment analysis and auto-replies.</p>
                </div>
              </div>

              {/* Card 7: AgriScan OCR App */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">document_scanner</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">PROJECT</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">AgriScan Mobile</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Smart label reader helper enabling precise dosage calculator formulas.</p>
                </div>
              </div>

              {/* Card 8: Git & Workflows */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">schema</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">PIPELINE</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">Git & Workflows</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Version control, collaborative codebases, and continuous integration flows.</p>
                </div>
              </div>
            </div>

            {/* Duplicate track for seamless infinite scroll */}
            <div className="flex gap-8 px-4">
              {/* Card 5 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">database</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">STORAGE</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">PostgreSQL & DBs</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Relational schemas, SQL queries, ACID transactions, data normalization.</p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">psychology</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">PROJECT</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">AI Review Tool</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Business reputation dashboard with sentiment analysis and auto-replies.</p>
                </div>
              </div>

              {/* Card 7 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">document_scanner</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">PROJECT</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">AgriScan Mobile</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Smart label reader helper enabling precise dosage calculator formulas.</p>
                </div>
              </div>

              {/* Card 8 */}
              <div className="w-72 h-40 bg-surface-container/30 border border-outline/10 backdrop-blur-md rounded-2xl flex-shrink-0 relative group p-6 flex flex-col justify-between hover:border-primary-fixed/40 hover:bg-surface-container/60 transition-all duration-300 cursor-pointer select-none">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-surface-container-high rounded-xl text-primary-fixed group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">schema</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/40 tracking-wider">PIPELINE</span>
                </div>
                <div>
                  <h4 className="font-display-lg text-[16px] text-primary tracking-wider uppercase mb-1 font-bold">Git & Workflows</h4>
                  <p className="font-body-md text-[12px] text-on-surface-variant/80 leading-normal">Version control, collaborative codebases, and continuous integration flows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section
        onMouseMove={handleSpotlightMouseMove}
        className="relative py-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden bg-[#0C0C0C] developer-grid flashlight-spotlight"
        id="about"
      >
        <div className="absolute inset-0 ambient-glow pointer-events-none" />
        {/* Floating Background Icons */}
        <div className="absolute top-20 left-10 md:left-20 opacity-20 hover:opacity-100 transition-opacity duration-700 select-none">
          <span
            className="material-symbols-outlined text-[80px] md:text-[120px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            terminal
          </span>
        </div>
        <div className="absolute bottom-40 right-10 md:right-20 opacity-20 hover:opacity-100 transition-opacity duration-700 select-none">
          <span className="material-symbols-outlined text-[70px] md:text-[100px]">
            database
          </span>
        </div>
        <div className="absolute top-1/2 right-20 md:right-40 opacity-10 rotate-12 select-none">
          <span className="material-symbols-outlined text-[100px] md:text-[160px]">
            javascript
          </span>
        </div>
        <div className="absolute bottom-20 left-20 md:left-40 opacity-15 -rotate-12 select-none">
          <span
            className="material-symbols-outlined text-[60px] md:text-[80px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            layers
          </span>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="hero-heading font-display-lg text-display-lg-mobile md:text-display-lg mb-12 cursor-default">
            <ScrambleText text="About me" />
          </h2>
          <div
            ref={scrollTextRef}
            id="scroll-text"
            className="char-reveal font-display-lg text-headline-md md:text-display-lg-mobile leading-tight text-on-surface"
          >
            Hello! I'm Mohan Ruttala, a passionate Full Stack Developer based in
            Visakhapatnam, Andhra Pradesh. I specialize in creating modern web
            applications with cutting-edge technologies and a focus on user
            experience. With a strong foundation in both frontend and backend
            development, I bring ideas to life through clean, efficient code.
            My approach combines technical proficiency with creative
            problem-solving to deliver exceptional digital experiences tailored
            for clients in Visakhapatnam and beyond.
          </div>

          {/* Stats Display */}
          <div className="grid grid-cols-3 gap-6 mt-16 border-t border-outline/10 pt-10 scroll-reveal">
            <div className="text-center md:text-left">
              <div className="text-display-lg-mobile md:text-headline-md font-display-lg text-primary font-bold leading-none">
                {stats.exp}+
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant/70 mt-2 uppercase tracking-wider">
                Years Exp.
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-display-lg-mobile md:text-headline-md font-display-lg text-primary font-bold leading-none">
                {stats.projects}+
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant/70 mt-2 uppercase tracking-wider">
                Projects Completed
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-display-lg-mobile md:text-headline-md font-display-lg text-primary font-bold leading-none">
                {stats.clients}+
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant/70 mt-2 uppercase tracking-wider">
                Happy Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={skillsSectionRef}
        onMouseMove={handleSpotlightMouseMove}
        className="relative py-section-gap px-margin-mobile md:px-margin-desktop bg-[#0C0C0C] overflow-hidden border-t border-outline-variant/10 developer-grid flashlight-spotlight"
        id="skills"
      >
        <div className="absolute inset-0 ambient-glow pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="hero-heading font-display-lg text-display-lg-mobile md:text-display-lg mb-16 uppercase cursor-default">
            <ScrambleText text="My Skills" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display-lg text-headline-md text-primary mb-6 uppercase tracking-wider">
                Frontend Engineering
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant/80">
                    <span>HTML5 / CSS3 / Tailwind CSS</span>
                    <span>95%</span>
                  </div>
                  <div className="h-3 bg-surface-container/60 rounded-full overflow-hidden border border-outline/5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#00b4db] to-[#0083b0] duration-1000 ease-out shadow-[0_0_10px_rgba(0,180,219,0.3)]"
                      style={{ width: animateSkills ? "95%" : "0%", transitionProperty: "width" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant/80">
                    <span>JavaScript (ES6+) / TypeScript</span>
                    <span>90%</span>
                  </div>
                  <div className="h-3 bg-surface-container/60 rounded-full overflow-hidden border border-outline/5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#f12711] to-[#f5af19] duration-1000 ease-out shadow-[0_0_10px_rgba(245,175,25,0.3)]"
                      style={{ width: animateSkills ? "90%" : "0%", transitionProperty: "width" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant/80">
                    <span>React / Next.js (App Router)</span>
                    <span>85%</span>
                  </div>
                  <div className="h-3 bg-surface-container/60 rounded-full overflow-hidden border border-outline/5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#3a7bd5] to-[#3a6073] duration-1000 ease-out shadow-[0_0_10px_rgba(58,123,213,0.3)]"
                      style={{ width: animateSkills ? "85%" : "0%", transitionProperty: "width" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display-lg text-headline-md text-primary mb-6 uppercase tracking-wider">
                Backend & Systems
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant/80">
                    <span>Node.js / Express</span>
                    <span>80%</span>
                  </div>
                  <div className="h-3 bg-surface-container/60 rounded-full overflow-hidden border border-outline/5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#11998e] to-[#38ef7d] duration-1000 ease-out shadow-[0_0_10px_rgba(56,239,125,0.3)]"
                      style={{ width: animateSkills ? "80%" : "0%", transitionProperty: "width" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant/80">
                    <span>Python / Django / Flask</span>
                    <span>75%</span>
                  </div>
                  <div className="h-3 bg-surface-container/60 rounded-full overflow-hidden border border-outline/5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#8a2387] to-[#e94057] duration-1000 ease-out shadow-[0_0_10px_rgba(233,64,87,0.3)]"
                      style={{ width: animateSkills ? "75%" : "0%", transitionProperty: "width" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant/80">
                    <span>Database Design (SQL & NoSQL)</span>
                    <span>85%</span>
                  </div>
                  <div className="h-3 bg-surface-container/60 rounded-full overflow-hidden border border-outline/5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff00cc] to-[#333399] duration-1000 ease-out shadow-[0_0_10px_rgba(255,0,204,0.3)]"
                      style={{ width: animateSkills ? "85%" : "0%", transitionProperty: "width" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        onMouseMove={handleSpotlightMouseMove}
        className="bg-[#0C0C0C] text-on-surface rounded-t-[60px] py-section-gap px-margin-mobile md:px-margin-desktop relative z-20 shadow-[0_-20px_100px_rgba(0,0,0,0.8)] border-t border-outline/5 developer-grid flashlight-spotlight"
        id="services"
      >
        <div className="absolute inset-0 ambient-glow pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <span className="font-label-caps text-label-caps text-primary/60 uppercase tracking-[0.2em] block mb-3">WHAT I OFFER</span>
              <h2 className="hero-heading font-display-lg text-display-lg-mobile md:text-display-lg uppercase cursor-default">
                <ScrambleText text="Services" />
              </h2>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              I provide tailored software engineering solutions that turn complex technical problems into seamless, fast, and scalable digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 01 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="group bg-surface-container/20 border border-outline/10 p-8 md:p-12 rounded-[32px] flex flex-col justify-between hover:border-primary/20 hover:bg-surface-container/40 hover:shadow-[0_0_50px_rgba(252,253,255,0.02)] transition-all duration-500 cursor-pointer min-h-[350px] tilt-card-container scroll-reveal"
            >
              <div className="tilt-card-content flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-surface-container-high/60 border border-outline/10 rounded-2xl text-primary group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-4xl">
                      desktop_windows
                    </span>
                  </div>
                  <span className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface-variant/10 tracking-widest group-hover:text-primary/10 transition-colors duration-500 font-black">
                    01
                  </span>
                </div>
                <div>
                  <h3 className="font-display-lg text-headline-md uppercase mb-3 tracking-wide group-hover:text-primary transition-colors">
                    Frontend Development
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant/80 leading-relaxed mb-6">
                    Crafting beautiful, high-performance interfaces using modern state management, responsive grid frameworks, and rich interactive layouts.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-outline/5">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"].map((tag) => (
                      <span key={tag} className="text-[10px] font-label-caps tracking-widest px-2.5 py-1 rounded-full bg-surface-container-high/40 border border-outline/10 text-on-surface-variant/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Service 02 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="group bg-surface-container/20 border border-outline/10 p-8 md:p-12 rounded-[32px] flex flex-col justify-between hover:border-primary/20 hover:bg-surface-container/40 hover:shadow-[0_0_50px_rgba(252,253,255,0.02)] transition-all duration-500 cursor-pointer min-h-[350px] tilt-card-container scroll-reveal"
            >
              <div className="tilt-card-content flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-surface-container-high/60 border border-outline/10 rounded-2xl text-primary group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-4xl">
                      dns
                    </span>
                  </div>
                  <span className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface-variant/10 tracking-widest group-hover:text-primary/10 transition-colors duration-500 font-black">
                    02
                  </span>
                </div>
                <div>
                  <h3 className="font-display-lg text-headline-md uppercase mb-3 tracking-wide group-hover:text-primary transition-colors">
                    Backend Development
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant/80 leading-relaxed mb-6">
                    Designing lightning-fast RESTful and GraphQL APIs, robust security middlewares, task queues, and optimized database queries.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-outline/5">
                    {["Node.js", "Express", "Python", "Django", "PostgreSQL", "FastAPI"].map((tag) => (
                      <span key={tag} className="text-[10px] font-label-caps tracking-widest px-2.5 py-1 rounded-full bg-surface-container-high/40 border border-outline/10 text-on-surface-variant/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Service 03 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="group bg-surface-container/20 border border-outline/10 p-8 md:p-12 rounded-[32px] flex flex-col justify-between hover:border-primary/20 hover:bg-surface-container/40 hover:shadow-[0_0_50px_rgba(252,253,255,0.02)] transition-all duration-500 cursor-pointer min-h-[350px] tilt-card-container scroll-reveal"
            >
              <div className="tilt-card-content flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-surface-container-high/60 border border-outline/10 rounded-2xl text-primary group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-4xl">
                      deployed_code
                    </span>
                  </div>
                  <span className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface-variant/10 tracking-widest group-hover:text-primary/10 transition-colors duration-500 font-black">
                    03
                  </span>
                </div>
                <div>
                  <h3 className="font-display-lg text-headline-md uppercase mb-3 tracking-wide group-hover:text-primary transition-colors">
                    Full Stack Apps
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant/80 leading-relaxed mb-6">
                    Delivering complete end-to-end web architectures featuring server-side rendering, secure sessions, cloud hosting, and atomic deployments.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-outline/5">
                    {["Next.js", "Docker", "AWS", "Vercel", "WebSockets", "Prisma"].map((tag) => (
                      <span key={tag} className="text-[10px] font-label-caps tracking-widest px-2.5 py-1 rounded-full bg-surface-container-high/40 border border-outline/10 text-on-surface-variant/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Service 04 */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="group bg-surface-container/20 border border-outline/10 p-8 md:p-12 rounded-[32px] flex flex-col justify-between hover:border-primary/20 hover:bg-surface-container/40 hover:shadow-[0_0_50px_rgba(252,253,255,0.02)] transition-all duration-500 cursor-pointer min-h-[350px] tilt-card-container scroll-reveal"
            >
              <div className="tilt-card-content flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-surface-container-high/60 border border-outline/10 rounded-2xl text-primary group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-4xl">
                      handshake
                    </span>
                  </div>
                  <span className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface-variant/10 tracking-widest group-hover:text-primary/10 transition-colors duration-500 font-black">
                    04
                  </span>
                </div>
                <div>
                  <h3 className="font-display-lg text-headline-md uppercase mb-3 tracking-wide group-hover:text-primary transition-colors">
                    Freelance Consulting
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant/80 leading-relaxed mb-6">
                    Partnering with business owners to audit existing codebase architectures, optimize SEO flows, and build bespoke automation utilities.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-outline/5">
                    {["Tech Audits", "SEO Audit", "Scripting", "Automation", "Workflow Optimization"].map((tag) => (
                      <span key={tag} className="text-[10px] font-label-caps tracking-widest px-2.5 py-1 rounded-full bg-surface-container-high/40 border border-outline/10 text-on-surface-variant/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={cardsContainerRef}
        onMouseMove={handleSpotlightMouseMove}
        className="bg-[#0C0C0C] rounded-t-[60px] py-section-gap px-margin-mobile md:px-margin-desktop relative z-30 -mt-20 developer-grid flashlight-spotlight"
        id="projects"
      >
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="hero-heading font-display-lg text-display-lg-mobile md:text-display-lg uppercase cursor-default">
              <ScrambleText text="Projects" />
            </h2>
            <div className="font-label-caps text-label-caps opacity-40 uppercase tracking-widest hidden md:block">
              SCROLL TO DISCOVER / (03)
            </div>
          </div>
          <div className="space-y-[120px] md:space-y-[265px] pb-24">
            {/* Project Card 1 */}
            <div className="project-card sticky top-24 bg-surface-container rounded-[40px] p-6 md:p-16 min-h-[500px] md:h-[707px] flex flex-col overflow-hidden shadow-2xl border border-outline-variant/10 scroll-reveal">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-display-lg text-headline-md md:text-display-lg-mobile uppercase">
                    AI Review & Reputation Tool
                  </h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant/60 mt-1">
                    AI / BUSINESS / ANALYTICS / 2024
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://mohansaina.github.io/businesshelp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface-container-high rounded-full hover:scale-115 hover:text-primary transition-all duration-300 flex items-center justify-center text-sm shadow-md"
                    title="Live Demo"
                  >
                    <span className="material-symbols-outlined">launch</span>
                  </a>
                  <a
                    href="https://github.com/Mohansaina/businesshelp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface-container-high rounded-full hover:scale-115 hover:text-primary transition-all duration-300 flex items-center justify-center text-sm shadow-md"
                    title="GitHub Repository"
                  >
                    <span className="material-symbols-outlined">code</span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
                <div 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="md:col-span-5 rounded-[20px] md:rounded-[30px] overflow-hidden relative h-48 md:h-full tilt-card-container hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover"
                    alt="AI review tool dashboard view"
                    src="/businesshelp_dashboard.png"
                  />
                </div>
                <div 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="md:col-span-7 rounded-[20px] md:rounded-[30px] overflow-hidden relative h-64 md:h-full tilt-card-container hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover"
                    alt="AI Review and Reputation analytics chart"
                    src="/businesshelp_analytics.png"
                  />
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="project-card sticky top-32 bg-surface-container-high rounded-[40px] p-6 md:p-16 min-h-[500px] md:h-[707px] flex flex-col overflow-hidden shadow-2xl border border-outline-variant/10 scroll-reveal">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-display-lg text-headline-md md:text-display-lg-mobile uppercase">
                    Smart Clothes Drying Alert
                  </h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant/60 mt-1">
                    WEATHER API / UTILITY / MOBILE / 2023
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="http://mohansaina.github.io/freeclothesdryer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface-container-high rounded-full hover:scale-115 hover:text-primary transition-all duration-300 flex items-center justify-center text-sm shadow-md"
                    title="Live Demo"
                  >
                    <span className="material-symbols-outlined">launch</span>
                  </a>
                  <a
                    href="https://github.com/Mohansaina/freeclothesdryer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface-container-high rounded-full hover:scale-115 hover:text-primary transition-all duration-300 flex items-center justify-center text-sm shadow-md"
                    title="GitHub Repository"
                  >
                    <span className="material-symbols-outlined">code</span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
                <div 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="md:col-span-5 rounded-[20px] md:rounded-[30px] overflow-hidden relative h-48 md:h-full tilt-card-container hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover"
                    alt="Weather sensor tracking details"
                    src="/clothesdryer_app.png"
                  />
                </div>
                <div 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="md:col-span-7 rounded-[20px] md:rounded-[30px] overflow-hidden relative h-64 md:h-full tilt-card-container hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover"
                    alt="Clothes dryer dynamic user interface"
                    src="/clothesdryer_forecast.png"
                  />
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="project-card sticky top-40 bg-surface-container-highest rounded-[40px] p-6 md:p-16 min-h-[500px] md:h-[707px] flex flex-col overflow-hidden shadow-2xl border border-outline-variant/10 scroll-reveal">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-display-lg text-headline-md md:text-display-lg-mobile uppercase">
                    AgriScan - Smart Dosing
                  </h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant/60 mt-1">
                    AGRICULTURE / IMAGE RECOGNITION / MOBILE / 2023
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://mohansaina.github.io/AgriScan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface-container-highest rounded-full hover:scale-115 hover:text-primary transition-all duration-300 flex items-center justify-center text-sm shadow-md"
                    title="Live Demo"
                  >
                    <span className="material-symbols-outlined">launch</span>
                  </a>
                  <a
                    href="https://github.com/Mohansaina/AgriScan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-surface-container-highest rounded-full hover:scale-115 hover:text-primary transition-all duration-300 flex items-center justify-center text-sm shadow-md"
                    title="GitHub Repository"
                  >
                    <span className="material-symbols-outlined">code</span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
                <div 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="md:col-span-5 rounded-[20px] md:rounded-[30px] overflow-hidden relative h-48 md:h-full tilt-card-container hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover"
                    alt="AgriScan OCR scanning module"
                    src="/agriscan_scan.png"
                  />
                </div>
                <div 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="md:col-span-7 rounded-[20px] md:rounded-[30px] overflow-hidden relative h-64 md:h-full tilt-card-container hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover"
                    alt="Pesticide dose calculator application visual"
                    src="/agriscan_dosage.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <footer
        onMouseMove={handleSpotlightMouseMove}
        className="bg-surface-container-lowest py-24 px-margin-mobile md:px-margin-desktop border-t border-outline-variant/20 relative z-40 developer-grid flashlight-spotlight"
        id="contact"
      >
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase mb-8 cursor-default">
                <ScrambleText text="Start a Project" />
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-12">
                I'm currently accepting new freelance projects. Let's build
                something technically superior.
              </p>
              <a
                onMouseMove={handleMagnetButton}
                onMouseLeave={handleMagnetButtonReset}
                className="font-display-lg text-[20px] sm:text-headline-md md:text-display-lg-mobile hover:text-primary transition-colors block border-b-2 border-primary/20 pb-4 break-words"
                href="mailto:ruttalamohan23@gmail.com"
              >
                ruttalamohan23@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-6 items-start md:items-end">
              <a
                className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                href="https://github.com/Mohansaina"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                href="https://www.linkedin.com/in/ruttala-mohan-sai-nandakishore-a73484309/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                Twitter / X
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-outline-variant/10 gap-8">
            <div className="font-display-lg text-headline-md text-primary">
              MOHAN
            </div>
            <div className="font-body-md text-body-md text-secondary uppercase opacity-40 text-center">
              © 2025 MOHAN RUTTALA. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8">
              <a
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-opacity"
                href="#"
              >
                PRIVACY
              </a>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-opacity"
                href="#"
              >
                TERMS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
