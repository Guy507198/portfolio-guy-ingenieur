import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./ui";

/**
 * Guard serveur du dashboard.
 * - Dev Next 16 : cookies() peut être async → on attend.
 * - Fallback robuste : on lit l'entête "cookie" si besoin.
 */
export default async function AdminDashboard() {
  // ✅ lecture normale (Next 16 peut nécessiter await)
  const jar = await cookies();
  let isAuth = jar?.get?.("admin_auth")?.value === "1";

  // 🔄 Fallback (au cas où l’implémentation cookies() diffère en local)
  if (!isAuth) {
    const h = await headers();
    const raw = h.get("cookie") || "";
    // recherche strictement "admin_auth=1" dans la chaîne de cookies
    isAuth = /(?:^|;\s*)admin_auth=1(?:;|$)/.test(raw);
  }

  if (!isAuth) redirect("/admin/login");
  return <AdminClient />;
}
