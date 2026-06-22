import React, { useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, Mail, Cpu, ArrowRight, Heart, GraduationCap, Smartphone, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Elemen Running Text (Marquee) ---
const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-black py-3 border-y-4 border-black rotate-2 my-12 relative z-20 shadow-[0_8px_0_0_rgba(0,0,0,0.2)]">
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="flex whitespace-nowrap gap-8 items-center"
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-white font-black text-xl md:text-2xl uppercase tracking-widest">Node.js</span>
            <span className="text-[#FFD700] font-black text-2xl">•</span>
            <span className="text-white font-black text-xl md:text-2xl uppercase tracking-widest">Termux</span>
            <span className="text-[#FF007F] font-black text-2xl">•</span>
            <span className="text-white font-black text-xl md:text-2xl uppercase tracking-widest">React Vite</span>
            <span className="text-[#0055FF] font-black text-2xl">•</span>
            <span className="text-white font-black text-xl md:text-2xl uppercase tracking-widest">Discord.js</span>
            <span className="text-[#FFD700] font-black text-2xl">•</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// --- Abstrak Art untuk Hero (Pengganti 3D Skin) ---
const AbstractHeroArt = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-[280px] md:max-w-[400px] aspect-square flex items-center justify-center mt-10 md:mt-0"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border-4 border-dashed border-black rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60%] h-[60%] border-[6px] border-black rounded-3xl"
      />
      <div className="brutal-box w-[45%] h-[45%] flex items-center justify-center rotate-12 z-10 bg-[#FFD700]">
        <span className="text-3xl md:text-5xl font-black text-black tracking-tighter">MKF</span>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const sandboxRef = useRef(null);
  const timelineRef = useRef(null);
  
  const { scrollYProgress: mainScroll } = useScroll();
  const scaleXMain = useTransform(mainScroll, [0, 1], [0, 1]);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end center"]
  });

  const evolutionBlocks = [
    { id: '1', title: 'Logic', icon: <Cpu size={18} />, desc: 'AI Prompt', x: 10, y: 10, bg: 'bg-[#FFD700]', text: 'text-black' },
    { id: '2', title: 'UI/UX', icon: <Code2 size={18} />, desc: 'Frontend', x: 160, y: 50, bg: 'bg-[#0055FF]', text: 'text-white' },
    { id: '3', title: 'Scripts', icon: <Terminal size={18} />, desc: 'Python', x: 20, y: 130, bg: 'bg-[#FF007F]', text: 'text-white' },
    { id: '4', title: 'Backend', icon: <Server size={18} />, desc: 'Node.js', x: 150, y: 180, bg: 'bg-white', text: 'text-black' },
  ];

  const projectsData = [
    {
      title: "ZEPHYR BOT INFRASTRUCTURE",
      desc: "Sistem moderasi dan utilitas skala besar untuk Discord. Dikembangkan berbasis objek dengan arsitektur Node.js yang berjalan mandiri via Termux Android.",
      url: "https://zephyr.mifahmi.my.id",
      tags: [{ name: "Node.js", color: "brutal-tag-yellow" }, { name: "Termux", color: "brutal-tag-blue" }]
    },
    {
      title: "AI CHARACTER ENGINE",
      desc: "Integrasi bahasa alami (LLM) untuk menciptakan persona karakter digital yang mampu berinteraksi secara real-time dan dinamis.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      tags: [{ name: "AI Integration", color: "brutal-tag-pink" }, { name: "Prompt Eng.", color: "bg-black text-white" }]
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Progress Bar Atas */}
      <motion.div style={{ scaleX: scaleXMain }} className="fixed top-0 left-0 right-0 h-2 bg-[#FF007F] origin-left z-[9999]" />

      {/* Floating Navbar (Mobile: Top, Desktop: Right Sidebar) */}
      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 brutal-box rounded-full flex items-center gap-4 w-[90%] justify-between bg-white">
        <span className="font-black tracking-widest text-base text-black truncate">M.K.F</span>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-black shrink-0">
          <a href="#projects" className="hover:text-[#0055FF] transition-colors">Karya</a>
          <a href="#contact" className="hover:text-[#FF007F] transition-colors">Kontak</a>
        </div>
      </nav>

      {/* Desktop Right Sidebar Navbar */}
      <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6 brutal-box p-4 bg-white rounded-full">
         <a href="#hero" className="w-4 h-4 rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative">
            <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded font-bold uppercase">Hero</span>
         </a>
         <a href="#timeline" className="w-4 h-4 rounded-full border-2 border-black hover:bg-[#0055FF] transition-colors group relative">
            <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded font-bold uppercase">Jejak</span>
         </a>
         <a href="#sandbox" className="w-4 h-4 rounded-full border-2 border-black hover:bg-[#FF007F] transition-colors group relative">
            <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded font-bold uppercase">Sandbox</span>
         </a>
         <a href="#projects" className="w-4 h-4 rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative">
            <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded font-bold uppercase">Karya</span>
         </a>
         <a href="#contact" className="w-4 h-4 rounded-full border-2 border-black hover:bg-[#0055FF] transition-colors group relative">
            <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded font-bold uppercase">Kontak</span>
         </a>
      </nav>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pt-32 md:pt-40 pb-20 flex flex-col items-stretch overflow-hidden">

        {/* --- HERO SECTION --- */}
        <section id="hero" className="min-h-[75vh] flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12 mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full text-center md:text-left"
          >
            <div className="inline-block brutal-box px-4 py-2 mb-6 md:mb-8 bg-white">
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-black">Autodidact Full-Stack Dev</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-black drop-shadow-[4px_4px_0_#0055FF]">
              M.K.F.
            </h1>

            <p className="text-base md:text-lg text-black font-bold max-w-md mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed border-l-4 border-black pl-4 text-left">
              Belajar coding <span className="bg-[#FFD700] px-1">secara otodidak</span>. Menguasai ekosistem Termux untuk merancang logika bot Discord, otomasi server, dan rekayasa web.
            </p>

            <a href="#projects" className="inline-flex items-center justify-center gap-3 brutal-btn px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest rounded-full cursor-pointer w-full md:w-auto text-sm md:text-base">
              Eksplorasi Proyek <ArrowRight size={20} />
            </a>
          </motion.div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <AbstractHeroArt />
          </div>
        </section>

        <Marquee />

        {/* --- JEJAK & PERSENJATAAN (Timeline Progress Section) --- */}
        <section id="timeline" ref={timelineRef} className="mb-24 md:mb-40 mt-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16 md:mb-20 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black mb-4">Perjalanan <br/>& Senjata.</h2>
            <p className="text-black font-bold max-w-sm mx-auto md:mx-0 border-l-4 border-black pl-4 text-sm md:text-base">
              Scroll untuk melihat proses perjalanan dari sekolah dasar hingga sistem arsitektur saat ini.
            </p>
          </motion.div>

          <div className="relative">
            {/* Garis Latar (Desktop) */}
            <div className="hidden lg:block absolute top-[28px] left-8 right-[33%] h-4 bg-gray-200 border-y-4 border-black z-0"></div>
            {/* Garis Latar (Mobile) */}
            <div className="lg:hidden absolute left-[38px] top-8 bottom-8 w-4 bg-gray-200 border-x-4 border-black z-0"></div>

            {/* Garis Progress Animasi (Desktop) */}
            <motion.div 
              style={{ scaleX: timelineProgress }} 
              className="hidden lg:block absolute top-[28px] left-8 right-[33%] h-4 bg-[#FF007F] border-y-4 border-black origin-left z-0" 
            />
            {/* Garis Progress Animasi (Mobile) */}
            <motion.div 
              style={{ scaleY: timelineProgress }} 
              className="lg:hidden absolute left-[38px] top-8 bottom-8 w-4 bg-[#FF007F] border-x-4 border-black origin-top z-0" 
            />

            {/* Grid Container (3 Kolom karena SMK dihapus) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
              
              {/* 1. SD */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="flex lg:flex-col items-start lg:items-center gap-6 lg:gap-4"
              >
                <div className="w-16 h-16 shrink-0 brutal-box bg-[#FFD700] rounded-full flex items-center justify-center relative z-10">
                  <GraduationCap size={28} className="text-black" />
                </div>
                <div className="brutal-box p-5 bg-white flex flex-col w-full hover:-translate-y-2 transition-transform">
                  <h3 className="font-black text-lg uppercase mb-1">Sekolah Dasar</h3>
                  <p className="text-xs font-bold text-black/70 uppercase">MI-Alfalah Tanjakan <br/>Krangkeng, Indramayu.</p>
                </div>
              </motion.div>

              {/* 2. SMP */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="flex lg:flex-col items-start lg:items-center gap-6 lg:gap-4"
              >
                <div className="w-16 h-16 shrink-0 brutal-box bg-[#0055FF] rounded-full flex items-center justify-center relative z-10">
                  <GraduationCap size={28} color="white" className="stroke-white" />
                </div>
                <div className="brutal-box p-5 bg-white flex flex-col w-full hover:-translate-y-2 transition-transform">
                  <h3 className="font-black text-lg uppercase mb-1">SMP</h3>
                  <p className="text-xs font-bold text-black/70 uppercase mb-2">SMPN Satap 1 Krangkeng.</p>
                  <span className="text-black bg-[#FFD700] px-2 py-1 text-[10px] font-black uppercase self-start border-2 border-black">Sudah Lulus</span>
                </div>
              </motion.div>

              {/* 3. Senjata (Device) - Maju menggantikan SMK */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="flex lg:flex-col items-start lg:items-center gap-6 lg:gap-4"
              >
                <div className="w-16 h-16 shrink-0 brutal-box bg-[#FF007F] rounded-full flex items-center justify-center relative z-10">
                  <Smartphone size={28} color="white" />
                </div>
                <div className="brutal-box p-5 bg-[#111111] text-white flex flex-col w-full hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#FF007F]">
                  <h3 className="font-black text-lg uppercase mb-1">Senjata Utama</h3>
                  <p className="text-xs font-bold text-white/80 uppercase">
                    Vivo Y12 <br/>RAM 3GB / 32GB ROM.<br/>(Mesin utama coding & server)
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- INTERACTIVE SANDBOX SECTION --- */}
        <motion.section 
          id="sandbox"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}
          className="mb-24 md:mb-40"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">Sandbox <br/>Evolusi.</h2>
            </div>
            <p className="text-black font-bold max-w-sm text-left md:text-right mt-4 border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pr-4 text-sm md:text-base">
              Geser balok keahlian di bawah. Berawal dari Vivo Y12 menuju penguasaan sistem skala besar.
            </p>
          </div>
          
          <div ref={sandboxRef} className="w-full h-[350px] md:h-[400px] brutal-box relative overflow-hidden bg-white touch-none">
            {evolutionBlocks.map((block) => (
              <motion.div
                key={block.id}
                drag
                dragConstraints={sandboxRef}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                style={{ left: block.x, top: block.y }}
                className={`absolute p-4 md:p-6 border-4 border-black shadow-[4px_4px_0_0_#111111] cursor-grab w-[130px] md:w-[180px] select-none ${block.bg} ${block.text}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-2 md:mb-3 pointer-events-none">
                  {block.icon}
                  <h3 className="font-black text-xs md:text-sm uppercase tracking-tight">{block.title}</h3>
                </div>
                <p className="text-[10px] md:text-xs font-bold pointer-events-none uppercase tracking-wider opacity-90">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- REAL WEB PROJECTS (IFRAME) SECTION --- */}
        <section id="projects" className="mb-24 md:mb-40">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-12 md:mb-20 uppercase text-center text-black drop-shadow-[3px_3px_0_#FF007F]"
          >
            Live <br/> Architectures.
          </motion.h2>

          <div className="flex flex-col gap-16 md:gap-24">
            {projectsData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
              >
                <div className="w-full lg:w-1/3">
                  <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`px-3 py-1 border-2 border-black font-black text-[10px] uppercase tracking-widest ${tag.color}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 uppercase leading-none text-black">{project.title}</h3>
                  <p className="text-black font-bold text-sm md:text-base leading-relaxed mb-6 md:mb-8">{project.desc}</p>
                  
                  <a 
                    href={project.url} target="_blank" rel="noreferrer"
                    className="inline-flex px-6 md:px-8 py-3 md:py-4 brutal-btn rounded-full text-xs md:text-sm font-black uppercase tracking-widest w-full md:w-auto justify-center"
                  >
                    Buka Halaman
                  </a>
                </div>

                <div className="w-full lg:w-2/3 h-[350px] md:h-[550px] brutal-box p-0 overflow-hidden bg-white">
                  <div className="w-full h-10 md:h-12 bg-white border-b-4 border-black flex items-center px-4 md:px-6 gap-2 md:gap-3">
                    <div className="w-3 h-3 rounded-full border-2 border-black bg-[#FF007F]"></div>
                    <div className="w-3 h-3 rounded-full border-2 border-black bg-[#FFD700]"></div>
                    <div className="w-3 h-3 rounded-full border-2 border-black bg-[#0055FF]"></div>
                    <div className="ml-2 md:ml-4 text-[10px] md:text-xs font-black tracking-widest uppercase border-l-2 border-black pl-2 md:pl-4 text-black truncate">
                      {project.url.replace('https://', '')}
                    </div>
                  </div>
                  <iframe 
                    src={project.url} 
                    className="w-full h-[calc(100%-2.5rem)] md:h-[calc(100%-3rem)] border-none bg-gray-50" 
                    title={project.title}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SERVICES, STATUS & CONTACT SECTION --- */}
        <section id="contact" className="pt-16 md:pt-20 border-t-8 border-black text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 uppercase text-black drop-shadow-[3px_3px_0_#FFD700]">Siap <br/>Membangun?</h2>
            <p className="text-black font-bold text-sm md:text-lg max-w-lg mx-auto mb-10 md:mb-16 px-4">
              Mulai dari setup bot moderasi hingga pembuatan portfolio agensi profesional.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16 md:mb-24 px-4">
            
            {/* Bagian Tombol Order & Donasi (Teks Tampil Jelas) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex flex-col gap-4 w-full md:w-auto"
            >
              <a 
                href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 brutal-btn rounded-full text-sm md:text-lg font-black uppercase tracking-widest"
              >
                Order Jasa Sekarang
              </a>
              <a 
                href="https://support.scarily.my.id" target="_blank" rel="noreferrer"
                // Perbaikan warna text agar terlihat jelas, hitam sebelum di hover, putih saat hover
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-4 brutal-box bg-[#FF007F] text-black hover:bg-[#111111] hover:text-white rounded-full text-sm md:text-base font-black uppercase tracking-widest transition-colors group"
              >
                <Heart size={20} className="fill-black stroke-black group-hover:fill-white group-hover:stroke-white transition-colors" /> 
                <span>Dukung / Donate</span>
              </a>
            </motion.div>

            {/* Bagian Discord Status Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="w-full md:w-auto flex justify-center"
            >
              <a href="https://discord.com/users/1099980838722088991" target="_blank" rel="noreferrer" className="inline-block brutal-box p-2 bg-[#0055FF] hover:-translate-y-2 transition-transform">
                <img src="https://discord-catwidget.koyeb.app/widget/1099980838722088991.png" alt="Discord Status Widget" className="w-full max-w-[280px] md:max-w-[320px] border-2 border-black bg-black" />
              </a>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex justify-center gap-4 md:gap-6 mb-12"
          >
            <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FFD700] transition-colors">
              <Github size={24} />
            </a>
            <a href="https://discord.scarily.my.id" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#0055FF] hover:text-white transition-colors">
              <Globe size={24} />
            </a>
            <a href="mailto:contact@mifahmi.my.id" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FF007F] hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-black tracking-widest uppercase border-t-4 border-black pt-6 md:pt-8 text-black">
            <p>© 2026 M.K FAHMI.</p>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <p>KRANGKENG, INDRAMAYU BASE</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
