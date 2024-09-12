import Navbar from "@/components/ui/Navbar";
import { WorkInfo } from "@/lib/types";
import RampLogo from "@/assets/ramp_logo.webp";
import HarvardSeasLogo from "@/assets/harvard_seas.jpg";
import NeoScholarsLogo from "@/assets/neo.jpeg";
import CokeScholarsLogo from "@/assets/cokescholars.png";
import ZFellowsLogo from "@/assets/zfellows.jpeg";
import WorkRow from "@/components/ui/work-row";
import { formatFromMMMYYYY } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";

export default function WorkPage() {
  const workInfo: WorkInfo[] = [
    {
      role: "Software Engineer Intern",
      companyName: "Ramp",
      companyLogoUrl: RampLogo,
      start_date: formatFromMMMYYYY("May 2024"),
      end_date: formatFromMMMYYYY("Aug 2024"),
      listDescription: [
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
      companyName: "Harvard Programming Languages Lab",
      companyLogoUrl: HarvardSeasLogo,
      start_date: formatFromMMMYYYY("Jun 2023"),
      end_date: formatFromMMMYYYY("Aug 2023"),
      listDescription: [
        "Improved theorem generation using decomposition and developed an LLM plugin to refine LLM-generated Coq proofs using verification under Professor Nada Amin.",
        "Fine-tuned Seq2Seq Transformer LLM model to generate Coq tactics from previous tactics and desired goal to write proofs.",
      ],
      tags: ["Python", "LLMs", "Coq", "C++"],
    },
  ];

  const scholarships: WorkInfo[] = [
    {
      role: "Z Fellow",
      companyLogoUrl: ZFellowsLogo,
    },
    {
      role: "2024 Neo Scholar Finalist",
      companyLogoUrl: NeoScholarsLogo,
    },
    {
      role: "2022 Coca-Cola Scholar",
      companyLogoUrl: CokeScholarsLogo,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-8 md:p-24 bg-slate-100 dark:bg-midnight">
      <div className="flex flex-col gap-4 md:gap-12 max-w-3xl w-full">
        <Navbar page="work" />
        <div className="flex flex-col gap-6 md:gap-10 w-full">
          {/* Work section */}
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              work
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {workInfo.map((work, idx) => (
                <WorkRow key={idx} workInfo={work} idx={idx} />
              ))}
            </Accordion>
          </div>

          {/* scholarships section */}
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              scholarships
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {scholarships.map((work, idx) => (
                <WorkRow key={idx} workInfo={work} idx={idx} />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
