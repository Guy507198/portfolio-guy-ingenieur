"use client";
import { motion } from "framer-motion";

export default function Certifications({ dict }) {
  const d = dict.certs;

  return (
    <section id="certifications" className="py-24 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">{d.title}</h2>
        <p className="text-gray-300 mb-8">{d.tagline}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {d.items.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="bg-black/50 border border-white/10 rounded-xl p-4"
            >
              <div className="text-emerald-400 font-mono text-xs mb-1">// {c.track}</div>
              <div className="text-white font-semibold">{c.name}</div>
              {c.note && <div className="text-gray-400 text-sm mt-1">{c.note}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
