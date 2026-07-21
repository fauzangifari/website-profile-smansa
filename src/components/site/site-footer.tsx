import Image from "next/image";
import {
  EnvelopeSimpleIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

type SiteFooterProps = {
  anchorBasePath?: string;
};

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

function resolveHref(href: string, anchorBasePath?: string) {
  if (!anchorBasePath || !href.startsWith("#")) {
    return href;
  }

  return `${anchorBasePath}${href}`;
}

const contactLinks = [
  {
    icon: MapPinIcon,
    label:
      "Jl. Drs. H. Anang Hasyim, Air Hitam, Kota Samarinda, Kalimantan Timur 75124",
    href: "https://maps.google.com/?q=SMA%20Negeri%201%20Samarinda",
  },
  {
    icon: EnvelopeSimpleIcon,
    label: "info@sman1samarinda.sch.id",
    href: "mailto:info@sman1samarinda.sch.id",
  },
];

const partners: FooterLink[] = [
  {
    label: "KEMENDIKDASMEN",
    href: "https://www.kemdikbud.go.id/",
    external: true,
  },
  { label: "Pemprov Kaltim", href: "https://kaltimprov.go.id/", external: true },
  {
    label: "Disdikbud Kaltim",
    href: "https://disdikbud.kaltimprov.go.id/",
    external: true,
  },
  { label: "UII", href: "https://www.uii.ac.id/", external: true },
  { label: "Pelindo", href: "https://www.pelindo.co.id/", external: true },
];

const importantLinks: FooterLink[] = [
  { label: "Profil", href: "/profil" },
  { label: "Visi & Misi", href: "/visi-misi" },
  { label: "Berita", href: "#berita" },
  { label: "SPMB", href: "#spmb" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Kontak", href: "#kontak" },
];

// Diambil dari siteConfig.social; entri kosong ("") disembunyikan.
const socialLinks = [
  { label: "Facebook", href: siteConfig.social.facebook, icon: FacebookLogoIcon },
  { label: "X", href: siteConfig.social.x, icon: XLogoIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinLogoIcon },
  { label: "YouTube", href: siteConfig.social.youtube, icon: YoutubeLogoIcon },
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramLogoIcon },
].filter((item) => item.href);

const legalLinks: FooterLink[] = [
  { label: "Cookies", href: "#" },
  { label: "Syarat & Ketentuan", href: "/terms-of-service" },
  { label: "Kebijakan Privasi", href: "/privacy-policy" },
];

export function SiteFooter({ anchorBasePath }: SiteFooterProps) {
  const year = 2026;

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container className="py-10 md:py-12">
        <section
          aria-label="Identitas sekolah"
          className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="flex min-w-0 items-start gap-4">
              <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
                <Image
                  src="/images/brand/logo.png"
                  alt="Logo SMA Negeri 1 Samarinda"
                  width={40}
                  height={40}
                  className="h-12 w-auto object-contain"
                />
              </span>
              <div className="min-w-0">
                <p className="text-xl font-extrabold leading-tight text-neutral-900">
                  SMANSA
                </p>
                <p className="mt-1 text-sm font-semibold text-neutral-600">
                  SMA Negeri 1 Samarinda
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                  Sekolah Menengah Atas
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-700">
                  Situs web resmi sekolah yang menyajikan informasi publik
                  seputar berita, program, prestasi, fasilitas, alumni,
                  e-learning, dan SPMB.
                </p>
              </div>
            </div>
            <a
              href="tel:0541741305"
              className="inline-flex h-11 w-fit items-center gap-2 rounded-md border border-brand-primary/20 bg-white px-4 text-sm font-bold text-brand-primary shadow-sm transition hover:border-brand-primary/40 hover:bg-brand-primary-soft"
            >
              <PhoneIcon size={18} weight="duotone" />
              (0541) 741305
            </a>
          </div>
        </section>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.85fr_0.95fr]">
          <section aria-label="Kontak sekolah">
            <FooterHeading>Kontak</FooterHeading>
            <div className="mt-4 grid gap-4">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex min-w-0 gap-3 text-sm leading-6 text-neutral-700 transition hover:text-brand-primary"
                  >
                    <Icon
                      size={20}
                      weight="duotone"
                      className="mt-0.5 shrink-0 text-brand-primary transition group-hover:text-brand-primary-hover"
                    />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </section>

          <section aria-label="Menu penting">
            <FooterHeading>Menu Penting</FooterHeading>
            <FooterLinkList
              links={importantLinks}
              anchorBasePath={anchorBasePath}
            />
          </section>

          <section aria-label="Kemitraan">
            <FooterHeading>Kemitraan</FooterHeading>
            <FooterLinkList links={partners} anchorBasePath={anchorBasePath} />
          </section>

          <section aria-label="Jam operasional dan sosial media">
            <FooterHeading>Jam Operasional</FooterHeading>
            <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm font-bold text-neutral-900">
                Senin - Kamis
              </p>
              <p className="mt-1 text-sm text-neutral-700">
                07.00 - 15.30 WITA
              </p>
              <div className="my-4 h-px bg-neutral-200" />
              <p className="text-sm font-bold text-neutral-900">Jumat</p>
              <p className="mt-1 text-sm text-neutral-700">
                08.00 - 12.00 WITA
              </p>
            </div>

            <div className="mt-7">
              <FooterHeading>Sosial Media</FooterHeading>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="grid size-10 place-items-center rounded-md border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-brand-primary/40 hover:bg-brand-primary-soft hover:text-brand-primary"
                    >
                      <Icon size={20} weight="duotone" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p>Copyright © {year} SMAN 1 Samarinda. All rights reserved.</p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {legalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-semibold transition hover:text-brand-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-neutral-900">
      {children}
    </h2>
  );
}

function FooterLinkList({
  links,
  anchorBasePath,
}: {
  links: FooterLink[];
  anchorBasePath?: string;
}) {
  return (
    <div className="mt-4 grid gap-2.5 text-sm">
      {links.map((item) => (
        <a
          key={item.label}
          href={resolveHref(item.href, anchorBasePath)}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="font-semibold text-neutral-700 transition hover:text-brand-primary"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
