"use client";

import React from "react";
import { ScrambleText } from "./ScrambleText";

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 28;
    const angleY = (x - xc) / 28;
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const services = [
    {
      num: "01",
      icon: "rocket_launch",
      badgeText: "LOOKING TO JOIN A STARTUP",
      title: "Joining Startups & Founding Engineering",
      subtitle: "Available to join fast-paced tech startups as a Full-Stack / Founding Engineer.",
      desc: "Ready to step in and turn ambitious product visions into market-ready MVPs. I bring full-stack speed, scalable microservice architecture, and product-focused execution to build 0-to-1 web applications.",
      highlights: [
        "Full-Time / Founding Engineer Roles",
        "Rapid MVP Development & Iteration",
        "Scalable Backend & Cloud Infrastructure",
      ],
      tags: ["Startup Ready", "Full-Stack MVP", "Next.js 15", "Node.js / Python", "Fast Execution"],
      accentColor: "from-cyan-500/20 to-blue-500/10",
      iconColor: "text-cyan-400 border-cyan-400/40 bg-cyan-500/10",
      ctaSubject: "Full-Time Role / Startup",
    },
    {
      num: "02",
      icon: "diamond",
      badgeText: "SPECIALIZED E-COMMERCE",
      title: "Jewelry Store & Luxury E-Commerce",
      subtitle: "Bespoke online stores crafted specifically for luxury jewelry & premium retail brands.",
      desc: "Creating high-converting digital storefronts tailored for jewelry artisans and luxury retailers. Features interactive 3D product previews, dynamic gemstone/ring configurators, ultra-smooth luxury animations, and secure multi-currency payment checkouts.",
      highlights: [
        "Interactive 3D Product Viewers & Customizers",
        "High-Converting Luxury Brand Experience",
        "Seamless Stripe & Shopify Integration",
      ],
      tags: ["Jewelry E-Commerce", "3D Product Preview", "Luxury UX", "Stripe / Shopify", "High Speed"],
      accentColor: "from-amber-500/20 to-yellow-500/10",
      iconColor: "text-amber-400 border-amber-400/40 bg-amber-500/10",
      ctaSubject: "Jewelry Store Website",
    },
    {
      num: "03",
      icon: "work_history",
      badgeText: "FREELANCE CONTRACTS",
      title: "Freelance & Contract Development",
      subtitle: "End-to-end custom web applications, performance audits, & technical solutions.",
      desc: "Available for freelance projects and technical consulting. I collaborate directly with founders, agencies, and business owners to build high-performance web applications, refactor complex codebases, and implement custom features.",
      highlights: [
        "End-to-End Contract Web Development",
        "SEO Optimization & Page Speed Audits",
        "Custom API Integrations & Database Schemas",
      ],
      tags: ["Freelance Projects", "Custom Web Apps", "Performance Audit", "React 19", "Tailwind CSS"],
      accentColor: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-400 border-purple-400/40 bg-purple-500/10",
      ctaSubject: "Freelance Project",
    },
    {
      num: "04",
      icon: "smart_toy",
      badgeText: "AI & BACKEND",
      title: "AI Integration & Web Automation",
      subtitle: "Smart AI assistants, scraping pipelines, & high-performance APIs.",
      desc: "Integrating cutting-edge LLMs (Gemini, OpenAI APIs) into web applications, automating data scraping pipelines, and engineering high-throughput backend services that save businesses time and effort.",
      highlights: [
        "Custom AI Agent & LLM Integrations",
        "Automated Data Scraping Pipelines",
        "REST & GraphQL High-Speed APIs",
      ],
      tags: ["AI Powered", "Gemini & OpenAI API", "Python Scraping", "Docker", "FastAPI"],
      accentColor: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400 border-emerald-400/40 bg-emerald-500/10",
      ctaSubject: "Technical Audit / AI",
    },
  ];

  const handleCtaClick = (subject: string) => {
    if (onSelectService) {
      onSelectService(subject);
    }
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="bg-[#07080c] py-24 px-margin-mobile md:px-margin-desktop relative z-20 border-t border-white/5">
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-3">
              WHAT I OFFER & SERVICES
            </span>
            <h2 className="hero-heading font-display-lg text-4xl md:text-5xl lg:text-6xl uppercase cursor-default">
              <ScrambleText text="Services & Collaborations" />
            </h2>
          </div>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Whether you are looking to <strong className="text-white">hire a full-stack engineer for your startup</strong>, need a <strong className="text-white">luxury jewelry store website</strong>, or want to launch a <strong className="text-white">freelance web project</strong>, I deliver fast, pixel-perfect software engineering.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className={`group relative glass-card p-8 md:p-10 rounded-[32px] flex flex-col justify-between glass-card-hover tilt-card-container transition-all duration-300 bg-gradient-to-br ${service.accentColor} border border-white/10 hover:border-white/20`}
            >
              <div className="tilt-card-content flex flex-col justify-between h-full w-full">
                {/* Top Row: Icon & Badge */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 border rounded-2xl transition-all duration-300 flex items-center justify-center ${service.iconColor} group-hover:scale-110 shadow-lg`}>
                      <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                    </div>
                    <span className="font-display-lg text-3xl text-white/20 tracking-widest group-hover:text-white/40 transition-colors duration-300 font-black">
                      {service.num}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-label-caps font-bold tracking-widest px-3 py-1 rounded-full bg-white/10 text-white/90 mb-4 border border-white/10 uppercase">
                    {service.badgeText}
                  </span>

                  <h3 className="font-display-lg text-2xl md:text-3xl uppercase mb-2 text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-body-md text-sm text-cyan-200/90 font-medium mb-4">
                    {service.subtitle}
                  </p>

                  <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-6">
                    {service.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-body-md text-white/90">
                        <span className="material-symbols-outlined text-cyan-400 text-base">check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Row: Tags & Direct CTA Button */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-label-caps tracking-wider px-3 py-1 rounded-full bg-black/40 border border-white/10 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCtaClick(service.ctaSubject)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/20 hover:border-cyan-400 text-xs font-label-caps font-bold uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 group/btn shrink-0 cursor-pointer"
                  >
                    Discuss This
                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Banner */}
        <div className="glass-card p-8 md:p-12 rounded-[36px] border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-purple-950/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-label-caps text-cyan-400 uppercase tracking-widest font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              IMMEDIATE AVAILABILITY
            </span>
            <h3 className="font-display-lg text-2xl md:text-3xl uppercase text-white font-bold mb-3">
              Ready to Hire for your Startup, Jewelry Store, or Freelance Project?
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant/90 leading-relaxed">
              Let's connect directly. I reply within 12 hours with project scoping, timelines, and technical insights.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto justify-start lg:justify-end">
            <button
              onClick={() => handleCtaClick("Full-Time Role / Startup")}
              className="px-6 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-label-caps text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105"
            >
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              Join Startup
            </button>

            <button
              onClick={() => handleCtaClick("Jewelry Store Website")}
              className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-label-caps text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg cursor-pointer hover:scale-105"
            >
              <span className="material-symbols-outlined text-base">diamond</span>
              Jewelry Store
            </button>

            <button
              onClick={() => handleCtaClick("Freelance Project")}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-label-caps text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span className="material-symbols-outlined text-base">work_history</span>
              Freelance Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
