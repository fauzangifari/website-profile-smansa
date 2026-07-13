import { siteConfig } from "@/config/site";

/**
 * Merender structured data (JSON-LD) sebagai <script type="application/ld+json">.
 * Aman dipakai di Server Component. Objek `data` mengikuti skema schema.org.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/**
 * Serialize objek JSON-LD untuk disematkan di dalam `<script>`.
 *
 * PENTING: `JSON.stringify` TIDAK meng-escape `<` maupun `/`, sehingga nilai
 * dari CMS yang berisi `</script>` bisa menutup blok skrip lebih awal dan
 * membuka jalur XSS. Kita escape `<`, `>`, `&`, serta pemisah baris U+2028/
 * U+2029 (valid di JSON tapi ilegal di literal JS) menjadi escape `\uXXXX`.
 */
function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(
    /[<>&\u2028\u2029]/g,
    (ch) => "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0"),
  );
}

const abs = (path: string) =>
  path.startsWith("http") ? path : `${siteConfig.url}${path}`;

/** Schema organisasi sekolah — dipasang di homepage. */
export function organizationSchema(): Record<string, unknown> {
  const org = siteConfig.organization;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: abs(org.logo),
    image: abs(org.logo),
    description: siteConfig.description,
    email: org.email,
    telephone: org.phone,
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: org.address.street,
      addressLocality: org.address.locality,
      addressRegion: org.address.region,
      postalCode: org.address.postalCode,
      addressCountry: org.address.country,
    },
  };
}

/** Schema WebSite — memungkinkan sitelinks searchbox di masa depan. */
export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "id-ID",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** Schema artikel berita — dipasang di halaman detail berita. */
export function newsArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    ...(article.image ? { image: [abs(article.image)] } : {}),
    ...(article.publishedAt
      ? { datePublished: article.publishedAt, dateModified: article.publishedAt }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/posts/${article.slug}`,
    },
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: abs(siteConfig.organization.logo),
      },
    },
  };
}

/** Schema breadcrumb — dipasang di halaman yang memakai breadcrumb. */
export function breadcrumbSchema(
  items: Array<{ label: string; href?: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: abs(item.href) } : {}),
    })),
  };
}
