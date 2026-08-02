// middleware.js
import { NextResponse } from 'next/server'; // atau Menggunakan Vercel Edge Runtime

export const config = {
  matcher: ['/service', '/services'],
};

export default function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Deteksi apakah yang mengakses adalah Bot Crawler Sosial Media
  const isBot = /WhatsApp|Discordbot|twitterbot|facebookexternalhit/i.test(userAgent);

  if (isBot) {
    // Kirim HTML khusus OG Tag Service ke Bot
    return new Response(
      `<!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Jasa Pembuatan Website | M.K Fahmi</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jasa Pembuatan Website & Developer | M.K Fahmi" />
        <meta property="og:description" content="Buat website impian Anda sekarang! Layanan pembuatan web interaktif, responsif, dan performa tinggi." />
        <meta property="og:image" content="https://mifahmi.my.id/service.png" />
        <meta property="og:url" content="https://mifahmi.my.id/service" />
        <meta name="theme-color" content="#0055FF" />
      </head>
      <body></body>
      </html>`,
      {
        headers: { 'content-type': 'text/html' },
      }
    );
  }

  return NextResponse.next();
}
