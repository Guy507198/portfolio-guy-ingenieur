// src/app/admin/dashboard/ui.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import ViewerModal from "@/components/ViewerModal";

/* ---------- helpers ---------- */
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

/* ====================================================== */
/* ===================== DASHBOARD ====================== */
/* ====================================================== */
export default function AdminClient() {
  /* ====== FILES (déjà en place) ====== */
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState(null); // {url, name, kind}
  const [files, setFiles] = useState([]);
  const [viewer, setViewer] = useState({ open: false, file: null });

  async function refresh() {
    const r = await fetch("/api/files", { cache: "no-store" });
    const j = await r.json();
    if (r.ok) setFiles(j.files || []);
  }
  useEffect(() => { refresh(); }, []);

  async function onUploadChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Envoi...");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) { setStatus(json.error || "Erreur d’upload"); return; }
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
    if (r.ok) setFiles((s) => s.filter((f) => f.path !== path));
  }
  const summary = useMemo(() => {
    const s = { total: files.length };
    for (const f of files) s[extToKind(f.path)] = (s[extToKind(f.path)] || 0) + 1;
    return s;
  }, [files]);

  /* ====== CERTIFICATIONS ====== */
  const [certs, setCerts] = useState([]);
  const [cLoading, setCLoading] = useState(false);

  async function loadCerts() {
    setCLoading(true);
    const r = await fetch("/api/certs", { cache: "no-store" });
    const j = await r.json();
    if (r.ok) setCerts(j.items || []);
    setCLoading(false);
  }
  useEffect(() => { loadCerts(); }, []);

  async function onSubmitCert(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = await fetch("/api/certs", { method: "POST", body: fd });
    if (!r.ok) { alert("Erreur lors de l’enregistrement de la certification"); return; }
    e.currentTarget.reset();
    loadCerts();
  }
  async function onDeleteCert(id) {
    if (!confirm("Supprimer cette certification ?")) return;
    const r = await fetch("/api/certs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    if (r.ok) loadCerts();
  }

  /* ====== SKILLS ====== */
  const [skills, setSkills] = useState([]);
  async function loadSkills() {
    const r = await fetch("/api/skills", { cache: "no-store" });
    const j = await r.json();
    if (r.ok) setSkills(j.items || []);
  }
  useEffect(() => { loadSkills(); }, []);

  async function onAddSkill(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: f.get("name")?.toString().trim(),
      level: Number(f.get("level") || 3),
      category: f.get("category")?.toString().trim() || null
    };
    const r = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!r.ok) return alert("Erreur skill");
    e.currentTarget.reset();
    loadSkills();
  }
  async function onDeleteSkill(id) {
    if (!confirm("Supprimer cette compétence ?")) return;
    const r = await fetch("/api/skills", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    if (r.ok) loadSkills();
  }

  /* ===================== UI ===================== */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload simple */}
      <section className="rounded-2xl border border-white/10 bg-zinc-900">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold">Uploader un fichier (Supabase)</h3>
          <p className="text-sm text-zinc-400">Les fichiers sont stockés dans le bucket <code>uploads</code>.</p>
        </div>
        <div className="p-5 space-y-3">
          <input type="file" onChange={onUploadChange} />
          {status && <div className="text-sm opacity-80">{status}</div>}

          {preview && (
            <div className="mt-3">
              <div className="mb-2 text-sm text-zinc-300 flex items-center gap-2">
                <Badge>{prettyKind[preview.kind] || "Fichier"}</Badge>
                <span className="truncate">{preview.name || "—"}</span>
              </div>

              {preview.kind === "image" && (
                <img src={preview.url} alt="preview" className="w-72 h-auto rounded-lg border border-white/10" />
              )}
              {preview.kind === "pdf" && (
                <div className="p-3 rounded-lg border border-white/10 bg-black/30 text-sm">
                  Aperçu PDF →
                  <a href={preview.url} target="_blank" className="ml-2 underline text-emerald-300">Ouvrir</a>
                </div>
              )}
              {["video", "word", "excel", "ppt", "file"].includes(preview.kind) && (
                <div className="p-3 rounded-lg border border-white/10 bg-black/30 text-sm">
                  Prévisualisation limitée →
                  <a href={preview.url} target="_blank" className="ml-2 underline text-emerald-300">Ouvrir / Télécharger</a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Fichiers récents */}
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
                  <a className="truncate hover:underline" href={f.signedUrl} target="_blank">{f.name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Grille fichiers */}
      <section className="rounded-2xl border border-white/10 bg-zinc-900 lg:col-span-2">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold">Gestion des fichiers</h3>
          <p className="text-sm text-zinc-400">
            {summary.total} fichier(s) —{" "}
            {["image", "pdf", "video", "word", "excel", "ppt"].map((k) => (
              <span key={k} className="mr-3"><Badge>{prettyKind[k]}</Badge> {summary[k] || 0}</span>
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
                  <div key={f.path} className="group rounded-xl border border-white/10 bg-black/30 overflow-hidden">
                    <div onClick={open} className="cursor-zoom-in aspect-[4/3] bg-zinc-950 flex items-center justify-center">
                      {kind === "image" ? (
                        <img src={f.signedUrl} alt={f.name} className="w-full h-full object-cover group-hover:opacity-90" />
                      ) : (
                        <div className="text-xs text-zinc-400"><Badge>{prettyKind[kind]}</Badge></div>
                      )}
                    </div>
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm">{f.name}</div>
                        <div className="text-[11px] text-zinc-500 truncate">{f.path}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a className="px-2 h-8 rounded-md bg-white/10 hover:bg-white/15 text-xs" href={f.signedUrl} target="_blank">Ouvrir</a>
                        <button onClick={() => onDelete(f.path)} className="px-2 h-8 rounded-md bg-red-600/20 border border-red-500/30 text-red-300 text-xs hover:bg-red-600/25">Suppr.</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="grid md:grid-cols-2 gap-6 mt-6 lg:col-span-2">
        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <h3 className="font-semibold mb-3">Ajouter une certification</h3>
          <form onSubmit={onSubmitCert} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input name="vendor" placeholder="Vendor (ex: Microsoft)" required className="px-3 h-11 rounded-lg bg-black/50 border border-white/10"/>
              <input name="code" placeholder="Code (ex: AZ-500)" required className="px-3 h-11 rounded-lg bg-black/50 border border-white/10"/>
            </div>
            <input name="title" placeholder="Titre" required className="px-3 h-11 rounded-lg bg-black/50 border border-white/10" />
            <input name="issue_date" type="date" className="px-3 h-11 rounded-lg bg-black/50 border border-white/10" />
            <div className="grid grid-cols-2 gap-3">
              <div className="text-sm">
                <label className="block opacity-80 mb-1">Badge (image)</label>
                <input name="file_badge" type="file" accept="image/*" />
              </div>
              <div className="text-sm">
                <label className="block opacity-80 mb-1">Certificat (pdf/image)</label>
                <input name="file_cert" type="file" accept="application/pdf,image/*" />
              </div>
            </div>
            <button className="px-4 h-10 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500">Enregistrer</button>
          </form>
        </div>

        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Certifications ({certs.length})</h3>
            <button onClick={loadCerts} className="text-sm opacity-80 hover:opacity-100">Rafraîchir</button>
          </div>
          <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
            {cLoading && <div>Chargement...</div>}
            {!cLoading && certs.map(c => (
              <div key={c.id} className="p-3 rounded-lg border border-white/10 bg-black/40 flex items-center gap-3">
                {c.badge_url ? <img src={c.badge_url} alt="" className="w-10 h-10 rounded" /> : <div className="w-10 h-10 rounded bg-white/10" />}
                <div className="flex-1">
                  <div className="font-medium">{c.vendor} • {c.code}</div>
                  <div className="text-sm opacity-80">{c.title} {c.issue_date ? `— ${c.issue_date}` : ""}</div>
                </div>
                {c.cert_url && <a className="text-sm underline" href={c.cert_url} target="_blank">voir</a>}
                <button onClick={() => onDeleteCert(c.id)} className="text-sm text-red-300 hover:text-red-200">Supprimer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="grid md:grid-cols-2 gap-6 mt-6 lg:col-span-2">
        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <h3 className="font-semibold mb-3">Ajouter une compétence</h3>
          <form onSubmit={onAddSkill} className="space-y-3">
            <input name="name" placeholder="Nom (ex: Threat Hunting)" required className="px-3 h-11 rounded-lg bg-black/50 border border-white/10" />
            <div className="grid grid-cols-2 gap-3">
              <select name="level" className="px-3 h-11 rounded-lg bg-black/50 border border-white/10" defaultValue="3">
                <option value="1">Niveau 1</option><option value="2">Niveau 2</option><option value="3">Niveau 3</option>
                <option value="4">Niveau 4</option><option value="5">Niveau 5</option>
              </select>
              <input name="category" placeholder="Catégorie (SOC, Cloud…)" className="px-3 h-11 rounded-lg bg-black/50 border border-white/10" />
            </div>
            <button className="px-4 h-10 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500">Ajouter</button>
          </form>
        </div>

        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Compétences ({skills.length})</h3>
            <button onClick={loadSkills} className="text-sm opacity-80 hover:opacity-100">Rafraîchir</button>
          </div>
          <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
            {skills.map(s => (
              <div key={s.id} className="p-3 rounded-lg border border-white/10 bg-black/40 flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm opacity-80">Lvl {s.level} {s.category ? `• ${s.category}` : ""}</div>
                </div>
                <button onClick={() => onDeleteSkill(s.id)} className="text-sm text-red-300 hover:text-red-200">Supprimer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal preview fichiers */}
      <ViewerModal open={viewer.open} file={viewer.file} onClose={() => setViewer({ open: false, file: null })} />
    </div>
  );
}
