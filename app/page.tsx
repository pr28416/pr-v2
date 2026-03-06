"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { useSession } from "@/lib/sessionContext";
import { EventType } from "@/lib/types";
import { dosSound } from "@/lib/dos-sounds";
import GitHubCalendar from "@/components/github-calendar";

type TerminalLine = string | ReactNode;
type TerminalEntry = { type: "input" | "output"; lines: TerminalLine[] };

const WORK = [
  { company: "dub", role: "Engineer", start: "Dec 2025", end: "Feb 2026", bullets: [], tags: [] },
  { company: "Citadel", role: "Software Engineer Intern", start: "Jun 2025", end: "Aug 2025", bullets: ["Applied AI team."], tags: ["Python", "LLMs", "Next.js", "TypeScript"] },
  { company: "Coframe", role: "Software Engineer Intern", start: "Dec 2024", end: "Feb 2025", bullets: ["Building AI agents that optimize websites."], tags: ["Python", "LLMs", "Next.js", "TypeScript"] },
  { company: "Human Capital", role: "Venture Fellow", start: "Aug 2024", end: "Dec 2024", bullets: ["Sourcing high velocity builders & entrepreneurs."], tags: [] },
  { company: "Ramp", role: "Software Engineer Intern (Growth)", start: "May 2024", end: "Aug 2024", bullets: [
    "Developed agentic AI framework to help account executives prepare for meetings, saving 450 hours weekly.",
    "Created models to more effectively capture and enrich prospects, contributing to 100% increase in closed wins.",
    "Co-developed a native iOS in-app assistant using natural language, ported TinyLlama to iOS.",
  ], tags: ["Python", "LLMs", "Flask", "Sentry", "Datadog", "SQL", "Snowflake", "DBT", "Swift", "CoreMLTools"] },
  { company: "Harvard SEAS", role: "AI Researcher", start: "Jun 2023", end: "Aug 2023", bullets: [
    "Improved theorem generation and developed an LLM plugin to refine Coq proofs under Professor Nada Amin.",
    "Fine-tuned Seq2Seq Transformer LLM model to generate Coq tactics.",
  ], tags: ["Python", "LLMs", "Coq", "C++"] },
];

const PROJECTS = [
  { name: "Magpie", caption: "Unified browser spotlight search", link: "https://try-magpie.vercel.app/", kind: "side" as const, description: "End-to-end unified search platform across all data sources.", tags: ["Next.js", "Supabase", "Express.js", "Chrome Extension"] },
  { name: "Pen AI", caption: "AI pen testing for GitHub repos", link: "https://pen-0penai.vercel.app/", kind: "side" as const, description: "Automated penetration testing with LLMs and comprehensive vulnerability reports.", tags: ["Next.js", "GPT-4o", "GitHub OAuth"] },
  { name: "Omniscient AI", caption: "AI web search engine", link: "https://youtu.be/b_iaNQ20SlM", kind: "side" as const, description: "Intelligent web search combining multiple LLMs and APIs.", tags: ["Next.js", "Cerebras", "Groq", "GPT"] },
  { name: "LiRA", caption: "AI literature review assistant", link: "/lira_paper.pdf", kind: "side" as const, description: "Interactive concept mapping with AI-powered summarization and literature exploration.", tags: ["Next.js", "Python", "GPT"] },
  { name: "Lightspeed", caption: "AI political ad platform", link: "https://lightspeedads.netlify.app/", kind: "side" as const, description: "Single AI workflow for political media monitoring, PR, & advertising.", tags: ["Next.js", "Python", "GPT", "Supabase"] },
  { name: "Classiq", caption: "Harvard course search", link: "https://classiq.red", kind: "side" as const, description: "Course planner for Harvard students. 6,000+ users, 1M page visits.", tags: ["Next.js", "Python", "PostgreSQL"] },
  { name: "Textreme", caption: "Cursor tab for iMessage", kind: "hackathon" as const, wins: ["Best Project"], description: "Keyboard-first overlay for iMessage with agentic reply generation. Best Project at Neo Hackathon 2025.", tags: ["Electron", "Rust", "Swift", "OpenAI"] },
  { name: "Supernova", caption: "AI video ads from links", link: "https://devpost.com/software/supernova-p1tum5", kind: "hackathon" as const, wins: ["2nd Place"], description: "AI platform generating personalized video ads. 2nd Place at TreeHacks 2025.", tags: ["Next.js", "Groq", "HeyGen", "Runway ML"] },
  { name: "Aria", caption: "AI medical assistant", link: "https://devpost.com/software/aria-sc10g2", kind: "hackathon" as const, description: "World's first fully-automated medical expert using multimodal AI.", tags: ["Next.js", "Python", "Llama", "Mixtral"] },
  { name: "Rally", caption: "AI political ads", link: "https://devpost.com/software/rally-8sxi2t", kind: "hackathon" as const, wins: ["2nd Place", "Best Design"], description: "AI-generated political ads with candidate personas. Won at PennApps 2024.", tags: ["Next.js", "Python", "Firecrawl"] },
  { name: "Synthesis", caption: "De-bias news with AI", link: "https://devpost.com/software/synthesis-ag1djb", kind: "hackathon" as const, wins: ["Best AI Hack"], description: "News platform combating polarization. 60K articles daily. Won at TreeHacks 2024.", tags: ["Next.js", "Pinecone", "Supabase"] },
  { name: "Donna", caption: "Legal deposition search", link: "https://x.com/pranavramesh25/status/1779735875548598613", kind: "hackathon" as const, wins: ["3rd Place"], description: "AI semantic search for deposition videos. 3rd at AGI House MIT.", tags: ["Next.js", "Pinecone", "Whisper"] },
];

