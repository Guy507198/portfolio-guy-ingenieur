"use client";
import { useEffect, useMemo, useState } from "react";
import ViewerModal from "@/components/ViewerModal";

function extToKind(path = "") {
  const ext = path.toLowerCase().split(".").pop();
  if (["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (["mp4", "webm", "ogg"].includes(ext)) return "video";
  if (["doc", "docx"].includes(ext)) return "word";
  if (["xls", "xlsx", "csv"].includes(ext)) return "excel";
  if (["ppt", "pptx"].includes(ext)) return "ppt";
  return "file";
}

const prettyKind = {
  image: "Image",
  pdf: "PDF",
  video: "Vidéo",
  word: "Word",
  excel: "Excel/CSV",
  ppt: "PowerPoint",
  file: "Fichier",
};

function Badge({ children }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-[11px] bg-white/10 border border-white/10">
      {children}
    </span>
  );
}

export default function AdminClient() {
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState(null); // {url, name, kind}
  const [files, setFiles] = useState([]);
  const [viewer, setViewer] = useState({ open: false, file: null });

  async function refresh() {
    const r = await fetch("/api/files");
    const j = await r.json();
    if (r.ok) setFiles(j.files || []);
  }

  useEffect(() => {
    refresh();
  }, []);

  /** Upload simple -> /api/upload (Supabase) */
  async function onUploadChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Envoi...");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) {
      setStatus(json.error || "Erreur d’upload");
      return;
    }
    setStatus("OK");
    setPreview({
      url: json.signedUrl || json.publicUrl,
      name: json.name,
      kind: extToKind(json.path || json.name),
    });
    refresh();
  }

  async function onDelete(path) {
    if (!confirm(`Supprimer “${path}” ?`)) return;
    const r = await fetch("/api/files", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path }),
    });
    if (r.ok) {
      setFiles((s) => s.filter((f) => f.path !== path));
    }
  }

  const summary = useMemo(() => {
    const s = { total: files.length };
    for (const f of files) {
      const k = extToKind(f.path);
      s[k] = (s[k] || 0) + 1;
    }
    return s;
  }, [files]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload */}
      <section className="rounded-2xl border border-white/10 bg-zinc-900">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold">Uploader un fichier (Supabase)</h3>
          <p className="text-sm text-zinc-400">
            Les fichiers sont stockés dans le bucket <code>uploads</code>.
          </p>
        </div>
        <div className="p-5 space-y-3">
          <input type="file" onChange={onUploadChange} />
          {status && <div className="text-sm opacity-80">{status}</div>}

          {/* aperçu intelligent */}
          {preview && (
            <div className="mt-3">
              <div className="mb-2 text-sm text-zinc-300 flex items-center gap-2">
                <Badge>{prettyKind[preview.kind] || "Fichier"}</Badge>
                <span className="truncate">{preview.name || "—"}</span>
              </div>

              {preview.kind === "image" && (
                <img
                  src={preview.url}
                  alt="preview"
                  className="w-72 h-auto rounded-lg border border-white/10"
                />
              )}

              {preview.kind === "pdf" && (
                <div className="p-3 rounded-lg border border-white/10 bg-black/30 text-sm">
                  Aperçu PDF disponible →
                  <a
                    href={preview.url}
                    target="_blank"
                    className="ml-2 underline text-emerald-300"
                  >
                    Ouvrir
                  </a>
                </div>
              )}

              {["video", "word", "excel", "ppt", "file"].includes(preview.kind) && (
                <div className="p-3 rounded-lg border border-white/10 bg-black/30 text-sm">
                  Prévisualisation limitée →
                  <a
                    href={preview.url}
                    target="_blank"
                    className="ml-2 underline text-emerald-300"
                  >
                    Ouvrir / Télécharger
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Infos rapides */}
      <section className="rounded-2xl border border-white/10 bg-zinc-900">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold">Fichiers récents</h3>
          <p className="text-sm text-zinc-400">Depuis ton bucket Supabase.</p>
        </div>
        <div className="p-5">
          {files.length === 0 ? (
            <div className="text-sm text-zinc-400">Aucun fichier pour l’instant.</div>
          ) : (
            <ul className="space-y-2 text-sm">
              {files.slice(0, 6).map((f) => (
                <li key={f.path} className="flex items-center gap-2">
                  <Badge>{prettyKind[extToKind(f.path)]}</Badge>
                  <a className="truncate hover:underline" href={f.signedUrl} target="_blank">
                    {f.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="rounded-2xl border border-white/10 bg-zinc-900 lg:col-span-2">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold">Gestion des fichiers</h3>
          <p className="text-sm text-zinc-400">
            {summary.total} fichier(s) —{" "}
            {["image", "pdf", "video", "word", "excel", "ppt"].map((k) => (
              <span key={k} className="mr-3">
                <Badge>{prettyKind[k]}</Badge> {summary[k] || 0}
              </span>
            ))}
          </p>
        </div>

        <div className="p-5">
          {files.length === 0 ? (
            <div className="text-sm text-zinc-400">Aucun fichier.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {files.map((f) => {
                const kind = extToKind(f.path);
                const open = () => setViewer({ open: true, file: f });
                return (
                  <div
                    key={f.path}
                    className="group rounded-xl border border-white/10 bg-black/30 overflow-hidden"
                  >
                    <div
                      onClick={open}
                      className="cursor-zoom-in aspect-[4/3] bg-zinc-950 flex items-center justify-center"
                    >
                      {kind === "image" ? (
                        <img
                          src={f.signedUrl}
                          alt={f.name}
                          className="w-full h-full object-cover group-hover:opacity-90"
                        />
                      ) : (
                        <div className="text-xs text-zinc-400">
                          <Badge>{prettyKind[kind]}</Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm">{f.name}</div>
                        <div className="text-[11px] text-zinc-500 truncate">{f.path}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          className="px-2 h-8 rounded-md bg-white/10 hover:bg-white/15 text-xs"
                          href={f.signedUrl}
                          target="_blank"
                        >
                          Ouvrir
                        </a>
                        <button
                          onClick={() => onDelete(f.path)}
                          className="px-2 h-8 rounded-md bg-red-600/20 border border-red-500/30 text-red-300 text-xs hover:bg-red-600/25"
                        >
                          Suppr.
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal de preview */}
      <ViewerModal open={viewer.open} file={viewer.file} onClose={() => setViewer({ open: false, file: null })} />
    </div>
  );
}
