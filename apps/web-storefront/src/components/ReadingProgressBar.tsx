"use client";

import { useEffect } from "react";

export function ReadingProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("reading-progress");
    if (!bar) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      bar.style.transform = `scaleX(${Math.min(progress, 1)})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div id="reading-progress" style={{ transform: "scaleX(0)" }} />;
}
