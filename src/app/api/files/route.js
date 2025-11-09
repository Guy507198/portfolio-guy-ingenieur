// src/app/api/files/route.js
import { NextResponse } from "next/server";
import { listBucketFilesSigned } from "@/lib/supabase";

// GET: renvoie la liste (signée) des fichiers du bucket
export async function GET() {
  try {
    const files = await listBucketFilesSigned("", 100);
    return NextResponse.json({ files });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
