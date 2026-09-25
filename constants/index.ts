import { RxGithubLogo, RxLinkedinLogo, RxEnvelopeClosed } from "react-icons/rx";

/**
 * Core AI focus areas — the headline row.
 * Concept icons (no official logos exist for these fields).
 */
export const SKILL_DATA = [
  {
    skill_name: "Generative AI",
    image: "genai.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Natural Language Processing",
    image: "nlp.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Data Science",
    image: "datascience.png",
    width: 80,
    height: 80,
  },
] as const;

/**
 * Languages, data and reporting tools.
 */
export const DATA_SKILL = [
  {
    skill_name: "Python",
    image: "python.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Power BI",
    image: "powerbi.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Excel",
    image: "excel.png",
    width: 70,
    height: 70,
  },
] as const;

/**
 * Web and delivery.
 */
export const WEB_SKILL = [
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 60,
    height: 60,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Next.js",
    image: "next.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 60,
    height: 60,
  },
] as const;

export const SOCIALS = [
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/Syedshahidnazeer",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/shahidnazeersyed/",
  },
  {
    name: "Email",
    icon: RxEnvelopeClosed,
    link: "mailto:shahidnazeerds@gmail.com",
  },
] as const;

export const PROJECTS = [
  {
    title: "CivicCheck.ai",
    category: "AI Product",
    tech: "Python",
    accent: "#8b5cf6",
    accentContrast: "#0b0518",
    tags: ["Streamlit", "Gemini", "Multi-Agent", "WeasyPrint"],
    description:
      "An NGO governance and compliance advisor built on Streamlit and Google Gemini. A single multi-expert agent reasons as six specialists at once — chartered accountant, business strategist, NGO operations lead, voluntary-sector SME, non-profit consultant and social-sector analyst — grounded in the Income Tax Act 2025 and FCRA Rules 2025. Consultations export as styled PDFs.",
    link: "https://github.com/Syedshahidnazeer/CivicCheck-AI",
  },
  {
    title: "The Lost CloudVerse",
    category: "Game",
    tech: "TypeScript",
    accent: "#f97316",
    accentContrast: "#1a0a00",
    tags: ["Phaser 3", "Vite", "15 Scenes"],
    description:
      "A 2D side-scrolling platformer built from scratch for Rapyder. Three worlds map real infrastructure pain to level design — an AWS cost-and-compliance wasteland, an Azure performance city with throttling zones, and a GCP data labyrinth — before a boss fight against the Multi-Cloud Chaos Titan.",
    link: "https://github.com/Syedshahidnazeer",
  },
  {
    title: "Rapyder Swipe Ops",
    category: "Interactive",
    tech: "JavaScript",
    accent: "#22d3ee",
    accentContrast: "#04161a",
    tags: ["Zero Deps", "AWS", "Lead Gen"],
    description:
      "A swipe-to-answer cloud myth-busting quiz — right for true, left for false, with keyboard and button fallbacks for accessibility. No build step, no dependencies. Every card carries a why-it-matters explainer and its own call to action, covering Lambda concurrency limits, S3 lifecycle tiering and premature microservices.",
    link: "https://github.com/Syedshahidnazeer",
  },
  {
    title: "Oil Price Prediction",
    category: "Forecasting",
    tech: "Python",
    accent: "#f43f5e",
    accentContrast: "#1c0409",
    tags: ["Time-Series", "Feature Eng.", "Streamlit"],
    description:
      "Time-series forecasting of crude oil prices, taking raw market data through cleaning, feature engineering and seasonal decomposition before comparing statistical and machine-learning forecasters. Delivered as an interactive app so the horizon and model can be changed on the fly.",
    link: "https://github.com/Syedshahidnazeer",
  },
  {
    title: "Fake News Detection",
    category: "NLP",
    tech: "Python",
    accent: "#14b8a6",
    accentContrast: "#02160f",
    tags: ["BERT", "Transformers", "TF-IDF"],
    description:
      "An NLP classifier that separates genuine reporting from fabricated articles. Combines classical TF-IDF baselines with fine-tuned transformer embeddings, and reports precision and recall rather than raw accuracy — the distinction that matters when false positives carry a reputational cost.",
    link: "https://github.com/Syedshahidnazeer",
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const PROFILE = {
  name: "Syed Shahid Nazeer",
  givenName: "Syed Shahid",
  familyName: "Nazeer",
  title: "AI Generalist",
  employer: "Rapyder Cloud Solutions",
  city: "Bengaluru",
  country: "India",
  countryCode: "IN",
  location: "Bengaluru, India",
  email: "shahidnazeerds@gmail.com",
  /** The one-sentence answer to "who is this?" — reused in metadata, JSON-LD and llms.txt. */
  summary:
    "Syed Shahid Nazeer is an AI Generalist at Rapyder Cloud Solutions in Bengaluru, India, who builds generative AI, retrieval-augmented generation (RAG), NLP and data science systems and takes them from prototype to production.",
} as const;

/** Terms the site is genuinely about, backed by the skills and projects above. */
export const AI_KEYWORDS = [
  "AI Engineer", "LLM", "NLP", "ML", "DL", "RAG", "GenAI", "SmolLM",
  "Prompt Engineering", "Agentic AI", "Gemini", "BERT", "MLOps", "Multi-Agent",
  "Vector DB", "LangChain", "Transformers", "Semantic Search", "Fine-Tuning",
  "Embeddings", "Haystack", "Streamlit", "AWS", "TF-IDF",
  "Feature Engineering", "Time-Series", "Hugging Face", "PyTorch",
  "Tokenization", "Context Window", "Chain-of-Thought", "Zero-Shot",
  "Knowledge Graphs", "AI Governance", "Conversational AI", "Text Classification",
] as const;

/**
 * Shown on the page and emitted as FAQPage JSON-LD and in llms.txt. Answer
 * engines lift short, self-contained answers — so each one names the person
 * and stands on its own. Facts only from elsewhere in this file.
 */
export const FAQS = [
  {
    question: "Who is Syed Shahid Nazeer?",
    answer:
      "Syed Shahid Nazeer is an AI Generalist based in Bengaluru, India, working at Rapyder Cloud Solutions. He builds generative AI, retrieval-augmented generation (RAG), natural language processing (NLP) and data science systems, and carries them from a working prototype to a product people use.",
  },
  {
    question: "What does an AI Generalist like Syed Shahid Nazeer work on?",
    answer:
      "He works across the whole AI product: prompt and model design, retrieval pipelines that ground answers in source documents, the data science underneath, and the application around it. His focus areas are Generative AI, NLP and Data Science.",
  },
  {
    question: "What projects has Syed Shahid Nazeer built?",
    answer:
      "His projects include CivicCheck.ai, an NGO compliance advisor built on Google Gemini; The Lost CloudVerse, a Phaser game for Rapyder; Rapyder Swipe Ops, an AWS myth-busting quiz; an oil price forecasting app; and a fake news detection classifier using BERT and TF-IDF.",
  },
  {
    question: "Which technologies does Syed Shahid Nazeer use?",
    answer:
      "Python, MySQL, Power BI and Excel for data work; JavaScript, TypeScript, React, Next.js, Node.js and Docker for products; and Google Gemini, LangChain, Haystack, BERT, Transformers, vector databases and Streamlit for AI systems.",
  },
  {
    question: "Is Syed Shahid Nazeer available for work?",
    answer:
      "Yes. He is open to roles, freelance projects and collaborations in applied AI.",
  },
  {
    question: "How can I contact Syed Shahid Nazeer?",
    answer:
      "Email him at shahidnazeerds@gmail.com, message him on LinkedIn at linkedin.com/in/shahidnazeersyed, or use the contact form on his portfolio. His code is on GitHub at github.com/Syedshahidnazeer.",
  },
] as const;
