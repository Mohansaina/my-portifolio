"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "./ui/Icon";
import { ButtonLink } from "./ui/Button";
import { useModal } from "../lib/motion";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  /* Optional on purpose. A project without a running deployment should say so
     rather than render a button that goes nowhere. */
  demoUrl?: string;
  repoUrl?: string;
  image1: string;
  image2: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const ref = useModal(project !== null, onClose);
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[75] overflow-y-auto bg-ink-0/85 p-4 backdrop-blur-md md:p-8"
      onMouseDown={(e) => {
        // Dismiss on backdrop only. mousedown rather than click so a drag that
        // starts inside the dialog and ends outside does not close it.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        tabIndex={-1}
        className="surface mx-auto my-auto w-full max-w-3xl rounded-xl p-6 shadow-[var(--shadow-3),var(--lit-top)] md:p-10"
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="t-label mb-3">
              {project.category} · {project.year}
            </p>
            <h2 id="project-title" className="t-heading max-w-[24ch]">
              {project.title}
            </h2>
            <p className="t-body mt-3">{project.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-md
              text-text-lo transition-colors duration-[var(--dur-2)] hover:text-text-hi"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[project.image1, project.image2].map((src, i) => (
            <div
              key={src}
              className="relative aspect-[16/10] overflow-hidden rounded-md border border-edge bg-ink-1"
            >
              <Image
                src={src}
                alt={`${project.title} — view ${i + 1}`}
                fill
                sizes="(max-width: 640px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 border-y border-edge py-8 sm:grid-cols-2">
          <div>
            <h3 className="t-label mb-3">The problem</h3>
            <p className="t-body !text-[14px]">{project.problem}</p>
          </div>
          <div>
            <h3 className="t-label mb-3">What I built</h3>
            <p className="t-body !text-[14px]">{project.solution}</p>
          </div>
        </div>

        <div className="py-8">
          <h3 className="t-label mb-4">Key features</h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-[14px] text-text-mid"
              >
                <span className="mt-1 text-lume">
                  <Icon name="check" size={13} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-edge py-8">
          <h3 className="t-label mb-4">Built with</h3>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-xs border border-edge px-2.5 py-1 font-mono text-[11px] text-text-mid"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.demoUrl && (
            <ButtonLink
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon="arrow-up-right"
            >
              Open live site
            </ButtonLink>
          )}
          {project.repoUrl && (
            <ButtonLink
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              icon="github"
            >
              Source
            </ButtonLink>
          )}
          {!project.demoUrl && !project.repoUrl && (
            <p className="t-label">Case study · not publicly deployed</p>
          )}
        </div>
      </div>
    </div>
  );
};
