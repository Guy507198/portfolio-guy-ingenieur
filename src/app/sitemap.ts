import type { MetadataRoute } from "next";

const LOCALES = ["fr", "en"];
const PAGES = ["", "labs", "projects", "certifications", "hire", "blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // remplace domaine
  const items: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    for (const p of PAGES) {
      items.push({
        url: `${base}/${lang}/${p}`.replace(/\/$/, ""),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.6,
      });
    }
  }

  return items;
}
