export const projectsData = [
  {
    id: "zephyr",
    title: "ZEPHYR BOT INFRASTRUCTURE",
    date: "2025-06-15",
    descShort: "Sistem moderasi dan utilitas skala besar untuk Discord. Dikembangkan dengan arsitektur Node.js pada backend, dan antarmuka Dashboard Website murni dibangun dengan bahasa Vanilla JS, HTML, dan CSS.",
    descLong: "Zephyr Bot Infrastructure adalah sebuah sistem automasi tingkat tinggi yang dirancang khusus untuk menangani ribuan anggota di server Discord secara bersamaan. Menggunakan Node.js sebagai basis mesin utama yang sangat optimal untuk operasi input/output asinkron. Bagian dashboard administrasi web dibuat tanpa framework (Vanilla JS) demi memastikan kecepatan pemuatan halaman yang maksimal dan konsumsi memori sekecil mungkin di sisi klien, sangat ramah untuk perangkat seluler berispesifikasi rendah.",
    url: "https://zephyr.mifahmi.my.id",
    tags: [
      { name: "Node.js", color: "bg-[#FFD700] text-black" }, 
      { name: "Vanilla JS", color: "bg-[#0055FF] text-white" },
      { name: "HTML/CSS", color: "bg-[#FF007F] text-white" }
    ]
  },
  {
    id: "ai-character",
    title: "AI CHARACTER ENGINE",
    date: "2025-09-22",
    descShort: "Integrasi bahasa alami (LLM) untuk menciptakan persona karakter digital yang mampu berinteraksi secara real-time dan dinamis.",
    descLong: "Proyek ini menggabungkan kecerdasan buatan berbasis Large Language Model (LLM) untuk menciptakan asisten atau bot interaktif dengan kepribadian unik yang konsisten. Menggunakan teknik prompt engineering tingkat lanjut, sistem ini mampu mempertahankan memori jangka pendek percakapan dan merespons perintah pengguna secara natural di berbagai platform komunikasi.",
    url: "https://zephyr.mifahmi.my.id/ai/character",
    tags: [
      { name: "AI Integration", color: "bg-[#FF007F] text-white" }, 
      { name: "Prompt Eng.", color: "bg-black text-white" }
    ]
  },
  {
    id: "freedom-minecraft",
    title: "FREEDOM MINECRAFT CLAN PORTAL",
    date: "2026-02-10",
    descShort: "Website resmi dan pusat manajemen untuk clan Minecraft di dalam server Minecraft Freedom. Arsitektur sistem dibangun menggunakan Next.js dengan integrasi database MongoDB.",
    descLong: "Sebuah platform web manajemen klan Minecraft yang sangat interaktif. Proyek ini mengintegrasikan skinview3d untuk menampilkan model karakter 3 dimensi pemain secara langsung di penjelajah web. Data klan, poin kontribusi, aliansi, dan status terenkripsi disimpan secara dinamis menggunakan kluster database NoSQL MongoDB, sementara perutean performa tinggi ditangani penuh oleh Next.js.",
    url: "https://clans.scarily.my.id/freedom",
    tags: [
      { name: "Next.js", color: "bg-black text-white" },
      { name: "MongoDB", color: "bg-[#FFD700] text-black" },
      { name: "3D Viewer", color: "bg-[#FF007F] text-white" }
    ]
  },
  {
    id: "termux-automation",
    title: "TERMUX AUTOMATION CORE",
    date: "2024-11-05",
    descShort: "Kumpulan skrip otomatisasi sistem berbasis Termux CLI untuk mengelola cron jobs, pencadangan server, dan pemantauan bot.",
    descLong: "Arsitektur utilitas lokal yang ditulis menggunakan Bash dan Node.js khusus untuk dijalankan di lingkungan Termux Android. Berfungsi untuk melakukan pengawasan otomatis terhadap waktu aktif (uptime) bot Discord, membersihkan cache penyimpanan server berkala, dan mengirimkan laporan log langsung ke saluran admin melalui webhooks.",
    url: "https://github.com/MohFahmiMc",
    tags: [
      { name: "Termux", color: "bg-black text-white" },
      { name: "Bash", color: "bg-[#0055FF] text-white" }
    ]
  },
  {
    id: "brutalist-v1",
    title: "BRUTALIST PORTFOLIO V1",
    date: "2026-01-01",
    descShort: "Desain portofolio web bertema neo-brutalisme dengan tata letak asimetris, garis pembatas tebal, warna kontras tinggi, dan animasi interaktif.",
    descLong: "Eksperimen pengembangan antarmuka intensif menggunakan React dan Framer Motion. Mengadopsi prinsip desain neo-brutalisme yang mendobrak aturan standar antarmuka modern dengan menyajikan bayangan solid tanpa tingkat kekaburan (blur), komponen ruang uji coba interaktif yang bisa digabungkan, dan tipografi berukuran besar.",
    url: "https://mifahmi.my.id",
    tags: [
      { name: "React", color: "bg-[#0055FF] text-white" },
      { name: "Framer Motion", color: "bg-[#FF007F] text-white" }
    ]
  }
];
