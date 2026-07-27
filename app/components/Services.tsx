"use client";

import React from "react";
import { ScrambleText } from "./ScrambleText";

export const Services: React.FC = () => {
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 24;
    const angleY = (x - xc) / 24;
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const services = [
    {
      num: "01",
      icon: "desktop_windows",
      title: "Frontend Engineering",
      desc: "Crafting fast, accessible, high-converting web applications with modern state management, server-side rendering, and micro-interactions.",
      tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Canvas & Animations"],
    },
    {
      num: "02",
      icon: "dns",
      title: "Backend & API Architecture",
      desc: "Designing fast RESTful & GraphQL microservices, JWT authentication, background job queues, and schema-normalized relational databases.",
      tags: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "Redis"],
    },
    {
      num: "03",
      icon: "deployed_code",
      title: "Full Stack Web Apps",
      desc: "Building complete end-to-end products from design mockups to production cloud deployment, CI/CD automated pipelines, and monitoring.",
      tags: ["Full Stack", "Docker", "AWS", "Vercel", "WebSockets", "Prisma"],
    },
    {
      num: "04",
      icon: "handshake",
      title: "Freelance Technical Consulting",
      desc: "Partnering with founders and business owners to audit existing codebases, optimize web performance, improve SEO structures, and implement custom utilities.",
      tags: ["Code Audits", "SEO Optimization", "Script Automation", "Web Scraping", "Performance Audits"],
    },
  ];

  return (
    <section id="services" className="bg-[#07080c] py-section-gap px-margin-mobile md:px-margin-desktop relative z-20 border-t border-white/5">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-2">
              WHAT I DELIVER
            </span>
            <h2 className="hero-heading font-display-lg text-4xl md:text-5xl uppercase cursor-default">
              <ScrambleText text="Services" />
            </h2>
          </div>
          <p className="font-body-lg text-base text-on-surface-variant max-w-md">
            I deliver tailored software engineering solutions that turn complex technical challenges into clean, fast, and scalable digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="group glass-card p-8 md:p-10 rounded-[32px] flex flex-col justify-between glass-card-hover cursor-pointer min-h-[340px] tilt-card-container scroll-reveal"
            >
              <div className="tilt-card-content flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                  </div>
                  <span className="font-display-lg text-3xl text-white/10 tracking-widest group-hover:text-white/20 transition-colors duration-300 font-black">
                    {service.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-display-lg text-xl md:text-2xl uppercase mb-3 text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-label-caps tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-on-surface-variant/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
