"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { GlassIsland, glassPillClass } from "@/components/ui/glass-island";
import { NAV_LINKS } from "@/constants";

export const Navbar = () => {
  const [active, setActive] = useState<string>(NAV_LINKS[0].link);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    // Current section = the last one whose top has passed 45% down the viewport.
    // Recomputed from positions each time, so layout shifts and hash jumps
    // can't leave it stale the way enter/leave events could.
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let current: string = NAV_LINKS[0].link;
      for (const { link } of NAV_LINKS) {
        const el = document.querySelector(link);
        if (el && el.getBoundingClientRect().top <= line) current = link;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const highlighted = hovered ?? active;

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3"
    >
      <div className="pointer-events-auto">
        <GlassIsland>
          <ul
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-0.5 p-1.5"
          >
            {NAV_LINKS.map((link) => {
              const isHighlighted = highlighted === link.link;
              return (
                <li key={link.link} className="relative">
                  {isHighlighted && (
                    <motion.span
                      layoutId="island-pill"
                      className={`${glassPillClass} absolute inset-0 rounded-full`}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <Link
                    href={link.link}
                    onMouseEnter={() => setHovered(link.link)}
                    aria-current={active === link.link ? "location" : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                      isHighlighted
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </GlassIsland>
      </div>
    </nav>
  );
};
