"use client";

import { EventType } from "@/lib/types";
import { Eye } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getEventCount } from "@/lib/actions";

type ViewTrackerProps = {
  event: EventType;
  className?: string;
  metadataFilter?: {
    key: string;
    value: string;
  };
};

function formatCompactNumber(number: number): string {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

export default function ViewTracker({
  event,
  className,
  metadataFilter,
}: ViewTrackerProps) {
  const [count, setCount] = useState<number>(0);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Only fetch once per instance
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    getEventCount(event, metadataFilter).then(setCount);
  }, [event, metadataFilter]);

  return (
    <div
      className={`inline-flex gap-1 items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-500 dark:bg-slate-900 dark:text-slate-400 ${
        className || ""
      }`}
    >
      <Eye className="w-4 h-4" />
      {formatCompactNumber(count)}
    </div>
  );
}
