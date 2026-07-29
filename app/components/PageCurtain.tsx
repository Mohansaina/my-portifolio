"use client";

import React, { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/motion";

/**
 * The curtain that lifts off the page on first load.
 *
 * It unmounts itself once the animation has run rather than relying on the
 * animation's end state to get out of the way. That distinction matters: an
 * opaque, fixed, full-viewport panel that fails to animate — because the tab
 * was backgrounded during load, or an extension disabled animations — would
 * leave the site looking blank. Removing the node makes that failure
 * impossible.
 */
export const PageCurtain: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    // Comfortably past the 120ms delay plus the 500ms lift.
    const timer = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(timer);
  }, [reduced]);

  if (reduced || done) return null;

  return <div aria-hidden className="page-curtain" />;
};
