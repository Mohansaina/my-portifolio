import React from "react";

/**
 * The page's ambient lighting & global visual artwork background.
 *
 * Combines soft studio lighting wash, fine film grain, and subtle
 * global tech visual artwork overlay that flows across the entire website.
 */
export const GlobalBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden">
    <div className="studio-wash" />
    {/* Global Tech Visual Overlay across the entire site */}
    <div className="absolute inset-0 opacity-[0.09] bg-[url('/hero_premium_visual.png')] bg-cover bg-center mix-blend-screen blur-[12px] scale-105 pointer-events-none" />
    <div className="grain" />
  </div>
);
