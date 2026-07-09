import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { MapelChips } from "./mapel-chips";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description: "Struktur Organisasi SMA Negeri 1 Samarinda",
};

const getInitials = (name: string) => {
  if (name === "-" || !name) return "?";
  const cleanName = name.split(",")[0].trim();
  const parts = cleanName.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName[0].toUpperCase();
};

function PersonCard({
  role,
  name,
  nip,
  rank,
  isMain = false,
}: {
  role: string;
  name: string;
  nip?: string;
  rank?: string;
  isMain?: boolean;
}) {
  const initials = getInitials(name);

  return (
    <Card
      variant={isMain ? "glass-strong" : "glass-soft"}
      className={`relative flex flex-col items-center p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        isMain ? "border-brand-primary/30 shadow-brand-primary/5" : "border-white/30"
      }`}
    >
      <div
        className={`mb-5 flex h-24 w-24 items-center justify-center rounded-full border shadow-inner backdrop-blur-md ${
          isMain
            ? "border-brand-primary/30 bg-brand-primary/10 text-3xl text-brand-primary"
            : "border-white/60 bg-white/50 text-2xl text-brand-primary-hover"
        }`}
      >
        <span className="font-black tracking-tighter">{initials}</span>
      </div>
      <Badge variant={isMain ? "primary" : "glass"} className="mb-4">
        {role}
      </Badge>
      <h3
        className={`font-bold text-neutral-900 ${
          isMain ? "text-lg md:text-xl" : "text-base"
        }`}
      >
        {name}
      </h3>
      {nip && nip !== "-" && (
        <p className="mt-2 text-xs font-medium text-neutral-600">{nip}</p>
      )}
      {rank && rank !== "-" && (
        <p className="mt-1 text-xs text-neutral-500">{rank}</p>
      )}
    </Card>
  );
}

function Connector() {
  return (
    <div className="flex justify-center py-4">
      <div className="h-10 w-px bg-gradient-to-b from-brand-primary/40 to-brand-primary/0 md:h-16" />
    </div>
  );
}

export default function StrukturOrganisasiPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        variant="glass"
        eyebrow="Profil Sekolah"
        title="Struktur Organisasi"
        description="Struktur kepemimpinan dan manajemen pendidik di lingkungan SMA Negeri 1 Samarinda."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Struktur Organisasi" },
        ]}
      >
        <div className="mx-auto max-w-6xl py-8">
          {/* KEPALA SEKOLAH */}
          <Reveal className="flex justify-center">
            <div className="w-full max-w-md">
              <PersonCard
                isMain
                role="Plt. KEPALA SEKOLAH"
                name="Syawal Arifin, S.S., M.Pd."
                nip="NIP 198202012011011003"
                rank="Penata Tingkat I"
              />
            </div>
          </Reveal>

          <Connector />

          {/* WAKA */}
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PersonCard
              role="WAKA KURIKULUM"
              name="Aniek Widajanti, M.Pd."
              nip="NIP 196802101988112001"
              rank="Pembina Tingkat I, IV/b"
            />
            <PersonCard
              role="WAKA HUMAS"
              name="Hermawati, S.Pd."
              nip="NIP 197311202000122002"
              rank="Pembina Tingkat I, IV/b"
            />
            <PersonCard
              role="WAKA SARPRAS"
              name="Ali Mursid, S.Pd., M.Pd."
              nip="NIP 197004181994011002"
              rank="Pembina Utama Muda, IV/c"
            />
            <PersonCard
              role="WAKA KESISWAAN"
              name="Syodiqul Huda, S.Pd., M.Pd."
              nip="NIP 198012032005021007"
              rank="Penata Tingkat I, III/d"
            />
          </Reveal>

          <Connector />

          {/* KOORDINATOR & BENDAHARA */}
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PersonCard
              role="KOORDINATOR TAS"
              name="Khusnul Sugiarto, S.M."
              nip="NIPPPK 199502162025211013"
              rank="Operator Layanan Operasional"
            />
            <PersonCard
              role="BENDAHARA"
              name="Chairunisa Puspanegara, S.Pd."
              nip="NIPPPK 198411042025212021"
              rank="Pengatur Muda"
            />
            <PersonCard
              role="KOORDINATOR PERPUSTAKAAN"
              name="Bagus Baskoro K.R., S.Pd."
              nip="NIPPPK 199212142022211006"
              rank="Guru Ahli Pertama"
            />
            <PersonCard
              role="KEPALA LABORATORIUM"
              name="Mila Susan Shofiani, S.Pd."
              nip="NIPPPK 199505032023212021"
              rank="Guru Ahli Pertama"
            />
          </Reveal>

          <Connector />

          {/* GURU MATA PELAJARAN */}
          <Reveal>
            <Card
              variant="glass-strong"
              className="border-white/40 p-8 text-center md:p-12"
            >
              <h2 className="mb-8 text-2xl font-black tracking-tight text-neutral-900 md:text-3xl">
                GURU MATA PELAJARAN
              </h2>
              <MapelChips />
            </Card>
          </Reveal>

          <Connector />

          {/* SISWA */}
          <Reveal>
            <Card
              variant="glass-strong"
              className="border-brand-primary/20 bg-brand-primary-soft/30 py-8 text-center backdrop-blur-xl"
            >
              <h2 className="text-2xl font-black tracking-widest text-brand-primary md:text-3xl">
                SISWA
              </h2>
            </Card>
          </Reveal>
        </div>
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
