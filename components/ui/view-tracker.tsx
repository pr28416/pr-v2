"use client";

import { EventType } from "@/lib/types";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/utils";

type ViewTrackerProps = {
  event: EventType | EventType[];
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

  useEffect(() => {
    const fetchCount = async () => {
      let query = Array.isArray(event)
        ? supabase.from("events").select("count").in("event_name", event)
        : supabase.from("events").select("count").eq("event_name", event);

      // Add metadata filter if provided
      if (metadataFilter) {
        query = query.eq(
          `metadata->>${metadataFilter.key}`,
          metadataFilter.value
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching event count:", error);
        return;
      }

      // Sum up all the counts
      const totalCount = data.reduce((sum, row) => sum + (row.count || 0), 0);
      setCount(totalCount);
    };

    // Initial fetch
    fetchCount();

    // Subscribe to changes
    const channel = supabase
      .channel("events_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
          filter: `event_name=eq.${event}`,
        },
        () => {
          // Refetch count when changes occur
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [event, metadataFilter]);

  return (
    count > 0 && (
      <div
        className={`inline-flex gap-1 items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-500 dark:bg-slate-900 dark:text-slate-400 ${
          className || ""
        }`}
      >
        <Eye className="w-4 h-4" />
        {formatCompactNumber(count)}
      </div>
    )
  );
}
