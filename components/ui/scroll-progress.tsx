"use client";

import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0);
    };

    // Coalesce to at most one state update per frame — scroll fires far more
    // often than that, and each one was triggering its own re-render.
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        measure();
        raf = 0;
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-purple-500 to-cyan-500"
      style={{ width: `${progress}%` }}
    />
  );
};
