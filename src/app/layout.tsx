import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { BackToTopButton } from "@/components/site/back-to-top-button";
import { ChatWidget } from "@/features/chatbot/components/chat-widget";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.shortName}`,
    description:
      "Profil resmi SMA Negeri 1 Samarinda dengan tampilan modern, informatif, dan responsif.",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.shortName}`,
    description:
      "Profil resmi SMA Negeri 1 Samarinda dengan tampilan modern, informatif, dan responsif.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Token verifikasi diisi lewat env; jika kosong, Next tidak merender tag-nya.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
        <BackToTopButton />
        <ChatWidget />
      </body>
    </html>
  );
}
