"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About({ dict }) {
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const fall = (v, f) => (v ?? f);

  return (
    <section id="about" className="px-6 pt-28">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          className="text-3xl md:text-4xl font-black mb-6"
        >
          {fall(dict?.about?.title, "À propos")}
        </motion.h2>

        <motion.p
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-300 leading-relaxed max-w-4xl"
        >
          {fall(
            dict?.about?.intro,
            "Je suis étudiant-ingénieur avec un focus Cloud & Cybersécurité. J’aime relier SOC, Azure Security, IAM et GRC à des cas concrets, et je construis un portfolio de labs alignés à mes certifications."
          )}
        </motion.p>

        {/* 2 colonnes : statut / contact */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-black/40 p-5"
          >
            <p className="text-emerald-400 font-mono text-sm mb-3">// Statut</p>
            <p className="font-semibold">
              {fall(
                dict?.about?.status,
                "Étudiant-ingénieur 5e année — Cloud & Cyber"
              )}
            </p>
            <p className="text-gray-400 mt-2">
              {fall(
                dict?.about?.goals,
                "Objectifs 2025/26 : alternance ou premier poste SOC/Cloud Security, trajectoire vers un futur rôle de RSSI."
              )}
            </p>

            <p className="text-emerald-400 font-mono text-sm mt-5 mb-3">
              // Parcours académique
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>
                {fall(
                  dict?.about?.edu1,
                  "Cycle ingénieur Informatique & Réseaux — ESAIP (2021–2026)"
                )}
              </li>
              <li>
                {fall(
                  dict?.about?.edu2,
                  "Erasmus (prévu) — mix cybersécurité & data — UCLM / UAL (2025–2026)"
                )}
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-black/40 p-5"
          >
            <p className="text-emerald-400 font-mono text-sm mb-3">
              // Langues
            </p>
            <div className="flex flex-wrap gap-2">
              {["Français (natif)", "Anglais (TOEIC)", "Espagnol (bases)"].map(
                (l) => (
                  <span
                    key={l}
                    className="px-3 py-1 rounded bg-white/5 border border-white/10 text-gray-300 text-sm"
                  >
                    {l}
                  </span>
                )
              )}
            </div>

            <p className="text-emerald-400 font-mono text-sm mt-5 mb-3">
              // Réseaux & contact
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://github.com/"
                target="_blank"
                className="px-3 py-1 rounded border border-white/10 text-gray-300 hover:text-black hover:bg-white transition text-sm"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                className="px-3 py-1 rounded border border-white/10 text-gray-300 hover:text-black hover:bg-white transition text-sm"
              >
                LinkedIn
              </Link>
              <Link
                href="mailto:moubaghou06924318@gmail.com"
                className="px-3 py-1 rounded border border-white/10 text-gray-300 hover:text-black hover:bg-white transition text-sm"
              >
                Email
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
