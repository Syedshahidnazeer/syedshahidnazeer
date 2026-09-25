"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";

import { FAQS } from "@/constants";

import styles from "./faq.module.css";

// The site's purple → cyan range, one accent per card.
const ACCENTS = ["#a855f7", "#22d3ee", "#7042f8", "#38bdf8", "#c084fc", "#06b6d4"];
const AUTO_ADVANCE_MS = 6000;
const SWIPE_PX = 50;

/** Signed shortest distance from the active card, wrapping around. */
const offsetOf = (i: number, active: number, n: number) =>
  ((i - active + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);

export const Faq = () => {
  const n = FAQS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);

  const go = useCallback((delta: number) => setActive((a) => (a + delta + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => go(1), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, go]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const onPointerDown = (e: PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-6 md:py-10"
    >
      <h2
        id="faq-heading"
        className="text-center text-[30px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 sm:text-[36px] lg:text-[40px]"
      >
        {n} Questions That Might Be Useful for You
      </h2>
      <p className="mt-2 pb-10 text-center text-sm text-gray-400 sm:text-base">
        A quick way to understand who I am, what I build and how to reach me
      </p>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Frequently asked questions"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="w-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
      >
        <div
          className={styles.stage}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (dragStart.current = null)}
        >
          {FAQS.map((faq, i) => {
            const d = offsetOf(i, active, n);
            const abs = Math.abs(d);
            const isActive = d === 0;
            return (
              <div
                key={faq.question}
                className={styles.slot}
                style={{
                  transform: `translateX(${d * 58}%) translateZ(${-abs * 90}px) rotateY(${d * -22}deg) scale(${1 - abs * 0.12})`,
                  opacity: [1, 0.55, 0.2][abs] ?? 0,
                  filter: isActive ? "none" : `blur(${abs * 1.5}px)`,
                  zIndex: 10 - abs,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <article
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${n}`}
                  aria-current={isActive}
                  onClick={() => !isActive && setActive(i)}
                  className={styles.card}
                  style={{ "--accent": ACCENTS[i % ACCENTS.length] } as CSSProperties}
                >
                  <div className={styles.panel}>
                    <p className={styles.number}>{String(i + 1).padStart(2, "0")}</p>
                    <h3 className={styles.question}>{faq.question}</h3>
                    <p className={styles.answer}>{faq.answer}</p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button type="button" aria-label="Previous question" className={styles.arrow} onClick={() => go(-1)}>
            <Chevron flip />
          </button>
          <div className={styles.dots}>
            {FAQS.map((faq, i) => (
              <button
                key={faq.question}
                type="button"
                aria-label={`Question ${i + 1}`}
                aria-current={i === active}
                className={styles.dot}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button type="button" aria-label="Next question" className={styles.arrow} onClick={() => go(1)}>
            <Chevron />
          </button>
        </div>
      </div>
    </section>
  );
};

const Chevron = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden
    style={flip ? { transform: "scaleX(-1)" } : undefined}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);
