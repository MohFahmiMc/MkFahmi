import React, { useState, useEffect } from 'react';
import { Menu, Github, Code2, Globe, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Initial Loader & Cursor Tracker
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    
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

  // Data Projects (Zephyr & Services)
  const projectsData = [
    {
      title: "Zephyr Bot System",
      desc: "An advanced multipurpose Discord bot featuring robust moderation, utility commands, precise logging, and premium automation capabilities.",
      url: "https://zephyr.mifahmi.my.id",
      tags: ["Moderation", "Automation", "Premium", "70+ Commands"]
    },
    {
      title: "Zephyr AI Character",
      desc: "Eksperimen kecerdasan buatan terintegrasi untuk interaksi karakter dinamis, natural, dan responsif. Mengeksplorasi batas LLM di ekosistem Discord.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      tags: ["Artificial Intelligence", "Character AI", "Prompt Engineering"]
    },
    {
      title: "mifahmi.my.id Web Services",
      desc: "Infrastruktur layanan web portofolio tingkat lanjut, lengkap dengan hosting otomatisasi dan optimasi SEO via Google Search Console.",
      url: "https://mifahmi.my.id",
      tags: ["React JS", "Vercel", "SEO Optimization"]
    }
  ];

  return (
    <>
      {/* Background Ornaments */}
      <div className="fixed rounded-full blur-[120px] opacity-60 pointer-events-none -z-10 w-[400px] h-[400px] bg-[#2a1b54] -top-[100px] -right-[100px] animate-float1" />
      <div className="fixed rounded-full blur-[120px] opacity-60 pointer-events-none -z-10 w-[350px] h-[350px] bg-[#113a4a] -bottom-[100px] -left-[100px] animate-float2" />

      {/* Custom Cursor */}
      <div 
        className="cursor-dot hidden md:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <div 
        className="cursor-outline hidden md:block"
        style={{ 
          left: cursorPos.x, top: cursorPos.y, 
          width: isHovering ? '60px' : '40px', 
          height: isHovering ? '60px' : '40px',
          borderColor: isHovering ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)'
        }}
      />

      {/* Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-[#030305] z-[999999] flex flex-col items-center justify-center"
          >
            <div className="text-5xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent animate-pulseText">
              Mi Fahmi
            </div>
            <div className="w-[200px] h-1 bg-white/5 rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-white animate-loadFill" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="fixed top-6 left-6 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md z-[5000] hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[3500]"
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 w-[280px] h-full bg-[#0a0a0c]/80 border-r border-white/10 backdrop-blur-2xl p-6 pt-[100px] z-[4000] flex flex-col transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl mb-3 font-semibold text-sm transition-all relative overflow-hidden text-left ${activePage === item.id ? 'text-white bg-white/5 translate-x-1.5' : 'text-[#9494a0] hover:text-white hover:bg-white/5 hover:translate-x-1.5'}`}
          >
            {activePage === item.id && (
              <span className="absolute left-0 top-0 h-full w-[3px] bg-white rounded-r-md" />
            )}
            {item.label}
          </button>
        ))}
        
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
          <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="text-[#9494a0] hover:text-white text-sm font-semibold px-5 py-2">Github Profile</a>
          <a href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer" className="text-[#9494a0] hover:text-white text-sm font-semibold px-5 py-2">Order Services</a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen pt-[100px] px-5 md:px-[5%] pb-[60px] max-w-[1300px] mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* ----- HOME DASHBOARD ----- */}
          {activePage === 'home' && (
            <motion.section 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Hero Card */}
                <div className="md:col-span-8 glass-card rounded-[32px] overflow-hidden">
                  <div className="relative w-full h-[180px] md:h-[220px] overflow-hidden">
                    <img src="/pp.png" alt="Hero BG" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
                  </div>
                  
                  <div className="px-6 md:px-10 pb-10 -mt-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                      <img src="/Profile1.png" alt="Profile" className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-2xl object-cover border-[3px] border-[#141418] shadow-2xl" />
                      <div>
                        <h1 className="text-4xl md:text-[2.8rem] font-extrabold tracking-tight bg-gradient-to-br from-white to-[#a1a1aa] bg-clip-text text-transparent mb-2">Mi Fahmi</h1>
                        <p className="text-[#9494a0] text-sm md:text-base leading-relaxed max-w-xl">
                          Autodidact Full-Stack Developer & Pelajar SMK (TKJ/TSM). Menjelajahi logika dari ekosistem Discord bot hingga automasi Android via Termux. Membangun sistem yang bekerja lebih cerdas.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-7">
                      <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#d6d6d6] text-xs font-semibold backdrop-blur-md">Node.js</span>
                      <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#d6d6d6] text-xs font-semibold backdrop-blur-md">Full-Stack</span>
                      <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#d6d6d6] text-xs font-semibold backdrop-blur-md">Automation</span>
                      <a href="https://jasa.mifahmi.my.id" target="_blank" className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">Hire Me</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                      <div className="p-5 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                        <h2 className="text-xl md:text-2xl font-extrabold mb-1">Khoerul Fahmi</h2>
                        <p className="text-[#9494a0] text-xs font-bold uppercase tracking-wider">Tech-Enthusiast</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                        <h2 className="text-xl md:text-2xl font-extrabold mb-1">Alumni</h2>
                        <p className="text-[#9494a0] text-xs font-bold uppercase tracking-wider">MI Al-Falah & SMP 1 Atap</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                        <h2 className="text-xl md:text-2xl font-extrabold mb-1">Indramayu</h2>
                        <p className="text-[#9494a0] text-xs font-bold uppercase tracking-wider">Jawa Barat</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Card (Discord Widget) */}
                <div className="md:col-span-4 glass-card rounded-[32px] p-6 flex items-center justify-center min-h-[200px]">
                  <img src="https://discord-catwidget.koyeb.app/widget/1099980838722088991.png" alt="Discord Widget" className="w-full max-w-[320px] rounded-2xl hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </motion.section>
          )}

          {/* ----- PROJECTS ----- */}
          {activePage === 'projects' && (
            <motion.section 
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col gap-8"
            >
              {projectsData.map((project, idx) => (
                <div key={idx} className="glass-card rounded-[32px] p-6 md:p-10 w-full">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{project.title}</h2>
                  <p className="text-[#9494a0] text-base md:text-lg max-w-3xl mb-6">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold">{tag}</span>
                    ))}
                  </div>

                  {/* Browser Mockup */}
                  <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0b0b0d] shadow-2xl">
                    <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <div className="ml-3 px-4 py-1.5 rounded-md bg-white/5 border border-white/5 text-[#9494a0] text-xs font-mono w-full max-w-sm truncate text-center mx-auto flex-1">
                        {project.url}
                      </div>
                    </div>
                    <iframe src={project.url} title={project.title} className="w-full h-[400px] md:h-[520px] bg-[#030305] border-none" />
                  </div>
                </div>
              ))}
            </motion.section>
          )}

          {/* ----- SERVICES ----- */}
          {activePage === 'services' && (
            <motion.section 
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="glass-card rounded-[32px] p-6 md:p-10 w-full">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Professional Services</h2>
                <p className="text-[#9494a0] text-base md:text-lg max-w-2xl mb-10">High-quality custom development for Discord bots, portfolio websites, and backend systems tailored exactly to your needs.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 rounded-2xl bg-black/20 border border-white/5 hover:-translate-y-2 hover:bg-white/5 transition-all relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-[150px] h-[150px] bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                    <h3 className="text-xl font-bold mb-4">Discord Bot Setup</h3>
                    <div className="text-3xl font-extrabold text-white mb-4">Rp 200K+</div>
                    <p className="text-[#9494a0] text-sm leading-relaxed mb-8">Custom-built Discord bots with moderation features, economy systems, and automated logging.</p>
                    <a href="https://jasa.mifahmi.my.id" target="_blank" className="inline-flex px-6 py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">Order Setup</a>
                  </div>

                  <div className="p-8 rounded-2xl bg-black/20 border border-white/5 hover:-translate-y-2 hover:bg-white/5 transition-all relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-[150px] h-[150px] bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                    <h3 className="text-xl font-bold mb-4">Portfolio Website</h3>
                    <div className="text-3xl font-extrabold text-white mb-4">Rp 100K+</div>
                    <p className="text-[#9494a0] text-sm leading-relaxed mb-8">Modern, responsive, and animated web portfolios using React & Tailwind. Fast and SEO friendly.</p>
                    <a href="https://jasa.mifahmi.my.id" target="_blank" className="inline-flex px-6 py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">Order Design</a>
                  </div>

                  <div className="p-8 rounded-2xl bg-black/20 border border-white/5 opacity-60 relative overflow-hidden">
                    <h3 className="text-xl font-bold mb-4">Advanced System</h3>
                    <div className="text-3xl font-extrabold text-white mb-4">Rp 1M+</div>
                    <p className="text-[#9494a0] text-sm leading-relaxed mb-8">Complex full-stack web applications with database integrations. Currently in development.</p>
                    <button className="inline-flex px-6 py-3 bg-transparent border border-white/20 text-white font-bold rounded-xl text-sm cursor-not-allowed">Coming Soon</button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ----- LINKS ----- */}
          {activePage === 'links' && (
            <motion.section 
              key="links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="glass-card rounded-[32px] p-6 md:p-10 w-full">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Connect & Socials</h2>
                <p className="text-[#9494a0] text-base md:text-lg mb-10">Find my code, join my community, or see my content across these platforms.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a href="https://github.com/MohFahmiMc" target="_blank" className="flex items-center gap-5 p-6 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 hover:-translate-y-1 transition-all group">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Github</h3>
                      <p className="text-[#9494a0] text-sm mt-1">@MohFahmiMc</p>
                    </div>
                  </a>

                  <a href="https://discord.gg/FkvM362RJu" target="_blank" className="flex items-center gap-5 p-6 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 hover:-translate-y-1 transition-all group">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Discord</h3>
                      <p className="text-[#9494a0] text-sm mt-1">Community Server</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Global Footer Mentok Bawah */}
        <footer className="mt-auto pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/10 w-full">
          <div>
            <h3 className="font-bold text-lg">© 2026 MiFahmi</h3>
            <p className="text-[#9494a0] text-sm mt-1">Full Stack Developer & Backend Systems</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#b0b0b0] text-xs font-semibold">JavaScript</span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#b0b0b0] text-xs font-semibold">Node.js</span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#b0b0b0] text-xs font-semibold">React Vite</span>
          </div>
        </footer>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[5000]">
        <a 
          href="https://github.com/MohFahmiMc" 
          target="_blank" 
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all shadow-xl"
        >
          <Github className="w-5 h-5 text-white" />
        </a>
      </div>
    </>
  );
}
