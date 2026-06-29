import type { Achievement, AchievementResponse } from "@/features/prestasi/types/achievement";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function getAchievements(): Promise<Achievement[]> {
  const res = await fetch(`${BASE_URL}/api/public/achievements`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Gagal mengambil data prestasi: ${res.status} ${res.statusText}`
    );
  }

  const data: AchievementResponse = await res.json();

  if (!data.success) {
    throw new Error(data.message ?? "Respons API tidak berhasil");
  }

  return data.result;
}
