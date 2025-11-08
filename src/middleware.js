// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  // cookie posé par /api/admin/login
  const auth = req.cookies.get("admin_auth")?.value === "1";

  // Si on est déjà sur /admin/login → laisser passer
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  // Toute autre route /admin/** nécessite le cookie
  if (pathname.startsWith("/admin") && !auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// N'applique que sur /admin/**
export const config = {
  matcher: ["/admin/:path*"],
};
