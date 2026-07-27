"use client";

import React, { useEffect, useRef } from "react";

export const GlobalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with smooth lerp
    let targetMouse = { x: width / 2, y: height / 2 };
    let currentMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Create persistent particles
    const particleCount = Math.min(70, Math.floor((width * height) / 18000));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerping for liquid physics
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.04;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.04;

      // Draw interactive mouse energy aura in canvas
      const mouseGradient = ctx.createRadialGradient(
        currentMouse.x,
        currentMouse.y,
        0,
        currentMouse.x,
        currentMouse.y,
        320
      );
      mouseGradient.addColorStop(0, "rgba(6, 182, 212, 0.08)");
      mouseGradient.addColorStop(0.5, "rgba(99, 102, 241, 0.03)");
      mouseGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particle network
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulse += p1.pulseSpeed;

        // Wrap boundaries
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            const alpha = 0.08 * (1 - dist / 130);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse magnetic connection
        const mDist = Math.hypot(p1.x - currentMouse.x, p1.y - currentMouse.y);
        if (mDist < 180) {
          const mAlpha = 0.18 * (1 - mDist / 180);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(currentMouse.x, currentMouse.y);
          ctx.stroke();
        }

        // Particle dot
        const currentRadius = p1.size + Math.sin(p1.pulse) * 0.5;
        ctx.fillStyle = `rgba(186, 230, 253, ${0.4 + Math.sin(p1.pulse) * 0.2})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Cursor Light Aura */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-[100px] transition-transform duration-300 ease-out opacity-80"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* Ambient Glowing Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[650px] h-[650px] rounded-full bg-indigo-600/10 blur-[140px] animate-pulse pointer-events-none" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[150px] animate-pulse pointer-events-none" style={{ animationDuration: "12s" }} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      {/* Interactive Particle Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
