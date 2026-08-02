import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, ArrowRight, Sparkles, Heart, 
  Music, MapPin, CalendarHeart, Image as ImageIcon, 
  Clock, ShieldCheck, HelpCircle, Plus, ChevronLeft,
  MessageCircle, Star
} from 'lucide-react';

// Animasi Khusus
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function DigitalInvitationService({ navigate }) {
  const [activeFaq, setActiveFaq] = useState(null);

  // Nomor WA Anda (Format Internasional tanpa +)
  const waNumber = "6283896234669";
  
  // Fungsi pembuat link WA otomatis
  const getWaLink = (paket, harga) => {
    const text = `Halo Kak Fahmi, saya tertarik ingin membuat Undangan Digital untuk *${paket}* (Harga ${harga}). Boleh minta info lebih lanjut?`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  const pricingPlans = [
    {
      id: "hemat",
      name: "Paket Hemat",
      price: "20",
      tag: "Paling Murah",
      tagColor: "bg-gray-100 text-gray-600",
      desc: "Solusi cepat dan hemat untuk undangan simple yang tetap terlihat elegan dan modern.",
      features: [
        "Desain Tema Basic",
        "Detail Acara & Mempelai",
        "Navigasi Lokasi (Google Maps)",
        "Galeri Maksimal 3 Foto",
        "Revisi 1x Minor",
        "Pengerjaan 2-3 Hari"
      ],
      color: "from-gray-50 to-gray-100",
      btnColor: "bg-gray-800 text-white hover:bg-gray-900 hover:shadow-lg hover:shadow-gray-900/20"
    },
    {
      id: "populer",
      name: "Paket Populer",
      price: "35",
      popular: true,
      tag: "Rekomendasi",
      tagColor: "bg-rose-100 text-rose-600",
      desc: "Pilihan favorit dengan fitur lengkap. Cocok untuk memukau para tamu undangan Anda.",
      features: [
        "Desain Tema Premium (Bebas Pilih)",
        "Detail Acara, Mempelai & Maps",
        "Buku Tamu & RSVP via WhatsApp",
        "Galeri Maksimal 10 Foto",
        "Backsound Musik Pilihan",
        "Hitung Mundur (Countdown)",
        "Revisi 3x Minor",
        "Pengerjaan 1-2 Hari"
      ],
      color: "from-rose-50 to-pink-50",
      btnColor: "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/30"
    },
    {
      id: "eksklusif",
      name: "Paket Eksklusif",
      price: "50",
      tag: "Paling Lengkap",
      tagColor: "bg-indigo-100 text-indigo-600",
      desc: "Paket dengan fitur maksimal dan prioritas pengerjaan untuk hari spesial Anda.",
      features: [
        "Tema Custom Eksklusif",
        "Detail Acara & Navigasi Interaktif",
        "RSVP Dinamis & Ucapan di Website",
        "Galeri Foto Unlimited (Bebas)",
        "Backsound Musik & Video Autoplay",
        "Filter Instagram / QR Code",
        "Revisi Sepuasnya (Unlimited)",
        "Prioritas Pengerjaan (24 Jam)"
      ],
      color: "from-indigo-50 to-purple-50",
      btnColor: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/30"
    }
  ];

  const faqs = [
    {
      q: "Apakah saya perlu menyiapkan domain sendiri?",
      a: "Tidak perlu! Semua paket sudah termasuk sub-domain gratis (contoh: nama-kamu.mifahmi.my.id) dan hosting selamanya untuk undangan Anda."
    },
    {
      q: "Bagaimana cara mengirimkan data dan foto?",
      a: "Setelah Anda memilih paket dan menghubungi via WhatsApp, saya akan mengirimkan formulir pengisian data mempelai, jadwal acara, dan link untuk upload foto."
    },
    {
      q: "Apakah bisa request lagu backsound?",
      a: "Tentu saja! Untuk paket Populer dan Eksklusif, Anda bisa bebas memilih lagu apa saja (dari YouTube/Spotify) untuk dijadikan musik latar undangan digital Anda."
    },
    {
      q: "Jika acaranya mundur/berubah tanggal, apakah bisa direvisi?",
      a: "Bisa, pergantian tanggal, waktu, atau lokasi (reschedule) akan dibantu ubah secara GRATIS tanpa memotong jatah kuota revisi Anda."
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900 overflow-hidden">
      
      {/* Background Ornamen Lembut */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-200/40 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[100px] pointer-events-none"></div>

      {/* Top Bar Navigation - Glassmorphism */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-4 left-4 right-4 z-50 max-w-6xl mx-auto"
      >
        <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-full px-4 py-3 flex items-center justify-between shadow-sm">
          <motion.button 
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate ? navigate('/') : window.location.href = '/'}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-rose-500 transition-colors"
          >
            <div className="p-1.5 bg-slate-100 rounded-full text-slate-600">
              <ChevronLeft size={16} />
            </div>
            <span>Kembali</span>
          </motion.button>
          
          <div className="flex items-center gap-2 pr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-semibold text-xs text-slate-600">
              Open Order
            </span>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-5 md:px-8 pt-32 md:pt-40 pb-20 relative z-10">

        {/* Hero Section */}
        <section className="mb-24 md:mb-32 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-rose-100 shadow-sm text-rose-500 font-semibold text-xs md:text-sm mb-8"
          >
            <Heart size={16} className="animate-pulse" />
            <span>Spesialis Undangan Digital Modern</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl"
          >
            Sebarkan Momen Bahagia dengan <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500">
              Cara yang Lebih Elegan
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Buat undangan digital impianmu dengan desain kekinian, responsif di HP, hemat biaya, dan ramah lingkungan. Mulai dari <strong>20 Ribu</strong> saja!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a 
              href="#pricing"
              className="px-8 py-3.5 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20"
            >
              Lihat Pilihan Harga
            </a>
            <a 
              href={getWaLink("Konsultasi Custom", "Tanya-tanya")}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-white text-slate-700 rounded-full border border-slate-200 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
            >
              <MessageCircle size={18} className="text-green-500" />
              Tanya via WhatsApp
            </a>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-slate-500">Fitur lengkap untuk melengkapi hari istimewa Anda.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <CalendarHeart size={28} />, title: "Desain Elegan", desc: "Tampilan modern & tidak kaku" },
              { icon: <MapPin size={28} />, title: "Navigasi Akurat", desc: "Terhubung Google Maps" },
              { icon: <Music size={28} />, title: "Latar Musik", desc: "Bebas pilih lagu favorit" },
              { icon: <Clock size={28} />, title: "Proses Cepat", desc: "Jadi dalam 1-2 hari kerja" }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{feat.title}</h3>
                <p className="text-sm text-slate-500">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section id="pricing" className="mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pilihan Paket Harga</h2>
            <p className="text-slate-500">Pilih paket yang paling sesuai dengan kebutuhan Anda. Murah dan berkualitas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`p-1 relative bg-white rounded-3xl transition-all ${
                  plan.popular 
                  ? 'shadow-xl shadow-rose-500/10 border-0 bg-gradient-to-b from-rose-400 to-pink-500' 
                  : 'shadow-sm border border-slate-200'
                }`}
              >
                <div className={`h-full bg-white rounded-[22px] p-6 md:p-8 flex flex-col justify-between`}>
                  
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs uppercase tracking-wide px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-rose-500/30">
                      <Star size={14} fill="currentColor" /> Paling Laris
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${plan.tagColor}`}>
                        {plan.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-slate-500 min-h-[40px] mb-6">{plan.desc}</p>

                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-slate-500 font-medium">Rp</span>
                      <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                      <span className="text-slate-500 font-medium">.000</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Termasuk Layanan:</p>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <CheckCircle2 size={18} className={plan.popular ? "text-rose-500" : "text-slate-400"} />
                          </div>
                          <span className="text-sm text-slate-600">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={getWaLink(plan.name, `Rp ${plan.price}.000`)}
                    target="_blank" 
                    rel="noreferrer"
                    className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${plan.btnColor}`}
                  >
                    <span>Pesan Sekarang</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Pertanyaan Umum</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, fIdx) => (
              <motion.div 
                key={fIdx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                  className="w-full p-5 text-left font-semibold text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm md:text-base">
                    {faq.q}
                  </span>
                  <motion.div 
                    animate={{ rotate: activeFaq === fIdx ? 45 : 0 }}
                    className="p-1.5 bg-slate-100 rounded-full text-slate-500 shrink-0"
                  >
                    <Plus size={18} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === fIdx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 pt-0 text-sm text-slate-500 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer / Floating CTA Mobile */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-slate-500 text-sm">
        <p className="flex items-center justify-center gap-2 mb-2">
          Dibuat dengan <Heart size={14} className="text-rose-500 fill-rose-500" /> oleh M.K FAHMI
        </p>
        <p>© 2026 Layanan Undangan Digital. All rights reserved.</p>
      </footer>

      {/* Floating WhatsApp Button (Selalu tampil di pojok kanan bawah) */}
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={getWaLink("Konsultasi Pembuatan", "Tanya-tanya")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 group"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-medium transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
          Chat Sekarang
        </span>
      </motion.a>
    </div>
  );
}
