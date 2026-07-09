export interface Alumni {
  name: string;
  university: string; // universitas
  occupation: string; // pekerjaan
  angkatan: string; // tahun lulus, mis. "2010"
  image: string;
}

export interface AlumniStat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}
