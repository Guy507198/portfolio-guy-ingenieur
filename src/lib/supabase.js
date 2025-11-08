// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// ⚠️ service_role = uniquement côté serveur
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false },
    global: { headers: { "x-client-info": "portfolio-guy-ingenieur" } },
  }
);

// (optionnel) client public si tu veux appeler Supabase depuis le browser
export const supabasePublic =
  process.env.SUPABASE_ANON_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
    : null;
