"use client";

import Image from "next/image";
import certs from "@/content/certifications.json";
import { motion } from "framer-motion";

export default function CertsWall({ dict }) {
  const t = dict?.common || { view: "Voir", download: "Télécharger", backToSection: "Retour à la section" };
  const card = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: .35 } } };

  return (
    <section id="certifications" className="px-6 pt-28 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-3">{dict?.certs?.title ?? "Certifications"}</h2>
        <p className="text-slate-400 mb-8">{dict?.certs?.tagline ?? "Validations et en-cours alignés sur mes labs."}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <motion.article
              key={`${c.code}-${i}`}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="group glass glass-hover overflow-hidden relative"
            >
              {/* zone image */}
              <div className="relative h-40">
                <Image
                  src={c.image}
                  alt={`${c.name} badge`}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  priority={i < 3}
                />
                {/* glow subtil */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
              </div>

              {/* contenu */}
              <div className="p-5">
                <p className="text-emerald-400 font-mono text-xs mb-2">// {c.area} · {c.code}</p>
                <h3 className="font-semibold">{c.name}</h3>

                <div className="flex flex-wrap gap-2 mt-3">
                  {c.tags.map((t) => (
                    <span key={t} className="badge-3d">{t}</span>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  <a href={c.file} target="_blank" rel="noreferrer" className="btn-ghost">{t.view}</a>
                  <a href={c.file} download className="btn-primary">{t.download}</a>
                </div>
              </div>

              {/* anneau neon au survol */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition neon-ring pointer-events-none" />
            </motion.article>
          ))}
        </div>

        <div className="mt-6">
          <a href="#certifications" className="text-emerald-400 hover:text-emerald-300 text-sm">
            ← {t.backToSection}
          </a>
        </div>
      </div>
    </section>
  );
}
