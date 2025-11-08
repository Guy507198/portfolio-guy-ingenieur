// src/components/LangSwitcher.jsx
"use client";

import Link from "next/link";

export default function LangSwitcher({ lang }) {
  const current = (lang === "en" ? "en" : "fr");
  const other = current === "fr" ? "en" : "fr";

  return (
    <div className="inline-flex items-center gap-2">
      <Link
        href={`/${current}`}
        className="px-2 py-1 rounded-md text-sm bg-white/5 text-zinc-100 ring-1 ring-white/10"
      >
        {current.toUpperCase()}
      </Link>
      <Link
        href={`/${other}`}
        className="px-2 py-1 rounded-md text-sm text-zinc-100 hover:text-black hover:bg-emerald-400 transition"
      >
        {other.toUpperCase()}
      </Link>
    </div>
  );
}
