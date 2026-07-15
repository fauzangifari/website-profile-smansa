import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { orgMembers } from "@/features/struktur-organisasi/data/struktur-data";
import { MapelChips } from "./mapel-chips";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  alternates: { canonical: "/struktur-organisasi" },
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
  const first = initials.slice(0, 1);
  const second = initials.slice(1);

  return (
    <Card
      variant={isMain ? "glass-strong" : "glass-soft"}
      className={`group relative flex flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isMain ? "border-brand-primary/30 shadow-brand-primary/5" : "border-white/40"
      }`}
    >
      {/* Area potret monogram */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-soft via-blue-50 to-indigo-50" />

        {/* Cincin konsentris + glow (dekoratif) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute size-72 rounded-full border border-brand-primary/5" />
          <div className="absolute size-56 rounded-full border border-brand-primary/10" />
          <div className="absolute size-40 rounded-full border border-brand-primary/10" />
          <div className="absolute size-36 rounded-full bg-brand-primary/10 blur-2xl" />
        </div>

        {/* Monogram dua-nada */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`relative z-10 font-black tracking-tighter transition-transform duration-300 group-hover:scale-105 ${
              isMain ? "text-7xl md:text-8xl" : "text-6xl md:text-7xl"
            }`}
          >
            <span className="text-brand-primary">{first}</span>
            <span className={isMain ? "text-brand-primary" : "text-brand-primary/40"}>
              {second}
            </span>
          </span>
        </div>

        {/* Scrim putih bawah */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/85 to-transparent" />
      </div>

      {/* Plakat kaca mengambang */}
      <div
        className={`relative z-20 mx-3 -mt-6 mb-3 rounded-lg border border-white/60 px-4 py-3 text-center shadow-sm backdrop-blur-xl ${
          isMain ? "bg-white/80" : "bg-white/70"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
          {role}
        </p>
        <h3
          className={`mt-1 font-bold text-neutral-900 transition-colors group-hover:text-brand-primary ${
            isMain ? "text-lg" : "text-base"
          }`}
        >
          {name}
        </h3>
        {nip && nip !== "-" && (
          <p className="mt-1 text-xs font-medium text-neutral-500">{nip}</p>
        )}
        {rank && rank !== "-" && (
          <p className="mt-0.5 text-xs text-neutral-400">{rank}</p>
        )}
      </div>
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
  const kepala = orgMembers.filter((member) => member.group === "kepala");
  const waka = orgMembers.filter((member) => member.group === "waka");
  const koordinator = orgMembers.filter((member) => member.group === "koordinator");

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
            <div className="w-full max-w-xs">
              {kepala.map((member) => (
                <PersonCard
                  key={member.name}
                  isMain
                  role={member.role}
                  name={member.name}
                  nip={member.nip}
                  rank={member.rank}
                />
              ))}
            </div>
          </Reveal>

          <Connector />

          {/* WAKA */}
          <Reveal className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {waka.map((member) => (
              <PersonCard
                key={member.name}
                role={member.role}
                name={member.name}
                nip={member.nip}
                rank={member.rank}
              />
            ))}
          </Reveal>

          <Connector />

          {/* KOORDINATOR & BENDAHARA */}
          <Reveal className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {koordinator.map((member) => (
              <PersonCard
                key={member.name}
                role={member.role}
                name={member.name}
                nip={member.nip}
                rank={member.rank}
              />
            ))}
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
