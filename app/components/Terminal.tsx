"use client";

import React, { useState } from "react";
import { useAudio } from "./AudioContext";

export const Terminal: React.FC = () => {
  const { playBeep } = useAudio();
  const [inputText, setInputText] = useState("");
  const [history, setHistory] = useState<Array<{ text: string; isCmd?: boolean }>>([
    { text: "MohanOS v4.5.0 initialized successfully.", isCmd: false },
    { text: "Type 'help' or click buttons below to inspect diagnostics.", isCmd: false },
  ]);

  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;
    playBeep(850, "square", 0.05);

    const newHistory = [...history, { text: `$ ${cmdStr}`, isCmd: true }];

    if (cmd === "help") {
      newHistory.push({
        text: "Available Diagnostics Commands:\n  help      - Display CLI guide\n  whoami    - Developer overview & location\n  skills    - Stack breakdown & frameworks\n  projects  - Featured project repos\n  contact   - Get in touch directly\n  matrix    - Load digital cipher stream\n  clear     - Clear shell history",
        isCmd: false,
      });
    } else if (cmd === "whoami") {
      newHistory.push({
        text: "Mohan Ruttala — Full Stack Software Engineer\nLocation: Visakhapatnam, AP, India\nFocus: High-performance React/Next.js, Node.js, Python & AI systems.",
        isCmd: false,
      });
    } else if (cmd === "skills" || cmd === "view_skills.sh") {
      newHistory.push({
        text: "> FRONTEND: React 19, Next.js (App Router), TypeScript, Tailwind CSS\n> BACKEND:  Node.js, Express, Python (FastAPI/Django), REST APIs\n> STORAGE:  PostgreSQL, SQLite, Redis, SQL Optimization\n> TOOLS:    Git, Docker, AWS, Vercel, Figma",
        isCmd: false,
      });
    } else if (cmd === "projects" || cmd === "list_projects.py") {
      newHistory.push({
        text: "> RECENT BUILDS:\n  1. AI Review & Reputation Tool (businesshelp) — Live\n  2. AgriScan Mobile OCR Helper (AgriScan) — Live\n  3. Smart Clothes Dryer Forecast Utility (freeclothesdryer) — Live",
        isCmd: false,
      });
    } else if (cmd === "contact") {
      newHistory.push({
        text: "Email: ruttalamohan23@gmail.com\nGitHub: github.com/Mohansaina\nLinkedIn: linkedin.com/in/ruttala-mohan-sai-nandakishore-a73484309",
        isCmd: false,
      });
    } else if (cmd === "clear") {
      setHistory([]);
      setInputText("");
      return;
    } else if (cmd === "matrix" || cmd === "secret") {
      newHistory.push({
        text: "System status: OPERATIONAL.\n01001101 01001111 01001000 01000001 01001110 00100000 01010010 01010101 01010100 01010100 01000001 01001100 01000001",
        isCmd: false,
      });
    } else {
      newHistory.push({
        text: `Error: command not recognized '${cmd}'. Type 'help' for available commands.`,
        isCmd: false,
      });
    }

    setHistory(newHistory);
    setInputText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputText);
  };

  return (
    <section className="py-12 px-margin-mobile max-w-4xl mx-auto z-20 relative">
      <div className="bg-[#10121a]/90 border border-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-2xl overflow-hidden relative group/term">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs text-white/40">terminal</span>
            <span className="font-code text-[11px] text-white/50 tracking-widest">
              mohan@visakhapatnam:~
            </span>
          </div>
        </div>

        {/* History Stream */}
        <div className="font-code text-xs space-y-3 min-h-[160px] max-h-[280px] overflow-y-auto pr-2 select-text">
          {history.map((item, idx) => (
            <div key={idx} className={item.isCmd ? "text-cyan-400 font-bold" : "text-white/80 whitespace-pre-line leading-relaxed"}>
              {item.text}
            </div>
          ))}
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 font-code text-xs">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type 'help', 'skills', or 'projects'..."
            className="flex-1 bg-transparent border-none outline-none text-white font-code text-xs placeholder:text-white/30"
          />
          <button type="submit" className="text-xs text-cyan-400 hover:text-white font-bold px-2 py-1">
            RUN
          </button>
        </form>

        {/* Interactive Shell Shortcuts */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2 text-[10px] font-label-caps">
          <button
            onClick={() => executeCommand("whoami")}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-white/90 border border-white/10 transition-all cursor-pointer"
          >
            whoami
          </button>
          <button
            onClick={() => executeCommand("view_skills.sh")}
            className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition-all cursor-pointer"
          >
            view_skills.sh
          </button>
          <button
            onClick={() => executeCommand("list_projects.py")}
            className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/25 transition-all cursor-pointer"
          >
            list_projects.py
          </button>
          <button
            onClick={() => executeCommand("matrix")}
            className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/25 transition-all cursor-pointer"
          >
            matrix
          </button>
          <button
            onClick={() => executeCommand("clear")}
            className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25 transition-all cursor-pointer ml-auto"
          >
            clear
          </button>
        </div>
      </div>
    </section>
  );
};
