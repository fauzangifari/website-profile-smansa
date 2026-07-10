import type { Metadata } from "next";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { TermsOfServiceView } from "@/features/terms-of-service/components/terms-of-service-view";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  alternates: { canonical: "/terms-of-service" },
  description:
    "Syarat & Ketentuan SMA Negeri 1 Samarinda — mencakup aplikasi SIMSDIG dan website profil sekolah: aturan penggunaan, hak dan kewajiban pengguna, hak kekayaan intelektual, batasan tanggung jawab, serta penghentian akun. Tersedia dalam Bahasa Indonesia dan English.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <TermsOfServiceView />
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
