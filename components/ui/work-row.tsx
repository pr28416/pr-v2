"use client";

import Image from "next/image";
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

  return (
    <AccordionItem
      value={"work-" + idx.toString()}
      className="flex flex-col gap-4"
      ref={accordionItemRef}
    >
      <div className="flex flex-row gap-4 items-center">
        {/* Image container */}
        <div className="relative h-12 aspect-square">
          <Image
            src={workInfo.companyLogoUrl}
            alt="Company logo"
            fill
            className="rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out"
          />
        </div>
        {/* Company info */}
        <AccordionTrigger className="flex flex-col w-full text-start">
          <div className="flex flex-row gap-4 justify-between items-baseline w-full">
            <div className="text-slate-700 dark:text-slate-100 font-semibold sm:text-lg">
              {workInfo.role}
            </div>
            {workInfo.start_date && (
              <div className="hidden sm:flex flex-col gap-1 text-slate-500 dark:text-slate-400">
                {formatWorkPeriod(workInfo.start_date, workInfo.end_date)}
              </div>
            )}
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            {workInfo.companyName}
          </div>
          {workInfo.start_date && (
            <div className="sm:hidden flex flex-col gap-1 text-slate-500 dark:text-slate-400 text-xs">
              {formatWorkPeriod(workInfo.start_date, workInfo.end_date)}
            </div>
          )}
        </AccordionTrigger>
      </div>
      {(workInfo.description || workInfo.listDescription || workInfo.tags) && (
        <AccordionContent className="text-slate-700 dark:text-slate-300">
          <div>{workInfo.description}</div>
          {workInfo.listDescription && (
            <ul className="list-disc pl-8">
              {workInfo.listDescription.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          )}
          {workInfo.tags && (
            <div className="flex flex-row gap-2 flex-wrap mt-4">
              {workInfo.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs transition ease-in-out hover:scale-110 font-semibold text-slate-500 dark:text-slate-400"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
