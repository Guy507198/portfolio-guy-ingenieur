// src/content/cases.js
import fs from "fs";
import path from "path";

const root = process.cwd();

function safeReadJSON(file) {
  try {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      // Nettoyage basique d'éventuels BOM/encodages bizarres
      const clean = raw.replace(/^\uFEFF/, "");
      return JSON.parse(clean);
    }
  } catch (e) {
    console.error("safeReadJSON error:", e);
  }
  return {}; // fallback
}

export function getCases(lang = "fr") {
  const base = path.join(root, "content", "labs", lang);
  if (!fs.existsSync(base)) return [];

  const entries = fs
    .readdirSync(base)
    .filter((d) => fs.statSync(path.join(base, d)).isDirectory());

  return entries.map((slug) => {
    const metaFile = path.join(base, slug, "metadata.json");
    const meta = safeReadJSON(metaFile);

    return {
      slug,
      title: meta.title || slug,
      summary: meta.summary || meta.description || "",
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      area: meta.area || "",
      level: meta.level || "",
      date: meta.date || "",
      stack: Array.isArray(meta.stack) ? meta.stack : [],
    };
  });
}

export function getCaseBySlug(lang = "fr", slug) {
  const base = path.join(root, "content", "labs", lang, slug);
  const metaFile = path.join(base, "metadata.json");
  const readmeFile = path.join(base, "README.md");

  if (!fs.existsSync(base) || !fs.existsSync(metaFile)) return null;

  const meta = safeReadJSON(metaFile);
  const md = fs.existsSync(readmeFile)
    ? fs.readFileSync(readmeFile, "utf8").replace(/^\uFEFF/, "")
    : "";

  return {
    slug,
    ...meta,
    markdown: md,
  };
}
