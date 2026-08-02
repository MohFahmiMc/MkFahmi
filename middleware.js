export const config = {
  matcher: ['/service', '/services'],
};

export default function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Deteksi bot WhatsApp, Discord, Telegram, Facebook, Twitter, dsb.
  const isBot = /WhatsApp|Discordbot|twitterbot|facebookexternalhit|TelegramBot|Googlebot/i.test(userAgent);

  if (isBot) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Jasa Pembuatan Website & Developer | M.K Fahmi</title>
        <meta name="description" content="Jasa pembuatan website profesional, cepat, dan terjangkau oleh M.K Fahmi. Bebas konsultasi, tampilan 100% responsif mobile." />

        <!-- Open Graph (WhatsApp, Discord, FB) -->
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="M.K Fahmi - Layanan Web Dev" />
        <meta property="og:title" content="Jasa Pembuatan Website & Developer | M.K Fahmi" />
        <meta property="og:description" content="Buat website impian Anda sekarang! Layanan pembuatan web interaktif, responsif, dan performa tinggi." />
        <meta property="og:url" content="https://mifahmi.my.id/services" />
        <meta property="og:image" content="https://mifahmi.my.id/service.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="theme-color" content="#0055FF" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jasa Pembuatan Website & Developer | M.K Fahmi" />
        <meta name="twitter:description" content="Buat website impian Anda sekarang! Layanan pembuatan web interaktif, responsif, dan performa tinggi." />
        <meta name="twitter:image" content="https://mifahmi.my.id/service.png" />
      </head>
      <body></body>
      </html>`,
      {
        headers: { 
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 's-maxage=0, max-age=0, must-revalidate'
        },
      }
    );
  }
}
