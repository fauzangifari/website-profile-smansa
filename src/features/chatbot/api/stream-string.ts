import "server-only";

// Bungkus sebuah string "jadi" (jawaban FAQ, cache, atau pesan degradasi) menjadi
// Response streaming text/plain yang IDENTIK bentuknya dengan jalur Gemini. Dengan
// begitu client (`chat-widget.tsx`) tidak perlu membedakan sumber jawaban — semua
// jalur sukses mengalir lewat satu kontrak: HTTP 200 + text/plain stream.

const STREAM_HEADERS: Record<string, string> = {
  "Content-Type": "text/plain; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Accel-Buffering": "no", // cegah buffering Nginx agar stream mengalir
  "Cache-Control": "no-store",
};

export function streamString(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });

  return new Response(stream, { headers: STREAM_HEADERS });
}
