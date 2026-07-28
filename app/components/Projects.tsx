"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Section, SectionHeader } from "./ui/Section";
import { Icon } from "./ui/Icon";
import { usePointerLight, useReveal } from "../lib/motion";
import { ProjectModal, ProjectData } from "./ProjectModal";

const PROJECTS: ProjectData[] = [
  {
    id: "aurajewels",
    title: "AuraJewels",
    category: "Luxury e-commerce",
    year: "2025",
    description:
      "A jewelry storefront with a 3D ring configurator and live gold pricing.",
    problem:
      "Online jewelry buyers cannot handle the piece before paying for it, so confidence collapses at exactly the price point where it matters most.",
    solution:
      "A headless Next.js storefront with real-time gemstone customisation, diamond clarity selection, live gold price sync and multi-currency checkout.",
    features: [
      "Interactive 3D diamond and gold ring builder",
      "Live carat and gemstone pricing engine",
      "Headless Next.js storefront on a Shopify backend",
      "Multi-currency Stripe checkout",
    ],
    techStack: [
      "React 19",
      "Next.js 15",
      "Three.js",
      "Tailwind CSS",
      "Shopify API",
      "Stripe",
    ],
    demoUrl: "#services",
    repoUrl: "https://github.com/Mohansaina/my-portifolio",
    image1: "/jewelry_store_hero.png",
    image2: "/jewelry_customizer_app.png",
  },
  {
    id: "businesshelp",
    title: "Review & reputation tool",
    category: "AI · analytics",
    year: "2024",
    description:
      "Sentiment analysis and reply drafting for business owners drowning in reviews.",
    problem:
      "Small business owners were reading hundreds of reviews across Google, Yelp and social by hand, and replying to almost none of them.",
    solution:
      "A dashboard that classifies review sentiment automatically and drafts a tailored response for each one, so replying becomes editing rather than writing.",
    features: [
      "Sentiment categorisation engine",
      "Automated response drafts",
      "Review trend analytics",
      "CSV and API import",
    ],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI API",
      "Recharts",
    ],
    demoUrl: "https://mohansaina.github.io/businesshelp/",
    repoUrl: "https://github.com/Mohansaina/businesshelp",
    image1: "/businesshelp_dashboard.png",
    image2: "/businesshelp_analytics.png",
  },
  {
    id: "clothesdryer",
    title: "Drying window forecast",
    category: "Weather API · PWA",
    year: "2023",
    description:
      "Works out the best hours to hang laundry from live weather telemetry.",
    problem:
      "Rain and humidity are hard to read a few hours ahead, and getting it wrong means rewashing a full load.",
    solution:
      "A drying efficiency index computed from humidity, wind speed, solar radiation and rain probability, surfaced as an hourly window.",
    features: [
      "Live weather telemetry",
      "Drying score model",
      "Hourly window predictions",
      "Offline caching",
    ],
    techStack: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "OpenWeatherMap API",
      "Service Workers",
    ],
    demoUrl: "http://mohansaina.github.io/freeclothesdryer/",
    repoUrl: "https://github.com/Mohansaina/freeclothesdryer",
    image1: "/clothesdryer_app.png",
    image2: "/clothesdryer_forecast.png",
  },
  {
    id: "agriscan",
    title: "AgriScan",
    category: "Agriculture · OCR",
    year: "2023",
    description:
      "Reads a pesticide label with the camera and works out the dose.",
    problem:
      "Dense small print on pesticide bottles leads to wrong dilution ratios, and the cost of that mistake is a damaged crop.",
    solution:
      "A camera OCR app that extracts the active ingredient and concentration from the label, then calculates the mixing ratio per acre.",
    features: [
      "On-device optical character recognition",
      "Dosage and dilution calculator",
      "Chemical database lookup",
      "Multilingual and offline support",
    ],
    techStack: ["React", "JavaScript", "Tesseract OCR", "Tailwind CSS", "PWA"],
    demoUrl: "https://mohansaina.github.io/AgriScan/",
    repoUrl: "https://github.com/Mohansaina/AgriScan",
    image1: "/agriscan_scan.png",
    image2: "/agriscan_dosage.png",
  },
];

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const close = useCallback(() => setSelected(null), []);

  useReveal();

  return (
    <Section id="work" width="wide">
      <SectionHeader
        eyebrow={`Selected work · ${PROJECTS.length} projects`}
        title="Things I have shipped."
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpen={() => setSelected(project)}
          />
        ))}
      </ul>

      <ProjectModal project={selected} onClose={close} />
    </Section>
  );
};

const ProjectCard: React.FC<{
  project: ProjectData;
  index: number;
  onOpen: () => void;
}> = ({ project, index, onOpen }) => {
  const { ref, onPointerMove } = usePointerLight<HTMLLIElement>();

  return (
    <li
      ref={ref}
      onPointerMove={onPointerMove}
      className="reveal lit surface surface-raise group relative overflow-hidden rounded-lg"
      style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-edge bg-ink-1">
        <Image
          src={project.image1}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover transition-transform duration-[var(--dur-5)]
            ease-[var(--ease)] group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-6">
        <p className="t-label mb-3">
          {project.category} · {project.year}
        </p>
        {/* The heading holds the control and stretches an invisible layer over
            the whole card, so there is one tab stop, the accessible name is
            the title, and the markup stays valid — a <button> cannot legally
            wrap headings and paragraphs. */}
        <h3 className="t-subheading">
          <button
            type="button"
            onClick={onOpen}
            className="cursor-pointer text-left after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
            <span className="sr-only"> — view case study</span>
          </button>
        </h3>
        <p className="t-body mt-2 !text-[14px]">{project.description}</p>
      </div>

      {/* Lifted above the stretched layer so these stay independently
          clickable. */}
      <div className="relative z-[2] flex items-center justify-between gap-4 border-t border-edge px-6 py-4">
        <span className="t-mono text-text-lo">
          {project.techStack.slice(0, 3).join(" · ")}
        </span>
        <span className="flex items-center gap-1">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — open live site`}
            className="grid h-8 w-8 place-items-center rounded-xs text-text-lo
              transition-colors duration-[var(--dur-2)] hover:text-text-hi"
          >
            <Icon name="arrow-up-right" size={15} />
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — view source`}
            className="grid h-8 w-8 place-items-center rounded-xs text-text-lo
              transition-colors duration-[var(--dur-2)] hover:text-text-hi"
          >
            <Icon name="github" size={15} />
          </a>
        </span>
      </div>
    </li>
  );
};
