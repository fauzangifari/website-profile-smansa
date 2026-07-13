import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
            <div className="w-full max-w-md">
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
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
