// src/app/admin/dashboard/page.jsx
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./ui";

/**
 * Garde serveur du dashboard (compatible Next 16).
 * - Lecture cookie via cookies() (éventuellement async)
 * - Fallback via headers() si besoin
 */
export default async function AdminDashboard() {
  const jar = await cookies();
  let isAuth = jar?.get?.("admin_auth")?.value === "1";

  if (!isAuth) {
    const h = await headers();
    const raw = h.get("cookie") || "";
    isAuth = /(?:^|;\s*)admin_auth=1(?:;|$)/.test(raw);
  }

  if (!isAuth) redirect("/admin/login");
  return <AdminClient />;
}
