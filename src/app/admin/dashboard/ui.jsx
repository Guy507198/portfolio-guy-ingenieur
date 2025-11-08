"use client";
import { useEffect, useState } from "react";

const Input = (props) => (
  <input
    {...props}
    className={
      "w-full h-11 px-3 rounded-xl bg-black/60 border border-white/10 text-white " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
    }
  />
);

export default function AdminClient() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    tags: "",
    type: "lab",
    lang: "fr",
    link: "",
    description: "",
    image: "",
    fileUrl: "",
  });

  async function refresh() {
    const res = await fetch("/api/projects", { cache: "no-store" });
    setItems(await res.json());
  }
  useEffect(() => { refresh(); }, []);

  async function uploadFile(file, field) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const { url } = await res.json();
    setForm((f) => ({ ...f, [field]: url }));
  }

  async function save() {
    setBusy(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      visible: true,
    };
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm({
      title: "",
      subtitle: "",
      tags: "",
      type: "lab",
      lang: "fr",
      link: "",
      description: "",
      image: "",
      fileUrl: "",
    });
    await refresh();
    setBusy(false);
  }

  async function remove(id) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className="min-h-screen">
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">New item</h2>
          <div className="grid gap-3">
            <Input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})}/>
            <Input placeholder="Subtitle" value={form.subtitle} onChange={(e)=>setForm({...form, subtitle:e.target.value})}/>
            <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e)=>setForm({...form, tags:e.target.value})}/>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.type}
                onChange={(e)=>setForm({...form, type:e.target.value})}
                className="h-11 rounded-xl bg-black/60 border border-white/10 px-3 text-white"
              >
                <option value="lab">Lab</option>
                <option value="project">Project</option>
                <option value="cert">Cert</option>
              </select>
              <select
                value={form.lang}
                onChange={(e)=>setForm({...form, lang:e.target.value})}
                className="h-11 rounded-xl bg-black/60 border border-white/10 px-3 text-white"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </div>
            <Input placeholder="External link (optional)" value={form.link} onChange={(e)=>setForm({...form, link:e.target.value})}/>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e)=>setForm({...form, description:e.target.value})}
              className="min-h-[120px] w-full rounded-xl bg-black/60 border border-white/10 p-3 text-white"
            />
            <div className="grid gap-2">
              <label className="text-sm text-zinc-300">Cover image</label>
              <input type="file" onChange={(e)=>e.target.files?.[0] && uploadFile(e.target.files[0],'image')} />
              {form.image && <a className="text-emerald-400 text-sm" href={form.image} target="_blank">Preview image</a>}
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-zinc-300">Attach file (PDF/ZIP…)</label>
              <input type="file" onChange={(e)=>e.target.files?.[0] && uploadFile(e.target.files[0],'fileUrl')} />
              {form.fileUrl && <a className="text-emerald-400 text-sm" href={form.fileUrl} target="_blank">Preview file</a>}
            </div>
            <button
              onClick={save}
              disabled={busy}
              className="h-11 px-4 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50"
            >
              {busy ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Tips</h2>
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li>Images & fichiers sont servis depuis <code>/uploads</code>.</li>
            <li>Édite/supprime dans la liste ci-dessous.</li>
            <li>On pourra basculer sur S3/Supabase sans changer l’UI.</li>
          </ul>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
            <div className="text-xs text-zinc-400">{it.type.toUpperCase()} · {it.lang?.toUpperCase?.()}</div>
            <div className="text-lg font-semibold">{it.title}</div>
            {it.subtitle && <div className="text-zinc-300">{it.subtitle}</div>}
            {Array.isArray(it.tags) && (
              <div className="flex flex-wrap gap-2">
                {it.tags.map((t)=>(
                  <span key={t} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20">{t}</span>
                ))}
              </div>
            )}
            <div className="mt-auto flex gap-2 pt-2">
              {it.link && <a href={it.link} target="_blank" className="px-3 h-9 rounded-lg bg-white/10 hover:bg-white/20 grid place-items-center">Open</a>}
              <button
                onClick={()=>remove(it.id)}
                className="px-3 h-9 rounded-lg bg-red-500/20 text-red-300 border border-red-500/20 hover:bg-red-500/30"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
