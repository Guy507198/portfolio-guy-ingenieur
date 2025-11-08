"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectsGrid({ dict, lang, projects }) {
  const card = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section id="projects" className="px-6 pt-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-6">
          {dict?.projects?.title ?? "Projects & Labs"}
        </h2>

        {/* grille responsive + espacement accessible */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-gap">
          {projects.map((p) => (
            <motion.article
              key={p.slug}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="card hover:bg-white/10 transition"
            >
              {/* Titre + résumé */}
              <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
              <p className="text-secondary mb-4">{p.summary}</p>

              {/* Tags */}
              {!!(p.tags || []).length && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Link href={`/${lang}/labs/${p.slug}`} className="btn">
                  {dict?.projects?.open ?? "Open"}
                </Link>

                {/* Optionnel : si tu fournis un fichier à télécharger dans tes données */}
                {p.file && (
                  <a href={p.file} className="btn-outline">
                    {dict?.projects?.download ?? "Download"}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
