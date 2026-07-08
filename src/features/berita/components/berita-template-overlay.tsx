import Image from "next/image";

// Bingkai/template dekoratif yang ditumpuk di atas cover setiap post berita
// (analog dengan overlay /images/template/prestasi.png pada fitur prestasi).
export function BeritaTemplateOverlay({
  sizes,
  categorySlug,
}: {
  sizes?: string;
  categorySlug?: string;
}) {
  const src =
    categorySlug?.toLowerCase() === "pengumuman"
      ? "/images/template/pengumuman.png"
      : "/images/template/berita.png";
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      fill
      sizes={sizes}
      className="pointer-events-none z-10 object-cover"
    />
  );
}
