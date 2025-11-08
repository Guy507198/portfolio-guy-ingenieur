// src/app/admin/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.replace("/admin/dashboard");
    } else {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error || "Identifiants invalides");
    }
  }

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4">Admin Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email admin"
          className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/10 text-white mb-3"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/10 text-white mb-3"
          required
        />

        {err && <div className="text-red-400 text-sm mb-2">{err}</div>}

        <button className="h-11 w-full rounded-xl bg-emerald-500 text-black hover:bg-emerald-400">
          Se connecter
        </button>
      </form>
    </div>
  );
}
