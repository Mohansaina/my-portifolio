"use client";

import React from "react";

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
  demoUrl: string;
  repoUrl: string;
  image1: string;
  image2: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#10121a] border border-white/10 max-w-4xl w-full rounded-3xl p-6 md:p-10 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="font-code text-xs accent-text font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            {project.category} • {project.year}
          </span>
          <h2 className="font-display-lg text-2xl md:text-4xl text-white font-bold uppercase mt-3">
            {project.title}
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant/80 mt-2">
            {project.description}
          </p>
        </div>

        {/* Image Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 h-56 md:h-64">
            <img src={project.image1} alt={`${project.title} screenshot 1`} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 h-56 md:h-64">
            <img src={project.image2} alt={`${project.title} screenshot 2`} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Technical Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-b border-white/10 py-6">
          <div>
            <h4 className="font-display-lg text-sm text-white font-bold uppercase mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined accent-text text-lg">error_outline</span>
              Problem Addressed
            </h4>
            <p className="font-body-md text-xs text-on-surface-variant/80 leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="font-display-lg text-sm text-white font-bold uppercase mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-lg">verified</span>
              Engineering Solution
            </h4>
            <p className="font-body-md text-xs text-on-surface-variant/80 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h4 className="font-display-lg text-sm text-white font-bold uppercase mb-3">Key Features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-body-md text-on-surface-variant/90">
                <span className="material-symbols-outlined accent-text text-sm">check_circle</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <h4 className="font-display-lg text-sm text-white font-bold uppercase mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-label-caps text-white">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3.5 rounded-full ignition-gradient font-label-caps text-xs uppercase tracking-wider text-black font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Launch Live Application
            <span className="material-symbols-outlined text-sm">launch</span>
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-label-caps text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            View GitHub Source
            <span className="material-symbols-outlined text-sm">code</span>
          </a>
        </div>
      </div>
    </div>
  );
};
