// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // On ne gère ici que /admin/*
  if (!path.startsWith("/admin")) return NextResponse.next();

  const isLogin = path === "/admin/login";
  const adminAuth = req.cookies.get("admin_auth")?.value === "1";

  // Non authentifié => toute page /admin/* (sauf /admin/login) redirige vers /admin/login
  if (!adminAuth && !isLogin) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Authentifié mais essaie d'aller sur /admin/login => renvoyer au dashboard
  if (adminAuth && isLogin) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // On déclenche le middleware sur TOUT /admin/*
  matcher: ["/admin/:path*"],
};
