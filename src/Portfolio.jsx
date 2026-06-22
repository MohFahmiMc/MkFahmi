import React, { useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, Mail, Cpu, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Elemen Running Text (Interaksi Animasi Baru) ---
const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-black py-3 border-y-4 border-black rotate-2 my-12 relative z-20 shadow-[0_8px_0_0_rgba(0,0,0,0.2)]">
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="flex whitespace-nowrap gap-8 items-center"
      >
        {[...Array(3)].map((_, i) => (
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

// --- Abstrak Art untuk Hero (Sudah di-scale untuk Mobile) ---
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
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Balok Interaktif (Warna diubah agar teks hitam/putih terlihat jelas)
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

      {/* Floating Navbar (Mobile Friendly) */}
      <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 brutal-box rounded-full flex items-center gap-4 md:gap-10 w-[90%] md:w-auto justify-between md:justify-center">
        <span className="font-black tracking-widest text-base md:text-lg text-black">MI FAHMI</span>
        <div className="flex gap-4 md:gap-8 text-xs md:text-sm font-bold uppercase tracking-widest text-black">
          <a href="#projects" className="hover:text-[#0055FF] transition-colors">Karya</a>
          <a href="#contact" className="hover:text-[#FF007F] transition-colors">Kontak</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pt-32 md:pt-40 pb-20 flex flex-col items-stretch overflow-hidden">

        {/* --- HERO SECTION --- */}
        <section className="min-h-[75vh] flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12 mb-20 md:mb-32">
          <div className="flex-1 w-full text-center md:text-left">
            <div className="inline-block brutal-box px-4 py-2 mb-6 md:mb-8 bg-white">
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-black">Full-Stack Engineer / Pelajar SMK</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-black drop-shadow-[4px_4px_0_#FFD700]">
              Digital <br />
              Architect.
            </h1>

            <p className="text-base md:text-lg text-black font-bold max-w-md mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed border-l-4 border-black pl-4 text-left">
              Berasal dari Indramayu, menguasai ekosistem Termux untuk merancang logika bot Discord (Zephyr), otomasi server, dan rekayasa web.
            </p>

            <a href="#projects" className="inline-flex items-center justify-center gap-3 brutal-btn px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest rounded-full cursor-pointer w-full md:w-auto text-sm md:text-base">
              Lihat Proyek <ArrowRight size={20} />
            </a>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <AbstractHeroArt />
          </div>
        </section>

        <Marquee />

        {/* --- INTERACTIVE SANDBOX SECTION --- */}
        <section className="mb-24 md:mb-40 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">Sandbox <br/>Evolusi.</h2>
            </div>
            <p className="text-black font-bold max-w-sm text-left md:text-right mt-4 border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pr-4 text-sm md:text-base">
              Geser balok keahlian di bawah. Dari SMK NU Kamplongan menuju penguasaan sistem.
            </p>
          </div>
          
          {/* Container dibuat overflow-hidden agar di HP balok tidak bisa ditarik keluar layar */}
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
        </section>

        {/* --- REAL WEB PROJECTS (IFRAME) SECTION --- */}
        <section id="projects" className="mb-24 md:mb-40">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 md:mb-20 uppercase text-center text-black">Live <br/> Architectures.</h2>

          <div className="flex flex-col gap-16 md:gap-24">
            {projectsData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
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

        {/* --- SERVICES & CONTACT SECTION --- */}
        <section id="contact" className="pt-16 md:pt-20 border-t-8 border-black text-center">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 uppercase text-black drop-shadow-[3px_3px_0_#0055FF]">Siap <br/>Membangun?</h2>
          <p className="text-black font-bold text-sm md:text-lg max-w-lg mx-auto mb-10 md:mb-16 px-4">
            Mulai dari setup bot moderasi hingga pembuatan portfolio agensi profesional.
          </p>
          
          <div className="flex flex-col items-center gap-6 md:gap-8 mb-16 md:mb-24 px-4">
            <a 
              href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 brutal-btn rounded-full text-sm md:text-lg font-black uppercase tracking-widest"
            >
              Order Jasa Sekarang
            </a>

            <div className="flex justify-center gap-4 md:gap-6 mt-4">
              <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FFD700] transition-colors">
                <Github size={24} />
              </a>
              <a href="https://discord.gg/FkvM362RJu" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#0055FF] hover:text-white transition-colors">
                <Globe size={24} />
              </a>
              <a href="mailto:contact@mifahmi.my.id" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FF007F] hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-black tracking-widest uppercase border-t-4 border-black pt-6 md:pt-8 text-black">
            <p>© 2026 M.K FAHMI.</p>
            <p>KRANGKENG, INDRAMAYU BASE</p>
          </div>
        </section>

      </main>
    </div>
  );
}
