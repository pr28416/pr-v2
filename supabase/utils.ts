import { createClient } from "@supabase/supabase-js";
import { Database } from "@/supabase/database.types";

export const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
);
