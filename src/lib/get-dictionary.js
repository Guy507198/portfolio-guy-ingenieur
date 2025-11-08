import fr from "@/dictionaries/fr.json";
import en from "@/dictionaries/en.json";

export function getDictionary(lang) {
  return lang === "en" ? en : fr;
}
