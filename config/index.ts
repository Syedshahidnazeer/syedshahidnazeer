import type { Metadata } from "next";

import { AI_KEYWORDS, PROFILE } from "@/constants";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in the host's environment once
 * the domain is live — metadataBase, canonical links, the Open Graph image,
 * the sitemap, robots.txt, JSON-LD and llms.txt all resolve against it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://syedshahidnazeer.me"
).replace(/\/$/, "");

// ~55 chars: fits a Google result title without truncation.
const title = `${PROFILE.name} | ${PROFILE.title} · GenAI, RAG & NLP`;

// ~155 chars: fits a result snippet, leads with the entity for AI summaries.
const description = `${PROFILE.name} is an ${PROFILE.title} at ${PROFILE.employer} in ${PROFILE.city}, building generative AI, RAG and NLP products from prototype to production.`;

export const siteConfig: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${PROFILE.name}`,
  },
  description,
  applicationName: `${PROFILE.name} — Portfolio`,
  keywords: [
    PROFILE.name,
    "Syed Shahid Nazeer portfolio",
    "AI Generalist",
    "AI Generalist Bengaluru",
    "AI Engineer Bengaluru",
    "Generative AI engineer",
    "LLM engineer",
    "RAG developer",
    "retrieval augmented generation",
    "NLP engineer",
    "data scientist Bengaluru",
    PROFILE.employer,
    ...AI_KEYWORDS,
  ],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLM-readable profile (llms.txt)" }],
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "profile",
    firstName: PROFILE.givenName,
    lastName: PROFILE.familyName,
    url: SITE_URL,
    siteName: PROFILE.name,
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
