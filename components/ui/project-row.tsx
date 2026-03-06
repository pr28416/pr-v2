"use client";

import { ProjectInfo } from "@/lib/types";
import { AccordionContent } from "./accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import Link from "next/link";
import { useSession } from "@/lib/sessionContext";
import { EventType } from "@/lib/types";
import { useEffect, useRef } from "react";

export default function ProjectRow({
  idx,
  projectInfo,
}: {
  idx: number;
  projectInfo: ProjectInfo;
}) {
  const { submitEvent } = useSession();
  const accordionItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = accordionItemRef.current;
    if (!element) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-state"
        ) {
          const isExpanded = element.getAttribute("data-state") === "open";
          if (isExpanded) {
            submitEvent(EventType.ProjectExpanded, {
              project_name: projectInfo.projectName,
              project_link: projectInfo.projectLink || "",
            });
          }
        }
      });
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => observer.disconnect();
  }, [projectInfo.projectName, projectInfo.projectLink, submitEvent]);

  const hasDetails =
    projectInfo.description ||
    (projectInfo.tags && projectInfo.tags.length > 0);

  return (
    <AccordionItem
      value={"project-" + idx.toString()}
      className="flex flex-col border-b border-dos-bright-black last:border-b-0"
      ref={accordionItemRef}
    >
      <AccordionTrigger className="flex items-center w-full text-start py-1 px-1 hover:bg-dos-white/10 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 w-full">
          <span className="text-dos-bright-green flex-shrink-0">
            {projectInfo.projectName}
          </span>
          {projectInfo.wins && projectInfo.wins.length > 0 && (
            <span className="text-dos-bright-yellow text-sm flex-shrink-0">
              [{projectInfo.wins.join(", ")}]
            </span>
          )}
          <span className="text-dos-bright-black text-sm flex-1">
            {projectInfo.projectCaption}
          </span>
        </div>
      </AccordionTrigger>
      {hasDetails && (
        <AccordionContent className="text-dos-white pl-4 sm:pl-8">
          {projectInfo.description && (
            <div className="text-sm leading-relaxed mb-2">
              {projectInfo.description}
            </div>
          )}
          {projectInfo.tags && projectInfo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {projectInfo.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-dos-bright-black border border-dos-bright-black px-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {projectInfo.projectLink && (
            <Link
              href={projectInfo.projectLink}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                submitEvent(EventType.ProjectLinkClicked, {
                  project_name: projectInfo.projectName,
                });
              }}
              className="text-dos-bright-cyan hover:bg-dos-cyan hover:text-dos-black transition-colors px-1 text-sm"
            >
              [VISIT PROJECT]
            </Link>
          )}
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
