import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function LabDetail({ params }) {
  // use await on params to avoid "params is a Promise" in some setups
  const { lang, slug } = await params;

  const base = path.join(process.cwd(), "content", "labs", lang || "fr", slug || "");
  const metaFile = path.join(base, "metadata.json");
  const readmeFile = path.join(base, "README.md");

  if (!fs.existsSync(base) || !fs.existsSync(metaFile)) return notFound();

  let meta = {};
  try {
    const raw = fs.readFileSync(metaFile, "utf8");
    meta = JSON.parse(raw);
  } catch (e) {
    console.error("LabDetail: parse meta failed", e);
  }

  const md = fs.existsSync(readmeFile) ? fs.readFileSync(readmeFile, "utf8") : null;

  return (
    <main className="pt-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-sm text-gray-400">
          <Link href={`/${lang}/labs`} className="text-emerald-400 hover:underline">
            ← Labs
          </Link>
        </div>

        <header className="mt-3">
          <div className="text-emerald-400 font-mono text-xs">// {meta.area}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{meta.title}</h1>
          <p className="text-gray-300 mt-2">{meta.summary}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {(meta.tags || []).map((t) => (
              <span key={t} className="text-xs px-2 py-1 border border-white/10 rounded bg-white/5">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-4">
            {meta.date && <span>📅 {meta.date}</span>}
            <span>•</span>
            <span>🎯 {meta.level}</span>
            {meta.stack?.length ? (
              <>
                <span>•</span>
                <span>🧰 {meta.stack.join(" · ")}</span>
              </>
            ) : null}
          </div>
        </header>

        {/* Objectives */}
        {meta.objectives?.length ? (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-2">Objectifs</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {meta.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Steps */}
        {meta.steps?.length ? (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-2">Étapes</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              {meta.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* Results */}
        {meta.results?.length ? (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-2">Résultats</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {meta.results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Artifacts & README */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-2">Livrables</h2>
          <div className="flex gap-3">
            {meta.artifacts?.repo && (
              <a target="_blank" rel="noreferrer" href={meta.artifacts.repo} className="text-sm border border-emerald-400 text-emerald-400 px-3 py-2 rounded hover:bg-emerald-400 hover:text-black transition">
                GitHub
              </a>
            )}
            {meta.artifacts?.pdf && (
              <a target="_blank" rel="noreferrer" href={meta.artifacts.pdf} className="text-sm border border-emerald-400 text-emerald-400 px-3 py-2 rounded hover:bg-emerald-400 hover:text-black transition">
                PDF
              </a>
            )}
          </div>

          {md && (
            <div className="mt-6 glass p-6 rounded-2xl">
              {/* If you have MDX pipeline, replace this with MDX render */}
              <pre className="whitespace-pre-wrap text-sm text-slate-200">{md}</pre>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
