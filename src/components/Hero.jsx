"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero({ dict, lang }) {
  return (
    <section className="pt-28 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-start">
        {/* Terminal animé */}
        <div className="text-emerald-400 font-mono text-sm mb-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {"> "}{dict.term.line1}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            {"> "}{dict.term.line2}
          </motion.p>
        </div>

        {/* Hero: photo + texte */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="rounded-full border-2 border-emerald-500 p-1 shadow-lg shadow-emerald-600/30"
          >
            <Image
              src="/assets/profile-cyber.jpg"
              width={180}
              height={180}
              alt="Guy-Dorlant photo"
              className="rounded-full"
              priority
            />
          </motion.div>

          {/* Texte + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {dict.hero.title}
            </h1>
            <p className="text-emerald-400 text-lg mt-3">{dict.hero.sub}</p>
            <p className="text-zinc-300 mt-4 max-w-2xl">{dict.hero.p}</p>

            {/* === CTA (utilise .btn / .btn-outline définies dans globals.css) === */}
            <div className="flex gap-4 mt-6">
              {/* ancre vers la section projets de la page d'accueil */}
              <a href={`/${lang}#projects`} className="btn">
                {dict.hero.cta_projects /* ex: "Voir mes projets" */}
              </a>
              <a href="/assets/CV_Guy-Dorlant.pdf" className="btn-outline">
                {dict.hero.cta_cv /* ex: "Télécharger CV" */}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
