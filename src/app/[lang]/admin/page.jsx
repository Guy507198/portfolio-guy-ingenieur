"use client";
import { useEffect, useState } from "react";
import Dropzone from "@/components/Dropzone";

const Input = (props) => (
  <input
    {...props}
    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
  />
);

export default function AdminDashboard({ params }) {
  const { lang } = params;
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    tags: "",
    type: "lab",
    lang,
    link: "",
    image: "",
    fileUrl: "",
    visible: true,
  });

  async function refresh() {
    const res = await fetch(`/api/projects?lang=${lang}`, { cache: "no-store" });
    setItems(await res.json());
  }
  useEffect(() => { refresh(); }, [lang]);

  async function save() {
    setBusy(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map(s => s.trim()).filter(Boolean),
    };
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) alert("Erreur création");
    setForm({ title:"", subtitle:"", description:"", tags:"", type:"lab", lang, link:"", image:"", fileUrl:"", visible:true });
    await refresh();
    setBusy(false);
  }

  async function remove(id) {
    if (!confirm("Supprimer ?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Admin — {lang.toUpperCase()}</h1>

        {/* Create */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Nouveau</h2>
            <div className="grid gap-3">
              <Input placeholder="Titre" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})}/>
              <Input placeholder="Sous-titre" value={form.subtitle} onChange={(e)=>setForm({...form, subtitle:e.target.value})}/>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e)=>setForm({...form, description:e.target.value})}
                className="min-h-[120px] w-full rounded-xl bg-black/60 border border-white/10 p-3"
              />
              <Input placeholder="Tags (séparés par des virgules)" value={form.tags} onChange={(e)=>setForm({...form, tags:e.target.value})}/>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.type}
                  onChange={(e)=>setForm({...form, type:e.target.value})}
                  className="h-11 rounded-xl bg-black/60 border border-white/10 px-3"
                >
                  <option value="lab">Lab</option>
                  <option value="project">Projet</option>
                </select>
                <select
                  value={form.lang}
                  onChange={(e)=>setForm({...form, lang:e.target.value})}
                  className="h-11 rounded-xl bg-black/60 border border-white/10 px-3"
                >
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                </select>
              </div>
              <Input placeholder="Lien externe (optionnel)" value={form.link} onChange={(e)=>setForm({...form, link:e.target.value})}/>
              <div className="grid gap-2">
                <label className="text-sm text-zinc-300">Image de couverture</label>
                <Dropzone onUploaded={(url)=>setForm(f=>({...f, image:url}))} label="Déposez votre image (PNG/JPG/WEBP)"/>
                {form.image && <a className="text-emerald-400 text-sm" href={form.image} target="_blank">Prévisualiser</a>}
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-zinc-300">Fichier joint (PDF/ZIP…)</label>
                <Dropzone onUploaded={(url)=>setForm(f=>({...f, fileUrl:url}))} label="Déposez votre fichier (PDF/ZIP)"/>
                {form.fileUrl && <a className="text-emerald-400 text-sm" href={form.fileUrl} target="_blank">Prévisualiser</a>}
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" checked={form.visible} onChange={(e)=>setForm({...form, visible:e.target.checked})}/>
                Visible
              </label>
              <button onClick={save} disabled={busy} className="h-10 px-4 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-60">
                {busy ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Aide</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300/90">
              <li>Les fichiers sont stockés dans <code>/uploads</code> (publics).</li>
              <li>Types autorisés : PDF, ZIP, PNG, JPG, WEBP. Taille max 25MB.</li>
              <li>Tu peux éditer/supprimer dans la liste ci-dessous.</li>
            </ul>
          </div>
        </div>

        {/* List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((it) => (
            <article key={it.id} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="text-xs text-zinc-400 mb-1">
                {it.type.toUpperCase()} · {it.lang.toUpperCase()} · {it.visible ? "Visible" : "Caché"}
              </div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              {it.subtitle && <p className="text-zinc-300/90">{it.subtitle}</p>}
              <div className="flex flex-wrap gap-2 my-3">
                {it.tags?.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20">{t}</span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                {it.link && <a href={it.link} target="_blank" className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 grid place-items-center">Ouvrir</a>}
                {it.fileUrl && <a href={it.fileUrl} target="_blank" className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 grid place-items-center">Télécharger</a>}
                <button onClick={()=>remove(it.id)} className="h-10 px-3 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30">
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
