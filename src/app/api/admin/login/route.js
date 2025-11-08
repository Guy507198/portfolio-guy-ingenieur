import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ ok: true });

    res.cookies.set("admin_auth", "1", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1h
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
