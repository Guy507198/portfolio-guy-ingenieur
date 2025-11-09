// src/components/Skills.jsx
import { supabaseAnon } from "@/lib/supabase";

export default async function Skills() {
  const { data, error } = await supabaseAnon
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("level", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Skills error:", error.message);
    return null;
  }
  if (!data?.length) return null;

  const byCat = data.reduce((acc, s) => {
    const k = s.category || "Général";
    (acc[k] ||= []).push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-16 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Compétences</h3>
        <p className="text-gray-300 mb-8">Stack technique et niveau par domaine.</p>

        <div className="space-y-6">
          {Object.entries(byCat).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="mb-2 font-semibold">{cat}</h4>
              <div className="flex flex-wrap gap-2">
                {items.map((i) => (
                  <span
                    key={i.id}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm"
                  >
                    {i.name} <span className="opacity-70">({i.level})</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
