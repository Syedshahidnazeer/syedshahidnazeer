"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

import { FlipCard } from "@/components/ui/flip-card";
import { PROFILE, SOCIALS } from "@/constants";

const PHOTO = "/profile-hoodie.webp";

// Buttons on the back must not start a drag/flip on the card underneath.
const keepTap = (e: PointerEvent) => e.stopPropagation();

const Front = () => (
  <div className="relative h-full w-full">
    <Image
      src={PHOTO}
      alt={`Portrait of ${PROFILE.name}`}
      fill
      sizes="(max-width: 640px) 90vw, 360px"
      priority
      draggable={false}
      className="object-cover"
    />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#030014]/95 via-[#030014]/55 to-transparent px-6 pb-6 pt-20">
      <p className="text-2xl font-semibold text-white">{PROFILE.name}</p>
      <p className="mt-1 text-sm text-purple-200/85">
        {PROFILE.title} &middot; {PROFILE.city}
      </p>
      <p className="mt-4 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
        Tap to flip
        <span aria-hidden>&#8635;</span>
      </p>
    </div>
  </div>
);

const Back = () => (
  <div className="flex h-full flex-col bg-gradient-to-br from-[#7042f8]/30 via-[#0b0518] to-[#22d3ee]/20 p-6">
    <div className="flex items-center gap-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
        {/* Face-centred crop: the portrait scaled to 146×186 with the face (≈36%, 17%) at the circle centre. */}
        <Image
          src={PHOTO}
          alt=""
          width={146}
          height={186}
          sizes="160px"
          draggable={false}
          className="absolute max-w-none"
          style={{ left: -24, top: -4, width: 146, height: 186 }}
        />
      </div>
      <div>
        <p className="text-lg font-semibold leading-tight text-white">{PROFILE.name}</p>
        <p className="text-sm text-purple-200/85">{PROFILE.title}</p>
      </div>
    </div>

    <p className="mt-6 text-[15px] leading-relaxed text-gray-300">
      I build generative AI, RAG and NLP systems at {PROFILE.employer} in{" "}
      {PROFILE.city}, and carry them from prototype to production.
    </p>

    <p className="mt-5 flex items-center gap-2 text-sm text-gray-200">
      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      Open to roles, freelance &amp; collaborations
    </p>

    <div className="mt-auto flex flex-col gap-3">
      <button
        type="button"
        onPointerDown={keepTap}
        onClick={() =>
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        }
        className="rounded-xl bg-gradient-to-r from-[#7042f8] to-[#06b6d4] py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(112,66,248,0.7)] transition hover:brightness-110"
      >
        Contact me
      </button>
      <div className="flex gap-3">
        {SOCIALS.filter((s) => s.link.startsWith("http")).map(({ name, link, icon: Icon }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            onPointerDown={keepTap}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10"
          >
            <Icon className="h-4 w-4" aria-hidden />
            {name}
          </a>
        ))}
      </div>
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
        Tap to flip back
      </p>
    </div>
  </div>
);

export const HeroFlipCard = () => (
  <FlipCard
    front={<Front />}
    back={<Back />}
    width={360}
    height={470}
    radius={24}
    background="#0b0518"
    shadowColor="#2a0e61"
    shadowOpacity={0.6}
    ariaLabel={`${PROFILE.name} profile card — press to flip`}
  />
);
