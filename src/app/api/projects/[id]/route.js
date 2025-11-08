import { NextResponse } from "next/server";
import { readProjects, writeProjects } from "@/lib/projects-store";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  const { id } = params;
  const patch = await req.json();
  const data = await readProjects();
  const i = data.findIndex(p => p.id === id);
  if (i === -1) return NextResponse.json({ error: "not found" }, { status: 404 });
  data[i] = { ...data[i], ...patch, updatedAt: new Date().toISOString() };
  await writeProjects(data);
  return NextResponse.json(data[i]);
}

export async function DELETE(_req, { params }) {
  const { id } = params;
  const data = await readProjects();
  const next = data.filter(p => p.id !== id);
  if (next.length === data.length) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  await writeProjects(next);
  return NextResponse.json({ ok: true });
}
