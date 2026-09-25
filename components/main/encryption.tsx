"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";

import { AI_KEYWORDS as KEYWORDS } from "@/constants";
import { slideInFromTop } from "@/lib/motion";

import styles from "./keyword-grid.module.css";

const ROW_COUNT = 21;
const ITEMS_PER_ROW = 16;
const MID = (ROW_COUNT - 1) / 2;

// Row widths follow an ellipse; 0.87 matches the original's end rows being
// ~49% as wide as the middle one. Rows mirror top-to-bottom, as they did.
const ROWS = Array.from({ length: ROW_COUNT }, (_, i) => {
  const t = (i - MID) / MID;
  const mirror = Math.min(i, ROW_COUNT - 1 - i);
  const items = Array.from(
    { length: ITEMS_PER_ROW },
    (_, k) => KEYWORDS[(mirror * 7 + k) % KEYWORDS.length]
  );
  return {
    text: items.join("  ::  "),
    width: `${(Math.sqrt(1 - (0.87 * t) ** 2) * 100).toFixed(1)}%`,
  };
});

const ovalStyle = { "--rows": ROW_COUNT } as CSSProperties;

const KeywordRows = () =>
  ROWS.map((row, i) => (
    <div key={i} className={styles.row} style={{ width: row.width }}>
      <span>{row.text}</span>
    </div>
  ));

export const Encryption = () => {
  return (
    <div className="flex flex-row relative items-center justify-center min-h-[560px] md:min-h-[85vh] w-full h-full -z-20 overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-[3] select-none"
      >
        <div className={styles.stage}>
          <div className={`${styles.oval} ${styles.base}`} style={ovalStyle}>
            <KeywordRows />
          </div>
          <div className={`${styles.oval} ${styles.glow}`} style={ovalStyle}>
            <KeywordRows />
          </div>
        </div>
      </motion.div>

      <div className="absolute w-full px-4 h-auto top-0 z-[5]">
        <motion.div
          variants={slideInFromTop}
          className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-center text-gray-200 px-4"
        >
          <h2>
          Grounded{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            &
          </span>{" "}
          governed.
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/lock-top.png"
            alt=""
            width={50}
            height={50}
            className="translate-y-5 transition-all duration-200 group-hover:translate-y-11"
          />
          <Image
            src="/lock-main.png"
            alt=""
            width={70}
            height={70}
            className="z-10"
          />
        </div>

        <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042F88B] opacity-[0.9]">
          <p className="Welcome-text text-[12px]">AI Generalist</p>
        </div>
      </div>

      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        <div className="cursive text-[15px] sm:text-[20px] font-medium text-center text-gray-300 px-4">
          Answers traced back to their sources, not invented.
        </div>
      </div>
    </div>
  );
};