const LINKS = [
  { label: "github", url: "https://github.com/pr28416", platform: "github" },
  { label: "linkedin", url: "https://www.linkedin.com/in/pranav-ramesh1/", platform: "linkedin" },
  { label: "x / twitter", url: "https://x.com/pranavramesh25", platform: "x" },
  { label: "email", url: "mailto:pranav.ramesh1@gmail.com", platform: "email" },
  { label: "resume", url: "/PR_Resume.pdf", platform: "resume" },
];

const AWARDS = ["Z Fellow", "2025 Neo Scholar", "2022 Coca-Cola Scholar"];

function slug(s: string) {
  return s.toLowerCase().replace(/[\s/]+/g, "-");
}

function CyanLink({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" onClick={onClick} className="text-dos-bright-cyan hover:underline">
      {children}
    </a>
  );
}

type FSEntry = { name: string; isDir: boolean };

function fsForDir(dir: string): FSEntry[] | null {
  switch (dir) {
    case "~":
      return [
        { name: "work", isDir: true },
        { name: "projects", isDir: true },
        { name: "about.txt", isDir: false },
        { name: "links.txt", isDir: false },
        { name: "awards.txt", isDir: false },
        { name: "resume.pdf", isDir: false },
      ];
    case "~/work":
      return WORK.map((w) => ({ name: slug(w.company) + ".txt", isDir: false }));
    case "~/projects":
      return PROJECTS.map((p) => ({ name: slug(p.name) + ".txt", isDir: false }));
    default:
      return null;
  }
}

function resolvePath(cwd: string, target: string): string {
  if (!target || target === "~") return "~";
  if (target === "/") return "~";

  let base = target.startsWith("~/") || target === "~" ? "~" : cwd;
  const parts = (target.startsWith("~/") ? target.slice(2) : target).replace(/\/+$/, "").split("/");

  if (target.startsWith("~/")) base = "~";

  const stack = base === "~" ? [] : base.slice(2).split("/").filter(Boolean);

  for (const p of parts) {
    if (p === "." || p === "") continue;
    if (p === "..") {
      stack.pop();
    } else {
      stack.push(p);
    }
  }

  return stack.length === 0 ? "~" : "~/" + stack.join("/");
}

type ReadResult = { lines: TerminalLine[]; openHint?: string } | null;

