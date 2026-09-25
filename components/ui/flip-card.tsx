"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
} from "react";

import styles from "./flip-card.module.css";

/*
 * React Bits FlipCard, ported to TypeScript + CSS Modules. Uses framer-motion
 * (already a dependency) instead of the `motion` package — same API. Trimmed
 * to the uncontrolled mode this site uses.
 *
 * Click or press Enter/Space to flip; drag to turn it by hand (it springs to
 * the nearest face, carrying the flick velocity); it leans toward the cursor
 * with a glare that follows it.
 */

const SLOP = { fine: 4, coarse: 8 };
const TILT_SPRING = { stiffness: 240, damping: 24, mass: 0.6 };
const LIFT_SPRING = { stiffness: 320, damping: 26 };
const FLING = 0.16;
const HISTORY_MS = 90;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const snap = (deg: number) => Math.round(deg / 180) * 180;
const isBack = (deg: number) => Math.abs(Math.round(deg / 180)) % 2 === 1;

type Grip = {
  id: number;
  x: number;
  base: number;
  moved: boolean;
  slop: number;
  hist: { t: number; v: number }[];
};

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  width?: number;
  height?: number;
  radius?: number;
  tiltMax?: number;
  glareOpacity?: number;
  hoverScale?: number;
  perspective?: number;
  stiffness?: number;
  damping?: number;
  background?: string;
  color?: string;
  shadowColor?: string;
  shadowOpacity?: number;
  ariaLabel?: string;
};

