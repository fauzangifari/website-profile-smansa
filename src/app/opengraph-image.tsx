import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.shortName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public", "images", "brand", "logo.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #1e40af 55%, #2563eb 100%)",
          color: "#ffffff",
          padding: "80px",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 180,
            height: 180,
            borderRadius: 32,
            background: "#ffffff",
            marginBottom: 44,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={132} height={132} alt="" />
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            marginTop: 24,
            color: "#bfdbfe",
          }}
        >
          Unggul, Berkarakter, dan Berprestasi
        </div>
      </div>
    ),
    { ...size },
  );
}