function readFile(filepath: string, submitEvent: (e: EventType, d?: Record<string, string>) => void): ReadResult {
  const dir = filepath.includes("/") ? filepath.slice(0, filepath.lastIndexOf("/")) || "~" : "~";
  const basename = filepath.includes("/") ? filepath.slice(filepath.lastIndexOf("/") + 1) : filepath;
  const nameNoExt = basename.replace(/\.txt$/, "").replace(/\.pdf$/, "");

  if (dir === "~") {
    if (nameNoExt === "about") {
      return {
        lines: [
          <span key="n" className="text-dos-bright-cyan">Pranav Ramesh</span>,
          "CS & Statistics @ Harvard University",
          "",
          "Building at the intersection of AI and software.",
          "Previously: dub, Citadel, Coframe, Ramp, Harvard SEAS.",
        ],
      };
    }
    if (nameNoExt === "awards") {
      return { lines: AWARDS.map((a) => `  * ${a}`) };
    }
    if (nameNoExt === "links") {
      return {
        lines: LINKS.map((l) => (
          <span key={l.label}>
            {"  "}
            <CyanLink
              href={l.url}
              onClick={() => {
                if (l.platform === "github") submitEvent(EventType.GithubClicked, { link: l.url });
                else if (l.platform === "linkedin") submitEvent(EventType.LinkedInClicked, { link: l.url });
                else if (l.platform === "email") submitEvent(EventType.EmailClicked, { link: l.url });
                else if (l.platform === "resume") submitEvent(EventType.ResumeDownloaded, { source: "cli" });
              }}
            >
              {l.label}
            </CyanLink>
            {"  "}
            <span className="text-dos-bright-black">{l.url}</span>
          </span>
        )),
        openHint: "open <name>",
      };
    }
    if (basename === "resume.pdf") {
      submitEvent(EventType.ResumeDownloaded, { source: "cli" });
      window.open("/PR_Resume.pdf", "_blank");
      return { lines: ["Opening resume.pdf..."] };
    }
  }

  if (dir === "~/work" || dir === "~") {
    const match = WORK.find((w) => slug(w.company) === nameNoExt || w.company.toLowerCase().includes(nameNoExt.replace(/-/g, " ")));
    if (match) {
      const lines: TerminalLine[] = [
        <span key="wn" className="text-dos-bright-cyan">{match.company}</span>,
        `${match.role}  |  ${match.start} - ${match.end}`,
      ];
      if (match.bullets.length > 0) {
        lines.push("");
        for (const b of match.bullets) lines.push(`  * ${b}`);
      }
      if (match.tags.length > 0) {
        lines.push("");
        lines.push(<span key="wt" className="text-dos-bright-black">{match.tags.join(" | ")}</span>);
      }
      return { lines };
    }
  }

  if (dir === "~/projects" || dir === "~") {
    const match = PROJECTS.find((p) => slug(p.name) === nameNoExt || p.name.toLowerCase().includes(nameNoExt.replace(/-/g, " ")));
    if (match) {
      const wins = (match as { wins?: string[] }).wins;
      const lines: TerminalLine[] = [
        <span key="pn" className="text-dos-bright-cyan">{match.name}</span>,
        match.caption,
      ];
      if (wins && wins.length > 0) {
        lines.push(<span key="pw" className="text-dos-bright-yellow">Awards: {wins.join(", ")}</span>);
      }
      lines.push("");
      lines.push(match.description);
      if (match.tags.length > 0) {
        lines.push("");
        lines.push(<span key="pt" className="text-dos-bright-black">{match.tags.join(" | ")}</span>);
      }
      if (match.link) {
        lines.push("");
        lines.push(
          <CyanLink key="pl" href={match.link} onClick={() => submitEvent(EventType.ProjectLinkClicked, { project_name: match.name })}>
            {match.link}
          </CyanLink>
        );
      }
      return { lines, openHint: match.link ? `open ${slug(match.name)}` : undefined };
    }
  }

  return null;
}

function promptPrefix(cwd: string) {
  return cwd === "~" ? "~" : cwd;
}

const COMMANDS = ["help", "ls", "cd", "cat", "pwd", "open", "whoami", "clear"];

function getCompletions(input: string, cwd: string): string[] {
  const parts = input.split(/\s+/);

  if (parts.length <= 1) {
    const prefix = parts[0].toLowerCase();
    return COMMANDS.filter((c) => c.startsWith(prefix) && c !== prefix);
  }

  const cmd = parts[0].toLowerCase();
  const argSoFar = parts.slice(1).join(" ");

  if (cmd === "open") {
    const targets = [
      ...LINKS.map((l) => l.platform),
      ...PROJECTS.filter((p) => p.link).map((p) => slug(p.name)),
    ];
    return targets.filter((t) => t.startsWith(argSoFar.toLowerCase()) && t !== argSoFar.toLowerCase());
  }

  if (cmd === "cd" || cmd === "ls" || cmd === "cat") {
    const lastSlash = argSoFar.lastIndexOf("/");
    const dirPart = lastSlash >= 0 ? argSoFar.slice(0, lastSlash) : "";
    const filePart = lastSlash >= 0 ? argSoFar.slice(lastSlash + 1) : argSoFar;
    const resolvedDir = dirPart ? resolvePath(cwd, dirPart) : cwd;
    const entries = fsForDir(resolvedDir);
    if (!entries) return [];

    const filtered = entries.filter((e) => {
      if (cmd === "cd" && !e.isDir) return false;
      const name = e.isDir ? e.name + "/" : e.name;
      return name.startsWith(filePart.toLowerCase()) && name !== filePart.toLowerCase();
    });

    return filtered.map((e) => {
      const name = e.isDir ? e.name + "/" : e.name;
      return dirPart ? dirPart + "/" + name : name;
    });
  }

  return [];
}

