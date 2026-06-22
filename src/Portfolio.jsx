import React, { useState, useEffect, useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, ExternalLink, ArrowDown, Move, Cpu, Layers, GitBranch, Blocks } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Komponen Pembungkus Efek Kemiringan 3D saat Hover
const TiltContainer = ({ children, className }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setTilt({ x: x / 15, y: y / 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: -tilt.y, rotateY: tilt.x }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sandboxRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Data Evolusi Skill Teknikal dari HTML dasar hingga Fullstack Architecture
  const evolutionJourney = [
    { id: 'step1', title: 'Prompt Eng.', desc: 'Dasar logika AI & rekayasa instruksi otomasi otomatis.', color: 'bg-stone-100 text-stone-800', icon: <Cpu size={16} />, x: 40, y: 30 },
    { id: 'step2', title: 'HTML, CSS, JS', desc: 'Membangun fungsionalitas dasar rekayasa web interface.', color: 'bg-zinc-100 text-zinc-900', icon: <Code2 size={16} />, x: 260, y: 50 },
    { id: 'step3', title: 'GitHub Ecosystem', desc: 'Repositori manajemen kode & kontrol versi tim.', color: 'bg-neutral-900 text-white', icon: <GitBranch size={16} />, x: 120, y: 160 },
    { id: 'step4', title: 'Python Engine', desc: 'Skrip logika backend & manipulasi data otomatis.', color: 'bg-slate-100 text-slate-800', icon: <Terminal size={16} />, x: 300, y: 220 },
    { id: 'step5', title: 'Node.js & REST API', desc: 'Pondasi bot sistem, routing endpoint, & arsitektur server.', color: 'bg-gray-100 text-black', icon: <Server size={16} />, x: 50, y: 290 },
    { id: 'step6', title: 'Full-Stack Integration', desc: 'Penyatuan frontend React modern dengan backend modular Termux.', color: 'bg-black text-white border border-white/20', icon: <Layers size={16} />, x: 200, y: 360 }
  ];

  const projectsData = [
    {
      title: "Zephyr Bot System",
      desc: "Infrastruktur bot Discord skala premium dengan 64+ command modular berorientasi objek. Dibangun di atas Node.js dan dikendalikan penuh secara independen via Termux.",
      url: "https://zephyr.mifahmi.my.id",
      tags: ["Node.js", "Discord.js", "REST API", "Termux Server"],
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "mifahmi.my.id Web Engine",
      desc: "Sistem arsitektur web modern satu halaman penuh yang memanfaatkan manipulasi keadaan React, optimasi rendering animasi Framer Motion, dan kompilasi utilitas Tailwind.",
      url: "https://mifahmi.my.id",
      tags: ["React JS", "Framer Motion", "Tailwind UI"],
      img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="dev-grid bg-[#fbfbfd] text-black min-h-screen relative selection:bg-black selection:text-white antialiased">
      
      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div 
        className="cursor-outline hidden md:block" 
        style={{ 
          left: cursorPos.x, 
          top: cursorPos.y,
          width: isHovering ? '55px' : '34px',
          height: isHovering ? '55px' : '34px',
          backgroundColor: isHovering ? 'rgba(0,0,0,0.03)' : 'transparent',
          borderColor: isHovering ? '#000000' : 'rgba(0,0,0,0.25)'
        }}
      />

      {/* Modern White Preloader */}
      {isLoading && (
        <motion.div 
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-4"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">M.K KHOERUL FAHMI</h2>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest animate-pulse">Initializing core architecture...</p>
          </div>
        </motion.div>
      )}

      {/* Floating Mini Navbar */}
      <nav className="fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 flex justify-between items-center z-50 p-4 border border-black/5 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm">
        <span className="font-mono font-black text-xs md:text-sm tracking-tight">FAHMI.SYS</span>
        <div className="flex gap-4 md:gap-6 text-[11px] md:text-xs font-bold uppercase tracking-wider">
          <a href="#sandbox" className="hover:text-gray-500 transition-colors">Evolution</a>
          <a href="#projects" className="hover:text-gray-500 transition-colors">Architectures</a>
          <a href="#services" className="hover:text-gray-500 transition-colors">Services</a>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-32 pb-24 flex flex-col items-stretch">

        {/* --- HERO SECTION --- */}
        <motion.section style={{ opacity: opacityHero, scale: scaleHero }} className="min-h-[75vh] flex flex-col justify-center items-start mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Front-End & Back-End System Engineer
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] uppercase mb-6">
            MOHAMAD <br />
            <span className="text-stone-400">KHOERUL FAHMI</span>
          </h1>

          <p className="max-w-xl text-sm md:text-lg text-stone-600 leading-relaxed font-normal mb-8">
            Pelajar kelas 9 berkarakter kepemimpinan yang fokus pada rekayasa perangkat lunak (SMK RPL). Mengontrol penuh manajemen server, otomasi pengkodean, dan deployment backend secara mandiri dari ekosistem <span className="text-black font-semiboldunderline underline-offset-4 decoration-1">Termux Android</span>.
          </p>

          <a 
            href="#sandbox" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider border border-black/20 px-5 py-3 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm"
          >
            Explore Evolution Stack <ArrowDown size={14} className="animate-bounce" />
          </a>
        </motion.section>

        {/* --- INTERACTIVE EVOLUTION SANDBOX SECTION --- */}
        <section id="sandbox" className="mb-20 md:mb-32">
          <div className="mb-8">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2">Technical Evolution Sandbox</h2>
            <p className="text-xs md:text-sm text-stone-500 max-w-xl">
              Perjalanan teknis saya dari sekadar rekayasa prompt hingga manipulasi fullstack. **Gunakan mouse/jarimu untuk menggeser, menumpuk, atau melempar balok kartu keahlian di bawah ini:**
            </p>
          </div>

          {/* Sandbox Wrapper Viewport */}
          <div 
            ref={sandboxRef} 
            className="w-full h-[480px] bg-stone-50 border border-black/10 rounded-[32px] relative overflow-hidden shadow-inner dev-grid"
          >
            <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-1.5 text-[10px] font-mono text-stone-400 uppercase bg-white/80 px-2 py-1 rounded-md border border-black/5">
              <Move size={12} /> Interactive Space
            </div>

            {/* Draggable Components Mapping */}
            {evolutionJourney.map((node) => (
              <motion.div
                key={node.id}
                drag
                dragConstraints={sandboxRef}
                dragElastic={0.1}
                dragMomentum={true}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                style={{ left: node.x, top: node.y }}
                className={`absolute p-4 rounded-2xl shadow-md cursor-grab active:cursor-grabbing w-[190px] md:w-[220px] transition-shadow select-none border border-black/5 ${node.color}`}
              >
                <div className="flex items-center gap-2 mb-1.5 pointer-events-none">
                  {node.icon}
                  <h4 className="font-bold tracking-tight text-xs md:text-sm uppercase">{node.title}</h4>
                </div>
                <p className="text-[10px] md:text-xs opacity-80 leading-normal pointer-events-none font-normal">{node.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SELECTED ARCHITECTURES & WORKS SECTION --- */}
        <section id="projects" className="mb-20 md:mb-32">
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2">Selected Architectures</h2>
            <p className="text-xs md:text-sm text-stone-500">Sistem operasional dan repositori utama yang dikembangkan secara intensif.</p>
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {projectsData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col md:flex-row items-stretch gap-6 md:gap-12 group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Image Showcase Container */}
                <TiltContainer className="w-full md:w-[45%] h-[240px] md:h-[320px] rounded-3xl overflow-hidden border border-black/5 shadow-sm bg-white shrink-0">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                  />
                </TiltContainer>

                {/* Typography Block */}
                <div className="flex flex-col justify-between items-start py-2">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md font-mono text-[9px] md:text-[10px] uppercase font-bold tracking-tight border border-black/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 text-black">
                      {project.title}
                    </h3>
                    
                    <p className="text-stone-600 text-xs md:text-sm leading-relaxed mb-6 font-normal max-w-xl">
                      {project.desc}
                    </p>
                  </div>

                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-0.5 hover:text-stone-500 hover:border-stone-400 transition-colors"
                  >
                    Launch Endpoint <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- MINIMALIST EXPERTISE / SERVICES SECTION --- */}
        <section id="services" className="mb-16 md:mb-24">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2">Professional Services</h2>
            <p className="text-xs md:text-sm text-stone-500">Integrasi infrastruktur andal untuk kebutuhan platform digital Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="brutal-card p-6 md:p-8 bg-white flex flex-col justify-between items-start">
              <div className="mb-6">
                <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-black mb-4 border border-black/5">
                  <Blocks size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">Discord Bot Setup & API Routing</h3>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-normal">
                  Rancang struktur command handler kompleks, integrasi database, manajemen gateway event otomatis, serta rest api handler modular.
                </p>
              </div>
              <div className="text-xl md:text-2xl font-black tracking-tight border-t border-stone-100 pt-4 w-full flex justify-between items-center">
                <span className="text-xs text-stone-400 uppercase font-mono">Starting From</span>
                <span>IDR 200K+</span>
              </div>
            </div>

            <div className="brutal-card p-6 md:p-8 bg-white flex flex-col justify-between items-start">
              <div className="mb-6">
                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center mb-4">
                  <Code2 size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">Custom Front-End Application</h3>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-normal">
                  Pembangunan situs web interaktif performa tinggi berbasis ekosistem React, manajemen state yang terukur, serta penataan gaya mikro-estetik tanpa aset berat.
                </p>
              </div>
              <div className="text-xl md:text-2xl font-black tracking-tight border-t border-stone-100 pt-4 w-full flex justify-between items-center">
                <span className="text-xs text-stone-400 uppercase font-mono">Starting From</span>
                <span>IDR 100K+</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a 
              href="https://jasa.mifahmi.my.id" 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-3.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-800 transition-colors shadow-md"
            >
              Order Deployment Services
            </a>
          </div>
        </section>

        {/* --- GLOBAL BRUTALIST FOOTER --- */}
        <footer className="border-t border-black/10 pt-12 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-1">Let's Establish Connection</h2>
              <p className="text-xs text-stone-500 font-normal">Mari kolaborasikan ekosistem backend modular atau layout frontend interaktif.</p>
            </div>

            <div className="flex gap-3">
              <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-11 h-11 bg-white border border-black/10 rounded-xl flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-sm">
                <Github size={18} />
              </a>
              <a href="https://discord.gg/FkvM362RJu" target="_blank" rel="noreferrer" className="w-11 h-11 bg-white border border-black/10 rounded-xl flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-sm">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider">
            <p>© 2026 M.K FAHMI. MANUFACTURED VIA TERMUX LINUX RUNTIME.</p>
            <p>KRANGKENG, INDRAMAYU, WEST JAVA</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
