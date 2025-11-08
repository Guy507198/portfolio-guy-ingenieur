import Link from "next/link";

async function getFiles() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const r = await fetch(`${base}/api/files`, { cache: "no-store" });
  if (!r.ok) return [];
  const j = await r.json();
  return j.files || [];
}

export const metadata = { title: "Fichiers" };

export default async function FilesPublicPage() {
  const files = await getFiles();
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Fichiers</h1>
      {files.length === 0 ? (
        <div className="text-sm text-zinc-400">Aucun fichier.</div>
      ) : (
        <ul className="space-y-2 text-sm">
          {files.map((f) => (
            <li key={f.path} className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[11px] capitalize">
                {f.kind}
              </span>
              <a href={f.signedUrl} target="_blank" className="underline">
                {f.name}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <Link className="text-emerald-300 underline" href="/">
          ← Retour
        </Link>
      </div>
    </div>
  );
}
