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
