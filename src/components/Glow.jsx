// src/components/Glow.jsx
"use client";
import { motion } from "framer-motion";

export default function Glow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* voile gradient léger */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-3xl" />
      {/* halo animé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-3xl"
      />
    </div>
  );
}
