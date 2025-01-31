"use server";

import { supabase } from "@/supabase/utils";
import { EventType } from "@/lib/types";
import { Database } from "@/supabase/database.types";

type EventData = Database["public"]["Tables"]["events"]["Row"];

export async function submitEvent(
    sessionId: string,
    event: EventType,
    path: string = "",
    metadata: Record<string, string> = {},
) {
    if (!sessionId) return;
    console.log("Submitting event:", event, path, metadata);

    const { error } = await supabase.rpc("upsert_event", {
        p_session_id: sessionId,
        p_event_name: event,
        p_path: path,
        p_metadata: metadata,
    });

    if (error) {
        console.error("Error submitting event:", error);
    }
}

export async function getEventCount(
    event: EventType,
    metadataFilter?: {
        key: string;
        value: string;
    },
) {
    let query = supabase
        .from("events")
        .select("count")
        .eq("event_name", event);

    // Add metadata filter if provided
    if (metadataFilter) {
        query = query.eq(
            `metadata->>${metadataFilter.key}`,
            metadataFilter.value,
        );
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching event count:", error);
        return 0;
    }

    // Sum up all the counts
    return data.reduce((sum, row) => sum + (row.count || 0), 0);
}
