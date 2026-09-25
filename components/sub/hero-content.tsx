"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { HeroFlipCard } from "@/components/sub/hero-flip-card";
import { GlassIsland } from "@/components/ui/glass-island";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-0 px-6 sm:px-12 lg:px-20 mt-24 sm:mt-28 lg:mt-32 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div variants={slideInFromTop} className="w-fit">
          <GlassIsland>
            <p className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white/85">
              <SparklesIcon className="h-4 w-4 text-[#c4b5fd]" aria-hidden />
              AI Generalist &middot; Bengaluru, India
            </p>
          </GlassIsland>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <h1>
            Visualizing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              intelligence
            </span>
            , and shipping it.
          </h1>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-5 max-w-[600px]"
        >
          I&apos;m Syed Shahid Nazeer, an AI Generalist working across
          Generative AI, LLMs, RAG systems and data science. I build the model,
          the product around it, and the story that makes it land.
        </motion.p>

        <motion.div variants={slideInFromLeft(1)} className="w-fit">
          <GlassIsland>
            <a
              href="#projects"
              className="flex items-center gap-3 py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white"
            >
              See my work
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </GlassIsland>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <HeroFlipCard />
      </motion.div>
    </motion.div>
  );
};
