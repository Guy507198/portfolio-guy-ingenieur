// src/app/[lang]/certifications/page.jsx
import Image from "next/image";
import Link from "next/link";
import certs from "@/content/certifications.json";
import { getDictionary } from "@/lib/get-dictionary";
import ShieldLoaderGate from "@/components/ShieldLoaderGate";

export default async function Page({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const t = {
    title: dict?.certs?.title ?? "Certifications",
    tagline:
      dict?.certs?.tagline ??
      "Certifications validées et en cours, alignées avec mes labs (SOC, Azure, IAM, GRC, Offensive).",
    backToSection: dict?.common?.backToSection ?? "Retour à la section",
    view: dict?.common?.view ?? "Voir",
    download: dict?.common?.download ?? "Télécharger",
  };

  return (
    <main className="px-6 pt-24 max-w-6xl mx-auto">
      {/* Overlay loader purement client (pas d'état dans la page serveur) */}
      <ShieldLoaderGate ms={600} />

      {/* Fil d’Ariane */}
      <div className="mb-6 text-sm text-emerald-300/80">
        <Link
          href={`/${lang}`}
          className="hover:text-emerald-300 transition-colors"
        >
          ← {dict?.nav?.home ?? "Accueil"}
        </Link>{" "}
        / {t.title}
      </div>

      {/* Titre + Tagline */}
      <h1 className="text-4xl md:text-5xl font-black tracking-tight">
        {t.title}
      </h1>
      <p className="text-gray-400 mt-3">{t.tagline}</p>

      {/* Grille */}
      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <article
            key={`${c.code}-${i}`}
            className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-black/40 p-4 hover:border-emerald-500/30 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {/* Bandeau visuel */}
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/10">
              {c.image ? (
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-emerald-400/60">
                  {c.code}
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-emerald-400/10 group-hover:ring-emerald-400/30 transition" />
              <div className="pointer-events-none absolute -inset-1 rounded-xl blur-2xl bg-emerald-500/0 group-hover:bg-emerald-500/5 transition" />
            </div>

            {/* Métas */}
            <p className="mt-3 text-xs font-mono text-emerald-400">
              {/* zone / code */}
              // {c.area} · {c.code}
            </p>

            {/* Titre */}
            <h3 className="mt-1 text-lg font-semibold">{c.name}</h3>

            {/* Tags */}
            {Array.isArray(c.tags) && c.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs rounded border border-white/10 bg-white/[0.04]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 flex items-center gap-3">
              {c.file && (
                <>
                  <a
                    href={c.file}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-md bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
                  >
                    {t.view}
                  </a>
                  <a
                    href={c.file}
                    download
                    className="px-3 py-1.5 rounded-md border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black transition"
                  >
                    {t.download}
                  </a>
                </>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Lien retour (optionnel) */}
      <div className="mt-10">
        <Link
          href={`/${lang}#certifications`}
          className="text-emerald-400 hover:text-emerald-300 text-sm"
        >
          ← {t.backToSection}
        </Link>
      </div>
    </main>
  );
}
