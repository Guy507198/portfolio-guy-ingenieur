"use client";

export default function ShieldLoader({ show = false }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 backdrop-blur-sm">
      <div className="relative h-28 w-28">
        {/* anneau */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20 border-t-emerald-400 animate-spin" />
        {/* bouclier */}
        <div className="absolute inset-2 rounded-[18%] bg-gradient-to-b from-emerald-500/20 to-transparent shadow-[0_0_40px_#10b981]"></div>
      </div>
      <p className="mt-4 font-mono text-emerald-400">Loading…</p>
    </div>
  );
}
