import { ekskulDetails } from "@/features/ekskul/data/ekskul-detail-data";
import type { EkskulDetail } from "@/features/ekskul/types/ekskul-detail";

export const getEkskulBySlug = (slug: string): EkskulDetail | undefined =>
  ekskulDetails.find((item) => item.slug === slug);
