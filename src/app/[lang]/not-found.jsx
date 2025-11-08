export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-4">404</h1>
        <p className="text-gray-400 mb-6">Page introuvable.</p>
        <a href="/fr" className="px-4 py-2 rounded bg-emerald-500 text-black font-semibold">Retour</a>
      </div>
    </main>
  );
}
