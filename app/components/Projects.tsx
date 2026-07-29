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
    /* No demoUrl or repoUrl: this one is not deployed publicly. The card
       previously linked "Open live site" to "#services", which scrolled the
       page instead of opening anything, and "Source" to the portfolio's own
       repository. Both are now simply absent and the card says so. */
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

      {/* A deck rather than a grid: each card pins a little lower than the
          one before, so scrolling deals them out and the section has a
          shape you feel. */}
      <ul className="space-y-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpen={() => setSelected(project)}
          />
        ))}
      </ul>

      {/* Spacer so the last card can settle before the next section
          arrives underneath it. */}
      <div aria-hidden className="h-24 md:h-40" />

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
      className="stack-item reveal lit surface group relative overflow-hidden rounded-xl
        shadow-[var(--shadow-3),var(--lit-top)]"
      style={{ ["--i" as string]: index }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-edge bg-ink-1 md:aspect-auto md:min-h-[22rem] md:border-b-0 md:border-r">
          <Image
            src={project.image1}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[var(--dur-5)]
              ease-[var(--ease)] group-hover:scale-[1.02]"
          />
          {/* Drawn back off the artwork as the card arrives. */}
          <span aria-hidden className="curtain" />
        </div>

        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <p className="t-label mb-4">
              {project.category} · {project.year}
            </p>
            {/* The heading holds the control and stretches an invisible layer
                over the whole card, so there is one tab stop, the accessible
                name is the title, and the markup stays valid — a <button>
                cannot legally wrap headings and paragraphs. */}
            <h3 className="t-heading">
              <button
                type="button"
                onClick={onOpen}
                className="stretch-target cursor-pointer text-left after:absolute
                  after:inset-0 after:content-['']"
              >
                {project.title}
                <span className="sr-only"> — view case study</span>
              </button>
            </h3>
            <p className="t-body mt-4">{project.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="rounded-xs border border-edge px-2.5 py-1 font-mono text-[11px] text-text-lo"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 inline-flex items-center gap-1.5 text-[13px] text-lume">
            View case study
            <Icon name="arrow-right" size={14} />
          </p>
        </div>
      </div>

      {/* Lifted above the stretched layer so these stay independently
          clickable. */}
      {/* Lifted above the stretched layer so these stay independently
          clickable. The label reports what is actually behind the icons —
          it used to read "Live · Source" on every card, including one with
          neither. */}
      <div className="relative z-[2] flex items-center justify-between gap-4 border-t border-edge px-8 py-4">
        <span className="t-label">
          {project.demoUrl && project.repoUrl
            ? "Live · Source"
            : project.repoUrl
              ? "Source"
              : "Case study"}
        </span>
        <span className="flex items-center gap-1">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — open live site`}
              className="grid h-10 w-10 place-items-center rounded-sm text-text-lo
                transition-colors duration-[var(--dur-2)] hover:bg-ink-3
                hover:text-text-hi active:translate-y-px"
            >
              <Icon name="arrow-up-right" size={15} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — view source`}
              className="grid h-10 w-10 place-items-center rounded-sm text-text-lo
                transition-colors duration-[var(--dur-2)] hover:bg-ink-3
                hover:text-text-hi active:translate-y-px"
            >
              <Icon name="github" size={15} />
            </a>
          )}
        </span>
      </div>
    </li>
  );
};
