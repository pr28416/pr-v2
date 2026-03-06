"use client";

import { WorkInfo } from "@/lib/types";
import { formatWorkPeriod } from "@/lib/utils";
import { AccordionContent } from "./accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { useSession } from "@/lib/sessionContext";
import { EventType } from "@/lib/types";
import { useRef, useEffect } from "react";

export default function WorkRow({
  idx,
  workInfo,
}: {
  idx: number;
  workInfo: WorkInfo;
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
            submitEvent(EventType.WorkExpanded, {
              role: workInfo.role,
              company: workInfo.companyName || "",
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
  }, [workInfo.role, workInfo.companyName, submitEvent]);

  const hasDetails =
    workInfo.description ||
    (workInfo.listDescription && workInfo.listDescription.length > 0) ||
    (workInfo.tags && workInfo.tags.length > 0);

  return (
    <AccordionItem
      value={"work-" + idx.toString()}
      className="flex flex-col border-b border-dos-bright-black last:border-b-0"
      ref={accordionItemRef}
    >
      <AccordionTrigger className="flex items-center w-full text-start py-1 px-1 hover:bg-dos-white/10 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 w-full">
          <span className="text-dos-bright-green flex-shrink-0">
            {workInfo.companyName || workInfo.role}
          </span>
          {workInfo.companyName && (
            <>
              <span className="text-dos-white hidden sm:inline">─</span>
              <span className="text-dos-white flex-1">{workInfo.role}</span>
            </>
          )}
          {workInfo.start_date && (
            <span className="text-dos-bright-black whitespace-nowrap text-sm flex-shrink-0">
              {formatWorkPeriod(workInfo.start_date, workInfo.end_date)}
            </span>
          )}
        </div>
      </AccordionTrigger>
      {hasDetails && (
        <AccordionContent className="text-dos-white pl-4 sm:pl-8">
          {workInfo.description && <div>{workInfo.description}</div>}
          {workInfo.listDescription && workInfo.listDescription.length > 0 && (
            <div className="space-y-1 mt-1">
              {workInfo.listDescription.map((desc, i) => (
                <div key={i} className="text-sm">
                  <span className="text-dos-bright-black mr-1">*</span>
                  {desc}
                </div>
              ))}
            </div>
          )}
          {workInfo.tags && workInfo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {workInfo.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-dos-bright-black border border-dos-bright-black px-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
