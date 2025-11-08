import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const MAX_SIZE = 25 * 1024 * 1024; // 25 MB
const ALLOWED = new Set([
  'application/pdf',
  'application/zip',
  'image/png',
  'image/jpeg',
  'image/webp',
]);

export async function POST(req) {
  const form = await req.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const mime = file.type || 'application/octet-stream';
  if (!ALLOWED.has(mime)) {
    return NextResponse.json({ error: `Type non autorisé: ${mime}` }, { status: 400 });
  }

  const buf = await file.arrayBuffer();
  if (buf.byteLength > MAX_SIZE) {
    return NextResponse.json({ error: 'Fichier trop volumineux (>25MB)' }, { status: 400 });
  }

  const ext = path.extname(file.name) || '';
  const name = `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`;
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, name), Buffer.from(buf));

  return NextResponse.json({ url: `/uploads/${name}`, mime }, { status: 201 });
}
