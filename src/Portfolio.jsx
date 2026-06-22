import React, { useState, useEffect, useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, Mail, Cpu, GitBranch } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SkinViewer, IdleAnimation } from 'skinview3d';

// --- Komponen 3D Minecraft Skin (FIXED CRASH BUG) ---
const MinecraftCharacter = () => {
  const containerRef = useRef(null); // Ganti ref dari canvas ke div container

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new SkinViewer({
      width: 280,
      height: 400,
      skin: "/src/skins/Fahmi.png" 
    });

    // Pasang canvas ke dalam div container secara manual
    containerRef.current.appendChild(viewer.canvas);

    viewer.animations.add(IdleAnimation);
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.5;

    if (viewer.controls) {
      viewer.controls.enableZoom = false;
    }

    // Cleanup yang benar untuk React 18 Strict Mode
    return () => {
      viewer.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
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
      <div className="absolute inset-0 bg-black/5 blur-[80px] rounded-full z-0"></div>
      
      <div 
        ref={containerRef} 
        className="z-10 cursor-grab active:cursor-grabbing outline-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]" 
      />
      
      {/* Gamertag UI */}
      <div className="z-20 mt-2 px-6 py-2 bg-white/90 backdrop-blur-md border border-black/10 rounded-full flex items-center gap-2 shadow-lg">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="font-mono text-sm tracking-widest font-bold text-black uppercase">MohFahmiMc</span>
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

  const evolutionBlocks = [
    { id: '1', title: 'Prompt Eng.', icon: <Cpu size={18} />, desc: 'Logika & AI', style: 'bg-white text-black border-black/10', x: 20, y: 20 },
    { id: '2', title: 'HTML, CSS, JS', icon: <Code2 size={18} />, desc: 'Front-End UI', style: 'bg-gray-50 text-black border-black/10', x: 220, y: 50 },
    { id: '3', title: 'Python', icon: <Terminal size={18} />, desc: 'Skrip & Otomasi', style: 'bg-gray-100 text-black border-black/10', x: 50, y: 150 },
    { id: '4', title: 'Node.js & API', icon: <Server size={18} />, desc: 'Termux Server', style: 'bg-white text-black border-black/10', x: 250, y: 200 },
    { id: '5', title: 'GitHub', icon: <GitBranch size={18} />, desc: 'Version Control', style: 'bg-gray-50 text-black border-black/10', x: 120, y: 300 },
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
    <div className="relative min-h-screen selection:bg-black selection:text-white antialiased font-sans">
      
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div 
        className="cursor-outline hidden md:block" 
        style={{ 
          left: cursorPos.x, top: cursorPos.y,
          width: isHovering ? '60px' : '40px', height: isHovering ? '60px' : '40px',
          backgroundColor: isHovering ? 'rgba(0,0,0,0.05)' : 'transparent',
          borderColor: isHovering ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)'
        }}
      />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-3 glass-panel rounded-full flex items-center gap-8 shadow-xl">
        <span className="font-black tracking-widest text-sm text-black">M.K.F</span>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-black/60">
          <a href="#about" className="hover:text-black transition-colors">Hero</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24 flex flex-col items-stretch">

        {/* --- HERO SECTION --- */}
        <motion.section id="about" style={{ opacity: opacityHero }} className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-12 mb-20 pt-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-black font-bold">Full-Stack Engineer</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] mb-8 text-black">
              MOHAMAD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">KHOERUL FAHMI</span>
            </h1>

            <p className="text-lg md:text-xl text-black/70 leading-relaxed font-medium max-w-lg mb-8">
              Pemimpin arsitektur digital. Mengambil kendali penuh dari ekosistem <strong className="text-black">Termux Android</strong> untuk merancang logika bot dan otomasi server, bersiap mendalami rekayasa perangkat lunak (RPL).
            </p>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <MinecraftCharacter />
          </div>
        </motion.section>

        {/* --- INTERACTIVE SANDBOX SECTION --- */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 text-black">Interactive <span className="text-black/30">Sandbox.</span></h2>
          <p className="text-black/60 mb-8 max-w-2xl text-sm md:text-base font-medium">
            Geser dan mainkan balok keahlian di bawah ini. Ruang ini mewakili evolusi teknikal dari rekayasa perintah hingga pengelolaan basis data skala penuh.
          </p>
          
          <div ref={sandboxRef} className="w-full h-[450px] glass-panel rounded-[2rem] relative overflow-hidden bg-white/50">
            {evolutionBlocks.map((block) => (
              <motion.div
                key={block.id}
                drag
                dragConstraints={sandboxRef}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                style={{ left: block.x, top: block.y }}
                className={`absolute p-5 rounded-2xl cursor-grab shadow-lg w-[200px] border backdrop-blur-md select-none ${block.style}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex items-center gap-3 mb-2 pointer-events-none">
                  {block.icon}
                  <h3 className="font-bold text-sm tracking-tight">{block.title}</h3>
                </div>
                <p className="text-xs opacity-70 pointer-events-none font-medium">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- REAL WEB PROJECTS (IFRAME) SECTION --- */}
        <section id="projects" className="mb-32">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-black">Live <span className="text-black/30">Architectures.</span></h2>
            <div className="h-[2px] w-full max-w-[200px] bg-black/10"></div>
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
                <div className="w-full lg:w-1/3">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 glass-panel text-black rounded-full font-mono text-[10px] uppercase tracking-wider font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-black tracking-tight mb-4 text-black">{project.title}</h3>
                  <p className="text-black/70 font-medium text-sm md:text-base leading-relaxed mb-6">{project.desc}</p>
                  <a 
                    href={project.url} target="_blank" rel="noreferrer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="inline-flex px-6 py-3 bg-black text-white font-bold rounded-full text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    Buka Halaman
                  </a>
                </div>

                <div className="w-full lg:w-2/3 h-[400px] md:h-[550px] glass-panel p-2 rounded-[2rem] shadow-xl">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-gray-50 border border-black/5">
                    <div className="absolute top-0 w-full h-8 bg-white/80 backdrop-blur-md flex items-center px-4 gap-2 z-10 border-b border-black/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      <div className="ml-4 text-[10px] font-mono text-black/50 font-bold">{project.url.replace('https://', '')}</div>
                    </div>
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
        <footer id="contact" className="pt-20 border-t border-black/10 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-black">Let's <span className="text-black/30">Collaborate.</span></h2>
          <p className="text-black/60 font-semibold text-base md:text-lg max-w-lg mx-auto mb-10">
            Kirimkan pesan untuk kolaborasi arsitektur sistem, pengembangan bot, atau pembuatan portofolio digital.
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-16">
            <a 
              href="mailto:contact@mifahmi.my.id"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition-transform duration-300 font-bold tracking-widest shadow-xl hover:bg-gray-900"
            >
              <Mail size={20} />
              contact@mifahmi.my.id
            </a>

            <div className="flex gap-4">
              <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-md">
                <Github size={20} />
              </a>
              <a href="https://discord.gg/FkvM362RJu" target="_blank" rel="noreferrer" className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-md">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-black/40 tracking-widest uppercase font-bold">
            <p>© 2026 M.K FAHMI.</p>
            <p>INDRAMAYU, WEST JAVA</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
