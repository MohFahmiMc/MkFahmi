import React, { useState, useEffect } from 'react';
import { Menu, Github, Code2, Globe, Terminal, Command, Cpu, Server, ExternalLink, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Initial Loader & Cursor Tracker
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navigateTo = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'links', label: 'Links' }
  ];

  const projectsData = [
    {
      title: "Zephyr Bot System",
      desc: "Infrastruktur bot Discord multifungsi dengan lebih dari 64 command yang terstruktur rapi. Dilengkapi dengan sistem moderasi kompleks dan manajemen server otomatis penuh.",
      url: "https://zephyr.mifahmi.my.id",
      tags: ["Discord.js", "Automation", "Node.js"]
    },
    {
      title: "mifahmi.my.id Portofolio",
      desc: "Situs web portofolio ini sendiri. Menggunakan arsitektur React modern dengan animasi Framer Motion tingkat lanjut dan optimasi estetika monokrom interaktif tanpa memuat aset gambar eksternal.",
      url: "https://mifahmi.my.id",
      tags: ["React JS", "Framer Motion", "Tailwind CSS"]
    }
  ];

  return (
    <>
      {/* Abstract Animated White Background Ornaments */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] animate-bounce" style={{ animationDuration: '10s' }} />
        {/* Subtle grid pattern for "tech" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Custom Cursor */}
      <div 
        className="cursor-dot hidden md:block fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[999999] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})` }}
      />
      <div 
        className="cursor-outline hidden md:block fixed rounded-full border pointer-events-none z-[999998] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{ 
          left: cursorPos.x, top: cursorPos.y, 
          width: isHovering ? '60px' : '40px', 
          height: isHovering ? '60px' : '40px',
          borderColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.3)',
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent'
        }}
      />

      {/* Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#030305] z-[999999] flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-8"
            >
              M.K FAHMI
            </motion.div>
            <div className="w-[250px] h-px bg-white/10 relative overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/2 bg-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="fixed top-6 left-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-xl z-[5000] hover:bg-white hover:text-black text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        <Menu className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3500]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 w-[300px] h-full bg-[#050505] border-r border-white/10 p-8 pt-[120px] z-[4000] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden text-left group
                ${activePage === item.id ? 'text-black bg-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              <span className="relative z-10 uppercase tracking-widest text-xs">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
          <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2">
            <Github size={14} /> Github Profile
          </a>
          <a href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2">
            <Globe size={14} /> Order Services
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen pt-[120px] px-6 md:px-[8%] pb-[80px] max-w-[1400px] mx-auto flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ----- HOME DASHBOARD ----- */}
          {activePage === 'home' && (
            <motion.section 
              key="home"
              initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Main Hero Card (Replacing Image with Typography & UI) */}
                <div className="lg:col-span-8 bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:border-white/30 transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mb-12">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-300">mifahmi.my.id</span>
                      </div>
                      
                      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
                        MOHAMAD <br /> KHOERUL FAHMI
                      </h1>
                      <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        Full-Stack Developer & Pelajar kelas 9 menuju SMK Jurusan RPL. Memiliki kepribadian pemimpin dalam merancang arsitektur kode. Aktif membangun dan mengelola infrastruktur sistem yang kompleks sepenuhnya melalui <span className="text-white font-semibold">lingkungan Termux</span>.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <a 
                        href="https://jasa.mifahmi.my.id" 
                        target="_blank" 
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 hover:scale-105 transition-all"
                      >
                        Hire Me
                      </a>
                      <a 
                        href="#github" 
                        onClick={(e) => { e.preventDefault(); navigateTo('links'); }}
                        className="px-8 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-all"
                      >
                        Explore Code
                      </a>
                    </div>
                  </div>
                </div>

                {/* Side Cards */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                  {/* Stats/Info Card 1 */}
                  <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 flex-1 group hover:bg-white transition-colors duration-500">
                    <Terminal className="w-10 h-10 text-white group-hover:text-black mb-6 transition-colors" />
                    <h3 className="text-3xl font-bold text-white group-hover:text-black mb-2 transition-colors">Termux Eng.</h3>
                    <p className="text-gray-400 group-hover:text-gray-600 font-mono text-sm uppercase tracking-widest transition-colors">Server & Development</p>
                  </div>
                  
                  {/* Stats/Info Card 2 (Replacing Discord Image Widget) */}
                  <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 flex-1 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Box className="w-10 h-10 text-white mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-2">Zephyr System</h3>
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-4">64+ Active Commands</p>
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[85%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Location</p>
                  <p className="text-lg font-semibold text-white">Krangkeng, Indramayu</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Focus</p>
                  <p className="text-lg font-semibold text-white">Discord.js & Automation</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Education Track</p>
                  <p className="text-lg font-semibold text-white">Rekayasa Perangkat Lunak</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* ----- PROJECTS ----- */}
          {activePage === 'projects' && (
            <motion.section 
              key="projects"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex flex-col gap-12"
            >
              <div className="mb-8">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Featured <br/><span className="text-gray-500">Projects.</span></h2>
                <div className="w-24 h-1 bg-white"></div>
              </div>

              {projectsData.map((project, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  key={idx} 
                  className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 w-full group hover:border-white/30 transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{project.title}</h3>
                      <p className="text-gray-400 text-lg leading-relaxed mb-8">{project.desc}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-5 py-2 rounded-full border border-white/20 text-white text-xs font-mono uppercase tracking-wider">{tag}</span>
                        ))}
                      </div>
                      
                      <a 
                        href={project.url} 
                        target="_blank"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition-transform"
                      >
                        View Live <ExternalLink size={16} />
                      </a>
                    </div>

                    {/* Abstract Code/Terminal UI Mockup (Replacing Image/Iframe) */}
                    <div className="w-full lg:w-[45%] h-[300px] bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="ml-4 text-xs font-mono text-gray-500">{project.url.replace('https://', '')}</div>
                      </div>
                      <div className="flex-1 font-mono text-sm text-gray-400 space-y-2 opacity-70">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>&gt; Initializing environment...</motion.p>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-white">&gt; Loading modules: [ {project.tags[0]} ]</motion.p>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.1 }}>&gt; Connection established.</motion.p>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.4 }} className="animate-pulse">&gt; _</motion.p>
                      </div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          )}

          {/* ----- SERVICES ----- */}
          {activePage === 'services' && (
            <motion.section 
              key="services"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Expertise & <br/><span className="text-gray-500">Services.</span></h2>
              </div>
                
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service 1 */}
                <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 group hover:bg-white hover:text-black transition-all duration-500">
                  <Command className="w-12 h-12 mb-8 text-white group-hover:text-black transition-colors" />
                  <h3 className="text-2xl font-bold mb-4">Discord Bot Architecture</h3>
                  <div className="text-4xl font-black mb-6 border-b border-white/10 group-hover:border-black/10 pb-6 transition-colors">Rp 200K+</div>
                  <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed mb-8 transition-colors">
                    Pengembangan bot Discord kustom dengan fitur moderasi tingkat lanjut, sistem ekonomi, dan logging otomatis yang dirancang untuk skalabilitas tinggi.
                  </p>
                  <a href="https://jasa.mifahmi.my.id" target="_blank" className="inline-flex px-6 py-3 border border-white/20 group-hover:border-black group-hover:bg-black group-hover:text-white rounded-full text-sm font-bold transition-all">
                    Order Setup
                  </a>
                </div>

                {/* Service 2 */}
                <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 group hover:bg-white hover:text-black transition-all duration-500">
                  <Code2 className="w-12 h-12 mb-8 text-white group-hover:text-black transition-colors" />
                  <h3 className="text-2xl font-bold mb-4">Modern Web Portfolio</h3>
                  <div className="text-4xl font-black mb-6 border-b border-white/10 group-hover:border-black/10 pb-6 transition-colors">Rp 100K+</div>
                  <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed mb-8 transition-colors">
                    Desain dan pengembangan portofolio web monokrom interaktif. Dibangun dengan ekosistem React, animasi mulus, bebas aset berat, dan SEO friendly.
                  </p>
                  <a href="https://jasa.mifahmi.my.id" target="_blank" className="inline-flex px-6 py-3 border border-white/20 group-hover:border-black group-hover:bg-black group-hover:text-white rounded-full text-sm font-bold transition-all">
                    Order Design
                  </a>
                </div>
              </div>
            </motion.section>
          )}

          {/* ----- LINKS ----- */}
          {activePage === 'links' && (
            <motion.section 
              key="links"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-20"
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Let's <span className="text-gray-500">Connect.</span></h2>
              <p className="text-gray-400 text-lg max-w-xl mb-16">
                Jelajahi basis kode, bergabung dengan komunitas pengembangan bot, atau hubungi secara profesional untuk kolaborasi ekosistem digital.
              </p>
                
              <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
                <a 
                  href="https://github.com/MohFahmiMc" 
                  target="_blank" 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="flex-1 flex flex-col items-center gap-4 p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Github className="w-10 h-10" />
                  <div>
                    <h3 className="text-xl font-bold">Github</h3>
                    <p className="text-sm font-mono opacity-60">@MohFahmiMc</p>
                  </div>
                </a>

                <a 
                  href="https://discord.gg/FkvM362RJu" 
                  target="_blank" 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="flex-1 flex flex-col items-center gap-4 p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Server className="w-10 h-10" />
                  <div>
                    <h3 className="text-xl font-bold">Discord</h3>
                    <p className="text-sm font-mono opacity-60">Dev Community</p>
                  </div>
                </a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Global Footer */}
        <footer className="mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 w-full relative z-10">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl tracking-tight">M.K FAHMI</h3>
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-2">© 2026 Crafted in Termux Environment</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-4 py-2 rounded-full border border-white/10 text-gray-400 text-xs font-mono uppercase">Node.js</span>
            <span className="px-4 py-2 rounded-full border border-white/10 text-gray-400 text-xs font-mono uppercase">React</span>
          </div>
        </footer>
      </main>
    </>
  );
}
