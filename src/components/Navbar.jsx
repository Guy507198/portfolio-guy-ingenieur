// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({ dict, lang }) {
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
          active ? "text-emerald-300 bg-white/5 ring-1 ring-emerald-400/30"
                 : "text-zinc-100 hover:text-black hover:bg-emerald-400",
        ].join(" ")}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href={`/${lang}`} className="font-mono text-emerald-400 hover:text-emerald-300">
          GD // CYBER
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Item href={`/${lang}/labs`}>{dict?.nav?.labs ?? "Labs"}</Item>
          <Item href={`/${lang}#about`}>{dict?.nav?.about ?? "About"}</Item>
          <Item href={`/${lang}#skills`}>{dict?.nav?.skills ?? "Skills"}</Item>
          <Item href={`/${lang}#projects`}>{dict?.nav?.projects ?? "Projects"}</Item>
          <Item href={`/${lang}/certifications`}>{dict?.nav?.certs ?? "Certifications"}</Item>
          <Item href="/assets/CV_Guy-Dorlant.pdf" target="_blank">{dict?.nav?.cv ?? "CV"}</Item>
          <Item href={`/${lang}#contact`}>{dict?.nav?.contact ?? "Contact"}</Item>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-100 border border-white/20 rounded px-3 py-1"
          aria-label="menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-2 bg-black/80 border-t border-white/10">
          <Item href={`/${lang}/labs`}>Labs</Item>
          <Item href={`/${lang}#about`}>About</Item>
          <Item href={`/${lang}#skills`}>Skills</Item>
          <Item href={`/${lang}#projects`}>Projects</Item>
          <Item href={`/${lang}/certifications`}>Certifications</Item>
          <Item href="/assets/CV_Guy-Dorlant.pdf">CV</Item>
          <Item href={`/${lang}#contact`}>Contact</Item>
        </div>
      )}
    </header>
  );
}
