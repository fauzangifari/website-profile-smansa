// Kelas styling untuk HTML dari CMS (SIMS) yang di-render lewat
// `dangerouslySetInnerHTML` — tanpa plugin typography, memakai descendant
// variant Tailwind v4. Dipakai bersama oleh detail Berita & Ekskul agar
// konsisten dan tidak "drift".
//
// FOKUS RESPONSIF MOBILE: isi CMS bisa memuat elemen yang lebih lebar dari
// layar HP (tabel, gambar ber-atribut width, blok kode, URL/kata panjang).
// Karena `<main>` memakai `overflow-hidden`, luapan horizontal akan terpotong
// dan sebagian teks jadi hilang. Kelas ini menjaga SEMUA elemen tetap di dalam
// lebar container: teks/tautan di-wrap, gambar dikecilkan (`max-w-full`), tabel
// & blok kode di-scroll di dalam kotaknya sendiri (`max-w-full overflow-x-auto`).
export const cmsProseClass =
  "max-w-none text-base leading-7 text-neutral-700 break-words [overflow-wrap:anywhere] md:leading-8 " +
  "[&_p]:mb-5 [&_p:last-child]:mb-0 " +
  "[&_strong]:font-semibold [&_strong]:text-neutral-900 " +
  "[&_em]:italic " +
  "[&_a]:font-medium [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:break-words hover:[&_a]:text-brand-primary-hover " +
  "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-neutral-900 md:[&_h2]:text-2xl " +
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 " +
  "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 " +
  "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 " +
  "[&_li]:leading-7 [&_li]:marker:text-brand-primary " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600 " +
  // Gambar: responsif penuh — jangan pernah melebihi lebar container (jaga bila
  // CMS mengirim <img width="..."> besar).
  "[&_img]:my-6 [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-lg [&_img]:border [&_img]:border-white/50 " +
  "[&_figure]:my-6 [&_figure]:max-w-full [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-neutral-500 " +
  // Tabel lebar: jadikan block yang bisa di-scroll horizontal di dalam kotaknya
  // sendiri (tidak mendorong lebar halaman) + garis/padding sel agar terbaca.
  "[&_table]:my-6 [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-sm " +
  "[&_th]:border [&_th]:border-neutral-200 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-neutral-900 " +
  "[&_td]:border [&_td]:border-neutral-200 [&_td]:px-3 [&_td]:py-2 " +
  "[&_caption]:mb-2 [&_caption]:text-xs [&_caption]:text-neutral-500 " +
  // Blok kode: scroll horizontal di dalam kotaknya (tidak wrap paksa, tidak
  // mendorong lebar halaman). Inline code: latar lembut + boleh wrap.
  "[&_pre]:my-6 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-neutral-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-neutral-100 " +
  "[&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:break-words " +
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit " +
  "[&_hr]:my-8 [&_hr]:border-neutral-200";
