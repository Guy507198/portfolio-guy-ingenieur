import posts from "@/content/blog.json";

export default async function BlogIndex({ params }) {
  const { lang } = params;

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-black mb-3">
        {lang === "fr" ? "Blog / Notes" : "Blog / Notes"}
      </h1>
      <p className="text-gray-400 mb-8">
        {lang === "fr"
          ? "Courtes notes techniques liées à mes labs et projets."
          : "Short technical notes related to my labs and projects."}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-emerald-400 font-mono text-xs mb-2">{p.date}</p>
            <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
            <p className="text-gray-300 mb-4">{p.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map((t) => (
                <span key={t} className="px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-300 text-xs">{t}</span>
              ))}
            </div>
            <a href={`/${lang}/blog/${p.slug}`} className="px-3 py-1 rounded bg-emerald-500 text-black font-semibold">
              {lang === "fr" ? "Lire" : "Read"}
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
