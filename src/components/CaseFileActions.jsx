"use client";
export default function CaseFileActions() {
  return (
    <div className="sticky top-16 z-40 mb-4 flex gap-3">
      <button
        onClick={() => window.print()}
        className="px-3 py-2 rounded bg-emerald-500 text-black font-semibold hover:bg-emerald-400"
      >
        Exporter en PDF
      </button>
    </div>
  );
}
