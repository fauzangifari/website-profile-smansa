"use client";

import { useState } from "react";
import { PageTemplate } from "@/components/layout/page-template";
import { TermsOfServiceContent } from "./terms-of-service-content";
import { termsUi, type Locale } from "../data/terms-of-service-data";

/**
 * Client wrapper untuk halaman Syarat & Ketentuan.
 *
 * Menyimpan state bahasa (id/en) di satu tempat lalu menyalurkannya ke hero
 * PageTemplate (judul, deskripsi, breadcrumb) dan ke isi ketentuan sekaligus,
 * sehingga toggle bahasa mengganti seluruh tampilan halaman secara konsisten.
 */
export function TermsOfServiceView() {
  const [locale, setLocale] = useState<Locale>("id");
  const ui = termsUi[locale];

  return (
    <PageTemplate
      variant="glass"
      eyebrow={ui.eyebrow}
      title={ui.pageTitle}
      description={ui.pageDescription}
      breadcrumbs={[
        { label: ui.breadcrumbHome, href: "/" },
        { label: ui.breadcrumbCurrent },
      ]}
    >
      <TermsOfServiceContent locale={locale} onLocaleChange={setLocale} />
    </PageTemplate>
  );
}
