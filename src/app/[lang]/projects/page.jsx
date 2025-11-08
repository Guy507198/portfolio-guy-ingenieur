import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { readProjects } from "@/lib/projects-store";

export default async function ProjectsPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  let items = (await readProjects()).filter(
    (i) => i.type === "project" && (i.lang || "fr") === lang && i.visible !== false
  );
  items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  return (
    <section className="pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          {dict?.projects?.title ?? "Projets"}
        </h1>
        <p className="text-zinc-300/90 mb-8">
          {dict?.projects?.tagline ??
            "Sélection de projets concrets. Chaque carte contient un lien ou un fichier associé."}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((it) => (
            <article
              key={it.id}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {it.image ? (
                <img
                  src={it.image}
                  alt=""
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
              ) : null}

              <div className="text-xs text-zinc-400 mb-1">
                {it.type?.toUpperCase?.() || "PROJET"} · {lang.toUpperCase()}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-zinc-100">
                {it.title}
              </h3>

              {(it.subtitle || it.description) && (
                <p className="text-zinc-300/90 mb-4">
                  {it.subtitle || it.description}
                </p>
              )}

              {Array.isArray(it.tags) && it.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                {it.link && (
                  <a
                    href={it.link}
                    target="_blank"
                    className="h-10 px-4 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {dict?.common?.view ?? "Voir"}
                  </a>
                )}
                {it.fileUrl && (
                  <a
                    href={it.fileUrl}
                    target="_blank"
                    className="h-10 px-4 rounded-xl border border-white/15 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {dict?.common?.download ?? "Télécharger"}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-zinc-400">
            Aucun projet pour l’instant. Ajoute-en via l’admin.
          </div>
        )}
      </div>
    </section>
  );
}
