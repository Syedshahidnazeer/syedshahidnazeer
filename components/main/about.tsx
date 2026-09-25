"use client";

import { motion } from "framer-motion";

import { DATA_SKILL, PROJECTS, SKILL_DATA, WEB_SKILL } from "@/constants";

/**
 * Derived from the same constants the rest of the page renders, so these
 * numbers can't drift out of sync with what's actually shown.
 */
const STATS = [
  { label: "Shipped projects", value: `${PROJECTS.length}` },
  { label: "Core focus areas", value: `${SKILL_DATA.length}` },
  {
    label: "Tools & stacks",
    value: `${SKILL_DATA.length + DATA_SKILL.length + WEB_SKILL.length}+`,
  },
] as const;

export const About = () => {
  return (
    <section
      id="story"
      className="flex flex-col items-center justify-center gap-8 px-6 sm:px-12 lg:px-20 py-4 md:py-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[720px] text-base sm:text-lg text-gray-400 leading-relaxed"
      >
        I&apos;m an AI Generalist at{" "}
        <span className="text-gray-200">Rapyder Cloud Solutions</span>, based
        in Bengaluru. My work sits at the join between the model and the
        product around it — generative AI, retrieval-augmented systems, NLP
        and the data science that grounds all of it — carried from a working
        prototype to something people actually use.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-wrap items-center justify-center gap-10 sm:gap-16"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 mt-1 tracking-wide uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
