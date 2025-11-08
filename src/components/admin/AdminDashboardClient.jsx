"use client";

import { useEffect, useMemo, useState } from "react";

const empty = {
  type: "lab",
  lang: "fr",
  visible: true,
  slug: "",
  link: "",
  image: "",
  fileUrl: "",
  title: "",
  subtitle: "",
  description: "",
  tags: "",
};

export default function AdminDashboardClient({ initial }) {
  const [items, setItems] = useState(initial || []);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState({ type: "all", lang: "all" });

  const filtered = useMemo(() => (
    items.filter(i =>
      (filter.type === "all" || i.type === filter.type) &&
      (filter.lang === "all" || i.lang === filter.lang)
    )
  ), [items, filter]);

  async function refresh() {
    const r = await fetch("/api/projects", { cache: "no-store" });
    setItems(await r.json());
  }

  useEffect(() => { if (!items?.length) refresh(); }, []); // auto-reload if empty

  function onChange(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags.split(",").map(s => s.trim()).filter(Boolean)
        : [],
    };
    const r = await fetch("/api/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (r.ok) {
      setForm(empty);
      await refresh();
    } else {
      alert("Erreur création");
    }
  }

  async function onUpdate(id, patch) {
    const r = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (r.ok) refresh();
  }

  async function onDelete(id) {
    if (!confirm("Supprimer cet item ?")) return;
    const r = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (r.ok) refresh();
  }

  async function uploadFile(file, field) {
    const fd = new FormData();
    fd.append("file", file);
    setUploading(true);
    try {
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await r.json();
      setForm(f => ({ ...f, [field]: url }));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="font-semibold mb-3">Créer un item</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <select value={form.type} onChange={e => onChange("type", e.target.value)} className="h-10 px-3 rounded-xl bg-black border border-white/15">
              <option value="lab">lab</option>
              <option value="project">project</option>
            </select>
            <select value={form.lang} onChange={e => onChange("lang", e.target.value)} className="h-10 px-3 rounded-xl bg-black border border-white/15">
              <option value="fr">fr</option>
              <option value="en">en</option>
            </select>
          </div>

          <input className="h-10 px-3 rounded-xl bg-black border border-white/15 w-full" placeholder="title" value={form.title} onChange={e=>onChange("title", e.target.value)} />
          <input className="h-10 px-3 rounded-xl bg-black border border-white/15 w-full" placeholder="subtitle" value={form.subtitle} onChange={e=>onChange("subtitle", e.target.value)} />
          <textarea className="min-h-[90px] px-3 py-2 rounded-xl bg-black border border-white/15 w-full" placeholder="description" value={form.description} onChange={e=>onChange("description", e.target.value)} />
          <input className="h-10 px-3 rounded-xl bg-black border border-white/15 w-full" placeholder="tags (séparés par des virgules)" value={form.tags} onChange={e=>onChange("tags", e.target.value)} />
          <input className="h-10 px-3 rounded-xl bg-black border border-white/15 w-full" placeholder="slug (optionnel)" value={form.slug} onChange={e=>onChange("slug", e.target.value)} />
          <input className="h-10 px-3 rounded-xl bg-black border border-white/15 w-full" placeholder="link (optionnel)" value={form.link} onChange={e=>onChange("link", e.target.value)} />

          <div className="grid grid-cols-2 gap-2">
            <input className="h-10 px-3 rounded-xl bg-black border border-white/15" placeholder="image URL" value={form.image} onChange={e=>onChange("image", e.target.value)} />
            <label className="h-10 grid place-items-center rounded-xl bg-white/5 border border-white/10 cursor-pointer text-sm">
              {uploading ? "Upload…" : "Upload image"}
              <input type="file" hidden onChange={e=>e.target.files[0] && uploadFile(e.target.files[0], "image")} />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input className="h-10 px-3 rounded-xl bg-black border border-white/15" placeholder="file URL" value={form.fileUrl} onChange={e=>onChange("fileUrl", e.target.value)} />
            <label className="h-10 grid place-items-center rounded-xl bg-white/5 border border-white/10 cursor-pointer text-sm">
              {uploading ? "Upload…" : "Upload file"}
              <input type="file" hidden onChange={e=>e.target.files[0] && uploadFile(e.target.files[0], "fileUrl")} />
            </label>
          </div>

          <button className="h-10 px-4 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 w-full">
            Ajouter
          </button>
        </form>
      </div>

      {/* List */}
      <div className="lg:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <select value={filter.type} onChange={e=>setFilter(f=>({...f, type: e.target.value}))} className="h-9 px-3 rounded-xl bg-black border border-white/15">
            <option value="all">type: all</option>
            <option value="lab">lab</option>
            <option value="project">project</option>
          </select>
          <select value={filter.lang} onChange={e=>setFilter(f=>({...f, lang: e.target.value}))} className="h-9 px-3 rounded-xl bg-black border border-white/15">
            <option value="all">lang: all</option>
            <option value="fr">fr</option>
            <option value="en">en</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.map(it => (
            <div key={it.id} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-zinc-400">{it.type} · {it.lang} · {it.visible ? "visible" : "hidden"}</div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-zinc-300/90">{it.description}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {it.tags?.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => onUpdate(it.id, { visible: !it.visible })} className="h-9 px-3 rounded-xl border border-white/15">
                    {it.visible ? "Masquer" : "Afficher"}
                  </button>
                  <button onClick={() => onDelete(it.id)} className="h-9 px-3 rounded-xl bg-rose-500 text-black hover:bg-rose-400">
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="text-xs text-zinc-500 mt-2">
                {it.slug ? `/${it.lang}/${it.type === "lab" ? "labs" : "projects"}/${it.slug}` : it.link || ""}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-zinc-400">Aucun item.</div>
          )}
        </div>
      </div>
    </div>
  );
}
