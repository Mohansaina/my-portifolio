"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Section, SectionHeader } from "./ui/Section";
import { Icon } from "./ui/Icon";
import { usePointerLight, useReveal } from "../lib/motion";
import { ProjectModal, ProjectData } from "./ProjectModal";

const PROJECTS: ProjectData[] = [
  {
    id: "jdjewells",
    title: "J&D Jewellers",
    category: "Fine jewellery · full-stack",
    year: "2026",
    description:
      "A London jeweller's storefront: a six-step ring configurator, a certified diamond vault and checkout.",
    problem:
      "A bespoke jeweller sells pieces that get configured rather than picked off a shelf — metal, setting, stone, size. A catalogue with a buy button cannot represent that, so every order falls back to email and stalls at the point where the customer is ready to pay.",
    solution:
      "A full storefront on Next.js and Postgres. A six-step configurator prices the ring as it is assembled, a 4Cs filter searches loose-diamond inventory against GIA certificates, and the chosen stone carries straight through cart, checkout and order tracking.",
    features: [
      "Six-step ring configurator with a live cost summary",
      "Loose-diamond search on carat, cut, colour and clarity",
      "Prisma and Postgres behind the product, order and review APIs",
      "Accounts, cart, checkout and order tracking",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Prisma",
      "PostgreSQL",
    ],
    demoUrl: "https://jdjewellerylondon.co.uk",
    repoUrl: "https://github.com/Mohansaina/jdjewells",
    image1: "/jdjewellery_banner.png",
    image2: "/jdjewells_storefront.jpg",
  },
  {
    id: "speakenglishwithnick",
    title: "Speak English With Nick",
    category: "EdTech · E-learning platform",
    year: "2025",
    description:
      "An interactive English coaching portal with lesson booking, student dashboards and fluency analytics.",
    problem:
      "Students and professional learners needed a frictionless platform to schedule 1-on-1 language coaching, access curated learning modules, and track fluency progress.",
    solution:
      "A full e-learning web platform with automated booking schedules, student progress tracking, interactive lesson modules, and automated notifications.",
    features: [
      "Interactive 1-on-1 lesson booking & calendar sync",
      "Student fluency dashboard with progress metrics",
      "Curated lesson notes, audio resources & quizzes",
      "Automated email notifications & instant scheduling",
    ],
    techStack: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
    ],
    demoUrl: "https://speakenglishwithnick.com",
    image1: "/speakenglish_banner.png",
    image2: "/speakenglishwithnick.jpg",
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
    image1: "/reviewai_banner.png",
    image2: "/businesshelp_dashboard.png",
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
    demoUrl: "https://clthesdryalert.qzz.io",
    repoUrl: "https://github.com/Mohansaina/freeclothesdryer",
    image1: "/clothesdryer_banner.png",
    image2: "/clothesdryer_app.png",
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
    image1: "/agriscan_banner.png",
    image2: "/agriscan_scan.png",
  },
];

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const close = useCallback(() => setSelected(null), []);

  useReveal();

  return (
    <Section id="work" width="wide" pin>
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
  const liveUrl = project.demoUrl;

  return (
    <li
      ref={ref}
      onPointerMove={onPointerMove}
      className="stack-item reveal lit surface group relative overflow-hidden rounded-xl
        shadow-[var(--shadow-3),var(--lit-top)]"
      style={{ ["--i" as string]: index, ["--reveal-delay" as string]: `${index * 80}ms` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-edge bg-ink-1 md:aspect-auto md:min-h-[22rem] md:border-b-0 md:border-r">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="img-zoom absolute inset-0 block"
            >
              <Image
                src={project.image1}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[var(--dur-5)]
                  ease-[var(--ease)] group-hover:scale-[1.02]"
              />
            </a>
          ) : (
            <span className="img-zoom absolute inset-0 block cursor-pointer" onClick={onOpen}>
              <Image
                src={project.image1}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[var(--dur-5)]
                  ease-[var(--ease)] group-hover:scale-[1.02]"
              />
            </span>
          )}
          <span aria-hidden className="curtain" />
        </div>

        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <p className="t-label mb-4">
              {project.category} · {project.year}
            </p>
            <h3 className="t-heading">
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stretch-target cursor-pointer text-left after:absolute
                    after:inset-0 after:content-[''] hover:text-lume"
                >
                  {project.title}
                  <span className="sr-only"> — visit live site</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onOpen}
                  className="stretch-target cursor-pointer text-left after:absolute
                    after:inset-0 after:content-['']"
                >
                  {project.title}
                  <span className="sr-only"> — view case study</span>
                </button>
              )}
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {liveUrl ? (
              <>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-[3] inline-flex items-center gap-2 rounded-md bg-lume px-4 py-2 text-[13px] font-medium text-ink-0 transition-transform duration-[var(--dur-2)] hover:bg-lume-hi active:scale-95"
                >
                  <span>Visit live website</span>
                  <Icon name="arrow-up-right" size={14} />
                </a>
                <button
                  type="button"
                  onClick={onOpen}
                  className="relative z-[3] inline-flex items-center gap-1.5 text-[13px] text-text-mid transition-colors hover:text-text-hi"
                >
                  <span>Details</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onOpen}
                className="relative z-[3] inline-flex items-center gap-1.5 text-[13px] text-lume"
              >
                <span>View case study</span>
                <Icon name="arrow-right" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-[3] flex items-center justify-between gap-4 border-t border-edge px-8 py-4">
        <span className="t-label">
          {liveUrl && project.repoUrl
            ? "Live Website · Source"
            : liveUrl
              ? "Live Website"
              : project.repoUrl
                ? "Source Code"
                : "Case Study"}
        </span>
        <span className="flex items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — open live site`}
              className="inline-flex items-center gap-1.5 rounded-sm bg-ink-3 px-3 py-1.5 font-mono text-[12px] text-text-hi transition-colors duration-[var(--dur-2)] hover:bg-lume hover:text-ink-0"
            >
              <span>Visit Live</span>
              <Icon name="arrow-up-right" size={14} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — view source`}
              className="grid h-9 w-9 place-items-center rounded-sm text-text-lo
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
