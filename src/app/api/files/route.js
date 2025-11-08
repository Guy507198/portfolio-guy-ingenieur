import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_BUCKET || "uploads";

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

function extToKind(path = "") {
  const ext = path.toLowerCase().split(".").pop();
  if (["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (["mp4", "webm", "ogg"].includes(ext)) return "video";
  if (["doc", "docx"].includes(ext)) return "word";
  if (["xls", "xlsx", "csv"].includes(ext)) return "excel";
  if (["ppt", "pptx"].includes(ext)) return "ppt";
  return "file";
}

// GET: list + signed URLs
export async function GET() {
  const { data, error } = await supabase.storage.from(bucket).list("admin", {
    limit: 1000,
    offset: 0,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const paths = data.map((d) => `admin/${d.name}`);

  // URLs signées 1h (images/vidéos/PDF) — suffisant pour l’admin
  const signed = await Promise.all(
    paths.map(async (p) => {
      const { data: s } = await supabase.storage.from(bucket).createSignedUrl(p, 60 * 60);
      return s?.signedUrl || null;
    })
  );

  const files = paths.map((p, i) => {
    const name = p.split("/").pop();
    return {
      path: p,
      name,
      signedUrl: signed[i],
      kind: extToKind(p),
    };
  });

  return NextResponse.json({ files });
}

// DELETE: remove one
export async function DELETE(req) {
  const { path } = await req.json();
  if (!path) return NextResponse.json({ error: "path requis" }, { status: 400 });

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
