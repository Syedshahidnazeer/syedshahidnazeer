"use client";

import { useEffect, useRef } from "react";

import styles from "./cursor-glow.module.css";

/**
 * A soft radial glow that follows the pointer across the whole page, sitting
 * above the star canvas and below page content. Skipped entirely under
 * prefers-reduced-motion — it's purely decorative, so there's nothing to
 * degrade gracefully to.
 */
export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // No pointer to follow on touch-only devices — skip setting up the listener.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.4;

    const apply = () => {
      ref.current?.style.setProperty("--x", `${x}px`);
      ref.current?.style.setProperty("--y", `${y}px`);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={styles.glow} aria-hidden />;
};
