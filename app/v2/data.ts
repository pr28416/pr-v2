import { StaticImageData } from "next/image";
import RampLogo from "@/assets/ramp_logo.webp";
import HarvardSeasLogo from "@/assets/harvard_seas.jpg";
import NeoScholarsLogo from "@/assets/neo.jpeg";
import CokeScholarsLogo from "@/assets/cokescholars.png";
import CoframeLogo from "@/assets/coframe.jpeg";
import CitadelLogo from "@/assets/citadel.jpg";
import HumanCapitalLogo from "@/assets/humancapital.jpeg";
import ZFellowsLogo from "@/assets/zfellows.jpeg";

export type WorkItem = {
  role: string;
  company: string;
  logo: StaticImageData;
  start: string;
  end: string;
  description: string[];
  tags?: string[];
};

export type ProjectItem = {
  name: string;
  type: "hackathon" | "side" | "nonprofit";
  logo?: StaticImageData; // Optional, might not use it in the list view but good to have
  start?: string; // Some projects don't have explicit start/end in the types, but we'll infer or leave empty
  link: string;
  description: string;
  tags: string[];
  wins?: string[];
  year: string;
};

export const workData: WorkItem[] = [
  {
    role: "Software Engineer Intern",
    company: "Citadel",
    logo: CitadelLogo,
    start: "Jun 2025",
    end: "Aug 2025",
    description: ["Applied AI team."],
    tags: ["Python", "LLMs", "Next.js", "TypeScript"],
  },
  {
    role: "Software Engineer Intern",
    company: "Coframe",
    logo: CoframeLogo,
    start: "Dec 2024",
    end: "Feb 2025",
    description: ["Building AI agents that optimize websites."],
    tags: ["Python", "LLMs", "Next.js", "TypeScript"],
  },
  {
    role: "Venture Fellow",
    company: "Human Capital",
    logo: HumanCapitalLogo,
    start: "Aug 2024",
    end: "Dec 2024",
    description: ["Sourcing high velocity builders & entrepreneurs"],
  },
  {
    role: "Software Engineer Intern",
    company: "Ramp",
    logo: RampLogo,
    start: "May 2024",
    end: "Aug 2024",
    description: [
      "Developed agentic AI framework to help account executives prepare for meetings, saving 450 hours of work across the company weekly.",
      "Created models to more effectively capture and enrich prospects, contributing to 100% increase in closed wins.",
      "Co-developed a native iOS in-app assistant to navigate users throughout the app using natural language, successfully ported over TinyLlama with quantization and palettization to iOS.",
    ],
    tags: [
      "Python",
      "LLMs",
      "Flask",
      "Sentry",
      "Datadog",
      "SQL",
      "Snowflake",
      "DBT",
      "Swift",
      "CoreMLTools",
    ],
  },
  {
    role: "AI Researcher",
    company: "Harvard Programming Languages Lab",
    logo: HarvardSeasLogo,
    start: "Jun 2023",
    end: "Aug 2023",
    description: [
      "Improved theorem generation using decomposition and developed an LLM plugin to refine LLM-generated Coq proofs using verification under Professor Nada Amin.",
      "Fine-tuned Seq2Seq Transformer LLM model to generate Coq tactics from previous tactics and desired goal to write proofs.",
    ],
    tags: ["Python", "LLMs", "Coq", "C++"],
  },
];

