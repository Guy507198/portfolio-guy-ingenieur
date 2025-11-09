// src/app/api/labs/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { randomUUID } from "crypto";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("labs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

/**
 * POST multipart:
 * - locale (FR/EN), title (req), subtitle?, tags (comma string "SOC,Azure")
 * - cover? (image)  -> uploads/labs/covers/
 * - doc?   (pdf/any)-> uploads/labs/docs/
 */
export async function POST(req) {
  try {
    const form = await req.formData();
    const title = form.get("title")?.toString().trim();
    const locale = (form.get("locale") || "FR").toString().trim();
    const subtitle = form.get("subtitle")?.toString().trim() || null;
    const tagsStr = form.get("tags")?.toString().trim() || "";
    const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : null;

    if (!title) return NextResponse.json({ error: "title requis" }, { status: 400 });

    const upload = async (file, sub) => {
      const buf = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const path = `labs/${sub}/${Date.now()}-${randomUUID()}.${ext}`;
      const { error } = await supabaseAdmin.storage.from("uploads").upload(path, buf, {
        contentType: file.type, upsert: false,
      });
      if (error) throw new Error(error.message);
      const { data: pub } = supabaseAdmin.storage.from("uploads").getPublicUrl(path);
      return pub.publicUrl;
    };

    let cover_url = null, doc_url = null;
    const cover = form.get("cover");
    if (cover && typeof cover === "object") cover_url = await upload(cover, "covers");
    const doc = form.get("doc");
    if (doc && typeof doc === "object") doc_url = await upload(doc, "docs");

    const { data, error } = await supabaseAdmin
      .from("labs")
      .insert([{ locale, title, subtitle, tags, cover_url, doc_url }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, item: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });
  const { error } = await supabaseAdmin.from("labs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
