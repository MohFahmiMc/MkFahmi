import React, { useState, useEffect, useRef } from 'react';
import { Github, Code2, Globe, Terminal, Server, ExternalLink, ArrowDown, GripHorizontal } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Komponen Card 3D
const TiltCard = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 bg-white ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Initial Loader & Cursor Tracker
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });

    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projectsData = [
    {
      title: "Zephyr Bot System",
      desc: "Infrastruktur bot Discord multifungsi dengan 64+ command terstruktur. Dilengkapi moderasi kompleks dan manajemen server otomatis penuh dari Termux.",
      url: "https://zephyr.mifahmi.my.id",
      tags: ["Discord.js", "Automation", "Node.js"],
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" // 3D Abstract Liquid
    },
    {
      title: "mifahmi.my.id Web",
      desc: "Arsitektur React modern dengan animasi Framer Motion tingkat lanjut dan optimasi estetika UI/UX interaktif berseni tinggi.",
      url: "https://mifahmi.my.id",
      tags: ["React JS", "Framer Motion", "Tailwind"],
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop" // 3D Shapes
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#FAFAFA] text-black min-h-screen font-sans overflow-hidden selection:bg-black selection:text-white">
      
      {/* Background Abstract Putih */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gray-200/50 rounded-full blur-[120px] mix-blend-multiply translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gray-300/30 rounded-full blur-[100px] mix-blend-multiply -translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Custom Cursor (Hitam) */}
      <div 
        className="cursor-dot hidden md:block fixed w-2 h-2 bg-black rounded-full pointer-events-none z-[999999]"
        style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})` }}
      />
      <div 
        className="cursor-outline hidden md:block fixed rounded-full border pointer-events-none z-[999998] transition-all duration-300 ease-out"
        style={{ 
          left: cursorPos.x, top: cursorPos.y, 
          width: isHovering ? '60px' : '40px', 
          height: isHovering ? '60px' : '40px',
          borderColor: isHovering ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)',
          backgroundColor: isHovering ? 'rgba(0,0,0,0.05)' : 'transparent',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Loader Putih */}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-white z-[999999] flex flex-col items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-6"
          >
            M.K FAHMI
          </motion.div>
          <div className="w-[200px] h-1 bg-gray-100 overflow-hidden rounded-full">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-full h-full bg-black rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* Navbar Simple */}
      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white">
        <span className="font-bold tracking-widest text-sm md:text-base">M.K.F</span>
        <div className="flex gap-4 md:gap-8 text-xs md:text-sm font-semibold tracking-wider">
          <a href="#projects" className="hover:opacity-50 transition-opacity">PROJECTS</a>
          <a href="#services" className="hover:opacity-50 transition-opacity">SERVICES</a>
        </div>
      </nav>

      {/* MAIN CONTENT FULL SCROLL */}
      <main className="relative z-10 flex flex-col items-center w-full px-5 md:px-10">

        {/* --- HERO SECTION --- */}
        <section className="min-h-screen w-full flex flex-col justify-center max-w-[1200px] pt-20 relative">
          
          <motion.div style={{ y: yBg }} className="z-10">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-6"
            >
              Autodidact Full-Stack & Bot Engineer
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[3.5rem] leading-[1.1] md:text-[7rem] font-black tracking-tighter mb-6 md:mb-8 text-black"
            >
              MOHAMAD <br />
              <span className="text-gray-400">KHOERUL FAHMI.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl text-base md:text-xl text-gray-600 leading-relaxed font-light"
            >
              Pelajar kelas 9 bersiap menuju SMK RPL. Karakter kepemimpinan yang saya miliki mendorong saya untuk selalu merancang arsitektur kode yang terstruktur rapi dan efisien, sepenuhnya dikendalikan via Termux.
            </motion.p>
          </motion.div>

          {/* Interactive Draggable Floating Blocks (3D Seni) */}
          <div className="absolute right-0 md:right-10 top-[20%] md:top-[15%] w-full h-full pointer-events-none hidden lg:block">
            {/* Block 1 */}
            <motion.div 
              drag 
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              className="absolute top-20 right-20 w-48 h-48 pointer-events-auto cursor-grab"
            >
              <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop" alt="3D Art" className="w-full h-full object-cover rounded-3xl shadow-2xl opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                <GripHorizontal size={32} />
              </div>
            </motion.div>
            
            {/* Block 2 */}
            <motion.div 
              drag 
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              className="absolute top-[40%] right-[30%] w-32 h-32 bg-black text-white p-6 rounded-[2rem] flex flex-col justify-between pointer-events-auto cursor-grab shadow-2xl"
            >
              <Terminal size={24} />
              <span className="text-xs font-mono">Drag Me</span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-10 left-0 w-full flex justify-center text-gray-400 animate-bounce"
          >
            <ArrowDown size={24} />
          </motion.div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="w-full max-w-[1200px] py-20 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Selected <span className="text-gray-400">Works.</span></h2>
          </motion.div>

          <div className="flex flex-col gap-10 md:gap-20 w-full">
            {projectsData.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* 3D Image Card */}
                <TiltCard className="w-full md:w-1/2 h-[300px] md:h-[450px]">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </TiltCard>

                {/* Project Info */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">{project.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8">{project.desc}</p>
                  <a 
                    href={project.url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-sm md:text-base border-b-2 border-black pb-1 self-start hover:text-gray-500 hover:border-gray-500 transition-colors"
                  >
                    Explore Project <ExternalLink size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SERVICES SECTION (Interactive Cards) --- */}
        <section id="services" className="w-full max-w-[1200px] py-20 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12 md:mb-20 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">My <span className="text-gray-400">Expertise.</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <TiltCard className="p-8 md:p-12 bg-white flex flex-col items-start cursor-pointer">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                <Server size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Bot Architecture</h3>
              <p className="text-gray-600 text-sm md:text-base mb-8 flex-1">Pengembangan bot Discord kustom dengan moderasi cerdas, sistem ekonomi, dan log otomatis. Setup server rapi & profesional.</p>
              <div className="text-2xl md:text-3xl font-black border-t border-gray-100 pt-6 w-full">Rp 200K+</div>
            </TiltCard>

            <TiltCard className="p-8 md:p-12 bg-black text-white flex flex-col items-start cursor-pointer border-none">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                <Code2 size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Web Portfolio</h3>
              <p className="text-gray-400 text-sm md:text-base mb-8 flex-1">Website responsif, estetik, dan interaktif menggunakan React & Framer Motion. SEO Friendly dan performa maksimal.</p>
              <div className="text-2xl md:text-3xl font-black border-t border-gray-800 pt-6 w-full">Rp 100K+</div>
            </TiltCard>
          </div>
          
          <div className="mt-10 flex justify-center">
             <a href="https://jasa.mifahmi.my.id" target="_blank" className="px-8 py-4 bg-black text-white font-bold rounded-full text-sm md:text-base hover:bg-gray-800 transition-colors shadow-xl">
               Order Services
             </a>
          </div>
        </section>

        {/* --- FOOTER / CONNECT --- */}
        <section className="w-full max-w-[1200px] py-20 border-t border-gray-200 mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">Let's Talk.</h2>
              <p className="text-gray-500 text-sm md:text-base">Membangun ekosistem digital dari Termux ke dunia nyata.</p>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com/MohFahmiMc" target="_blank" className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-lg">
                <Github size={24} />
              </a>
              <a href="https://discord.gg/FkvM362RJu" target="_blank" className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-lg">
                <Globe size={24} />
              </a>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400 font-mono font-bold uppercase">
            <p>© 2026 M.K Fahmi</p>
            <p>Indramayu, West Java</p>
          </div>
        </section>

      </main>
    </div>
  );
}
