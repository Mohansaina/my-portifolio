"use client";

import React, { useState, useRef, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        isScrambling.current = false;
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span onMouseEnter={scramble} className={`cursor-default ${className}`}>
      {displayText}
    </span>
  );
};
