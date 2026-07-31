import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Server, Globe, Database, Zap, CheckCircle2, Mail, 
  ArrowRight, ShieldCheck, Layers, Cpu, Star, Instagram, 
  MessageSquare, ExternalLink, Home, HelpCircle, Check, 
  Sparkles, Smartphone, Terminal, DollarSign, Clock, Layout
} from 'lucide-react';

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.11V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.02z"/>
  </svg>
);

export default function ServicesView({ navigate }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const pricingPlans = [
    {
      id: "starter",
      name: "Paket Starter",
      price: "50K",
      period: "sekali bayar",
      tag: "Paling Hemat",
      tagColor: "bg-[#FFD700] text-black",
      badgeIcon: <Zap size={16} />,
      desc: "Solusi cepat dan hemat untuk landing page, portofolio pribadi, atau situs promosi acara.",
      features: [
        "Teknologi: HTML, CSS, JavaScript Vanilla",
        "Tampilan 100% Responsif (Mobile & Desktop)",
        "Desain Interaktif / Neobrutalism Modern",
        "Dukungan Custom Domain milik Anda",
        "Free Hosting Deployment (Vercel / Netlify)",
        "Fitur Custom Ringan Sesuai Permintaan"
      ],
      recommendedFor: "Portofolio, Undangan Digital, Landing Page Sederhana",
      ctaColor: "bg-white text-black hover:bg-[#FFD700]"
    },
    {
      id: "pro",
      name: "Paket Pro Dynamic",
      price: "100K",
      period: "sekali bayar",
      tag: "Paling Populer",
      tagColor: "bg-[#FF007F] text-white",
      badgeIcon: <Sparkles size={16} />,
      popular: true,
      desc: "Pilihan terbaik untuk website dinamis dengan integrasi database cepat dan performa tinggi.",
      features: [
        "Teknologi: React JS / Next.js",
        "Termasuk Integrasi Database (MongoDB)",
        "Sistem CRUD / Manajemen Data Dinamis",
        "UI/UX Interaktif dengan Animasi Smooth",
        "Responsif Mobile-First & Performa Cepat",
        "Free Hosting Setup & Konfigurasi DNS Domain",
        "Fitur Custom Sesuai Permintaan"
      ],
      recommendedFor: "Dashboard, Web App Sederhana, Blog Dinamis, Project Sekolah/Kuliah",
      ctaColor: "bg-[#FF007F] text-white hover:bg-black"
    },
    {
      id: "ultimate",
      name: "Paket Ultimate Fullstack",
      price: "300K",
      period: "sekali bayar",
      tag: "Komplit & Spesial",
      tagColor: "bg-[#0055FF] text-white",
      badgeIcon: <Cpu size={16} />,
      desc: "Solusi fullstack profesional tanpa batas fitur untuk kebutuhan sistem kompleks dan bisnis.",
      features: [
        "Teknologi: Next.js / React + Node.js Backend",
        "Database MongoDB / PostgreSQL Kompleks",
        "Sistem Otentikasi & Role Pengguna (Login/Register)",
        "Desain Custom Eksklusif + Full Animasi Interaktif",
        "Integrasi API Pihak Ketiga (Discord/Payment/dll)",
        "Optimasi SEO Maksimal & Loading Super Cepat",
        "Prioritas Support & Free Maintenance Awal"
      ],
      recommendedFor: "E-Commerce, Discord Bot Web Panel, Sistem Manajemen Informasi, Full Web App",
      ctaColor: "bg-[#0055FF] text-white hover:bg-black"
    }
  ];

  const domainEstimates = [
    { name: ".my.id", price: "± Rp 15.000 / thn", popular: true, desc: "Identitas Indonesia, Murah & Cepat Diproses" },
    { name: ".com", price: "± Rp 160.000 / thn", popular: false, desc: "Standar Global, Profesional & Terpercaya" },
    { name: ".xyz", price: "± Rp 30.000 / thn", popular: false, desc: "Unik, Modern & Cocok Untuk Web Dev/Teknologi" },
    { name: ".site / .tech", price: "± Rp 25.000 / thn", popular: false, desc: "Alternatif Developer & Project Khusus" }
  ];

  const testimonials = [
    {
      name: "Rian Developer",
      role: "Pengguna Discord Bot",
      text: "Pesan website paket 100k dapet Next.js + MongoDB. Tampilannya keren brutalist, proses cepat dan dibantu hubungin domain .my.id milik saya!",
      rating: 5,
      avatarBg: "bg-[#FFD700]"
    },
    {
      name: "Aditya K.",
      role: "Pelajar / Portofolio",
      text: "Cuma 50k tapi dapet landing page portofolio yang responsif banget dan keren di HP. Recomended banget buat yang budget terjangkau!",
      rating: 5,
      avatarBg: "bg-[#FF007F]"
    },
    {
      name: "Bagas Pratama",
      role: "Pemilik Komunitas",
      text: "Sewa jasa paket 300k buat bikin dashboard Discord bot terintegrasi database. Hasilnya rapi, full animasi, dan diajari cara pakainya.",
      rating: 5,
      avatarBg: "bg-[#0055FF]"
    }
  ];

  const faqs = [
    {
      q: "Apakah saya perlu membeli domain sendiri?",
      a: "Ya, Anda bisa membeli nama domain pilihan Anda di registrar seperti Niagahoster, Domainesia, Namecheap, dll. Saya tidak menjual domain langsung, namun saya akan membantu proses penyambungan DNS ke website secara GRATIS!"
    },
    {
      q: "Berapa lama proses pembuatan websitenya?",
      a: "Waktu pengerjaan berkisar antara 1 hingga 3 hari tergantung pada kompleksitas fitur dan antrean project yang sedang berjalan."
    },
    {
      q: "Apakah saya bisa meminta fitur kustom sesuai keinginan?",
      a: "Tentu saja! Semua paket mendukung kustomisasi. Anda cukup menjelaskan konsep atau memberikan rujukan website yang Anda sukai."
    },
    {
      q: "Bagaimana cara melakukan pemesanan?",
      a: "Anda cukup klik tombol order atau kirim pesan langsung via Discord DM, Instagram, atau Email yang tertera di bagian bawah halaman ini."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:32px_32px] text-black">
      
      {/* Top Bar Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 max-w-6xl mx-auto">
        <div className="brutal-box bg-white px-5 py-3 flex items-center justify-between rounded-full shadow-[4px_4px_0_0_#111111]">
          <button 
            onClick={() => navigate ? navigate('/') : window.location.href = '/'}
            className="flex items-center gap-2 font-black text-xs md:text-sm uppercase tracking-wider hover:text-[#0055FF] transition-colors"
          >
            <Home size={18} />
            <span>Kembali ke Beranda</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF007F] border border-black animate-pulse"></span>
            <span className="font-black text-[10px] md:text-xs uppercase tracking-widest bg-[#FFD700] px-3 py-1 border border-black">
              Layanan Web
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pt-28 md:pt-36 pb-20">

        {/* Hero Section */}
        <section className="mb-16 md:mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700] border-4 border-black font-black text-xs md:text-sm uppercase tracking-widest mb-6 shadow-[4px_4px_0_0_#111111]"
          >
            <Sparkles size={18} />
            <span>Jasa Pembuatan Website Profesional & Terjangkau</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none"
          >
            Wujudkan Website <br/>
            <span className="text-[#0055FF] underline decoration-4 md:decoration-8 decoration-[#FF007F]">Impian Anda</span> Tanpa Mahal.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-lg font-bold max-w-2xl mx-auto opacity-90 leading-relaxed mb-8"
          >
            Dapatkan website interaktif, modern, dan responsif menggunakan teknologi mutakhir seperti HTML/CSS/JS Vanilla, React JS, atau Next.js dengan dukungan database MongoDB dan hosting gratis!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 font-black text-xs uppercase"
          >
            <span className="px-3 py-1 bg-[#0055FF] text-white border-2 border-black">HTML & CSS</span>
            <span className="px-3 py-1 bg-[#FFD700] text-black border-2 border-black">JavaScript Vanilla</span>
            <span className="px-3 py-1 bg-black text-white border-2 border-black">React JS</span>
            <span className="px-3 py-1 bg-[#FF007F] text-white border-2 border-black">Next.js</span>
            <span className="px-3 py-1 bg-emerald-400 text-black border-2 border-black">MongoDB</span>
          </motion.div>
        </section>

        {/* Pricing Cards Section */}
        <section id="pricing" className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Pilih Paket Layanan</h2>
            <p className="font-bold text-sm md:text-base opacity-80">Harga bersahabat dengan kualitas arsitektur modern & siap pakai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`brutal-box p-6 md:p-8 flex flex-col justify-between bg-white relative ${
                  plan.popular ? 'border-4 border-black shadow-[8px_8px_0_0_#FF007F]' : 'shadow-[6px_6px_0_0_#111111]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FF007F] text-white font-black text-xs uppercase tracking-widest px-4 py-1.5 border-2 border-black shadow-[2px_2px_0_0_#111111] flex items-center gap-1">
                    <Sparkles size={14} /> REKOMENDASI UTAMA
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 border-2 border-black font-black text-[10px] uppercase tracking-wider flex items-center gap-1 ${plan.tagColor}`}>
                      {plan.badgeIcon} {plan.tag}
                    </span>
                    <span className="text-xs font-black opacity-60 uppercase">{plan.period}</span>
                  </div>

                  <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                  <p className="text-xs font-bold opacity-80 min-h-[36px] mb-6">{plan.desc}</p>

                  <div className="mb-6 p-4 bg-[#f4f4f0] border-2 border-black">
                    <span className="text-xs font-black uppercase block text-gray-500">Mulai Dari</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-black tracking-tight text-black">{plan.price}</span>
                      <span className="text-xs font-black uppercase text-gray-600">Rupiah</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-black uppercase block border-b-2 border-black pb-1">Fitur Yang Didapat:</span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs font-bold">
                        <CheckCircle2 size={16} className="text-[#0055FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-6 p-3 bg-yellow-50 border-2 border-black text-[11px] font-bold">
                    <span className="font-black text-black block mb-0.5">Cocok Untuk:</span>
                    <span className="text-gray-700">{plan.recommendedFor}</span>
                  </div>

                  <a 
                    href="https://discord.com/users/1099980838722088991" 
                    target="_blank" 
                    rel="noreferrer"
                    className={`w-full py-3 md:py-4 border-2 border-black font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#111111] transition-all active:translate-x-1 active:translate-y-1 ${plan.ctaColor}`}
                  >
                    <span>Pesan Paket Ini</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section Domain Reference */}
        <section className="mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brutal-box p-8 md:p-12 bg-[#FFD700] text-black shadow-[8px_8px_0_0_#111111]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-black text-xs uppercase tracking-wider mb-2">
                  <Globe size={14} /> Informasi Kustom Domain
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Estimasi Harga Domain</h2>
              </div>
              <div className="p-4 bg-white border-2 border-black text-xs font-bold max-w-md">
                <p className="font-black mb-1 flex items-center gap-1">
                  <HelpCircle size={14} className="text-[#0055FF]" /> Saya Tidak Menjual Domain Langsung
                </p>
                <p className="text-gray-700 text-[11px] leading-snug">
                  Anda bebas membeli domain di penyedia pihak ketiga (Niagahoster, Domainesia, Namecheap, dll). Saya akan membantu menghubungkan & mengonfigurasi DNS ke website Anda secara <b>GRATIS!</b>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {domainEstimates.map((dom, dIdx) => (
                <div key={dIdx} className="brutal-box p-5 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-xl text-black">{dom.name}</span>
                      {dom.popular && (
                        <span className="text-[9px] font-black bg-[#FF007F] text-white px-2 py-0.5 border border-black uppercase">Termurah</span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-gray-600 mb-4">{dom.desc}</p>
                  </div>
                  <div className="p-2 bg-[#f4f4f0] border border-black font-black text-xs text-center">
                    {dom.price}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section Capabilities / Mengapa Memilih */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Fitur & Keunggulan</h2>
            <p className="font-bold text-sm md:text-base opacity-80">Jaminan mutu terbaik dengan pengerjaan transparan & fleksibel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="brutal-box p-6 bg-white shadow-[6px_6px_0_0_#111111]"
            >
              <div className="w-12 h-12 brutal-box bg-[#0055FF] text-white flex items-center justify-center mb-4">
                <Smartphone size={24} />
              </div>
              <h3 className="font-black text-xl uppercase mb-2">100% Responsif Mobile</h3>
              <p className="text-xs font-bold text-gray-700 leading-relaxed">
                Tampilan otomatis menyesuaikan dengan sempurna di layar Smartphone, Tablet, Monitor Laptop, maupun Desktop.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="brutal-box p-6 bg-white shadow-[6px_6px_0_0_#111111]"
            >
              <div className="w-12 h-12 brutal-box bg-[#FF007F] text-white flex items-center justify-center mb-4">
                <Database size={24} />
              </div>
              <h3 className="font-black text-xl uppercase mb-2">Database MongoDB</h3>
              <p className="text-xs font-bold text-gray-700 leading-relaxed">
                Khusus paket 100k dan 300k sudah dilengkapi integrasi basis data MongoDB untuk menyimpan data secara dinamis dan aman.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="brutal-box p-6 bg-white shadow-[6px_6px_0_0_#111111]"
            >
              <div className="w-12 h-12 brutal-box bg-[#FFD700] text-black flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="font-black text-xl uppercase mb-2">Free Instant Hosting</h3>
              <p className="text-xs font-bold text-gray-700 leading-relaxed">
                Website Anda langsung di-deploy secara publik menggunakan platform server modern seperti Vercel atau Netlify.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Testimoni Klien</h2>
            <p className="font-bold text-sm md:text-base opacity-80">Apa kata mereka yang telah menggunakan jasa pembuatan website ini.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, tIdx) => (
              <motion.div 
                key={tIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: tIdx * 0.1 }}
                className="brutal-box p-6 bg-white flex flex-col justify-between shadow-[6px_6px_0_0_#111111]"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-[#FFD700] text-black" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-gray-800 leading-relaxed mb-6 italic">
                    "{testi.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t-2 border-black">
                  <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black text-sm uppercase ${testi.avatarBg}`}>
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black">{testi.name}</h4>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{testi.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Pertanyaan Umum (FAQ)</h2>
            <p className="font-bold text-sm md:text-base opacity-80">Jawaban cepat untuk hal-hal yang sering ditanyakan.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="brutal-box bg-white overflow-hidden shadow-[4px_4px_0_0_#111111]">
                <button 
                  onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                  className="w-full p-5 text-left font-black text-sm md:text-base uppercase flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={18} className="text-[#0055FF] shrink-0" />
                    {faq.q}
                  </span>
                  <span className="font-black text-lg">{activeFaq === fIdx ? '-' : '+'}</span>
                </button>
                <AnimatePresence>
                  {activeFaq === fIdx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 pt-1 text-xs md:text-sm font-bold text-gray-700 border-t-2 border-black bg-yellow-50/50 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Contact Section */}
        <section id="contact-order" className="pt-12 border-t-8 border-black text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="brutal-box p-8 md:p-14 bg-white shadow-[10px_10px_0_0_#111111]"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-black">
              Siap Buat Website <br className="hidden md:block"/>
              <span className="text-[#FF007F]">Sekarang Juga?</span>
            </h2>
            <p className="font-bold text-sm md:text-base max-w-xl mx-auto text-gray-700 mb-8">
              Hubungi saya secara langsung untuk berkonsultasi mengenai ide project, pilihan paket, atau custom fitur yang Anda inginkan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <a 
                href="https://discord.com/users/1099980838722088991" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-4 brutal-box bg-[#5865F2] text-white font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors"
              >
                <DiscordIcon />
                <span>DM Discord</span>
              </a>

              <a 
                href="mailto:contact@mifahmi.my.id"
                className="px-6 py-4 brutal-box bg-[#0055FF] text-white font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors"
              >
                <Mail size={18} />
                <span>Kirim Email</span>
              </a>

              <a 
                href="https://instagram.com/mizephyr" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-4 brutal-box bg-[#E1306C] text-white font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors"
              >
                <Instagram size={18} />
                <span>Instagram DM</span>
              </a>

              <a 
                href="https://tiktok.com/@mizephyrz" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-4 brutal-box bg-black text-white font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-[#FF007F] transition-colors"
              >
                <TiktokIcon />
                <span>TikTok</span>
              </a>
            </div>

            <div className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-black uppercase text-gray-600">
              <p>Portal Utama Order: <a href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer" className="text-[#0055FF] underline">jasa.mifahmi.my.id</a></p>
              <p>© 2026 M.K FAHMI • WEB DEVELOPMENT SERVICES</p>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
