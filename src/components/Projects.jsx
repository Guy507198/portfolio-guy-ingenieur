"use client";
import { motion } from "framer-motion";

export default function Projects({ dict }) {
  const cards = dict.projects.cards;

  return (
    <section id="projects" className="py-24 px-6 bg-gradient-to-b from-black to-[#0A0D12]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">{dict.projects.title}</h2>
        <p className="text-gray-300 mb-10 max-w-2xl">{dict.projects.tagline}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.a key={i} href="#" className="block bg-black/50 border border-white/10 rounded-xl p-5 hover:border-emerald-400 transition"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="text-emerald-400 font-mono text-xs mb-2">[CASE FILE]</div>
              <div className="text-white font-semibold">{c.title}</div>
              <div className="text-gray-300 text-sm mt-2">{c.desc}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 border border-white/10 rounded bg-white/5">{tag}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
