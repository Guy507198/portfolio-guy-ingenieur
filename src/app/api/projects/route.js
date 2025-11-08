// src/app/api/projects/route.js
import { NextResponse } from 'next/server';
import { readProjects, writeProjects } from '@/lib/projects-store';
import { nanoid } from 'nanoid';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await readProjects();
  return NextResponse.json(items);
}

export async function POST(req) {
  const data = await req.json();
  const items = await readProjects();
  const now = new Date().toISOString();

  const item = {
    id: nanoid(),
    title: data.title ?? 'Untitled',
    subtitle: data.subtitle ?? '',
    tags: data.tags ?? [],
    image: data.image ?? '',
    fileUrl: data.fileUrl ?? '',
    createdAt: now,
    updatedAt: now,
    visible: true,
    type: data.type ?? 'lab', // 'lab' | 'project'
    lang: data.lang ?? 'en',
    link: data.link ?? '',
    description: data.description ?? '',
  };

  items.unshift(item);
  await writeProjects(items);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req) {
  const data = await req.json();
  const items = await readProjects();
  const idx = items.findIndex((x) => x.id === data.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() };
  await writeProjects(items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const items = await readProjects();
  const next = items.filter((x) => x.id !== id);
  await writeProjects(next);
  return NextResponse.json({ ok: true });
}
