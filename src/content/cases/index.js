import fr from "./fr";
import en from "./en";

export function getCases(lang) {
  return lang === "en" ? en : fr;
}

export function getCaseBySlug(lang, slug) {
  const list = getCases(lang);
  return list.find((c) => c.slug === slug);
}
