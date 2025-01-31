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
