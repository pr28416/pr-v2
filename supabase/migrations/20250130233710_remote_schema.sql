alter table "public"."events" drop column "count";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.upsert_event(p_session_id text, p_event_name text, p_path text, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
-- DECLARE
--     latest_event_id UUID;
--     latest_event_created_at TIMESTAMPTZ;
BEGIN
    -- -- Find the most recent event for the same session and event_name (order by created_at DESC)
    -- SELECT id, created_at INTO latest_event_id, latest_event_created_at
    -- FROM events
    -- WHERE session_id = p_session_id AND event_name = p_event_name AND path = p_path
    -- ORDER BY created_at DESC
    -- LIMIT 1;

    -- -- If the latest event exists and was created within 1 minute, update its count
    -- IF latest_event_id IS NOT NULL AND latest_event_created_at >= NOW() - INTERVAL '1 minute' THEN
    --     UPDATE events
    --     SET count = count + 1, updated_at = NOW()
    --     WHERE id = latest_event_id;
    -- ELSE
    --     -- Otherwise, insert a new event row with a fresh created_at timestamp
    --     INSERT INTO events (session_id, event_name, path, count, metadata, created_at, updated_at)
    --     VALUES (p_session_id, p_event_name, p_path, 1, p_metadata, NOW(), NOW());
    -- END IF;
    INSERT INTO events (session_id, event_name, path, metadata, created_at, updated_at)
    VALUES (p_session_id, p_event_name, p_path, p_metadata, NOW(), NOW());
END;
$function$
;


