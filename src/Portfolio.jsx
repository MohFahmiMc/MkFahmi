import React, { useState, useEffect, useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, Mail, Cpu, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Interactive Abstract Art (Pengganti Gambar/3D yang bikin error) ---
const AbstractHeroArt = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-[400px] aspect-square flex items-center justify-center"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border-4 border-dashed border-black/20 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60%] h-[60%] border-4 border-black/40"
      />
      <div className="brutal-card w-[40%] h-[40%] flex items-center justify-center rotate-12 z-10 bg-white">
        <span className="text-4xl font-black text-black tracking-tighter">MKF</span>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sandboxRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const evolutionBlocks = [
    { id: '1', title: 'Logic', icon: <Cpu size={20} />, desc: 'AI Prompt', x: 20, y: 20 },
    { id: '2', title: 'UI/UX', icon: <Code2 size={20} />, desc: 'Frontend', x: 220, y: 60 },
    { id: '3', title: 'Scripts', icon: <Terminal size={20} />, desc: 'Python', x: 40, y: 160 },
    { id: '4', title: 'Backend', icon: <Server size={20} />, desc: 'Node.js', x: 240, y: 220 },
  ];

  const projectsData = [
    {
      title: "ZEPHYR BOT INFRASTRUCTURE",
      desc: "Sistem moderasi dan utilitas skala besar untuk Discord. Dikembangkan berbasis objek dengan arsitektur Node.js yang berjalan mandiri via Termux Android.",
      url: "https://zephyr.mifahmi.my.id",
      tags: ["Node.js", "Automation", "Termux"]
    },
    {
      title: "AI CHARACTER ENGINE",
      desc: "Integrasi bahasa alami (LLM) untuk menciptakan persona karakter digital yang mampu berinteraksi secara real-time dan dinamis.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      tags: ["AI Integration", "Prompt Eng."]
    }
  ];

  return (
    <div className="relative min-h-screen">
      
      {/* Scroll Progress Bar (Seni Interaktif) */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-[9999]"
      />

      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div 
        className="cursor-outline hidden md:block" 
        style={{ 
          left: cursorPos.x, top: cursorPos.y,
          width: isHovering ? '60px' : '40px', height: isHovering ? '60px' : '40px',
          backgroundColor: isHovering ? 'rgba(0,0,0,0.05)' : 'transparent',
          borderColor: isHovering ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)'
        }}
      />

      {/* Floating Header */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 brutal-card rounded-full flex items-center gap-10">
        <span className="font-black tracking-widest text-lg text-black">MI FAHMI</span>
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-black/60">
          <a href="#projects" className="hover:text-black transition-colors">Architecture</a>
          <a href="#services" className="hover:text-black transition-colors">Services</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-40 pb-24 flex flex-col items-stretch">

        {/* --- HERO SECTION --- */}
        <section className="min-h-[75vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-32">
          <div className="flex-1">
            <div className="inline-block brutal-card px-4 py-2 mb-8">
              <span className="text-xs font-bold tracking-widest uppercase">Full-Stack System Engineer</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9] mb-8 uppercase text-black">
              Digital <br />
              Architect.
            </h1>

            <p className="text-lg text-black/80 font-medium max-w-md mb-10 leading-relaxed border-l-4 border-black pl-4">
              Berbasis di Indramayu. Mengambil kendali penuh dari ekosistem Termux untuk merancang logika bot, otomasi server, dan rekayasa web berkinerja tinggi.
            </p>

            <a href="#projects" className="inline-flex items-center gap-3 brutal-btn px-8 py-4 font-bold uppercase tracking-widest rounded-full cursor-pointer">
              Lihat Proyek <ArrowRight size={20} />
            </a>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <AbstractHeroArt />
          </div>
        </section>

        {/* --- INTERACTIVE SANDBOX SECTION --- */}
        <section className="mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase">Sandbox <br/>Evolusi.</h2>
            </div>
            <p className="text-black/70 font-medium max-w-sm text-right mt-4 md:mt-0 border-r-4 border-black pr-4">
              Geser dan mainkan balok keahlian di bawah. Dibangun murni dengan kode, tanpa gambar.
            </p>
          </div>
          
          <div ref={sandboxRef} className="w-full h-[400px] brutal-card relative overflow-hidden bg-white/50">
            {evolutionBlocks.map((block) => (
              <motion.div
                key={block.id}
                drag
                dragConstraints={sandboxRef}
                whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
                style={{ left: block.x, top: block.y }}
                className="absolute p-6 brutal-card cursor-grab w-[180px] bg-white select-none"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex items-center gap-3 mb-3 pointer-events-none text-black">
                  {block.icon}
                  <h3 className="font-black text-sm uppercase tracking-tight">{block.title}</h3>
                </div>
                <p className="text-xs font-bold text-black/60 pointer-events-none uppercase tracking-wider">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- REAL WEB PROJECTS (IFRAME) SECTION --- */}
        <section id="projects" className="mb-40">
          <h2 className="text-6xl font-black tracking-tighter mb-20 uppercase text-center">Live <br/> Architectures.</h2>

          <div className="flex flex-col gap-24">
            {projectsData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col lg:flex-row gap-12 items-center"
              >
                <div className="w-full lg:w-1/3">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 brutal-card bg-black text-white text-[10px] uppercase tracking-widest font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-4xl font-black tracking-tight mb-6 uppercase leading-none">{project.title}</h3>
                  <p className="text-black/80 font-medium text-base leading-relaxed mb-8">{project.desc}</p>
                  
                  <a 
                    href={project.url} target="_blank" rel="noreferrer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="inline-flex px-8 py-4 brutal-btn rounded-full text-sm font-black uppercase tracking-widest"
                  >
                    Kunjungi Web
                  </a>
                </div>

                <div className="w-full lg:w-2/3 h-[450px] md:h-[550px] brutal-card p-0 overflow-hidden bg-white">
                  <div className="w-full h-12 bg-white border-b-2 border-black flex items-center px-6 gap-3">
                    <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
                    <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
                    <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
                    <div className="ml-4 text-xs font-black tracking-widest uppercase border-l-2 border-black pl-4">
                      {project.url.replace('https://', '')}
                    </div>
                  </div>
                  <iframe 
                    src={project.url} 
                    className="w-full h-[calc(100%-3rem)] border-none bg-[#fdfdfd]" 
                    title={project.title}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SERVICES & CONTACT SECTION --- */}
        <section id="services" className="pt-20 border-t-4 border-black text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase">Siap <br/>Membangun?</h2>
          <p className="text-black/80 font-bold text-lg max-w-lg mx-auto mb-16">
            Mulai dari setup bot moderasi hingga pembuatan portfolio agensi profesional.
          </p>
          
          <div className="flex flex-col items-center gap-8 mb-24">
            <a 
              href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="inline-flex items-center gap-3 px-10 py-5 brutal-btn rounded-full text-lg font-black uppercase tracking-widest"
            >
              Order Jasa Sekarang
            </a>

            <div className="flex gap-6 mt-4">
              <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-14 h-14 brutal-card rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <Github size={24} />
              </a>
              <a href="https://discord.gg/FkvM362RJu" target="_blank" rel="noreferrer" className="w-14 h-14 brutal-card rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <Globe size={24} />
              </a>
              <a href="mailto:contact@mifahmi.my.id" className="w-14 h-14 brutal-card rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black tracking-widest uppercase border-t-2 border-black pt-8">
            <p>© 2026 M.K FAHMI.</p>
            <p>KRANGKENG, INDRAMAYU BASE</p>
          </div>
        </section>

      </main>
    </div>
  );
}
