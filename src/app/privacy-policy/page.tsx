import type { Metadata } from "next";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { PrivacyPolicyView } from "@/features/privacy-policy/components/privacy-policy-view";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  alternates: { canonical: "/privacy-policy" },
  description:
    "Kebijakan Privasi SMA Negeri 1 Samarinda — mencakup aplikasi SIMSDIG dan website profil sekolah: data yang dikumpulkan, cara penggunaan, keamanan, retensi, serta hak Anda sebagai subjek data. Tersedia dalam Bahasa Indonesia dan English.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PrivacyPolicyView />
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
