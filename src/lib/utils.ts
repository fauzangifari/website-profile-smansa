export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Normalize media URLs coming from the API.
 *
 * The SIMS CDN sometimes returns URLs with a duplicated slash after the host
 * (e.g. `https://cdn.../​/core/...`). Object storage treats the empty path
 * segment as invalid and responds 403 Forbidden, so `next/image` renders
 * nothing. This collapses any run of 2+ slashes in the path back to one while
 * preserving the `://` in the protocol. Returns `null` for empty/nullish input
 * so callers can conditionally render (never pass "" to `next/image`).
 */
export function normalizeMediaUrl(
  url: string | null | undefined,
): string | null {
  if (!url) return null;
  return url.replace(/([^:])\/{2,}/g, "$1/");
}

/**
 * Loloskan hanya skema URL yang aman untuk dipakai di `href`.
 *
 * URL yang berasal dari CMS atau dari output LLM (chatbot) tidak boleh langsung
 * masuk ke `href`: `javascript:`/`data:`/`vbscript:` bisa mengeksekusi skrip
 * saat diklik. Fungsi ini meloloskan path relatif (`/...`, `#...`, `?...`),
 * serta skema `http`/`https`/`mailto`/`tel`; selain itu mengembalikan `fallback`
 * (default `undefined`) sehingga tautan menjadi tidak berbahaya.
 */
const SAFE_URL_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

export function safeHref(
  url: string | null | undefined,
  fallback?: string,
): string | undefined {
  if (!url) return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;
  // Path relatif / anchor / query — selalu aman (tidak punya skema).
  if (/^[/#?]/.test(trimmed)) return trimmed;
  try {
    // `base` menangani URL relatif tanpa skema tanpa melempar.
    const parsed = new URL(trimmed, "https://example.invalid");
    // URL relatif akan mewarisi skema base (https) — sudah tertangani di atas;
    // di sini kita hanya percaya skema absolut yang ada di allowlist.
    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !SAFE_URL_SCHEMES.has(parsed.protocol)) {
      return fallback;
    }
    return trimmed;
  } catch {
    return fallback;
  }
}
