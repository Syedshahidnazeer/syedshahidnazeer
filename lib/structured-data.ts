import { SITE_URL } from "@/config";
import { AI_KEYWORDS, FAQS, PROFILE, PROJECTS, SOCIALS } from "@/constants";

/**
 * JSON-LD for the whole site as one linked @graph. Nodes reference each other
 * by @id, so search engines and LLMs resolve one person entity instead of
 * several loosely-related blobs. Built from the same constants the page
 * renders, so it can't drift from what's visible.
 */
export function buildStructuredData() {
  const id = {
    person: `${SITE_URL}/#person`,
    website: `${SITE_URL}/#website`,
    profile: `${SITE_URL}/#profilepage`,
    projects: `${SITE_URL}/#projects`,
    faq: `${SITE_URL}/#faq`,
  };
  const sameAs = SOCIALS.filter((s) => s.link.startsWith("http")).map((s) => s.link);

  const person = {
    "@type": "Person",
    "@id": id.person,
    name: PROFILE.name,
    givenName: PROFILE.givenName,
    familyName: PROFILE.familyName,
    jobTitle: PROFILE.title,
    description: PROFILE.summary,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    email: `mailto:${PROFILE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.city,
      addressCountry: PROFILE.countryCode,
    },
    worksFor: {
      "@type": "Organization",
      name: PROFILE.employer,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: PROFILE.title,
      occupationLocation: { "@type": "City", name: PROFILE.city },
      skills: AI_KEYWORDS.join(", "),
    },
    knowsAbout: [
      "Generative AI",
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Natural Language Processing",
      "Data Science",
      "Machine Learning",
      "Deep Learning",
      ...AI_KEYWORDS,
    ],
    knowsLanguage: "en",
    sameAs,
  };

  const website = {
    "@type": "WebSite",
    "@id": id.website,
    url: SITE_URL,
    name: `${PROFILE.name} — Portfolio`,
    description: PROFILE.summary,
    inLanguage: "en-IN",
    author: { "@id": id.person },
    publisher: { "@id": id.person },
  };

  // Google's recommended type for a page about one person.
  const profilePage = {
    "@type": "ProfilePage",
    "@id": id.profile,
    url: SITE_URL,
    name: `${PROFILE.name} | ${PROFILE.title}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": id.website },
    mainEntity: { "@id": id.person },
    about: { "@id": id.person },
    hasPart: [{ "@id": id.projects }, { "@id": id.faq }],
  };

  const projects = {
    "@type": "ItemList",
    "@id": id.projects,
    name: `Projects by ${PROFILE.name}`,
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        url: project.link,
        codeRepository: project.link,
        programmingLanguage: project.tech,
        keywords: [project.category, ...project.tags].join(", "),
        creator: { "@id": id.person },
      },
    })),
  };

  const faq = {
    "@type": "FAQPage",
    "@id": id.faq,
    isPartOf: { "@id": id.profile },
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, projects, faq],
  };
}
