"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={logout}
      className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/20 hover:bg-red-500/30 text-sm"
    >
      Se déconnecter
    </button>
  );
}
