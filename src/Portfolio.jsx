import React, { useState, useEffect, useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, Mail, Cpu, GitBranch } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SkinViewer, IdleAnimation } from 'skinview3d';

// --- Komponen 3D Minecraft Skin ---
const MinecraftCharacter = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inisialisasi SkinViewer
    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: 280,
      height: 400,
      // Pastikan gambar Fahmi.png ada di folder src/skins/
      skin: "/src/skins/Fahmi.png" 
    });

    // Tambahkan animasi diam (naik turun nafas)
    viewer.animations.add(IdleAnimation);
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.5;

    // Di skinview3d versi terbaru, controls sudah otomatis aktif
    // Kita hanya perlu mematikan zoom agar tidak mengganggu scroll halaman
    if (viewer.controls) {
      viewer.controls.enableZoom = false;
    }

    return () => {
      viewer.dispose();
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center"
    >
      {/* Glow Effect di belakang karakter */}
      <div className="absolute inset-0 bg-white/10 blur-[60px] rounded-full z-0"></div>
      
      <canvas 
        ref={canvasRef} 
        className="z-10 cursor-grab active:cursor-grabbing outline-none drop-shadow-[0_10px_30px_rgba(255,255,255,0.2)]" 
      />
      
      {/* Gamertag UI */}
      <div className="z-20 mt-2 px-6 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 shadow-2xl">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="font-mono text-sm tracking-widest font-bold text-white uppercase">MohFahmiMc</span>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sandboxRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Data Evolusi untuk Interactive Sandbox
  const evolutionBlocks = [
    { id: '1', title: 'Prompt Eng.', icon: <Cpu size={18} />, desc: 'Logika & AI', style: 'bg-white text-black border-black/10', x: 20, y: 20 },
    { id: '2', title: 'HTML, CSS, JS', icon: <Code2 size={18} />, desc: 'Front-End UI', style: 'bg-black text-white border-white/20', x: 220, y: 50 },
    { id: '3', title: 'Python', icon: <Terminal size={18} />, desc: 'Skrip & Otomasi', style: 'bg-zinc-800 text-white border-white/10', x: 50, y: 150 },
    { id: '4', title: 'Node.js & API', icon: <Server size={18} />, desc: 'Termux Server', style: 'bg-white text-black border-black/10', x: 250, y: 200 },
    { id: '5', title: 'GitHub', icon: <GitBranch size={18} />, desc: 'Version Control', style: 'bg-black text-white border-white/20', x: 120, y: 300 },
  ];

  const projectsData = [
    {
      title: "Zephyr Bot Dashboard",
      desc: "Infrastruktur bot Discord skala premium dengan 64+ command modular berorientasi objek. Dibangun di atas Node.js dan dikendalikan penuh secara independen via Termux.",
      url: "https://zephyr.mifahmi.my.id",
      tags: ["Node.js", "Discord.js", "Termux Architecture"]
    },
    {
      title: "AI Character Engine",
      desc: "Sistem kecerdasan buatan terintegrasi untuk persona karakter interaktif. Memproses input bahasa alami untuk respons real-time.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      tags: ["AI Integration", "Prompt Engineering", "API REST"]
    }
  ];

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-black antialiased font-sans">
      
      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div 
        className="cursor-outline hidden md:block" 
        style={{ 
          left: cursorPos.x, top: cursorPos.y,
          width: isHovering ? '60px' : '40px', height: isHovering ? '60px' : '40px',
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'
        }}
      />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-3 glass-panel rounded-full flex items-center gap-8 shadow-2xl">
        <span className="font-black tracking-widest text-sm text-white">M.K.F</span>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-white/70">
          <a href="#about" className="hover:text-white transition-colors">Hero</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24 flex flex-col items-stretch">

        {/* --- HERO SECTION --- */}
        <motion.section id="about" style={{ opacity: opacityHero }} className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-12 mb-20 pt-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-white">Full-Stack Engineer</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] mb-8 drop-shadow-2xl">
              MOHAMAD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">KHOERUL FAHMI</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg mb-8 drop-shadow-md">
              Pemimpin arsitektur digital. Mengambil kendali penuh dari ekosistem <strong className="text-white">Termux Android</strong> untuk merancang logika bot dan otomasi server, bersiap mendalami rekayasa perangkat lunak (RPL).
            </p>
          </div>

          {/* Minecraft 3D Rendering */}
          <div className="flex-1 w-full flex justify-center lg:justify-end" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <MinecraftCharacter />
          </div>
        </motion.section>

        {/* --- INTERACTIVE SANDBOX SECTION --- */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 text-white">Interactive <span className="text-white/50">Sandbox.</span></h2>
          <p className="text-white/60 mb-8 max-w-2xl text-sm md:text-base">
            Geser dan mainkan balok keahlian di bawah ini. Ruang ini mewakili evolusi teknikal dari rekayasa perintah hingga pengelolaan basis data skala penuh.
          </p>
          
          <div ref={sandboxRef} className="w-full h-[450px] glass-panel rounded-[2rem] relative overflow-hidden">
            {evolutionBlocks.map((block) => (
              <motion.div
                key={block.id}
                drag
                dragConstraints={sandboxRef}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                style={{ left: block.x, top: block.y }}
                className={`absolute p-5 rounded-2xl cursor-grab shadow-2xl w-[200px] border backdrop-blur-md select-none ${block.style}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex items-center gap-3 mb-2 pointer-events-none">
                  {block.icon}
                  <h3 className="font-bold text-sm tracking-tight">{block.title}</h3>
                </div>
                <p className="text-xs opacity-70 pointer-events-none">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- REAL WEB PROJECTS (IFRAME) SECTION --- */}
        <section id="projects" className="mb-32">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">Live <span className="text-white/40">Architectures.</span></h2>
            <div className="h-[2px] w-full max-w-[200px] bg-white/20"></div>
          </div>

          <div className="flex flex-col gap-20">
            {projectsData.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
              >
                {/* Project Info Block */}
                <div className="w-full lg:w-1/3">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 glass-panel text-white rounded-full font-mono text-[10px] uppercase tracking-wider font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-black tracking-tight mb-4 drop-shadow-md text-white">{project.title}</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">{project.desc}</p>
                  <a 
                    href={project.url} target="_blank" rel="noreferrer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="inline-flex px-6 py-3 bg-white text-black font-bold rounded-full text-sm uppercase tracking-wider hover:bg-gray-300 transition-colors"
                  >
                    Buka Halaman
                  </a>
                </div>

                {/* Real Web View (Iframe) */}
                <div className="w-full lg:w-2/3 h-[400px] md:h-[550px] glass-panel p-2 rounded-[2rem] shadow-2xl">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-black">
                    {/* Top Bar Web Browser Mockup */}
                    <div className="absolute top-0 w-full h-8 bg-white/10 backdrop-blur-md flex items-center px-4 gap-2 z-10 border-b border-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <div className="ml-4 text-[10px] font-mono text-white/50">{project.url.replace('https://', '')}</div>
                    </div>
                    {/* Iframe Website Asli */}
                    <iframe 
                      src={project.url} 
                      className="w-full h-full pt-8 border-none" 
                      title={project.title}
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FOOTER / CONTACT SECTION --- */}
        <footer id="contact" className="pt-20 border-t border-white/20 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 drop-shadow-lg text-black">Let's <span className="text-gray-800">Collaborate.</span></h2>
          <p className="text-gray-800 font-medium text-base md:text-lg max-w-lg mx-auto mb-10">
            Kirimkan pesan untuk kolaborasi arsitektur sistem, pengembangan bot, atau pembuatan portofolio digital.
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-16">
            <a 
              href="mailto:contact@mifahmi.my.id"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition-transform duration-300 font-bold tracking-widest shadow-2xl"
            >
              <Mail size={20} />
              contact@mifahmi.my.id
            </a>

            <div className="flex gap-4">
              <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-xl">
                <Github size={20} />
              </a>
              <a href="https://discord.gg/FkvM362RJu" target="_blank" rel="noreferrer" className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-xl">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-gray-800 tracking-widest uppercase font-bold">
            <p>© 2026 M.K FAHMI.</p>
            <p>INDRAMAYU, WEST JAVA</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
