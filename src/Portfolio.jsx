import React, { useRef, useEffect } from 'react';
import { Github, Code2, Globe, Terminal, Server, Mail, Cpu, ArrowRight, Heart, GraduationCap, Smartphone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SkinViewer, IdleAnimation } from 'skinview3d';

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
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// --- Komponen 3D Minecraft (FIXED BUG REACT 18) ---
const MinecraftCharacter = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inisialisasi SkinViewer
    const viewer = new SkinViewer({
      width: 260,
      height: 380,
      skin: "/src/skins/Fahmi.png" // Pastikan file ini ada!
    });

    // Pasang ke dalam div (bukan mereferensi canvas langsung agar tidak crash)
    containerRef.current.appendChild(viewer.canvas);
    viewer.animations.add(IdleAnimation);
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.5;

    return () => {
      viewer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="relative brutal-box bg-[#FFD700] p-4 flex flex-col items-center justify-center rounded-[2rem] w-full max-w-[320px] mx-auto md:mr-0 mt-10 md:mt-0"
    >
      <div ref={containerRef} className="cursor-grab active:cursor-grabbing outline-none drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
      <div className="absolute bottom-6 px-6 py-2 bg-black text-white font-black uppercase tracking-widest border-2 border-black rounded-full shadow-[4px_4px_0_0_#ffffff]">
        MohFahmiMc
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const sandboxRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-2 bg-[#FF007F] origin-left z-[9999]" />

      {/* Floating Navbar */}
      <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 brutal-box rounded-full flex items-center gap-4 md:gap-10 w-[90%] md:w-auto justify-between md:justify-center bg-white">
        <span className="font-black tracking-widest text-base md:text-lg text-black truncate max-w-[120px] md:max-w-none">M. KHOERUL FAHMI</span>
        <div className="flex gap-4 md:gap-8 text-xs md:text-sm font-bold uppercase tracking-widest text-black shrink-0">
          <a href="#projects" className="hover:text-[#0055FF] transition-colors">Karya</a>
          <a href="#contact" className="hover:text-[#FF007F] transition-colors">Kontak</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pt-32 md:pt-40 pb-20 flex flex-col items-stretch overflow-hidden">

        {/* --- HERO SECTION --- */}
        <section className="min-h-[75vh] flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12 mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full text-center md:text-left"
          >
            <div className="inline-block brutal-box px-4 py-2 mb-6 md:mb-8 bg-white">
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-black">Autodidact Full-Stack Dev</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-black drop-shadow-[4px_4px_0_#0055FF]">
              Mohamad <br />
              Khoerul Fahmi.
            </h1>

            <p className="text-base md:text-lg text-black font-bold max-w-md mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed border-l-4 border-black pl-4 text-left">
              Belajar coding <span className="bg-[#FFD700] px-1">secara otodidak</span>. Berasal dari Indramayu, menguasai ekosistem Termux untuk merancang logika bot Discord, otomasi server, dan rekayasa web.
            </p>

            <a href="#projects" className="inline-flex items-center justify-center gap-3 brutal-btn px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest rounded-full cursor-pointer w-full md:w-auto text-sm md:text-base">
              Eksplorasi Proyek <ArrowRight size={20} />
            </a>
          </motion.div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <MinecraftCharacter />
          </div>
        </section>

        <Marquee />

        {/* --- JEJAK & PERSENJATAAN (Education & Device Section) --- */}
        <section className="mb-24 md:mb-40 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black mb-4">Jejak & <br/>Persenjataan.</h2>
            <div className="h-2 w-32 bg-[#FF007F] border-2 border-black"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* SD */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="brutal-box p-6 bg-white flex flex-col h-full"
            >
              <div className="w-12 h-12 brutal-box bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">Sekolah Dasar</h3>
              <p className="text-sm font-bold text-black/70 uppercase">MI-Alfalah Tanjakan, Krangkeng Indramayu.</p>
            </motion.div>

            {/* SMP */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="brutal-box p-6 bg-white flex flex-col h-full"
            >
              <div className="w-12 h-12 brutal-box bg-[#0055FF] text-white rounded-full flex items-center justify-center mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">SMP</h3>
              <p className="text-sm font-bold text-black/70 uppercase">SMPN Satap 1 Krangkeng. <br/><span className="text-black bg-[#FFD700] px-1 mt-1 inline-block">Sudah Lulus</span></p>
            </motion.div>

            {/* SMK */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="brutal-box p-6 bg-gray-200 border-dashed flex flex-col h-full opacity-80"
            >
              <div className="w-12 h-12 brutal-box bg-gray-300 rounded-full flex items-center justify-center mb-4">
                <GraduationCap size={24} className="opacity-50" />
              </div>
              <h3 className="font-black text-lg uppercase mb-2 text-gray-500">SMK</h3>
              <p className="text-sm font-bold text-gray-500 uppercase">Status: Kosong / Belum Masuk.</p>
            </motion.div>

            {/* Device Arsenal */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="brutal-box p-6 bg-[#FF007F] text-white flex flex-col h-full hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 brutal-box bg-white text-black rounded-full flex items-center justify-center mb-4">
                <Smartphone size={24} />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">Senjata Utama</h3>
              <p className="text-sm font-bold uppercase">Vivo Y12 <br/>RAM 3GB / 32GB ROM.<br/>(Mesin utama coding & server)</p>
            </motion.div>
          </div>
        </section>

        {/* --- INTERACTIVE SANDBOX SECTION --- */}
        <motion.section 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}
          className="mb-24 md:mb-40"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">Sandbox <br/>Evolusi.</h2>
            </div>
            <p className="text-black font-bold max-w-sm text-left md:text-right mt-4 border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pr-4 text-sm md:text-base">
              Geser balok keahlian di bawah. Dari HP Vivo Y12 menuju penguasaan sistem skala besar.
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
            
            {/* Bagian Tombol Order & Donasi */}
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
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-4 brutal-box bg-[#FF007F] text-white hover:bg-[#111111] hover:text-white rounded-full text-sm md:text-base font-black uppercase tracking-widest transition-colors"
              >
                <Heart size={20} className="fill-white" /> Dukung / Donate
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
            <p>KRANGKENG, INDRAMAYU BASE</p>
          </div>
        </section>

      </main>
    </div>
  );
}
