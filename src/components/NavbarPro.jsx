// src/components/NavbarPro.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarPro({ dict, lang }) {
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname + window.location.hash);
  }, []);

  const Item = ({ href, children }) => {
    const active =
      currentPath && (href === `/${lang}` ? currentPath === href : currentPath.startsWith(href));

    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={[
          "px-3 py-2 rounded-md text-sm transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          active
            ? "text-emerald-300 bg-white/5 ring-1 ring-emerald-400/30"
            : "text-zinc-100 hover:text-black hover:bg-emerald-400",
        ].join(" ")}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,.15)]">
          <div className="flex items-center justify-between px-4 py-3">
            {/* GAUCHE : brand + badge Admin */}
            <div className="flex items-center gap-3">
              <Link
                href={`/${lang}`}
                className="font-mono text-emerald-400 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              >
                GD // CYBER
              </Link>

              {/* Bouton Admin */}
              <Link
                href="/admin/login"
                className="text-xs px-2 py-1 rounded-lg border border-emerald-400/30
                           text-emerald-300/90 hover:text-emerald-100 hover:bg-emerald-500/10
                           transition-colors"
                title="Espace administration"
              >
                Admin
              </Link>
            </div>

            {/* Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              <Item href={`/${lang}/labs`}>{dict?.nav?.labs ?? "Labs"}</Item>
              <Item href={`/${lang}#about`}>{dict?.nav?.about ?? "About"}</Item>
              <Item href={`/${lang}#skills`}>{dict?.nav?.skills ?? "Skills"}</Item>
              <Item href={`/${lang}#projects`}>{dict?.nav?.projects ?? "Projects"}</Item>
              <Item href={`/${lang}/certifications`}>{dict?.nav?.certs ?? "Certifications"}</Item>
              <Item href="/assets/CV_Guy-Dorlant.pdf" target="_blank">
                {dict?.nav?.cv ?? "CV"}
              </Item>
              <Item href={`/${lang}#contact`}>{dict?.nav?.contact ?? "Contact"}</Item>

              <a
                href="https://github.com/Guy507198"
                target="_blank"
                className="px-3 py-2 rounded-md text-sm text-zinc-100 border border-white/20 hover:text-black hover:bg-white transition"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/guy-dorlant-moubaghou/"
                target="_blank"
                className="px-3 py-2 rounded-md text-sm text-zinc-100 border border-white/20 hover:text-black hover:bg-white transition"
              >
                LinkedIn
              </a>
              <a
                href="mailto:moubaghou06924318@gmail.com?subject=Hiring%20Guy-Dorlant%20-%20Cybersecurity"
                className="ml-1 px-3 py-2 rounded-md text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition"
              >
                Hire me
              </a>
            </nav>

            {/* Mobile toggler */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-zinc-100 border border-white/20 rounded px-3 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile */}
          {open && (
            <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
              <Item href={`/${lang}/labs`}>{dict?.nav?.labs ?? "Labs"}</Item>
              <Item href={`/${lang}#about`}>{dict?.nav?.about ?? "About"}</Item>
              <Item href={`/${lang}#skills`}>{dict?.nav?.skills ?? "Skills"}</Item>
              <Item href={`/${lang}#projects`}>{dict?.nav?.projects ?? "Projects"}</Item>
              <Item href={`/${lang}/certifications`}>{dict?.nav?.certs ?? "Certifications"}</Item>
              <Item href="/assets/CV_Guy-Dorlant.pdf" target="_blank">
                {dict?.nav?.cv ?? "CV"}
              </Item>
              <Item href={`/${lang}#contact`}>{dict?.nav?.contact ?? "Contact"}</Item>
              <div className="flex gap-2 pt-1">
                <a
                  href="https://github.com/Guy507198"
                  target="_blank"
                  className="px-3 py-2 rounded-md text-sm text-zinc-100 border border-white/20 hover:text-black hover:bg-white transition"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/guy-dorlant-moubaghou/"
                  target="_blank"
                  className="px-3 py-2 rounded-md text-sm text-zinc-100 border border-white/20 hover:text-black hover:bg-white transition"
                >
                  LinkedIn
                </a>
              </div>
              <a
                href="mailto:moubaghou06924318@gmail.com?subject=Hiring%20Guy-Dorlant%20-%20Cybersecurity"
                className="px-3 py-2 rounded-md text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition"
              >
                Hire me
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