export const projectData: ProjectItem[] = [
  {
    name: "Magpie",
    type: "side",
    link: "https://try-magpie.vercel.app/",
    description:
      "Magpie is an end-to-end unified search platform that enables users to find information across all their data sources in milliseconds.",
    tags: ["Next.js", "GitHub", "Supabase", "Express.js", "Chrome Extension"],
    year: "2024",
  },
  {
    name: "Pen AI",
    type: "side",
    link: "https://pen-0penai.vercel.app/",
    description:
      "AI-Powered Penetration Testing for GitHub Repositories leveraging Large Language Models.",
    tags: ["Next.js", "GPT-4o", "GitHub OAuth", "Serverless", "AI Security"],
    year: "2024",
  },
  {
    name: "Textreme",
    type: "hackathon",
    link: "#",
    description:
      "Keyboard-first overlay for iMessage built with Electron. Best Project by Popular Vote at Neo Hackathon 2025.",
    tags: [
      "Electron",
      "React",
      "TypeScript",
      "Rust",
      "Swift",
      "Python",
      "PyTorch",
      "Modal",
      "OpenAI",
    ],
    wins: ["Best Project by Popular Vote"],
    year: "2025",
  },
  {
    name: "Supernova",
    type: "hackathon",
    link: "https://devpost.com/software/supernova-p1tum5",
    description:
      "AI platform that generates personalized video ads featuring AI-powered influencer avatars. 2nd Place at Stanford TreeHacks 2025.",
    tags: ["Next.js", "Groq", "OpenAI", "Supabase", "HeyGen", "Runway ML"],
    wins: ["2nd Place Overall"],
    year: "2025",
  },
  {
    name: "Omniscient AI",
    type: "side",
    link: "https://youtu.be/b_iaNQ20SlM",
    description:
      "AI search engine that combines multiple LLMs and APIs for intelligent web search with Cerebras and Groq.",
    tags: ["Next.js", "Cerebras", "Groq", "GPT", "Brave Search API", "Llama"],
    year: "2024",
  },
  {
    name: "LiRA",
    type: "side",
    link: "/lira_paper.pdf",
    description:
      "AI literature review assistant for exploring and mapping research papers using interactive concept maps.",
    tags: ["Next.js", "Python", "GPT", "Llama"],
    year: "2024",
  },
  {
    name: "Aria",
    type: "hackathon",
    link: "https://devpost.com/software/aria-sc10g2",
    description:
      "The world's first fully multimodal AI doctor aimed at diagnosing patients through natural conversations.",
    tags: ["Next.js", "Python", "Firecrawl", "Supabase", "Llama", "Anam API"],
    year: "2024",
  },
  {
    name: "Lightspeed",
    type: "side",
    link: "https://lightspeedads.netlify.app/",
    description:
      "AI platform for political media monitoring, PR, & advertising teams. Used by many political campaigns.",
    tags: ["Next.js", "Python", "GPT", "Perplexity", "Supabase"],
    year: "2024",
  },
  {
    name: "Rally",
    type: "hackathon",
    link: "https://devpost.com/software/rally-8sxi2t",
    description:
      "AI platform that generates personalized political ads featuring candidate personas. 2nd Place at PennApps 2024.",
    tags: [
      "Next.js",
      "Python",
      "Firecrawl",
      "Perplexity",
      "Supabase",
      "Cartesia.ai",
    ],
    wins: ["2nd Place Overall", "Best Design"],
    year: "2024",
  },
  {
    name: "Classiq.red",
    type: "side",
    link: "https://classiq.red",
    description: "Fast course search for Harvard students. 6000+ users.",
    tags: ["Next.js", "Python", "Selenium", "PostgreSQL", "Supabase"],
    year: "2023",
  },
  {
    name: "Synthesis",
    type: "hackathon",
    link: "https://devpost.com/software/synthesis-ag1djb",
    description:
      "News platform combating polarization with AI agents. Best AI Hack at TreeHacks 2024.",
    tags: [
      "Next.js",
      "Python",
      "Pinecone",
      "Selenium",
      "PostgreSQL",
      "Supabase",
    ],
    wins: ["Best AI Hack"],
    year: "2024",
  },
  {
    name: "Donna",
    type: "hackathon",
    link: "https://x.com/pranavramesh25/status/1779735875548598613",
    description:
      "AI deposition agent for legal semantic search. 3rd Place at AGI House Hackathon.",
    tags: ["Next.js", "Python", "Pinecone", "OpenAI Whisper"],
    wins: ["3rd Place"],
    year: "2024",
  },
  {
    name: "Matanataki",
    type: "nonprofit",
    link: "#",
    description: "Web platform to coordinate waste pickup in Fiji.",
    tags: ["Next.js", "React", "Supabase"],
    year: "2023",
  },
  {
    name: "City of Boston",
    type: "nonprofit",
    link: "#",
    description: "Spending portal transparency tool for City of Boston.",
    tags: ["React", "Django", "Python"],
    year: "2022",
  },
  {
    name: "OkaySo",
    type: "nonprofit",
    link: "#",
    description: "Expert portal for Q&A platform helping young adults.",
    tags: ["React", "Express.js"],
    year: "2022",
  },
];
