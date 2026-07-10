"use client"; // Error boundary harus Client Component.

import { useEffect } from "react";

// global-error menggantikan root layout saat aktif, jadi ia wajib merender
// <html> dan <body> sendiri dan tidak boleh bergantung pada font/style layout.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          color: "#171717",
          padding: "1.5rem",
        }}
      >
        <main style={{ maxWidth: "32rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Terjadi Kesalahan
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#525252",
              marginBottom: "2rem",
            }}
          >
            Maaf, terjadi kesalahan tak terduga. Silakan coba lagi beberapa saat.
          </p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "3rem",
              padding: "0 2rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#ffffff",
              backgroundColor: "#1e40af",
            }}
          >
            Coba Lagi
          </button>
        </main>
      </body>
    </html>
  );
}
