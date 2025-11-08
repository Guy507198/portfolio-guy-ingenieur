import { readPost } from "@/lib/md";

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const { meta, body } = readPost(slug);

  return (
    <main className="max-w-3xl mx-auto px-6 pt-28">
      <p className="text-emerald-400 font-mono text-xs">// {meta.date}</p>
      <h1 className="text-3xl font-black mt-1">{meta.title}</h1>
      <article className="prose prose-invert mt-6 max-w-none">
        {body.split("\n").map((l,i)=><p key={i}>{l}</p>)}
      </article>
    </main>
  );
}
