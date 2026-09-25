"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { GlassIsland } from "@/components/ui/glass-island";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div variants={slideInFromTop} className="w-fit">
        <GlassIsland>
          <p className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white/85">
            <SparklesIcon className="h-4 w-4 text-[#c4b5fd]" aria-hidden />
            Generative AI &middot; NLP &middot; Data Science
          </p>
        </GlassIsland>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[24px] sm:text-[30px] text-white font-medium mt-[10px] text-center mb-[15px] px-4"
      >
        <h2>The stack behind the work.</h2>
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-gray-200 mb-6 mt-[10px] text-center"
      >
        From prompt design to production pipelines.
      </motion.div>
    </div>
  );
};
