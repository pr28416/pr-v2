"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import {
  Shield,
  Wheat,
  Network,
  Hospital,
  CloudLightning,
  AlignHorizontalJustifyStart,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProfilePic from "@/assets/pranav_pfp.jpg";
import PageBackground from "@/assets/page_background3.avif";
import { useSession } from "@/lib/sessionContext";
import { EventType, WorkInfo, ProjectInfo } from "@/lib/types";
import { formatFromMMMYYYY } from "@/lib/utils";

// Work Experience Logos
import RampLogo from "@/assets/ramp_logo.webp";
import HarvardSeasLogo from "@/assets/harvard_seas.jpg";
import CoframeLogo from "@/assets/coframe.jpeg";
import CitadelLogo from "@/assets/citadel.jpg";
import HumanCapitalLogo from "@/assets/humancapital.jpeg";
import ZFellowsLogo from "@/assets/zfellows.jpeg";
import NeoScholarsLogo from "@/assets/neo.jpeg";
import CokeScholarsLogo from "@/assets/cokescholars.png";

// Project Logos
import ClassiqLogo from "@/assets/classiq-logo.png";
import TreeHacks from "@/assets/treehacks.png";
import AGIHouse from "@/assets/agihouse.webp";
import Matanataki from "@/assets/matanataki_logo.jpeg";
import CityOfBoston from "@/assets/cityofboston.png";
import OkaySo from "@/assets/okayso.jpeg";
import MagpieLogo from "@/assets/magpie_logo.png";
import TextremeLogo from "@/assets/textreme_logo.png";
import TextremeDarkLogo from "@/assets/textreme_dark.png";

