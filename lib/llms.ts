import { SITE_URL } from "@/config";
import {
  AI_KEYWORDS,
  DATA_SKILL,
  FAQS,
  PROFILE,
  PROJECTS,
  SKILL_DATA,
  SOCIALS,
  WEB_SKILL,
} from "@/constants";

/*
 * llms.txt (https://llmstxt.org): an H1, a blockquote summary, then sections
 * of markdown links. llms-full.txt carries the full text so an assistant can
 * answer from one fetch. Both are built from the constants the page renders.
 */

const social = (name: string) => SOCIALS.find((s) => s.name === name)?.link ?? "";

const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0];

const skills = (list: readonly { skill_name: string }[]) =>
  list.map((s) => s.skill_name).join(", ");

export function buildLlmsTxt() {
  return `# ${PROFILE.name}

> ${PROFILE.summary}

${PROFILE.name} is an ${PROFILE.title} based in ${PROFILE.location}. His focus areas are ${skills(SKILL_DATA)}. He is open to roles, freelance projects and collaborations in applied AI.

## Profile

- [Portfolio](${SITE_URL}): Homepage — about, skills, projects and contact
- [Full profile for LLMs](${SITE_URL}/llms-full.txt): Complete plain-text version of this site in one file

## Projects

${PROJECTS.map((p) => `- [${p.title}](${p.link}): ${firstSentence(p.description)}`).join("\n")}

## Contact

- [Email](mailto:${PROFILE.email}): ${PROFILE.email}
- [LinkedIn](${social("LinkedIn")}): Professional profile
- [GitHub](${social("GitHub")}): Source code and repositories
`;
}

export function buildLlmsFullTxt() {
  return `# ${PROFILE.name} — ${PROFILE.title}

> ${PROFILE.summary}

- Name: ${PROFILE.name}
- Role: ${PROFILE.title}
- Employer: ${PROFILE.employer}
- Location: ${PROFILE.location}
- Email: ${PROFILE.email}
- LinkedIn: ${social("LinkedIn")}
- GitHub: ${social("GitHub")}
- Website: ${SITE_URL}
- Availability: Open to roles, freelance projects and collaborations in applied AI

## About

${PROFILE.name} works where the model meets the product: generative AI features, retrieval-augmented systems that cite their sources instead of inventing answers, NLP, and the data science that grounds all of it. He builds the model, the product around it, and the story that makes it land, carrying work from a working prototype to something people actually use.

## Skills

- Core focus: ${skills(SKILL_DATA)}
- Data and reporting: ${skills(DATA_SKILL)}
- Web and delivery: ${skills(WEB_SKILL)}
- Topics and tools: ${AI_KEYWORDS.join(", ")}

## Projects

${PROJECTS.map(
  (p) => `### ${p.title}

- Category: ${p.category}
- Language: ${p.tech}
- Tags: ${p.tags.join(", ")}
- Link: ${p.link}

${p.description}`
).join("\n\n")}

## Frequently asked questions

${FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}
`;
}
