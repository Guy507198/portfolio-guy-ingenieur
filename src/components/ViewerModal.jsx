"use client";
import { useEffect } from "react";

export default function ViewerModal({ open, onClose, file }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !file) return null;

  const ext = (file.path || "").toLowerCase().split(".").pop();
  const isImg = ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"].includes(ext);
  const isPdf = ext === "pdf";
  const isVideo = ["mp4", "webm", "ogg"].includes(ext);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 px-3 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm"
        >
          Fermer
        </button>

        <div className="p-4 border-b border-white/10 text-sm text-zinc-300 flex items-center gap-2">
          <span className="font-medium text-white">{file.name}</span>
          <span className="opacity-60">·</span>
          <a href={file.signedUrl || file.publicUrl} target="_blank" className="underline">
            Ouvrir dans un onglet
          </a>
          <span className="opacity-60">·</span>
          <a href={file.signedUrl || file.publicUrl} download className="underline">
            Télécharger
          </a>
        </div>

        <div className="bg-black aspect-[16/10] w-full">
          {isImg && (
            <img
              src={file.signedUrl || file.publicUrl}
              alt={file.name}
              className="w-full h-full object-contain"
            />
          )}

          {isPdf && (
            <iframe
              className="w-full h-full"
              src={`${file.signedUrl || file.publicUrl}#view=FitH`}
              title={file.name}
            />
          )}

          {isVideo && (
            <video className="w-full h-full" controls src={file.signedUrl || file.publicUrl} />
          )}

          {!isImg && !isPdf && !isVideo && (
            <div className="p-8 text-center text-zinc-300">
              Prévisualisation non prise en charge.
              <br />
              <a
                className="inline-block mt-3 px-3 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/25"
                href={file.signedUrl || file.publicUrl}
                target="_blank"
              >
                Ouvrir / Télécharger
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
