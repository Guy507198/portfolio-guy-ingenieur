"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LabsListClient({ dict, lang, labs }) {
  const card = {
    hidden: { opacity: 0, y: 12 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {labs.map((l, i) => (
        <motion.article
          key={l.slug}
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-tr from-white/5 to-white/0 p-6"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
            <div className="absolute -inset-40 bg-emerald-500/10 blur-2xl" />
          </div>

          <p className="text-emerald-400 font-mono text-xs">// {l.level ?? "Intermediate"} · {l.date ?? ""}</p>
          <h3 className="mt-2 text-xl font-semibold">{l.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{l.summary}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {(l.tags || []).map(t => (
              <span key={t} className="text-xs text-gray-300 bg-white/5 border border-white/10 rounded px-2 py-1">{t}</span>
            ))}
          </div>

          <Link
            href={`/${lang}/labs/${l.slug}`}
            className="inline-flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-200"
          >
            {dict?.projects?.open ?? "Open"} →
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