export const FlipCard = ({
  front,
  back,
  width = 300,
  height = 400,
  radius = 22,
  tiltMax = 12,
  glareOpacity = 0.22,
  hoverScale = 1.03,
  perspective = 1100,
  stiffness = 170,
  damping = 20,
  background = "#27272a",
  color = "#f5f5f5",
  shadowColor = "#000000",
  shadowOpacity = 0.45,
  ariaLabel = "Flip card",
}: FlipCardProps) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [dragging, setDragging] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const grip = useRef<Grip | null>(null);
  const spin = useRef<AnimationPlaybackControls | null>(null);
  const target = useRef(0);
  const shownNow = useRef(false);

  const turn = useMotionValue(0);
  const tiltX = useSpring(0, TILT_SPRING);
  const tiltY = useSpring(0, TILT_SPRING);
  const lift = useSpring(1, LIFT_SPRING);
  const sheen = useSpring(0, LIFT_SPRING);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const sumY = useTransform(() => turn.get() + tiltY.get());
  const transform = useMotionTemplate`perspective(${perspective}px) scale(${lift}) rotateX(${tiltX}deg) rotateY(${sumY}deg)`;
  const facing = useTransform(turn, (t) => Math.abs(Math.cos((t * Math.PI) / 180)));
  const spread = useTransform(facing, (f) => 0.08 + 0.92 * f);
  const shade = useTransform(facing, (f) => 0.1 + 0.9 * f * f);
  const gxPct = useMotionTemplate`${gx}%`;
  const gyPct = useMotionTemplate`${gy}%`;

  useEffect(() => () => spin.current?.stop(), []);

  const settle = (to: number, velocity: number, instant: boolean) => {
    spin.current?.stop();
    target.current = to;
    if (instant || reduce) turn.jump(to);
    else
      spin.current = animate(turn, to, {
        type: "spring",
        stiffness,
        damping,
        velocity,
        restDelta: 0.05,
      });
    const next = isBack(to);
    if (next === shownNow.current) return;
    shownNow.current = next;
    setShown(next);
  };

  const flip = (instant: boolean) => {
    const base = snap(turn.get());
    settle(isBack(base) ? base - 180 : base + 180, 0, instant);
  };

  const rest = () => {
    tiltX.set(0);
    tiltY.set(0);
    sheen.set(0);
    lift.set(1);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || grip.current) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    spin.current?.stop();
    grip.current = {
      id: e.pointerId,
      x: e.clientX,
      base: turn.get(),
      moved: false,
      slop: e.pointerType === "touch" ? SLOP.coarse : SLOP.fine,
      hist: [],
    };
    if (!reduce) lift.set(hoverScale);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const g = grip.current;
    if (g && g.id === e.pointerId) {
      const d = e.clientX - g.x;
      if (!g.moved) {
        if (Math.abs(d) < g.slop || reduce) return;
        g.moved = true;
        setDragging(true);
        tiltX.set(0);
        tiltY.set(0);
        sheen.set(0);
      }
      const deg = g.base + (d / width) * 180;
      turn.set(deg);
      const now = performance.now();
      g.hist.push({ t: now, v: deg });
      while (g.hist.length > 2 && now - g.hist[0].t > HISTORY_MS) g.hist.shift();
      return;
    }
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = clamp((e.clientX - r.left) / r.width, 0, 1);
    const py = clamp((e.clientY - r.top) / r.height, 0, 1);
    tiltX.set((0.5 - py) * 2 * tiltMax);
    tiltY.set((px - 0.5) * 2 * tiltMax);
    gx.set(px * 100);
    gy.set(py * 100);
    sheen.set(1);
  };

  const release = (e: PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const g = grip.current;
    if (!g || g.id !== e.pointerId) return;
    grip.current = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId))
        e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setDragging(false);
    if (e.pointerType === "touch" || !rootRef.current?.matches(":hover")) rest();
    if (!g.moved) {
      if (!cancelled) flip(false);
      else settle(target.current, 0, false);
      return;
    }
    const here = turn.get();
    let velocity = 0;
    const a = g.hist[0];
    const b = g.hist[g.hist.length - 1];
    if (!cancelled && a && b && b.t > a.t && performance.now() - b.t < 60)
      velocity = ((b.v - a.v) / (b.t - a.t)) * 1000;
    const to = cancelled
      ? snap(g.base)
      : clamp(snap(here + velocity * FLING), snap(here) - 180, snap(here) + 180);
    settle(to, velocity, false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    if (!e.repeat) flip(true);
  };

  // Keyboard-initiated clicks (detail 0) flip; pointer clicks are handled on release.
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.detail === 0) flip(true);
  };

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      aria-pressed={shown}
      aria-label={ariaLabel}
      className={styles.root}
      data-axis="y"
      data-draggable={!reduce ? "" : undefined}
      data-dragging={dragging ? "" : undefined}
      data-fade={reduce ? (shown ? "back" : "front") : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => release(e, false)}
      onPointerCancel={(e) => release(e, true)}
      onLostPointerCapture={(e) => release(e, true)}
      onPointerEnter={(e) => {
        if (!reduce && e.pointerType !== "touch") lift.set(hoverScale);
      }}
      onPointerLeave={() => {
        if (!grip.current) rest();
      }}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onDragStart={(e) => e.preventDefault()}
      style={
        {
          "--fc-w": `${width}px`,
          "--fc-h": `${height}px`,
          "--fc-radius": `${radius}px`,
          "--fc-bg": background,
          "--fc-ink": color,
          "--fc-shadow": shadowColor,
          "--fc-shadow-o": shadowOpacity,
          "--fc-glare": glareOpacity,
        } as CSSProperties
      }
    >
      <motion.span
        className={styles.shadow}
        aria-hidden
        style={{ scaleX: spread, opacity: shade }}
      />
      <motion.div
        className={styles.rotor}
        style={
          reduce
            ? undefined
            : ({
                transform,
                "--fc-gx": gxPct,
                "--fc-gy": gyPct,
                "--fc-sheen": sheen,
              } as unknown as CSSProperties)
        }
      >
        <div className={`${styles.face} ${styles.front}`} aria-hidden={shown} inert={shown}>
          {front}
          <span className={styles.glare} aria-hidden />
        </div>
        <div className={`${styles.face} ${styles.back}`} aria-hidden={!shown} inert={!shown}>
          {back}
          <span className={styles.glare} aria-hidden />
        </div>
      </motion.div>
    </div>
  );
};
