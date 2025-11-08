// src/lib/projects-store.js
import fs from 'fs/promises';
import path from 'path';

const file = path.join(process.cwd(), 'data', 'projects.json');

export async function readProjects() {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

export async function writeProjects(list) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(list, null, 2), 'utf8');
}
