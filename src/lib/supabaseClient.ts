import { createClient } from "@supabase/supabase-js";
import { fetch } from "undici"; // Use Node's 'undici' fetch polyfill

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing.");
}

console.log("Using Supabase URL:", supabaseUrl);

// Create Supabase client with compatible fetch
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => {
      return fetch(input, init);
    },
  },
});
