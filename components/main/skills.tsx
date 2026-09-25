"use client";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import { DATA_SKILL, SKILL_DATA, WEB_SKILL } from "@/constants";
import { useAutoPauseVideo } from "@/lib/use-auto-pause-video";

type SkillItem = {
  skill_name: string;
  image: string;
  width: number;
  height: number;
};

const LEFT_GROUPS = [
  { label: "Core focus", items: SKILL_DATA },
  { label: "Data & reporting", items: DATA_SKILL },
] as const;

const RIGHT_GROUPS = [{ label: "Web & delivery", items: WEB_SKILL }] as const;

const SkillCluster = ({
  label,
  items,
  align,
}: {
  label: string;
  items: readonly SkillItem[];
  align: "start" | "end";
}) => (
  <div
    className={`flex flex-col gap-3 items-center ${
      align === "end" ? "lg:items-end" : "lg:items-start"
    }`}
  >
    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a084ff]">
      {label}
    </span>
    <div
      className={`flex flex-wrap justify-center gap-5 ${
        align === "end" ? "lg:justify-end" : "lg:justify-start"
      }`}
    >
      {items.map((skill, i) => (
        <SkillDataProvider
          key={skill.skill_name}
          src={skill.image}
          name={skill.skill_name}
          width={skill.width}
          height={skill.height}
          index={i}
        />
      ))}
    </div>
  </div>
);

export const Skills = () => {
  const videoRef = useAutoPauseVideo<HTMLVideoElement>();

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-6 md:py-10"
    >
      <SkillText />

      {/*
        Skills pushed to the two outer columns (items-start on the left,
        items-end on the right) instead of centred — the reserved middle
        gutter keeps the background animation clear instead of getting
        buried under icons.
      */}
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[1fr_minmax(140px,260px)_1fr] lg:gap-6">
        <div className="flex flex-col gap-10">
          {LEFT_GROUPS.map((group) => (
            <SkillCluster
              key={group.label}
              label={group.label}
              items={group.items}
              align="start"
            />
          ))}
        </div>

        <div aria-hidden className="hidden lg:block" />

        <div className="flex flex-col gap-10">
          {RIGHT_GROUPS.map((group) => (
            <SkillCluster
              key={group.label}
              label={group.label}
              items={group.items}
              align="end"
            />
          ))}
        </div>
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-40 absolute flex items-center justify-center bg-cover">
          <video
            ref={videoRef}
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
