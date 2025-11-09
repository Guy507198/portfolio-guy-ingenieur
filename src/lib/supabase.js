// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// --- Env ---
const url   = process.env.SUPABASE_URL;
const anon  = process.env.SUPABASE_ANON_KEY;
const sKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const BUCKET = process.env.SUPABASE_BUCKET || "uploads";

// --- Clients ---
// Lecture publique (Server Components / client-side safe)
export const supabaseAnon = createClient(url, anon, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Admin côté serveur (routes API). NE JAMAIS exposer la clé dans le client !
export const supabaseAdmin = createClient(url, sKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// --- Helpers serveur (routes API) ---
/** Upload un Blob/Buffer dans le bucket. Retourne { path, publicUrl, signedUrl } */
export async function uploadToBucket(file, path) {
  // file : Blob (FormData) ou Buffer
  const contentType = (file?.type) || "application/octet-stream";
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType });

  if (error) throw error;

  // Si bucket public -> URL publique
  const { data: pub } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  // URL signée (fallback si bucket privé)
  const { data: sign } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60); // 1h

  return { path, publicUrl: pub?.publicUrl || null, signedUrl: sign?.signedUrl || null };
}

/** Liste des fichiers + URL signées (option prefix) */
export async function listBucketFilesSigned(prefix = "", limit = 100) {
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .list(prefix, { limit, offset: 0, sortBy: { column: "created_at", order: "desc" } });

  if (error) throw error;

  const files = [];
  for (const f of data || []) {
    const fullPath = (prefix ? `${prefix}/` : "") + f.name;
    const { data: sign } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(fullPath, 60 * 60);

    files.push({
      name: f.name,
      path: fullPath,
      signedUrl: sign?.signedUrl || null,
      size: f.metadata?.size ?? null,
      created_at: f.created_at ?? null,
    });
  }
  return files;
}
