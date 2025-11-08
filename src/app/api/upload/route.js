// src/app/api/upload/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const BUCKET = process.env.SUPABASE_BUCKET || "uploads";

// Taille max (ex: 10 Mo)
const MAX_SIZE = 10 * 1024 * 1024;
// Types autorisés (ajoute/retire ce que tu veux)
const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/zip",
];

export async function POST(req) {
  try {
    // CSRF simple: accepte seulement depuis ton admin authentifié (si tu veux)
    // ex: vérifier un cookie "admin_auth" === "1"
    // const cookie = req.headers.get('cookie') || "";
    // if (!cookie.includes("admin_auth=1")) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Vercel (prod) : FS read-only → OK, on n'écrit rien localement.
    const form = await req.formData();
    const file = form.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Aucun fichier." },
        { status: 400 }
      );
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: `Type non autorisé: ${file.type}` },
        { status: 415 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `Fichier trop volumineux (> ${Math.round(MAX_SIZE/1024/1024)} Mo)` },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buff = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const objectPath = `admin/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    // Upload vers Supabase Storage
    const { error: uploadErr } = await supabaseAdmin
      .storage
      .from(BUCKET)
      .upload(objectPath, buff, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadErr) {
      return NextResponse.json(
        { error: `Upload échoué: ${uploadErr.message}` },
        { status: 500 }
      );
    }

    // Génère une URL signée (24h)
    const { data: signed, error: signedErr } = await supabaseAdmin
      .storage
      .from(BUCKET)
      .createSignedUrl(objectPath, 60 * 60 * 24);

    if (signedErr) {
      return NextResponse.json(
        { error: `URL signée échouée: ${signedErr.message}`, path: objectPath },
        { status: 500 }
      );
    }

    // (optionnel) URL publique si ton bucket est Public
    const publicUrl = supabaseAdmin.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;

    return NextResponse.json({
      ok: true,
      bucket: BUCKET,
      path: objectPath,
      signedUrl: signed.signedUrl, // privée (expire)
      publicUrl,                   // seulement si bucket public
      mime: file.type,
      size: file.size,
      ext,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Erreur inconnue" },
      { status: 500 }
    );
  }
}
