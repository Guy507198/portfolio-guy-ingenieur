// src/components/CertsWall.jsx
import { supabaseAnon } from "@/lib/supabase";

export default async function CertsWall() {
  // Table créée plus tôt: "certs" (NOT "certifications")
  const { data: certs, error } = await supabaseAnon
    .from("certs")
    .select("*")
    .order("issue_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("CertsWall error:", error.message);
    return null;
  }
  if (!certs?.length) return null;

  // Construire des URLs publiques (bucket en lecture publique)
  // cf. getPublicUrl — pas besoin de signature si lecture publique activée
  const mapped = certs.map((c) => {
    const badge = c.badge_path
      ? supabaseAnon.storage.from(process.env.SUPABASE_BUCKET).getPublicUrl(c.badge_path).data?.publicUrl
      : null;
    const cert = c.cert_path
      ? supabaseAnon.storage.from(process.env.SUPABASE_BUCKET).getPublicUrl(c.cert_path).data?.publicUrl
      : null;
    return { ...c, badge_url: badge, cert_url: cert };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mapped.map(c => (
        <a
          key={c.id}
          href={c.cert_url || "#"}
          target={c.cert_url ? "_blank" : undefined}
          className="group p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
        >
          <div className="flex items-center gap-3">
            {c.badge_url ? (
              <img src={c.badge_url} alt="" className="w-12 h-12 rounded bg-black/30 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-white/10 rounded" />
            )}
            <div>
              <div className="font-medium">{c.vendor} • {c.code}</div>
              <div className="text-sm opacity-80">{c.title}</div>
              {c.issue_date && (
                <div className="text-xs opacity-60 mt-0.5">
                  {new Date(c.issue_date).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
