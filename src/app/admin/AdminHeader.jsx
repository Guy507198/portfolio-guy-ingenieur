"use client";

import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return null; // ⬅️ pas de header sur /admin/login

  async function handleLogout(e) {
    e.preventDefault();
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <nav className="text-sm flex items-center gap-4">
        <a href="/admin/dashboard" className="text-zinc-300 hover:text-white">
          Dashboard
        </a>
        <a href="/" className="text-zinc-300 hover:text-white">
          Voir le site
        </a>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/20 hover:bg-red-500/30"
          >
            Se déconnecter
          </button>
        </form>
      </nav>
    </header>
  );
}
