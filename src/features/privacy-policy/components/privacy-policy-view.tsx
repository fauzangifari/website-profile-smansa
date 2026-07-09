"use client";

import { useState } from "react";
import { PageTemplate } from "@/components/layout/page-template";
import { PrivacyPolicyContent } from "./privacy-policy-content";
import { policyUi, type Locale } from "../data/privacy-policy-data";

/**
 * Client wrapper untuk halaman Kebijakan Privasi.
 *
 * Menyimpan state bahasa (id/en) di satu tempat lalu menyalurkannya ke hero
 * PageTemplate (judul, deskripsi, breadcrumb) dan ke isi kebijakan sekaligus,
 * sehingga toggle bahasa mengganti seluruh tampilan halaman secara konsisten.
 */
export function PrivacyPolicyView() {
  const [locale, setLocale] = useState<Locale>("id");
  const ui = policyUi[locale];

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
      <PrivacyPolicyContent locale={locale} onLocaleChange={setLocale} />
    </PageTemplate>
  );
}
