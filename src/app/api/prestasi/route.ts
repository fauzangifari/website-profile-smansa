import { NextResponse } from "next/server";
import { getAchievements } from "@/features/prestasi/api/get-achievements";

export async function GET() {
  try {
    const data = await getAchievements();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
