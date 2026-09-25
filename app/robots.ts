import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config";

/*
 * A portfolio wants maximum discovery, so everything is open. AI crawlers are
 * listed by name even though "*" already allows them: some operators treat an
 * explicit entry as the site owner's opt-in, and it documents intent. Nothing
 * under /_next is blocked — search engines need the JS/CSS to render the page.
 */
const SEARCH_BOTS = ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "YandexBot"];

const AI_BOTS = [
  // OpenAI — search results, user-initiated browsing, training
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / AI Overviews grounding, Apple Intelligence
  "Google-Extended",
  "Applebot-Extended",
  // Others that feed assistants and answer engines
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "cohere-ai",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: SEARCH_BOTS, allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
