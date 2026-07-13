import { NextResponse } from "next/server";
import { getAchievements } from "@/features/prestasi/api/get-achievements";

export async function GET() {
  try {
    const data = await getAchievements();
    return NextResponse.json(data);
  } catch (error) {
    // Detail error hanya di log server; klien menerima pesan generik.
    console.error("GET /api/prestasi gagal:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data prestasi." },
      { status: 500 },
    );
  }
}
