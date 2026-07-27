"use client";

import React, { useState } from "react";
import { ScrambleText } from "./ScrambleText";

interface ContactProps {
  onMagnetButton: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  onMagnetButtonReset: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({
  onMagnetButton,
  onMagnetButtonReset,
  onShowToast,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Project Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast("Validation Error", "Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(
        "Message Sent Successfully!",
        `Thank you ${formData.name}. Mohan will respond to your email shortly.`
      );
      setFormData({
        name: "",
        email: "",
        subject: "Project Inquiry",
        message: "",
      });
    }, 1000);
  };

  return (
    <footer id="contact" className="bg-[#07080c] py-24 px-margin-mobile md:px-margin-desktop border-t border-white/10 relative z-40 developer-grid">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5">
            <span className="font-label-caps text-xs accent-text uppercase tracking-[0.2em] block mb-2">
              GET IN TOUCH
            </span>
            <h2 className="font-display-lg text-4xl md:text-5xl uppercase mb-6 cursor-default">
              <ScrambleText text="Start a Project" />
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant max-w-md mb-8 leading-relaxed">
              I'm currently accepting new freelance web development projects and full-time software engineering contracts. Let's build something technically superior together.
            </p>

            <a
              onMouseMove={onMagnetButton}
              onMouseLeave={onMagnetButtonReset}
              className="font-display-lg text-xl sm:text-2xl md:text-3xl hover:text-cyan-400 transition-colors block border-b-2 border-white/20 pb-4 break-words font-bold mb-8"
              href="mailto:ruttalamohan23@gmail.com"
            >
              ruttalamohan23@gmail.com
            </a>

            <div className="flex gap-6 items-center">
              <a
                className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant hover:text-cyan-400 transition-colors"
                href="https://github.com/Mohansaina"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant hover:text-cyan-400 transition-colors"
                href="https://www.linkedin.com/in/ruttala-mohan-sai-nandakishore-a73484309/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-3xl">
            <h3 className="font-display-lg text-xl text-white uppercase font-bold mb-6">
              Send a Direct Message
            </h3>

            {/* Subject Preset Selector */}
            <div className="mb-6">
              <label className="font-label-caps text-xs text-white/70 uppercase tracking-wider block mb-2">
                I'm interested in:
              </label>
              <div className="flex flex-wrap gap-2">
                {["Project Inquiry", "Full-Time Role", "Technical Audit", "General Help"].map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setFormData({ ...formData, subject: subj })}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-label-caps transition-all ${
                      formData.subject === subj
                        ? "bg-white/20 text-white font-bold border border-cyan-400/40"
                        : "bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-xs text-white/70 uppercase tracking-wider block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-xs text-white/70 uppercase tracking-wider block mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-xs text-white/70 uppercase tracking-wider block mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project goals, timelines, or technology requirements..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseMove={onMagnetButton}
                onMouseLeave={onMagnetButtonReset}
                className="w-full py-4 rounded-full ignition-gradient font-label-caps text-xs uppercase tracking-widest text-black font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    SEND MESSAGE{" "}
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <div className="font-display-lg text-xl text-white font-bold tracking-tighter">
            MOHAN RUTTALA
          </div>
          <div className="font-body-md text-xs text-white/40 uppercase tracking-wider text-center">
            © 2025 MOHAN RUTTALA. ALL RIGHTS RESERVED. VISAKHAPATNAM, INDIA.
          </div>
          <div className="flex gap-6 text-xs font-label-caps text-white/60">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
