create table "public"."events" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" text not null,
    "event_name" text not null,
    "path" text not null,
    "count" integer default 1,
    "metadata" jsonb default '{}'::jsonb,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE INDEX idx_created_at ON public.events USING btree (created_at);

CREATE INDEX idx_event_name ON public.events USING btree (event_name);

CREATE INDEX idx_event_session_time ON public.events USING btree (session_id, event_name, created_at DESC);

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.upsert_event(p_session_id text, p_event_name text, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    latest_event_id UUID;
    latest_event_created_at TIMESTAMPTZ;
BEGIN
    -- Find the most recent event for the same session and event_name (order by created_at DESC)
    SELECT id, created_at INTO latest_event_id, latest_event_created_at
    FROM events
    WHERE session_id = p_session_id AND event_name = p_event_name
    ORDER BY created_at DESC
    LIMIT 1;

    -- If the latest event exists and was created within 1 minute, update its count
    IF latest_event_id IS NOT NULL AND latest_event_created_at >= NOW() - INTERVAL '1 minute' THEN
        UPDATE events
        SET count = count + 1, updated_at = NOW()
        WHERE id = latest_event_id;
    ELSE
        -- Otherwise, insert a new event row with a fresh created_at timestamp
        INSERT INTO events (session_id, event_name, count, metadata, created_at, updated_at)
        VALUES (p_session_id, p_event_name, 1, p_metadata, NOW(), NOW());
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.upsert_event(p_session_id text, p_event_name text, p_path text, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    latest_event_id UUID;
    latest_event_created_at TIMESTAMPTZ;
BEGIN
    -- Find the most recent event for the same session and event_name (order by created_at DESC)
    SELECT id, created_at INTO latest_event_id, latest_event_created_at
    FROM events
    WHERE session_id = p_session_id AND event_name = p_event_name AND path = p_path
    ORDER BY created_at DESC
    LIMIT 1;

    -- If the latest event exists and was created within 1 minute, update its count
    IF latest_event_id IS NOT NULL AND latest_event_created_at >= NOW() - INTERVAL '1 minute' THEN
        UPDATE events
        SET count = count + 1, updated_at = NOW()
        WHERE id = latest_event_id;
    ELSE
        -- Otherwise, insert a new event row with a fresh created_at timestamp
        INSERT INTO events (session_id, event_name, path, count, metadata, created_at, updated_at)
        VALUES (p_session_id, p_event_name, p_path, 1, p_metadata, NOW(), NOW());
    END IF;
END;
$function$
;

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

CREATE TRIGGER trigger_set_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION set_updated_at();


