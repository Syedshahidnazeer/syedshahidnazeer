"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { GlassIsland, glassPillClass } from "@/components/ui/glass-island";
import { PROFILE, SOCIALS } from "@/constants";

export const Footer = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <footer className="flex flex-col items-center gap-4 px-3 pb-8 pt-4">
      <p className="text-center text-sm text-gray-300">
        <span className="font-semibold text-white">{PROFILE.name}</span>
        <span className="mx-2 text-gray-600">&middot;</span>
        {PROFILE.title}, {PROFILE.location.split(",")[0]}
      </p>

      <GlassIsland>
        <ul
          onMouseLeave={() => setHovered(null)}
          className="flex items-center gap-0.5 p-1.5"
        >
          {SOCIALS.map(({ name, link, icon: Icon }) => (
            <li key={name} className="relative">
              {hovered === name && (
                <motion.span
                  layoutId="footer-pill"
                  className={`${glassPillClass} absolute inset-0 rounded-full`}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Link
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                onMouseEnter={() => setHovered(name)}
                className="relative flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium text-white/75 transition-colors hover:text-white sm:px-4 sm:text-sm"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </GlassIsland>

      <p className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </p>
    </footer>
  );
};
