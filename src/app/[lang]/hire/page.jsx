import { getDictionary } from "@/lib/get-dictionary";

export default async function HirePage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-black mb-6">
        {lang === "fr" ? "Travaillons ensemble" : "Hire me"}
      </h1>
      <p className="text-gray-300 mb-8">
        {lang === "fr"
          ? "Disponible pour alternance / CDD / mission. Cloud & Sécurité, SOC, Azure, IAM, GRC."
          : "Available for apprenticeship / contract / missions. Cloud & Security, SOC, Azure, IAM, GRC."}
      </p>

      <div className="flex flex-wrap gap-3">
        <a href="mailto:moubaghou06924318@gmail.com" className="px-4 py-2 rounded bg-emerald-500 text-black font-semibold">Email</a>
        <a href="https://www.linkedin.com/in/guy-dorlant-moubaghou/" target="_blank" className="px-4 py-2 rounded border border-white/10 text-gray-200 hover:bg-white/10">LinkedIn</a>
        <a href="https://github.com/Guy507198" target="_blank" className="px-4 py-2 rounded border border-white/10 text-gray-200 hover:bg-white/10">GitHub</a>
        <a href="/assets/CV_Guy-Dorlant.pdf" download className="px-4 py-2 rounded border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black">Télécharger le CV</a>
      </div>
    </main>
  );
}
