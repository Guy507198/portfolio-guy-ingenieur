// scripts/create_casefile.js
// Générateur simple de Case File
// Usage:
//   node scripts/create_casefile.js fr "SOC — Détection brute-force RDP" Intermédiaire "Sentinel,KQL,SOAR" SOC

const fs = require("fs");
const path = require("path");

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const lang = process.argv[2] || "fr";
const title = process.argv[3] || "New Case File";
const level = process.argv[4] || "Intermédiaire";
const tagsRaw = process.argv[5] || "Sentinel,KQL";
const area = process.argv[6] || "";

const tags = String(tagsRaw).split(",").map((x) => x.trim()).filter(Boolean);
const slug = slugify(title);
const base = path.join(process.cwd(), "content", "labs", lang, slug);

if (fs.existsSync(base)) {
  console.error("❌ Case File already exists:", base);
  process.exit(1);
}

fs.mkdirSync(base, { recursive: true });

const metadata = {
  title,
  summary: "",
  description: "",
  tags,
  level,
  date: new Date().toISOString().slice(0, 7),
  area,
  stack: [],
  objectives: [],
  steps: [],
  results: [],
  artifacts: {
    repo: "",
    pdf: ""
  }
};

fs.writeFileSync(path.join(base, "metadata.json"), JSON.stringify(metadata, null, 2), "utf8");

const readme = `# Case File — ${title}

**Domaine**: ${area || ""}  
**Date**: ${metadata.date}  
**Niveau**: ${level}

## 🎯 Objectifs
- …

## 🧰 Environnement / Stack
- …

## ⚙️ Étapes clés
1. …
2. …
3. …

## 📊 Résultats
- KPI / captures / métriques
- Ce que j’ai appris

## 🧩 Artifacts
- Dashboard / Règles / Scripts: \`./src/\`
- Rapport PDF: \`./docs/report.pdf\`

## 🔒 Notes sécurité
Lab isolé. Aucune action sur systèmes non autorisés.
`;

fs.writeFileSync(path.join(base, "README.md"), readme, "utf8");

console.log("✅ Created case file at", base);
