"use client";

import { EventType } from "@/lib/types";
import { supabase } from "@/supabase/utils";
import { Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

  // Memoize the query function
  const fetchCount = useMemo(
    () => async () => {
      let query = supabase
        .from("events")
        .select("count")
        .eq("event_name", event);

      // Add metadata filter if provided
      if (metadataFilter) {
        // Use -> operator for JSONB path and ->> for text comparison
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
    },
    [event, metadataFilter]
  );

  useEffect(() => {
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
  }, [event, fetchCount]);

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
