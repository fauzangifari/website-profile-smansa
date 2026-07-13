import "server-only";

import sanitizeHtml from "sanitize-html";

/**
 * Bersihkan HTML mentah dari CMS (SIMS) sebelum di-render lewat
 * `dangerouslySetInnerHTML`. Meski CMS bersifat first-party, kita TIDAK
 * mempercayai isinya secara buta: bila akun editor disusupi atau CMS pernah
 * menyimpan HTML kiriman pihak lain, `<script>`, atribut `on*`, `javascript:`,
 * dsb. akan mengeksekusi skrip di browser pengunjung (stored XSS) pada domain
 * sekolah. Fungsi ini menyaring dengan allowlist tag/atribut/skema yang ketat.
 *
 * Dipakai di sisi server (titik ambil data), jadi HTML yang sampai ke komponen
 * sudah aman. `import "server-only"` mencegah util ini ikut ter-bundle ke klien.
 */

// Tag yang memang dipakai/di-style oleh artikel CMS (lihat proseClass di
// berita-detail / ekskul-detail) + tag format umum yang aman.
const ALLOWED_TAGS = [
  "p", "br", "hr", "span", "div",
  "strong", "b", "em", "i", "u", "s", "mark", "small", "sub", "sup",
  "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
];

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    // Izinkan atribut umum non-eksekusi pada elemen apa pun.
    "*": ["title"],
  },
  // Hanya skema tautan yang aman. `javascript:`, `data:` (kecuali gambar di
  // bawah), `vbscript:` otomatis ditolak karena tidak ada di daftar ini.
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: {
    // Gambar boleh http/https saja (blokir `data:`/`javascript:`).
    img: ["http", "https"],
  },
  // Buang atribut `on*` (onerror, onclick, ...) — sanitize-html hanya
  // meloloskan atribut yang ada di allowedAttributes, jadi ini sudah tertutup,
  // tetapi kita eksplisit membuang seluruh isi tag berbahaya (bukan hanya
  // tag-nya) agar teks skrip tidak ikut tampil.
  disallowedTagsMode: "discard",
  nonTextTags: ["style", "script", "textarea", "option", "noscript"],
  // Paksa semua tautan keluar aman.
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href ?? "";
      const isInternal = href.startsWith("/") || href.startsWith("#");
      return {
        tagName: "a",
        attribs: {
          ...attribs,
          ...(isInternal
            ? {}
            : { target: "_blank", rel: "noopener noreferrer nofollow" }),
        },
      };
    },
  },
};

/** Sanitasi satu blok HTML CMS. Aman dipanggil dengan string kosong/nullish. */
export function sanitizeCmsHtml(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}
