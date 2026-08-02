import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Server, Globe, Database, Zap, CheckCircle2, Mail, 
  ArrowRight, ShieldCheck, Layers, Cpu, Star, Instagram, 
  MessageSquare, ExternalLink, Home, HelpCircle, Check, 
  Sparkles, Smartphone, Terminal, DollarSign, Clock, Layout, Plus,
  PhoneCall
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

const WhatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

// Varian Animasi Khusus
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const floatingAnimation = {
  y: ["-5%", "5%"],
  transition: {
    y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
  }
};

export default function ServicesView({ navigate }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const WA_NUMBER = "6283896234669";

  const pricingPlans = [
    {
      id: "starter",
      name: "Paket Starter",
      price: "50K",
      period: "sekali bayar",
      tag: "Paling Hemat",
      tagColor: "bg-[#FFD700] text-black border-2 border-black",
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
      recommendedFor: "Portofolio, Undangan Digital, Landing Page",
      ctaColor: "bg-[#FFD700] text-black border-4 border-black hover:bg-black hover:text-white"
    },
    {
      id: "pro",
      name: "Paket Pro Dynamic",
      price: "100K",
      period: "sekali bayar",
      tag: "Paling Populer",
      tagColor: "bg-[#FF007F] text-white border-2 border-black",
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
      recommendedFor: "Dashboard, Web App, Blog Dinamis, Project Kuliah",
      ctaColor: "bg-[#FF007F] text-white border-4 border-black hover:bg-black"
    },
    {
      id: "ultimate",
      name: "Paket Ultimate Fullstack",
      price: "300K",
      period: "sekali bayar",
      tag: "Komplit & Spesial",
      tagColor: "bg-[#0055FF] text-white border-2 border-black",
      badgeIcon: <Cpu size={16} />,
      desc: "Solusi fullstack profesional tanpa batas fitur untuk kebutuhan sistem kompleks dan bisnis.",
      features: [
        "Teknologi: Next.js / React + Node.js Backend",
        "Database MongoDB / PostgreSQL Kompleks",
        "Sistem Otentikasi & Role Pengguna",
        "Desain Custom Eksklusif + Full Animasi",
        "Integrasi API Pihak Ketiga",
        "Optimasi SEO Maksimal & Loading Super Cepat",
        "Prioritas Support & Free Maintenance Awal"
      ],
      recommendedFor: "E-Commerce, Web Panel Panel, Sistem Informasi",
      ctaColor: "bg-[#0055FF] text-white border-4 border-black hover:bg-black"
    }
  ];

  const domainEstimates = [
    { name: ".my.id", price: "± Rp 15.000 / thn", popular: true, desc: "Identitas Indonesia, Murah & Cepat Diproses" },
    { name: ".com", price: "± Rp 160.000 / thn", popular: false, desc: "Standar Global, Profesional & Terpercaya" },
    { name: ".xyz", price: "± Rp 30.000 / thn", popular: false, desc: "Unik, Modern & Cocok Untuk Web Dev/Teknologi" },
    { name: ".site / .tech", price: "± Rp 25.000 / thn", popular: false, desc: "Alternatif Developer & Project Khusus" }
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
      a: "Anda cukup klik tombol order via WhatsApp (083896234669) atau kirim pesan langsung via Discord DM, Instagram, atau Email yang tertera di halaman ini."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:32px_32px] text-black selection:bg-[#FF007F] selection:text-white overflow-hidden">
      
      {/* Top Bar Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 max-w-6xl mx-auto"
      >
        <div className="bg-white border-2 sm:border-4 border-black px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between shadow-[4px_4px_0_0_#000000] md:shadow-[6px_6px_0_0_#000000]">
          <motion.button 
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate ? navigate('/') : window.location.href = '/'}
            className="flex items-center gap-1.5 sm:gap-2 font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wider text-black hover:text-[#0055FF] transition-colors"
          >
            <div className="p-1 bg-black text-white border-2 border-black">
              <Home size={14} className="sm:w-4 sm:h-4" />
            </div>
            <span>Kembali</span>
          </motion.button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF007F] border-2 border-black animate-pulse"></span>
            <span className="font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest bg-[#FFD700] px-2 sm:px-3 py-0.5 sm:py-1 border-2 border-black shadow-[2px_2px_0_0_#000]">
              Layanan Web
            </span>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 pt-24 sm:pt-32 md:pt-40 pb-16 md:pb-20">

        {/* Hero Section */}
        <section className="mb-14 sm:mb-20 md:mb-32 text-center relative">
          <motion.div 
            animate={floatingAnimation}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-[#FFD700] border-2 sm:border-4 border-black font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mb-6 sm:mb-8 shadow-[4px_4px_0_0_#000000] md:shadow-[6px_6px_0_0_#000000]"
          >
            <Sparkles size={15} className="text-black sm:w-[18px] sm:h-[18px]" />
            <span>Jasa Pembuatan Website Profesional & Terjangkau</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 sm:mb-8 leading-tight md:leading-none"
          >
            Wujudkan Web <br/>
            <span className="inline-block bg-[#0055FF] text-white px-2.5 sm:px-4 py-1 sm:py-2 mt-1 sm:mt-2 border-2 sm:border-4 border-black shadow-[4px_4px_0_0_#FF007F] md:shadow-[8px_8px_0_0_#FF007F] -rotate-2 hover:rotate-0 transition-transform cursor-default">
              Impian Anda
            </span> 
            <br className="md:hidden" /> Tanpa Mahal.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-xl font-bold max-w-3xl mx-auto text-gray-800 leading-relaxed mb-8 sm:mb-10 bg-white p-3 sm:p-4 border-2 sm:border-4 border-black shadow-[4px_4px_0_0_#FFD700] md:shadow-[6px_6px_0_0_#FFD700]"
          >
            Dapatkan website interaktif, modern, dan responsif menggunakan teknologi mutakhir seperti HTML/CSS/JS, React JS, atau Next.js dengan dukungan database dan hosting gratis!
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-black text-[10px] sm:text-xs md:text-sm uppercase"
          >
            {[
              { text: "HTML & CSS", color: "bg-[#0055FF] text-white" },
              { text: "JavaScript Vanilla", color: "bg-[#FFD700] text-black" },
              { text: "React JS", color: "bg-black text-white" },
              { text: "Next.js", color: "bg-[#FF007F] text-white" },
              { text: "MongoDB", color: "bg-emerald-400 text-black" }
            ].map((tech, i) => (
              <motion.span 
                key={i}
                variants={fadeUpVariant}
                whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? 3 : -3 }}
                className={`px-2.5 sm:px-4 py-1 sm:py-2 border-2 sm:border-4 border-black shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000] cursor-pointer ${tech.color}`}
              >
                {tech.text}
              </motion.span>
            ))}
          </motion.div>
        </section>

        {/* Pricing Cards Section */}
        <section id="pricing" className="mb-16 sm:mb-24 md:mb-32">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="inline-block text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2 sm:mb-4 border-b-4 sm:border-b-8 border-black pb-1 sm:pb-2">Pilih Paket Layanan</h2>
            <p className="font-bold text-xs sm:text-sm md:text-lg bg-black text-white inline-block px-3 sm:px-4 py-1 mx-auto mt-2 sm:mt-4 border-2 border-black">
              Harga bersahabat dengan kualitas arsitektur modern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`p-5 sm:p-6 md:p-8 flex flex-col justify-between bg-white border-3 sm:border-4 border-black relative transition-shadow duration-300 ${
                  plan.popular 
                  ? 'shadow-[8px_8px_0_0_#FF007F] md:shadow-[12px_12px_0_0_#FF007F]' 
                  : 'shadow-[6px_6px_0_0_#000000] md:shadow-[8px_8px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000] md:hover:shadow-[12px_12px_0_0_#000000]'
                }`}
              >
                {plan.popular && (
                  <motion.div 
                    animate={floatingAnimation}
                    className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-[#FF007F] text-white font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest px-4 sm:px-6 py-1.5 sm:py-2 border-2 sm:border-4 border-black shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000] flex items-center gap-1.5 z-10 w-max"
                  >
                    <Sparkles size={14} className="sm:w-4 sm:h-4" /> REKOMENDASI UTAMA
                  </motion.div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6 pt-1 sm:pt-2">
                    <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 font-black text-[9px] sm:text-[10px] uppercase tracking-wider flex items-center gap-1 ${plan.tagColor}`}>
                      {plan.badgeIcon} {plan.tag}
                    </span>
                    <span className="text-[10px] sm:text-xs font-black bg-gray-200 px-2 py-0.5 sm:py-1 border-2 border-black uppercase">{plan.period}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-2 sm:mb-3">{plan.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 min-h-[40px] sm:min-h-[48px] mb-4 sm:mb-6">{plan.desc}</p>

                  <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-[#f4f4f0] border-3 sm:border-4 border-black relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-black opacity-5 rounded-bl-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-[10px] sm:text-xs font-black uppercase block text-gray-600 mb-0.5 sm:mb-1">Mulai Dari</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black">{plan.price}</span>
                      <span className="text-xs sm:text-sm font-black uppercase text-gray-800">Rupiah</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <span className="text-[10px] sm:text-xs font-black uppercase block bg-black text-white px-2 py-0.5 sm:py-1 w-max mb-3 sm:mb-4">Fitur Yang Didapat:</span>
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                      {plan.features.map((feat, fIdx) => (
                        <motion.div variants={fadeUpVariant} key={fIdx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold mb-2.5 sm:mb-3">
                          <CheckCircle2 size={16} className="text-[#0055FF] shrink-0 mt-0.5 bg-white rounded-full sm:w-[18px] sm:h-[18px]" />
                          <span className="text-gray-900">{feat}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div>
                  <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-yellow-100 border-3 sm:border-4 border-black text-[11px] sm:text-xs font-bold shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]">
                    <span className="font-black text-black block mb-1 uppercase underline">Cocok Untuk:</span>
                    <span className="text-gray-800">{plan.recommendedFor}</span>
                  </div>

                  {/* Tombol Order WhatsApp */}
                  <motion.a 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/${WA_NUMBER}?text=Halo%20M.K%20Fahmi,%20saya%20tertarik%20untuk%20pesan%20*${encodeURIComponent(plan.name)}*%20seharga%20*${plan.price}*.%20Bisa%20bantu%20jelaskan%20prosesnya?`}
                    target="_blank" 
                    rel="noreferrer"
                    className={`w-full py-3 sm:py-4 font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] transition-colors mb-2.5 bg-[#25D366] text-white border-3 sm:border-4 border-black hover:bg-black`}
                  >
                    <WhatsappIcon />
                    <span>Order via WhatsApp</span>
                  </motion.a>

                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://discord.com/users/1099980838722088991" 
                    target="_blank" 
                    rel="noreferrer"
                    className={`w-full py-2.5 sm:py-3 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 border-2 sm:border-4 border-black shadow-[3px_3px_0_0_#000] ${plan.ctaColor}`}
                  >
                    <span>Pesan via Discord</span>
                    <ArrowRight size={14} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section Domain Reference */}
        <section className="mb-16 sm:mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, rotate: -1 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 md:p-12 bg-[#FFD700] border-3 sm:border-4 border-black text-black shadow-[8px_8px_0_0_#000000] md:shadow-[12px_12px_0_0_#000000]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-black text-white font-black text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4 border-2 border-white shadow-[3px_3px_0_0_#0055FF]">
                  <Globe size={14} className="sm:w-4 sm:h-4" /> Informasi Kustom Domain
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight bg-white p-2 border-3 sm:border-4 border-black inline-block">Estimasi Harga Domain</h2>
              </div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="p-4 sm:p-5 bg-white border-3 sm:border-4 border-black text-xs font-bold max-w-md shadow-[4px_4px_0_0_#FF007F] md:shadow-[6px_6px_0_0_#FF007F]"
              >
                <p className="font-black mb-1.5 sm:mb-2 flex items-center gap-2 text-xs sm:text-sm">
                  <span className="p-1 bg-[#0055FF] text-white"><HelpCircle size={14} /></span> 
                  Saya Tidak Menjual Domain
                </p>
                <p className="text-gray-800 text-[11px] sm:text-xs md:text-sm leading-relaxed">
                  Beli domain Anda sendiri di Niagahoster, Domainesia, dsb. Saya akan bantu *setup* & hubungkan DNS ke web Anda <span className="bg-[#FF007F] text-white px-1">100% GRATIS!</span>
                </p>
              </motion.div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {domainEstimates.map((dom, dIdx) => (
                <motion.div 
                  variants={fadeUpVariant}
                  whileHover={{ y: -5, scale: 1.03 }}
                  key={dIdx} 
                  className="p-4 sm:p-6 bg-white border-3 sm:border-4 border-black flex flex-col justify-between shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] relative overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 w-12 sm:w-16 h-12 sm:h-16 bg-[#f4f4f0] rounded-full z-0"></div>
                  <div className="z-10">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="font-black text-xl sm:text-2xl text-black bg-[#FFD700] px-2 border-2 border-black">{dom.name}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold text-gray-700 mb-4 sm:mb-6">{dom.desc}</p>
                  </div>
                  <div className="z-10 mt-auto">
                    {dom.popular && (
                      <span className="text-[9px] sm:text-[10px] inline-block font-black bg-[#FF007F] text-white px-2 py-0.5 border-2 border-black uppercase mb-2">Paling Laris</span>
                    )}
                    <div className="p-2 sm:p-3 bg-black text-white font-black text-xs sm:text-sm text-center border-2 border-black">
                      {dom.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Section Capabilities */}
        <section className="mb-16 sm:mb-24 md:mb-32">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="inline-block text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2 sm:mb-4 border-b-4 sm:border-b-8 border-black pb-1 sm:pb-2">Fitur & Keunggulan</h2>
            <p className="font-bold text-xs sm:text-sm md:text-lg bg-black text-white inline-block px-3 sm:px-4 py-1 mx-auto mt-2 sm:mt-4 border-2 border-black">
              Jaminan mutu terbaik dengan pengerjaan transparan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Smartphone size={28} className="sm:w-8 sm:h-8" />, title: "100% Responsif Mobile", desc: "Tampilan otomatis menyesuaikan dengan sempurna di layar Smartphone, Tablet, hingga Layar Desktop lebar.", color: "bg-[#0055FF]", shadow: "shadow-[6px_6px_0_0_#0055FF] md:shadow-[8px_8px_0_0_#0055FF]" },
              { icon: <Database size={28} className="sm:w-8 sm:h-8" />, title: "Database MongoDB", desc: "Khusus paket Pro dan Ultimate dilengkapi integrasi basis data modern untuk keamanan dan kecepatan akses.", color: "bg-[#FF007F]", shadow: "shadow-[6px_6px_0_0_#FF007F] md:shadow-[8px_8px_0_0_#FF007F]" },
              { icon: <Zap size={28} className="sm:w-8 sm:h-8" />, title: "Free Instant Hosting", desc: "Website Anda langsung di-deploy secara publik menggunakan platform server modern seperti Vercel.", color: "bg-[#FFD700]", textCol: "text-black", shadow: "shadow-[6px_6px_0_0_#FFD700] md:shadow-[8px_8px_0_0_#FFD700]" }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-5 sm:p-8 bg-white border-3 sm:border-4 border-black ${feat.shadow} transition-shadow cursor-default`}
              >
                <div className={`w-12 sm:w-16 h-12 sm:h-16 border-3 sm:border-4 border-black ${feat.color} ${feat.textCol || "text-white"} flex items-center justify-center mb-4 sm:mb-6 shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]`}>
                  {feat.icon}
                </div>
                <h3 className="font-black text-xl sm:text-2xl uppercase mb-2 sm:mb-3 leading-tight">{feat.title}</h3>
                <p className="text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section with Interactive Animations */}
        <section className="mb-16 sm:mb-24 md:mb-32">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="inline-block text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2 sm:mb-4 border-b-4 sm:border-b-8 border-black pb-1 sm:pb-2">Pertanyaan Umum</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {faqs.map((faq, fIdx) => (
              <motion.div 
                key={fIdx} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: fIdx * 0.1 }}
                className="bg-white border-3 sm:border-4 border-black shadow-[4px_4px_0_0_#000000] md:shadow-[6px_6px_0_0_#000000] overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                  className="w-full p-4 sm:p-6 text-left font-black text-xs sm:text-base md:text-lg uppercase flex items-center justify-between gap-3 sm:gap-4 hover:bg-yellow-50 transition-colors"
                >
                  <span className="flex items-center gap-2.5 sm:gap-3">
                    <span className="p-1.5 sm:p-2 bg-[#0055FF] text-white border-2 border-black shrink-0">
                      <HelpCircle size={16} className="sm:w-5 sm:h-5" />
                    </span>
                    {faq.q}
                  </span>
                  <motion.div 
                    animate={{ rotate: activeFaq === fIdx ? 45 : 0 }}
                    className="p-1.5 sm:p-2 bg-black text-white border-2 border-black shrink-0"
                  >
                    <Plus size={16} className="sm:w-5 sm:h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === fIdx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-xs sm:text-sm md:text-base font-bold text-gray-800 border-t-3 sm:border-t-4 border-black bg-[#f4f4f0] leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Contact Section */}
        <section id="contact-order" className="pt-10 sm:pt-16 border-t-6 sm:border-t-8 border-black text-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 md:p-20 bg-[#FFD700] border-3 sm:border-4 border-black shadow-[8px_8px_0_0_#000000] md:shadow-[16px_16px_0_0_#000000] relative overflow-hidden"
          >
            {/* Dekorasi Background */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FF007F] rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0055FF] rounded-full opacity-20 blur-2xl"></div>

            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 sm:mb-6 text-black relative z-10">
              Siap Buat Web <br className="hidden md:block"/>
              <span className="bg-white px-3 sm:px-4 py-1 border-3 sm:border-4 border-black inline-block transform rotate-1 mt-1 sm:mt-2">Sekarang?</span>
            </h2>
            <p className="font-bold text-xs sm:text-sm md:text-lg max-w-2xl mx-auto text-black bg-white p-3 sm:p-4 border-3 sm:border-4 border-black shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] mb-8 sm:mb-12 relative z-10">
              Hubungi saya secara langsung untuk berkonsultasi mengenai ide project, pilihan paket, atau custom fitur yang Anda inginkan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 relative z-10">
              {/* Tombol Utama WhatsApp */}
              <motion.a 
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${WA_NUMBER}?text=Halo%20M.K%20Fahmi,%20saya%20mau%20konsultasi/pesan%20jasa%20pembuatan%20website`}
                target="_blank" 
                rel="noreferrer"
                className="px-5 sm:px-8 py-3.5 sm:py-5 bg-[#25D366] text-white border-3 sm:border-4 border-black font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 sm:gap-3 shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-shadow"
              >
                <div className="bg-white text-[#25D366] p-1 border-2 border-black rounded-full"><WhatsappIcon /></div>
                <span>WhatsApp</span>
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://discord.com/users/1099980838722088991" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 sm:px-8 py-3.5 sm:py-5 bg-[#5865F2] text-white border-3 sm:border-4 border-black font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 sm:gap-3 shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-shadow"
              >
                <div className="bg-white text-[#5865F2] p-1 border-2 border-black rounded-full"><DiscordIcon /></div>
                <span>Discord</span>
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:contact@mifahmi.my.id"
                className="px-5 sm:px-8 py-3.5 sm:py-5 bg-[#0055FF] text-white border-3 sm:border-4 border-black font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 sm:gap-3 shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-shadow"
              >
                <div className="bg-white text-[#0055FF] p-1 border-2 border-black rounded-full"><Mail size={18} className="sm:w-5 sm:h-5" /></div>
                <span>Email</span>
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://tiktok.com/@mizephyrz" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 sm:px-8 py-3.5 sm:py-5 bg-black text-white border-3 sm:border-4 border-white font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 sm:gap-3 shadow-[4px_4px_0_0_#FF007F] md:shadow-[6px_6px_0_0_#FF007F] hover:shadow-[2px_2px_0_0_#FF007F] transition-shadow"
              >
                <div className="bg-white text-black p-1 rounded-full"><TiktokIcon /></div>
                <span>TikTok</span>
              </motion.a>
            </div>

            <div className="pt-6 sm:pt-8 border-t-4 sm:border-t-8 border-black flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs font-black uppercase text-black relative z-10 bg-white p-3 sm:p-4 shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]">
              <p className="flex items-center gap-2">
                <Globe size={14} className="text-[#0055FF] sm:w-4 sm:h-4"/>
                Portal Utama: <a href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer" className="text-[#FF007F] hover:text-black hover:bg-[#FFD700] px-1.5 py-0.5 border-2 border-transparent hover:border-black transition-all">jasa.mifahmi.my.id</a>
              </p>
              <p className="flex items-center gap-2">
                <Terminal size={14} className="sm:w-4 sm:h-4" /> 
                © 2026 M.K FAHMI • WEB DEV
              </p>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
