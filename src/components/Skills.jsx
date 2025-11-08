"use client";
import { motion } from "framer-motion";

export default function Skills({ dict }) {
  const items = dict.skills.items;
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">{dict.skills.title}</h2>
        <p className="text-gray-300 mb-10 max-w-2xl">{dict.skills.tagline}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div key={i} className="bg-black/50 border border-white/10 rounded-xl p-5"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="text-emerald-400 font-mono text-xs mb-2">// {it.chip}</div>
              <div className="text-white font-semibold">{it.title}</div>
              <div className="text-gray-300 text-sm mt-2">{it.text}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {it.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 border border-white/10 rounded bg-white/5">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
