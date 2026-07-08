import { NextResponse } from "next/server";
import { getBeritaList } from "@/features/berita/api/get-berita";

export async function GET() {
  try {
    const data = await getBeritaList({ limit: 30 });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
