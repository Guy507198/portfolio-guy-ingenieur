export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-28">
      <h1 className="text-4xl font-black">Contact</h1>
      <p className="text-slate-300 mt-2">Je réponds sous 24–48h.</p>

      <form action="mailto:moubaghou06924318@gmail.com" method="GET" className="mt-8 grid gap-4">
        <input name="subject" placeholder="Sujet" className="rounded border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400" />
        <textarea name="body" rows={6} placeholder="Message" className="rounded border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400" />
        <button className="self-start px-5 py-2 rounded bg-emerald-500 text-black font-semibold hover:bg-emerald-400">Envoyer</button>
      </form>
    </main>
  );
}
