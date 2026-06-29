export interface AchievementMember {
  name: string;
  role: "STUDENT" | "TEACHER" | "UNKNOWN";
}

export interface Achievement {
  id: string;
  name: string;
  type: string;
  level: string;
  date: string;
  organizer: string;
  rank: number;
  participantType: "INDIVIDUAL" | "GROUP";
  photoUrl: string | null;
  members: AchievementMember[];
}

export interface AchievementMeta {
  total: number;
  page: number;
  limit: number;
}

export interface AchievementResponse {
  success: boolean;
  message: string;
  meta: AchievementMeta;
  errors: unknown[];
  result: Achievement[];
}