export default function Home() {
  const { submitEvent } = useSession();
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: "output",
      lines: [
        <span key="name" className="text-dos-bright-cyan">Pranav Ramesh</span>,
        "CS & Stats @ Harvard",
        "",
        <span key="hint" className="text-dos-bright-black">Type &quot;help&quot; for available commands. Try: ls, cat about.txt, open github</span>,
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    focus();
    const id = setInterval(() => {
      if (document.activeElement === inputRef.current) {
        clearInterval(id);
      } else {
        focus();
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      const parts = cmd.split(/\s+/);
      const base = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ");

      let output: TerminalLine[];
      let nextCwd = cwd;

      switch (base) {
        case "help":
        case "?": {
          output = [
            <span key="h" className="text-dos-bright-cyan">Available commands:</span>,
            "",
            "  help          Show this help message",
            "  ls            List directory contents",
            "  cd <dir>      Change directory",
            "  cat <file>    Read a file",
            "  pwd           Print working directory",
            "  open <target> Open a link (github, linkedin, resume, ...)",
            "  whoami        About me",
            "  clear         Clear terminal",
          ];
          break;
        }

        case "ls": {
          const target = arg ? resolvePath(cwd, arg) : cwd;
          const entries = fsForDir(target);
          if (!entries) {
            dosSound.error();
            output = [`ls: ${arg}: No such directory`];
          } else {
            output = entries.map((e) =>
              e.isDir ? (
                <span key={e.name} className="text-dos-bright-cyan">{e.name}/</span>
              ) : (
                e.name
              )
            );
          }
          break;
        }

        case "cd": {
          if (!arg || arg === "~" || arg === "/") {
            nextCwd = "~";
            output = [];
          } else {
            const target = resolvePath(cwd, arg);
            const entries = fsForDir(target);
            if (entries) {
              nextCwd = target;
              output = [];
            } else {
              dosSound.error();
              output = [`cd: ${arg}: No such directory`];
            }
          }
          break;
        }

        case "pwd": {
          output = [cwd];
          break;
        }

        case "cat": {
          if (!arg) {
            output = ["usage: cat <file>"];
          } else {
            const filepath = resolvePath(cwd, arg);
            const result = readFile(filepath, submitEvent);
            if (result) {
              output = [...result.lines];
              if (result.openHint) {
                output.push("");
                output.push(
                  <span key="hint" className="text-dos-bright-black">
                    Type &quot;{result.openHint}&quot; to open in browser
                  </span>
                );
              }
            } else {
              const bareResult = readFile(cwd + "/" + arg.replace(/\.txt$/, ""), submitEvent);
              if (bareResult) {
                output = [...bareResult.lines];
                if (bareResult.openHint) {
                  output.push("");
                  output.push(
                    <span key="hint" className="text-dos-bright-black">
                      Type &quot;{bareResult.openHint}&quot; to open in browser
                    </span>
                  );
                }
              } else {
                dosSound.error();
                output = [`cat: ${arg}: No such file`];
              }
            }
          }
          break;
        }

        case "open": {
          if (!arg) {
            output = [
              "usage: open <target>",
              "",
              <span key="ex" className="text-dos-bright-black">
                Examples: open github, open linkedin, open resume, open magpie
              </span>,
            ];
          } else {
            const target = arg.replace(/\.txt$/, "").replace(/\.pdf$/, "");
            const link = LINKS.find(
              (l) => l.label.toLowerCase().includes(target) || l.platform.toLowerCase() === target
            );
            if (link) {
              if (link.platform === "github") submitEvent(EventType.GithubClicked, { link: link.url });
              else if (link.platform === "linkedin") submitEvent(EventType.LinkedInClicked, { link: link.url });
              else if (link.platform === "email") submitEvent(EventType.EmailClicked, { link: link.url });
              else if (link.platform === "resume") submitEvent(EventType.ResumeDownloaded, { source: "cli" });
              window.open(link.url, link.platform === "email" ? "_self" : "_blank");
              output = [`Opening ${link.label}...`];
            } else {
              const proj = PROJECTS.find(
                (p) => slug(p.name) === target || p.name.toLowerCase().includes(target.replace(/-/g, " "))
              );
              if (proj?.link) {
                submitEvent(EventType.ProjectLinkClicked, { project_name: proj.name });
                window.open(proj.link, "_blank");
                output = [`Opening ${proj.name}...`];
              } else {
                dosSound.error();
                output = [`open: ${arg}: no link found`];
              }
            }
          }
          break;
        }

        case "whoami": {
          output = [
            <span key="n" className="text-dos-bright-cyan">Pranav Ramesh</span>,
            "CS & Statistics @ Harvard University",
            "",
            "Building at the intersection of AI and software.",
            "Previously: dub, Citadel, Coframe, Ramp, Harvard SEAS.",
            "",
            <GitHubCalendar key="gh-cal" username="pr28416" />,
            "",
            <span key="hint" className="text-dos-bright-black">
              Type &quot;cat links.txt&quot; for socials or &quot;ls&quot; to explore
            </span>,
          ];
          break;
        }

        case "clear":
        case "cls": {
          setHistory([]);
          return;
        }

        default: {
          dosSound.error();
          output = [
            <span key="err">command not found: {cmd}</span>,
          ];
          break;
        }
      }

      setCwd(nextCwd);
      const prefix = promptPrefix(cwd);
      setHistory((prev) => [
        ...prev,
        { type: "input", lines: [`${prefix} $ ${cmd}`] },
        ...(output.length > 0 ? [{ type: "output" as const, lines: output }] : []),
      ]);
    },
    [cwd, submitEvent]
  );

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setCmdHistory((prev) => [trimmed, ...prev]);
    }
    setHistIdx(-1);
    runCommand(input);
    setInput("");
  };

  return (
    <main
      className="h-screen bg-dos-black text-dos-white font-mono flex flex-col overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-8 dos-container scroll-smooth"
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-1">
            {entry.lines.map((line, j) => (
              <div key={j} className={`text-base leading-relaxed ${line === "" ? "h-4" : ""}`}>
                {entry.type === "input" ? (
                  <span className="text-dos-bright-yellow">{line}</span>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center mt-1">
          <span className="text-dos-bright-yellow whitespace-nowrap text-base">
            {promptPrefix(cwd)} $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              const el = inputRef.current;
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              } else if (e.key === "Tab") {
                e.preventDefault();
                const matches = getCompletions(input, cwd);
                if (matches.length === 1) {
                  const parts = input.split(/\s+/);
                  if (parts.length <= 1) {
                    setInput(matches[0] + " ");
                  } else {
                    setInput(parts[0] + " " + matches[0]);
                  }
                } else if (matches.length > 1) {
                  const prefix = promptPrefix(cwd);
                  setHistory((prev) => [
                    ...prev,
                    { type: "input", lines: [`${prefix} $ ${input}`] },
                    { type: "output", lines: [matches.join("  ")] },
                  ]);
                }
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (cmdHistory.length > 0) {
                  const next = Math.min(histIdx + 1, cmdHistory.length - 1);
                  setHistIdx(next);
                  setInput(cmdHistory[next]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (histIdx > 0) {
                  const next = histIdx - 1;
                  setHistIdx(next);
                  setInput(cmdHistory[next]);
                } else {
                  setHistIdx(-1);
                  setInput("");
                }
              } else if (e.ctrlKey && e.key === "c") {
                e.preventDefault();
                const prefix = promptPrefix(cwd);
                setHistory((prev) => [
                  ...prev,
                  { type: "input", lines: [`${prefix} $ ${input}^C`] },
                ]);
                setInput("");
                setHistIdx(-1);
              } else if (e.ctrlKey && e.key === "a") {
                e.preventDefault();
                el?.setSelectionRange(0, 0);
              } else if (e.ctrlKey && e.key === "e") {
                e.preventDefault();
                el?.setSelectionRange(input.length, input.length);
              } else if (e.ctrlKey && e.key === "w") {
                e.preventDefault();
                const pos = el?.selectionStart ?? input.length;
                const before = input.slice(0, pos);
                const after = input.slice(pos);
                const trimmed = before.replace(/\s+$/, "");
                const lastSpace = trimmed.lastIndexOf(" ");
                const newBefore = lastSpace >= 0 ? trimmed.slice(0, lastSpace + 1) : "";
                setInput(newBefore + after);
                requestAnimationFrame(() => el?.setSelectionRange(newBefore.length, newBefore.length));
              } else if (e.ctrlKey && e.key === "u") {
                e.preventDefault();
                const pos = el?.selectionStart ?? input.length;
                setInput(input.slice(pos));
                requestAnimationFrame(() => el?.setSelectionRange(0, 0));
              } else if (e.ctrlKey && e.key === "l") {
                e.preventDefault();
                setHistory([]);
              }
            }}
            className="bg-transparent border-none outline-none text-dos-white flex-1 font-mono text-base min-w-0 ml-2 caret-dos-bright-white"
            aria-label="Terminal command input"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoFocus
          />
        </div>
      </div>
    </main>
  );
}
