// src/app/api/skills/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin, supabaseAnon } from "@/lib/supabase";
import { randomUUID } from "crypto";

export async function GET() {
  const { data, error } = await supabaseAnon
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("level", { ascending: false })
    .order("name", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data || [] });
}

export async function POST(req) {
  try {
    const { name, level = 3, category = null } = await req.json();
    if (!name) return NextResponse.json({ error: "name requis" }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("skills")
      .insert([{ id: randomUUID(), name, level, category }])
      .select("*")
      .single();
    if (error) throw error;

    return NextResponse.json({ ok: true, item: data });
  } catch (e) {
    return NextResponse.json({ error: String(e.message || e) }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });

    const { error } = await supabaseAdmin.from("skills").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e.message || e) }, { status: 500 });
  }
}
