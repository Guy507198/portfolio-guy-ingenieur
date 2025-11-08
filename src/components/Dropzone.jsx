"use client";
import { useCallback, useState } from "react";

export default function Dropzone({ onUploaded, label = "Déposez un fichier ou cliquez" }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onChange = async (file) => {
    if (!file) return;
    setBusy(true); setErr("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) onUploaded?.(data.url);
    else setErr(data.error || "Upload failed");
    setBusy(false);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    onChange(file);
  }, []);

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e)=>e.preventDefault()}
      className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4 text-sm text-zinc-300"
    >
      <label className="block cursor-pointer">
        <input type="file" className="hidden" onChange={(e)=>onChange(e.target.files?.[0])}/>
        <span className="text-emerald-300">{busy ? "Upload..." : label}</span>
      </label>
      {err && <p className="text-red-400 mt-2">{err}</p>}
    </div>
  );
}
