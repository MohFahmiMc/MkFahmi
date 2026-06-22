import React, { useState, useEffect, useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, ExternalLink, Mail, Move, Sparkles, Bot } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// --- Komponen 3D Interaktif (Bisa di drag & berputar mengikuti kursor) ---
const Interactive3DCore = ({ containerRef }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute top-[10%] right-[5%] md:right-[15%] w-48 h-48 md:w-64 md:h-64 cursor-grab perspective-1000 z-40 hidden lg:flex items-center justify-center"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full h-full preserve-3d relative"
      >
        {/* Layer Belakang (Bayangan/Glow) */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] rounded-full transform translate-z-[-50px]"></div>
        
        {/* Layer Utama (Kartu Kaca) */}
        <div className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between shadow-2xl transform-style-preserve-3d" style={{ transform: 'translateZ(0px)' }}>
          <div className="flex justify-between items-center text-white/50">
            <Bot size={24} />
            <span className="text-[10px] font-mono tracking-widest uppercase">Zephyr Core</span>
          </div>
          <div className="space-y-2" style={{ transform: 'translateZ(30px)' }}>
            <div className="h-1.5 w-1/2 bg-white/20 rounded-full"></div>
            <div className="h-1.5 w-3/4 bg-white/10 rounded-full"></div>
            <div className="h-1.5 w-full bg-white/5 rounded-full"></div>
          </div>
        </div>

        {/* Layer Depan (Teks Mengambang) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateZ(60px)' }}>
          <h2 className="text-2xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            SYSTEM.<br/>ONLINE
          </h2>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projectsData = [
    {
      title: "Zephyr Bot System",
      desc: "Infrastruktur bot Discord skala premium dengan 64+ command modular berorientasi objek. Dibangun di atas Node.js dan dikendalikan penuh secara independen.",
      url: "https://zephyr.mifahmi.my.id/",
      tags: ["Node.js", "Discord.js", "Termux Architecture"],
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" // Abstract 3D
    },
    {
      title: "AI Character Engine",
      desc: "Sistem kecerdasan buatan terintegrasi untuk persona karakter interaktif. Memproses input bahasa alami untuk respons real-time.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      tags: ["AI Integration", "Prompt Engineering", "API REST"],
      img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop" // Tech Abstract
    }
  ];

  return (
    <div ref={containerRef} className="bg-grid-pattern bg-[#050505] text-white min-h-screen relative selection:bg-white selection:text-black antialiased">
      
      {/* Glow Background Halus */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/30 blur-[150px] rounded-full pointer-events-none" />

      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div 
        className="cursor-outline hidden md:block" 
        style={{ 
          left: cursorPos.x, top: cursorPos.y,
          width: isHovering ? '60px' : '40px', height: isHovering ? '60px' : '40px',
          backgroundColor: isHovering ? 'rgba(255,255,255,0.05)' : 'transparent',
          borderColor: isHovering ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'
        }}
      />

      {/* Navigasi (Tab Atas - Kapsul Mengambang) */}
      <div className="fixed top-6 inset-x-0 w-full flex justify-center z-50 pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center gap-6 md:gap-10 px-6 md:px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full shadow-2xl">
          <span className="font-bold tracking-tighter text-sm">M.K.F</span>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <a href="#about" className="text-xs md:text-sm font-medium text-white/60 hover:text-white transition-colors">About</a>
          <a href="#projects" className="text-xs md:text-sm font-medium text-white/60 hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="text-xs md:text-sm font-medium text-white/60 hover:text-white transition-colors">Contact</a>
        </nav>
      </div>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-40 pb-24 relative flex flex-col items-stretch">
        
        {/* Memanggil Elemen 3D Interaktif */}
        <Interactive3DCore containerRef={containerRef} />

        {/* --- HERO / ABOUT SECTION --- */}
        <motion.section id="about" style={{ opacity: opacityHero, y: yHero }} className="min-h-[70vh] flex flex-col justify-center items-start mb-24 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase mb-8">
            <Sparkles size={12} className="text-emerald-400" />
            Software Engineering & AI
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-black tracking-tighter leading-[1] mb-8">
            MOHAMAD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/10">KHOERUL FAHMI</span>
          </h1>

          <div className="max-w-2xl">
            <p className="text-base md:text-xl text-white/60 leading-relaxed font-light mb-6">
              Sebagai seseorang dengan karakter kepemimpinan yang kuat, saya terbiasa mengambil kendali dalam merancang sistem yang terstruktur. Saya memadukan kreativitas dengan logika pemrograman untuk membangun ekosistem digital.
            </p>
            <p className="text-base md:text-xl text-white/60 leading-relaxed font-light">
              Fokus pada pengembangan menuju SMK RPL, saya telah mengelola infrastruktur bot kompleks dan mengendalikan server environment sepenuhnya secara mandiri melalui <strong>Termux</strong>.
            </p>
          </div>
        </motion.section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="mb-32">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Core <span className="text-white/30">Architectures.</span></h2>
            <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projectsData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 mb-6">
                  {/* Efek Hover Kaca */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 rounded-full font-mono text-[10px] uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">{project.title}</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 font-light">{project.desc}</p>
                  
                  <a 
                    href={project.url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase border-b border-white/30 pb-1 hover:border-white transition-colors"
                  >
                    Launch System
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- CONTACT / FOOTER SECTION --- */}
        <footer id="contact" className="pt-20 border-t border-white/10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Initiate <span className="text-white/30">Protocol.</span></h2>
            <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto mb-10">
              Tertarik untuk membahas manajemen server, pengembangan bot kompleks, atau kolaborasi web frontend?
            </p>
            
            {/* Main Email Block */}
            <a 
              href="mailto:contact@mifahmi.my.id"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:scale-105 transition-transform duration-300 font-bold tracking-wide"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Mail size={20} />
              contact@mifahmi.my.id
            </a>
          </motion.div>

          <div className="flex gap-6 mb-16">
            <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all">
              <Github size={24} />
            </a>
            <a href="https://discord.gg/FkvM362RJu" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all">
              <Globe size={24} />
            </a>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-white/40 tracking-widest uppercase">
            <p>© 2026 M.K FAHMI. ALL SYSTEMS OPERATIONAL.</p>
            <p>BASED IN INDRAMAYU, ID</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
