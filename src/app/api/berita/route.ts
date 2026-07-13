import { NextResponse } from "next/server";
import { getBeritaList } from "@/features/berita/api/get-berita";

export async function GET() {
  try {
    const data = await getBeritaList({ limit: 30 });
    return NextResponse.json(data);
  } catch (error) {
    // Detail error hanya di log server; klien menerima pesan generik.
    console.error("GET /api/berita gagal:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data berita." },
      { status: 500 },
    );
  }
}
