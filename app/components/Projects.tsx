"use client";

import React, { useRef, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { ProjectModal, ProjectData } from "./ProjectModal";

export const Projects: React.FC = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: "businesshelp",
      title: "AI Review & Reputation Tool",
      category: "AI / BUSINESS / ANALYTICS",
      year: "2024",
      description: "Business reputation platform with AI sentiment analysis and auto-reply generator.",
      problem: "Small business owners struggle to analyze hundreds of customer feedback reviews across Google, Yelp, and social media manually.",
      solution: "Built a centralized AI-powered dashboard that automatically classifies review sentiments (positive, neutral, negative) and generates tailored, natural response drafts.",
      features: [
        "AI Sentiment Categorization Engine",
        "Automated Response Draft Generator",
        "Analytics Charts & Review Trends",
        "CSV & API Data Import Support",
      ],
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Recharts"],
      demoUrl: "https://mohansaina.github.io/businesshelp/",
      repoUrl: "https://github.com/Mohansaina/businesshelp",
      image1: "/businesshelp_dashboard.png",
      image2: "/businesshelp_analytics.png",
    },
    {
      id: "clothesdryer",
      title: "Smart Clothes Drying Alert Utility",
      category: "WEATHER API / UTILITY / MOBILE",
      year: "2023",
      description: "Real-time weather tracking application calculating optimal clothes drying hours.",
      problem: "Unpredictable rain and high humidity lead to wet laundry surprises and delayed drying schedules.",
      solution: "Connected open weather telemetry APIs to calculate a custom 'Drying Efficiency Index' using humidity, wind speed, solar radiation, and rain probability.",
      features: [
        "Live Weather Telemetry Integration",
        "Dynamic Drying Score Formula",
        "Hourly Drying Window Predictions",
        "PWA Offline Caching & Mobile UI",
      ],
      techStack: ["JavaScript", "HTML5", "CSS3", "OpenWeatherMap API", "Service Workers"],
      demoUrl: "http://mohansaina.github.io/freeclothesdryer/",
      repoUrl: "https://github.com/Mohansaina/freeclothesdryer",
      image1: "/clothesdryer_app.png",
      image2: "/clothesdryer_forecast.png",
    },
    {
      id: "agriscan",
      title: "AgriScan - Smart Pesticide Dosing",
      category: "AGRICULTURE / OCR / MOBILE",
      year: "2023",
      description: "Mobile label reader helper enabling precise agricultural dosage calculations.",
      problem: "Farmers misinterpret dense text on pesticide bottles, leading to incorrect dilution ratios and crop damage.",
      solution: "Created a camera OCR scanning web app that extracts active ingredient names and bottle concentrations, calculating precise mixing ratios per acre/hectare.",
      features: [
        "Optical Character Recognition (OCR)",
        "Automated Dosage & Dilution Calculator",
        "Pesticide & Chemical Database Lookup",
        "Multilingual & Offline Support",
      ],
      techStack: ["React", "JavaScript", "Tesseract OCR", "Tailwind CSS", "PWA"],
      demoUrl: "https://mohansaina.github.io/AgriScan/",
      repoUrl: "https://github.com/Mohansaina/AgriScan",
      image1: "/agriscan_scan.png",
      image2: "/agriscan_dosage.png",
    },
  ];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 26;
    const angleY = (x - xc) / 26;
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section
      ref={cardsContainerRef}
      id="projects"
      className="bg-[#07080c] py-section-gap px-margin-mobile md:px-margin-desktop relative z-30 developer-grid"
    >
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-2">
              FEATURED WORKS
            </span>
            <h2 className="hero-heading font-display-lg text-4xl md:text-5xl uppercase cursor-default">
              <ScrambleText text="Projects" />
            </h2>
          </div>
          <div className="font-label-caps text-xs text-white/40 uppercase tracking-widest hidden md:block">
            EXPLORE SHOWCASE / (03)
          </div>
        </div>

        <div className="space-y-16 md:space-y-24">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className={`project-card sticky bg-[#11131c] rounded-[36px] p-6 md:p-12 min-h-[480px] md:h-[650px] flex flex-col overflow-hidden shadow-2xl border border-white/10 scroll-reveal`}
              style={{ top: `${90 + idx * 30}px` }}
            >
              <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                <div>
                  <h3 className="font-display-lg text-2xl md:text-3xl text-white uppercase font-bold">
                    {proj.title}
                  </h3>
                  <p className="font-label-caps text-xs text-on-surface-variant/60 mt-1">
                    {proj.category} • {proj.year}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 font-label-caps text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">info</span>
                    Specs & Details
                  </button>
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 rounded-full hover:scale-110 hover:text-cyan-400 transition-all text-white"
                    title="Live Demo"
                  >
                    <span className="material-symbols-outlined text-sm">launch</span>
                  </a>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 rounded-full hover:scale-110 hover:text-cyan-400 transition-all text-white"
                    title="GitHub Repository"
                  >
                    <span className="material-symbols-outlined text-sm">code</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => setSelectedProject(proj)}
                  className="md:col-span-5 rounded-2xl md:rounded-3xl overflow-hidden relative h-48 md:h-full tilt-card-container cursor-pointer border border-white/10 group"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={proj.title}
                    src={proj.image1}
                  />
                </div>
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => setSelectedProject(proj)}
                  className="md:col-span-7 rounded-2xl md:rounded-3xl overflow-hidden relative h-56 md:h-full tilt-card-container cursor-pointer border border-white/10 group"
                >
                  <img
                    className="tilt-card-content w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={proj.title}
                    src={proj.image2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
