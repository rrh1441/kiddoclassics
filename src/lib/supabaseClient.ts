import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing.");
}

console.log("Using Supabase URL:", supabaseUrl);

// Create Supabase client without overriding fetch
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
