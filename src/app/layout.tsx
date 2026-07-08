import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { siteConfig } from "@/config/site";

const plusJakarta = localFont({
  src: [
    { path: "./fonts/plus-jakarta-sans-latin.woff2" },
    { path: "./fonts/plus-jakarta-sans-latin-ext.woff2" },
  ],
  variable: "--font-plus-jakarta",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.shortName}`,
    description:
      "Profil resmi SMA Negeri 1 Samarinda dengan tampilan modern, informatif, dan responsif.",
    siteName: "SMANSA",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
