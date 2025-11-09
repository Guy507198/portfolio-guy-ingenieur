// src/app/api/certs/route.js
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin, supabaseAnon, uploadToBucket } from "@/lib/supabase";

// GET: liste des certifications
export async function GET() {
  const { data, error } = await supabaseAnon
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data || [] });
}

// POST: ajoute une certification + upload badge / pdf
export async function POST(req) {
  try {
    const fd = await req.formData();
    const vendor = fd.get("vendor")?.toString().trim();
    const code = fd.get("code")?.toString().trim();
    const title = fd.get("title")?.toString().trim();
    const issue_date = fd.get("issue_date")?.toString() || null;

    if (!vendor || !code || !title) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    let badge_url = null;
    let cert_url = null;

    const badge = fd.get("file_badge");
    if (badge && typeof badge === "object") {
      const ext = badge.name?.split(".").pop() || "png";
      const key = `certs/${randomUUID()}-badge.${ext}`;
      const { publicUrl, signedUrl } = await uploadToBucket(badge, key);
      badge_url = publicUrl || signedUrl;
    }

    const cert = fd.get("file_cert");
    if (cert && typeof cert === "object") {
      const ext = cert.name?.split(".").pop() || "pdf";
      const key = `certs/${randomUUID()}-certificate.${ext}`;
      const { publicUrl, signedUrl } = await uploadToBucket(cert, key);
      cert_url = publicUrl || signedUrl;
    }

    const { data, error } = await supabaseAdmin
      .from("certifications")
      .insert([{ vendor, code, title, issue_date, badge_url, cert_url }])
      .select();

    if (error) throw error;
    return NextResponse.json({ ok: true, item: data?.[0] || null });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE: supprime une cert par id
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id manquant" }, { status: 400 });

    const { error } = await supabaseAdmin.from("certifications").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
