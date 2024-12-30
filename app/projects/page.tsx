import Navbar from "@/components/ui/Navbar";
import { ProjectInfo } from "@/lib/types";
import ClassiqLogo from "@/assets/classiq-logo.png";
import TreeHacks from "@/assets/treehacks.png";
import AGIHouse from "@/assets/agihouse.webp";
import Matanataki from "@/assets/matanataki_logo.jpeg";
import CityOfBoston from "@/assets/cityofboston.png";
import OkaySo from "@/assets/okayso.jpeg";
import ProjectRow from "@/components/ui/project-row";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AlignHorizontalJustifyStart,
  CloudLightning,
  Hospital,
  Network,
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects: ProjectInfo[] = [
    {
      projectName: "LiRA",
      customLogo: (
        <Link href="/lira_paper.pdf" target="_blank" rel="noreferrer noopener">
          <Network className="text-purple-600 dark:text-purple-400 text-4xl w-full h-full p-2 bg-purple-100 dark:bg-purple-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption:
        "AI literature review assistant for exploring and mapping research papers.",
      projectLink: "/lira_paper.pdf",
      description:
        "The literature review process is often inefficient and overwhelming due to the volume of dense, irrelevant information researchers must sift through. Traditional tools fail to support direct interaction with sources, hindering the identification of relevant papers and the synthesis of meaningful insights. This paper introduces LiRA, an AI-driven system that combines an intuitive, interactive concept mapping interface with advanced AI-powered tools for summarization, quality assessment, and literature exploration. LiRA is the first unified interface that integrates dynamic concept mapping with AI insights, enabling researchers to efficiently explore, organize, and synthesize information while uncovering key relationships and research opportunities. To evaluate its impact, we investigate: (1) how a unified AI and mind map interface improves efficiency; (2) how well it helps researchers identify insights and relationships; and (3) user confidence in the system's reliability. LiRA aims to transform literature reviews through a seamless blend of interactivity and AI acceleration.",
      tags: ["Next.js", "Python", "GPT", "Llama"],
    },
    {
      projectName: "Aria",
      customLogo: (
        <Link
          href="https://devpost.com/software/aria-sc10g2"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Hospital className="text-lime-600 dark:text-lime-400 text-4xl w-full h-full p-2 bg-lime-100 dark:bg-lime-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption: "The world's first fully multimodal AI doctor.",
      projectLink: "https://devpost.com/software/aria-sc10g2",
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
      projectName: "Lightspeed",
      customLogo: (
        <Link
          href="https://lightspeedads.netlify.app/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <CloudLightning className="text-blue-500 dark:text-blue-400 text-4xl w-full h-full p-2 bg-blue-100 dark:bg-blue-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption:
        "AI platform that helps political organizations create winning ads faster.",
      projectLink: "https://lightspeedads.netlify.app/",
      description:
        "I'm currently co-building Lightspeed, a single AI workflow for political media monitoring, PR, & advertising teams. Lightspeed allows political organizations to make smarter political ads faster and cheaper through real-time insights, social listening, AI ad creation, targeted messaging, and more.",
      tags: ["Next.js", "Python", "GPT", "Perplexity", "Supabase"],
    },
    {
      projectName: "Rally",
      customLogo: (
        <Link
          href="https://devpost.com/software/rally-8sxi2t"
          target="_blank"
          rel="noreferrer noopener"
        >
          <AlignHorizontalJustifyStart className="text-sky-500 dark:text-sky-400 text-4xl w-full h-full p-2 bg-sky-200 dark:bg-sky-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption:
        "AI platform that creates personalized political ads with AI-driven candidate personas.",
      projectLink: "https://devpost.com/software/rally-8sxi2t",
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
      projectName: "Classiq.red",
      projectLogoUrl: ClassiqLogo,
      projectCaption: "Fast course search for Harvard students.",
      projectLink: "https://classiq.red",
      description:
        "In summer 2023, I built Classiq, a course planner and scheduler for Harvard students, to address the slow and inefficient My.Harvard course search tool. Classiq allows students to quickly find relevant classes using fuzzy search, sorting, and filtering, view them on a schedule matrix, and export their selections to Apple and Google calendars. It now has over 6,000 unique users and 1M page visits, with overwhelmingly positive feedback.",
      tags: ["Next.js", "Python", "Selenium", "PostgreSQL", "Supabase"],
    },
    {
      projectName: "Synthesis",
      projectLogoUrl: TreeHacks,
      projectCaption: "Personalize and de-bias the news with AI.",
      projectLink: "https://devpost.com/software/synthesis-ag1djb",
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
      projectCaption:
        "Helps lawyers semantically search through deposition material fast.",
      projectLink: "https://x.com/pranavramesh25/status/1779735875548598613",
      description:
        "In April 2024, at the AGI House hackathon at MIT, my team developed Donna, an AI deposition agent that allows lawyers to perform semantic search on deposition videos and compare verbal testimony to written testimony, affidavits, and other case documents. We used OpenAI Whisper to accurately transcribe videos and Pinecone to index and search on video transcription and case document vectors. We won third place.",
      tags: ["Next.js", "Python", "Pinecone", "OpenAI Whisper"],
    },
    {
      projectName: "Matanataki",
      projectLogoUrl: Matanataki,
      projectCaption: "Web platform to coordinate waste pickup in Fiji.",
      description:
        "In fall 2023, I co-led product and engineering development for a team of 4 software engineers to create a web platform for waste management in Fiji using React. Created project roadmap, designed initial product wireframes, coordinated meetings with our client, and conducted code reviews through pull requests.",
      tags: ["Next.js", "React", "Supabase"],
    },
    {
      projectName: "City of Boston Spending Portal",
      projectLogoUrl: CityOfBoston,
      projectCaption: "Gain transparency on the City of Boston's spending.",
      description:
        "In my freshman spring semester at Harvard, I led a group of fellow software engineering students to develop the Visual Analytics portal for City of Boston. The Visual Analytics portal compiles the public data from the City of Boston's Checkbook Explorer into a comprehensive data visualization tool that allows anyone to become better informed on spending by the City of Boston. This tool improves over the existing site which simply provides CSV data for users, potentially being inaccessible to users who are not experts in data analysis tools like Excel. Working with the City of Boston, we developed a React/Django-powered web app where users can view total spending across different years, view departmental spending, analyze how spending has changed over time, and peruse vendor-specific spending. Through this portal, the City of Boston's spending is more transparent and accessible to Boston citizens.",
      tags: ["React", "Django", "Python"],
    },
    {
      projectName: "OkaySo Expert Portal",
      projectLogoUrl: OkaySo,
      projectCaption: "Enable OkaySo experts to help users at scale.",
      description:
        "In my freshman fall semester at Harvard, I collaborated with fellow social tech entrepreneurs to develop a web platform for OkaySo. OkaySo is a nonprofit initiative that provides a safe space for young adults to anonymously ask questions to experts regarding mental health, identity, relationships, and more. These are topics that many young adults have questions about as they grow older but do not feel comfortable doing so publicly and need authentic, educated advice. However, we found that current online solutions, including OkaySo, were not as readily accessible to both inquirers and experts. Working with OkaySo, we created a React/Node.js-powered web app where experts can efficiently respond to user inquiries and facilitate seamless, secure, message-based conversations with those whom they are helping. As part of our efforts, we were able to substantially increase the team's user base and user satisfaction with expert replies, bringing us one step closer to improving health education.",
      tags: ["React", "Express.js"],
    },
  ];

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-8 md:p-24 bg-slate-100 dark:bg-midnight">
      <div className="flex flex-col gap-4 md:gap-12 max-w-3xl w-full">
        <Navbar page="projects" />
        <div className="flex flex-col gap-6 md:gap-10 w-full">
          {/* Projects section */}
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              projects
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {projects.map((project, idx) => (
                <ProjectRow key={idx} idx={idx} projectInfo={project} />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
