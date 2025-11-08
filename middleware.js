import { NextResponse } from "next/server";

const locales = ["fr", "en"];
const defaultLocale = "fr";
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Si c'est la racine "/", on redirige vers /fr
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // ❌ Ignore API, next, assets, fichiers publics...
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Si l'URL contient déjà fr/en → OK
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // 🧠 Sinon, injecte /fr
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

// 👇 Application du middleware sur tout sauf fichiers publics
export const config = {
  matcher: ["/((?!_next|api|assets|.*\\..*$).*)"],
};
