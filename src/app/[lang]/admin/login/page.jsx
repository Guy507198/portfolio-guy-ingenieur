"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

async function sha256Hex(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function AdminLogin({ params }) {
  const { lang } = params;
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    // dérive le token SHA-256 de "user:pass"
    const token = await sha256Hex(`${user}:${pass}`);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (res.ok) router.replace(`/${lang}/admin`);
    else setErr("Identifiants invalides");
  };

  return (
    <div className="min-h-screen bg-black text-white grid place-items-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm surface rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-5">Admin — Connexion</h1>
        <div className="grid gap-3">
          <input
            placeholder="Login"
            value={user}
            onChange={(e)=>setUser(e.target.value)}
            className="h-11 px-3 rounded-xl bg-black/60 border border-white/10"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
            className="h-11 px-3 rounded-xl bg-black/60 border border-white/10"
          />
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button className="btn mt-1">Entrer</button>
        </div>
      </form>
    </div>
  );
}