export default function Home() {
  const { submitEvent } = useSession();
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(
    null
  );

  const handleSocialClick = (platform: string, link: string) => {
    switch (platform) {
      case "github":
        submitEvent(EventType.GithubClicked, { link });
        break;
      case "linkedin":
        submitEvent(EventType.LinkedInClicked, { link });
        break;
      case "x":
      case "twitter":
        submitEvent(EventType.LinkedInClicked, { link }); // Using LinkedIn event type as placeholder
        break;
      case "email":
        submitEvent(EventType.EmailClicked, { link });
        break;
      case "resume":
        submitEvent(EventType.ResumeDownloaded, { source: "header" });
        break;
    }
  };

  const socials = [
    {
      glyph: <FaGithub className="w-5 h-5" />,
      link: "https://github.com/pr28416",
      platform: "github",
    },
    {
      glyph: <FaLinkedinIn className="w-5 h-5" />,
      link: "https://www.linkedin.com/in/pranav-ramesh1/",
      platform: "linkedin",
    },
    {
      glyph: <FaXTwitter className="w-5 h-5" />,
      link: "https://x.com/pranavramesh25",
      platform: "x",
    },
    {
      glyph: <MdEmail className="w-5 h-5" />,
      link: "mailto:pranav.ramesh1@gmail.com",
      platform: "email",
    },
    {
      glyph: <FaFileAlt className="w-5 h-5" />,
      link: "/PR_Resume.pdf",
      platform: "resume",
    },
  ];

  const workExperience: WorkInfo[] = [
    {
      role: "SWE Intern",
      companyName: "Citadel",
      companyLogoUrl: CitadelLogo,
      start_date: formatFromMMMYYYY("Jun 2025"),
      end_date: formatFromMMMYYYY("Aug 2025"),
      description: "Engineering (AI)",
    },
    {
      role: "SWE Intern",
      companyName: "Coframe",
      companyLogoUrl: CoframeLogo,
      start_date: formatFromMMMYYYY("Dec 2024"),
      end_date: formatFromMMMYYYY("Feb 2025"),
      description: "Engineering (AI)",
    },
    {
      role: "Venture Fellow",
      companyName: "Human Capital",
      companyLogoUrl: HumanCapitalLogo,
      start_date: formatFromMMMYYYY("Aug 2024"),
      end_date: formatFromMMMYYYY("Dec 2024"),
    },
    {
      role: "Growth Eng Intern",
      companyName: "Ramp",
      companyLogoUrl: RampLogo,
      start_date: formatFromMMMYYYY("May 2024"),
      end_date: formatFromMMMYYYY("Aug 2024"),
      description: "Engineering (Growth)",
    },
    {
      role: "AI Researcher",
      companyName: "Harvard SEAS",
      companyLogoUrl: HarvardSeasLogo,
      start_date: formatFromMMMYYYY("Jun 2023"),
      end_date: formatFromMMMYYYY("Aug 2023"),
      description: "Programming Languages Lab",
    },
  ];

  const projects: ProjectInfo[] = [
    // Side Projects
    {
      projectName: "Magpie",
      projectLogoUrl: MagpieLogo,
      projectCaption: "Unified browser spotlight search",
      projectLink: "https://try-magpie.vercel.app/",
      kind: "side",
      description:
        "Magpie is an end-to-end unified search platform that enables users to find information across all their data sources in milliseconds. The platform replaces scattered files, endless folders, and time-consuming searches with a single unified search interface. Key features include instant search across multiple data sources like Google Drive, Dropbox, and Notion, real-time synchronization to keep search indexes up-to-date, natural language queries for intuitive document discovery, end-to-end encryption for security and privacy, and team collaboration with shared access and permissions. Magpie helps teams find what they need instantly, eliminating hours of manual searching.",
      tags: ["Next.js", "GitHub", "Supabase", "Express.js", "Chrome Extension"],
    },
    {
      projectName: "Pen AI",
      projectCaption: "AI penetration testing for GitHub",
      projectLink: "https://pen-0penai.vercel.app/",
      kind: "side",
      customIcon: (
        <Shield className="w-10 h-10 p-2 text-slate-700 dark:text-slate-200" />
      ),
      iconBg: "bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900",
      description:
        "Pen AI is an innovative platform that leverages Large Language Models to provide automated penetration testing for GitHub repositories. The platform offers seamless GitHub integration, automatically scanning code on push events, and provides comprehensive vulnerability reports with actionable remediation steps. Key features include AI-powered analysis using GPT-4o for advanced vulnerability detection, automated testing through serverless functions, role-based access control via GitHub OAuth, and real-time monitoring with a centralized dashboard. The platform helps developers and organizations build more secure applications by identifying security risks and suggesting targeted penetration tests.",
      tags: ["Next.js", "GPT-4o", "GitHub OAuth", "Serverless", "AI Security"],
    },
    {
      projectName: "Omniscient AI",
      projectCaption: "AI web search engine",
      projectLink: "https://youtu.be/b_iaNQ20SlM",
      kind: "side",
      customIcon: <Wheat className="w-10 h-10 p-2 text-rose-400" />,
      iconBg: "bg-rose-950",
      description:
        "Omniscient AI is a powerful AI search engine that combines multiple LLMs and APIs for intelligent web search. Key features include smart query optimization using Cerebras (llama-3.1-8b), comprehensive web search via Brave Search API with custom webscraping, intelligent image search powered by Cerebras and Groq vision models, detailed content summaries using llama-3.3-70b, and AI-powered synthesis through OpenAI. The system supports follow-up questions, session management, real-time updates, and clear source attribution while efficiently processing multiple search results in parallel.",
      tags: [
        "Next.js",
        "Cerebras",
        "Groq",
        "GPT",
        "Brave Search API",
        "Llama",
        "Llama Vision",
      ],
    },
    {
      projectName: "LiRA",
      projectCaption: "AI assistant for literature review and research mapping",
      projectLink: "/lira_paper.pdf",
      kind: "side",
      customIcon: <Network className="w-10 h-10 p-2 text-purple-400" />,
      iconBg: "bg-purple-950",
      description:
        "The literature review process is often inefficient and overwhelming due to the volume of dense, irrelevant information researchers must sift through. Traditional tools fail to support direct interaction with sources, hindering the identification of relevant papers and the synthesis of meaningful insights. This paper introduces LiRA, an AI-driven system that combines an intuitive, interactive concept mapping interface with advanced AI-powered tools for summarization, quality assessment, and literature exploration. LiRA is the first unified interface that integrates dynamic concept mapping with AI insights, enabling researchers to efficiently explore, organize, and synthesize information while uncovering key relationships and research opportunities. To evaluate its impact, we investigate: (1) how a unified AI and mind map interface improves efficiency; (2) how well it helps researchers identify insights and relationships; and (3) user confidence in the system's reliability. LiRA aims to transform literature reviews through a seamless blend of interactivity and AI acceleration.",
      tags: ["Next.js", "Python", "GPT", "Llama"],
    },
    {
      projectName: "Lightspeed",
      projectCaption: "AI platform for political ad creation",
      projectLink: "https://lightspeedads.netlify.app/",
      kind: "side",
      customIcon: <CloudLightning className="w-10 h-10 p-2 text-blue-400" />,
      iconBg: "bg-blue-950",
      description:
        "I previously co-built Lightspeed, a single AI workflow for political media monitoring, PR, & advertising teams. Lightspeed allowed political organizations to make smarter political ads faster and cheaper through real-time insights, social listening, AI ad creation, targeted messaging, and more. The platform was used by many political campaigns.",
      tags: ["Next.js", "Python", "GPT", "Perplexity", "Supabase"],
    },
    {
      projectName: "Classiq",
      projectLogoUrl: ClassiqLogo,
      projectCaption: "Fast course search for Harvard students",
      projectLink: "https://classiq.red",
      kind: "side",
      description:
        "In summer 2023, I built Classiq, a course planner and scheduler for Harvard students, to address the slow and inefficient My.Harvard course search tool. Classiq allows students to quickly find relevant classes using fuzzy search, sorting, and filtering, view them on a schedule matrix, and export their selections to Apple and Google calendars. It now has over 6,000 unique users and 1M page visits, with overwhelmingly positive feedback.",
      tags: ["Next.js", "Python", "Selenium", "PostgreSQL"],
    },
    // Hackathon Projects
    {
      projectName: "Textreme",
      projectLogoUrl: TextremeLogo,
      projectCaption: "Cursor tab for iMessage",
      kind: "hackathon",
      wins: ["Best Project by Popular Vote"],
      description:
        "Textreme is a keyboard-first overlay for iMessage built with Electron, Vite, React, TypeScript, Tailwind, and shadcn/ui. The architecture uses a monorepo structure with shared packages for schema types and client logic. For iMessage data access, we built a Rust helper (Cargo) that directly queries the local SQLite chat.db on macOS for fast, efficient conversation retrieval, handling Apple's evolving iMessage schema and attachment edge cases. A Swift helper exports Contacts data. The agentic reply generation uses Vercel AI SDK (ai) with Zod-validated structured outputs, streaming 1–3 context-aware draft replies per message with confidence scores and rationale. The system uses an OpenAI-compatible provider via @ai-sdk/openai, allowing users to bring their own API key for privacy. Performance optimizations include virtualization and batching for handling very long threads, keeping the overlay snappy even with large conversation histories. An optional ML pipeline enables fine-tuning OpenAI OSS 20B models on personal conversation data using Modal + Axolotl, with training tracked via Weights & Biases. All conversation data stays on-device, and the app handles macOS privacy (TCC) permissions and Full Disk Access requirements. Textreme won Best Project by Popular Vote at Neo Hackathon 2025.",
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
        "AppleScript",
      ],
    },
    {
      projectName: "Supernova",
      projectCaption: "AI-generated video ads from product links",
      projectLink: "https://devpost.com/software/supernova-p1tum5",
      kind: "hackathon",
      customIcon: <Sparkles className="w-10 h-10 p-2 text-slate-200" />,
      iconBg:
        "bg-gradient-to-br from-pink-500/80 via-purple-600/80 to-blue-500/80",
      wins: ["2nd Place Overall"],
      description:
        "Supernova is an AI platform that generates personalized video ads featuring AI-powered influencer avatars. It uses AI agents for market research, influencer selection, and content creation. The system handles everything from script generation to B-roll creation using Runway ML, voice synthesis via Cartesia, and avatar generation through HeyGen. Built with Next.js, Groq, OpenAI, Perplexity, and Supabase, it streamlines the entire ad creation process while ensuring brand alignment and audience engagement. Supernova won 2nd Place Grand Prize at 2025 Stanford TreeHacks.",
      tags: [
        "Next.js",
        "Groq",
        "OpenAI",
        "Perplexity",
        "Supabase",
        "HeyGen",
        "Runway ML",
        "Cartesia",
        "Firecrawl",
      ],
    },
    {
      projectName: "Aria",
      projectCaption: "Fully multimodal AI medical assistant",
      projectLink: "https://devpost.com/software/aria-sc10g2",
      kind: "hackathon",
      customIcon: <Hospital className="w-10 h-10 p-2 text-lime-400" />,
      iconBg: "bg-lime-950",
      description:
        "I co-developed Aria, the world's first fully-automated medical expert, capable of diagnosing patients through natural conversations, images, and health history. Built on a custom multimodal agentic AI framework, Aria processes live voice inputs, analyzes images of symptoms, and integrates health records to deliver reliable medical advice. Sourced from trusted databases like Medline and PubMed, Aria generates personalized health reports and refers patients to local specialists when needed.",
      tags: [
        "Next.js",
        "Python",
        "Firecrawl",
        "Supabase",
        "Llama",
        "Anam API",
        "Mixtral",
      ],
    },
    {
      projectName: "Rally",
      projectCaption: "Personalized political ads with AI candidate personas",
      projectLink: "https://devpost.com/software/rally-8sxi2t",
      kind: "hackathon",
      customIcon: (
        <AlignHorizontalJustifyStart className="w-10 h-10 p-2 text-sky-400" />
      ),
      iconBg: "bg-sky-950",
      wins: ["2nd Place Overall", "Best Design"],
      description:
        "In September 2024, I co-built Rally AI, an AI platform that generates personalized political ads featuring candidate personas. Rally scrapes local news and economic data using Firecrawl and Perplexity, then stores curated insights in a Supabase database. GPT4o-mini crafts speeches in the politician's style, while Cartesia.ai's Sonic text-to-speech creates voice narration. Pexels provides B-roll footage, and SyncLabs lip-syncs the narration to existing footage of the candidate. The final ad integrates stock footage and voice to match relevant voter concerns. Rally AI won 2nd Place Overall and Best Design at PennApps 2024.",
      tags: [
        "Next.js",
        "Python",
        "Firecrawl",
        "Perplexity",
        "Supabase",
        "Cartesia.ai",
        "SyncLabs",
        "Pexels",
      ],
    },
    {
      projectName: "Synthesis",
      projectLogoUrl: TreeHacks,
      projectCaption: "Personalize and de-bias the news with AI.",
      projectLink: "https://devpost.com/software/synthesis-ag1djb",
      kind: "hackathon",
      wins: ["Best AI Hack"],
      description:
        "In February 2024, at Stanford TreeHacks, my team developed Synthesis, a groundbreaking news platform aimed at combating political polarization and information overload. Leveraging cutting-edge AI technology, Synthesis aggregates over 60,000 articles daily from 100+ sources, clustering them by topic similarity to provide unbiased and comprehensive coverage. Through innovative features such as Gists, Syntheses, and a Recommender Algorithm, users can access personalized, high-quality news content that promotes understanding and engagement. I led the development of Synthesis's AI News Agent, utilizing advanced techniques in text extraction, semantic similarity, and clustering to create a scalable and cost-efficient system. We won Best AI Hack, sponsored by Coframe.",
      tags: [
        "Next.js",
        "Python",
        "Pinecone",
        "Selenium",
        "PostgreSQL",
        "Supabase",
      ],
    },
    {
      projectName: "Donna",
      projectLogoUrl: AGIHouse,
      projectCaption: "AI semantic search for legal depositions",
      projectLink: "https://x.com/pranavramesh25/status/1779735875548598613",
      kind: "hackathon",
      wins: ["3rd Place"],
      description:
        "In April 2024, at the AGI House hackathon at MIT, my team developed Donna, an AI deposition agent that allows lawyers to perform semantic search on deposition videos and compare verbal testimony to written testimony, affidavits, and other case documents. We used OpenAI Whisper to accurately transcribe videos and Pinecone to index and search on video transcription and case document vectors. We won third place.",
      tags: ["Next.js", "Python", "Pinecone", "OpenAI Whisper"],
    },
  ];

  const scholarships = [
    {
      name: "Z Fellows",
      logo: ZFellowsLogo,
    },
    {
      name: "Neo Scholar",
      logo: NeoScholarsLogo,
    },
    {
      name: "Coca-Cola Scholar",
      logo: CokeScholarsLogo,
    },
  ];

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 min-h-full">
        <Image
          src={PageBackground}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-stone-900/70 to-stone-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 md:py-20">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-start justify-between gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              <div className="flex flex-col gap-4 sm:gap-6 flex-1 min-w-0">
                <div className="flex flex-col">
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                    Pranav Ramesh
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-foreground/40 font-light mt-1">
                    CS & Stats @ Harvard
                  </p>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl text-start">
                  Student at Harvard studying CS & Stats. Most recently on the
                  AI team at Citadel building out their first research agents.
                </p>
              </div>

              {/* Profile Image */}
              <div
                className="relative w-24 sm:w-32 md:w-40 flex-shrink-0 rounded-lg overflow-hidden shadow-lg cursor-pointer self-start aspect-[3/4]"
                onClick={() => submitEvent(EventType.ProfilePicClicked)}
              >
                <Image
                  src={ProfilePic}
                  alt="Pranav Ramesh"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Social Links & Resume - Centered Separator */}
            <div className="flex flex-row gap-3 sm:gap-4 items-center justify-center">
              {socials.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() =>
                    handleSocialClick(social.platform, social.link)
                  }
                  className="text-foreground/60 hover:text-foreground transition-colors p-2 -m-2 touch-manipulation"
                >
                  {social.glyph}
                </Link>
              ))}
            </div>
          </header>

          {/* Work Experience */}
          <section className="mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-foreground">
              Experience
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {workExperience.map((work, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 sm:gap-3 px-2 sm:px-3 py-2 -mx-2 sm:-mx-3 -my-2 rounded-lg transition-all duration-200 hover:-translate-y-1 hover:bg-white/5 hover:backdrop-blur-sm hover:shadow-lg touch-manipulation"
                >
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded overflow-hidden shadow">
                    <Image
                      src={work.companyLogoUrl}
                      alt={work.companyName || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 flex-1 min-w-0">
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm sm:text-base font-medium text-foreground">
                        {work.description || work.role}
                      </span>
                      <span className="text-xs sm:text-sm text-foreground/40">
                        {work.companyName}
                      </span>
                    </div>
                    {work.start_date && (
                      <span className="text-xs sm:text-sm text-foreground/40 whitespace-nowrap flex-shrink-0">
                        {formatDate(work.start_date)} –{" "}
                        {formatDate(work.end_date)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-foreground">
              Projects
            </h2>

            {/* Side Projects */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-medium text-foreground/60 mb-3 sm:mb-4">
                Side Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                {projects
                  .filter((p) => p.kind === "side")
                  .map((project, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedProject(project)}
                      className="flex items-start gap-2 sm:gap-3 cursor-pointer group px-2 sm:px-3 py-2 -mx-2 sm:-mx-3 -my-2 rounded-lg transition-all duration-200 hover:-translate-y-1 hover:bg-white/5 hover:backdrop-blur-sm hover:shadow-lg touch-manipulation"
                    >
                      {(project.projectLogoUrl || project.customIcon) && (
                        <div
                          className={`relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg overflow-hidden shadow-lg ${
                            project.iconBg || ""
                          }`}
                        >
                          {project.customIcon ? (
                            <div className="w-full h-full flex items-center justify-center">
                              {project.customIcon}
                            </div>
                          ) : (
                            project.projectLogoUrl && (
                              <Image
                                src={project.projectLogoUrl}
                                alt={project.projectName}
                                fill
                                className="object-cover"
                              />
                            )
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-medium text-foreground">
                          {project.projectName}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/40 line-clamp-2">
                          {project.projectCaption}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Hackathon Projects */}
            <div>
              <h3 className="text-base sm:text-lg font-medium text-foreground/60 mb-3 sm:mb-4">
                Hackathon Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                {projects
                  .filter((p) => p.kind === "hackathon")
                  .map((project, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedProject(project)}
                      className="flex items-start gap-2 sm:gap-3 cursor-pointer group px-2 sm:px-3 py-2 -mx-2 sm:-mx-3 -my-2 rounded-lg transition-all duration-200 hover:-translate-y-1 hover:bg-white/5 hover:backdrop-blur-sm hover:shadow-lg touch-manipulation"
                    >
                      {(project.projectLogoUrl || project.customIcon) && (
                        <div
                          className={`relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg overflow-hidden shadow-lg ${
                            project.iconBg || ""
                          }`}
                        >
                          {project.customIcon ? (
                            <div className="w-full h-full flex items-center justify-center">
                              {project.customIcon}
                            </div>
                          ) : (
                            project.projectLogoUrl && (
                              <Image
                                src={project.projectLogoUrl}
                                alt={project.projectName}
                                fill
                                className="object-cover"
                              />
                            )
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-medium text-foreground">
                            {project.projectName}
                          </h3>
                          {project.wins && project.wins.length > 0 && (
                            <Badge
                              variant="outline"
                              className="text-[10px] sm:text-xs text-amber-400/60 border-amber-400/20 px-1.5 py-0"
                            >
                              {project.wins.length}{" "}
                              {project.wins.length === 1 ? "win" : "wins"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/40 line-clamp-2">
                          {project.projectCaption}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Scholarships */}
          <section className="mb-6 sm:mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-foreground">
              Memberships
            </h2>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {scholarships.map((scholarship, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded overflow-hidden shadow">
                    <Image
                      src={scholarship.logo}
                      alt={scholarship.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-foreground">
                    {scholarship.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Project Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              {selectedProject &&
                (selectedProject.projectLogoUrl ||
                  selectedProject.customIcon) && (
                  <div
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-lg ${
                      selectedProject.iconBg || ""
                    }`}
                  >
                    {selectedProject.customIcon ? (
                      <div className="w-full h-full flex items-center justify-center">
                        {selectedProject.customIcon}
                      </div>
                    ) : (
                      selectedProject.projectLogoUrl && (
                        <Image
                          src={selectedProject.projectLogoUrl}
                          alt={selectedProject.projectName}
                          fill
                          className="object-cover"
                        />
                      )
                    )}
                  </div>
                )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                  <DialogTitle className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground">
                    {selectedProject?.projectName}
                  </DialogTitle>
                  {selectedProject?.wins &&
                    selectedProject.wins.map((win, winIdx) => (
                      <Badge
                        key={winIdx}
                        className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-amber-500/20 text-xs sm:text-sm"
                      >
                        {win}
                      </Badge>
                    ))}
                </div>
                <DialogDescription className="text-sm sm:text-base md:text-lg text-foreground/60">
                  {selectedProject?.projectCaption}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-4 sm:mb-6">
            {selectedProject?.description}
          </div>

          {selectedProject?.tags && selectedProject.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {selectedProject.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-white/10 text-foreground/70 border-white/20 hover:bg-white/15 text-xs sm:text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {selectedProject?.projectLink && (
            <Button
              asChild
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-foreground w-full sm:w-auto touch-manipulation"
            >
              <Link
                href={selectedProject.projectLink}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => {
                  submitEvent(EventType.ProjectLinkClicked, {
                    project_name: selectedProject.projectName,
                  });
                }}
              >
                Visit Project →
              </Link>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
