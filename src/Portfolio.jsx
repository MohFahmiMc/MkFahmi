import React, { useRef, useState, useEffect } from 'react';
import { Github, Code2, Globe, Terminal, Server, Mail, Cpu, ArrowRight, Heart, GraduationCap, Smartphone, MapPin, Compass, Box, Briefcase, Phone, Home, MessageSquare } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Elemen Running Text (Marquee) ---
const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-[#FFD700] py-3 border-y-4 border-black rotate-2 my-12 relative z-20 shadow-[0_8px_0_0_rgba(0,0,0,0.2)] hover:rotate-0 transition-transform duration-500 cursor-pointer">
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="flex whitespace-nowrap gap-8 items-center"
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-black font-black text-xl md:text-2xl uppercase tracking-widest">Node.js</span>
            <span className="text-black font-black text-2xl">•</span>
            <span className="text-black font-black text-xl md:text-2xl uppercase tracking-widest">Termux</span>
            <span className="text-[#FF007F] font-black text-2xl">•</span>
            <span className="text-black font-black text-xl md:text-2xl uppercase tracking-widest">React Vite</span>
            <span className="text-[#0055FF] font-black text-2xl">•</span>
            <span className="text-black font-black text-xl md:text-2xl uppercase tracking-widest">Discord.js</span>
            <span className="text-black font-black text-2xl">•</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// --- Abstrak Art untuk Hero ---
const AbstractHeroArt = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      className="relative w-full max-w-[280px] md:max-w-[400px] aspect-square flex items-center justify-center mt-10 md:mt-0"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border-4 border-dashed border-black rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.05, 1] }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute w-[60%] h-[60%] border-[6px] border-black rounded-3xl"
      />
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="brutal-box w-[45%] h-[45%] flex items-center justify-center rotate-12 z-10 bg-[#FFD700] cursor-pointer"
      >
        <span className="text-3xl md:text-5xl font-black text-black tracking-tighter">MKF</span>
      </motion.div>
    </motion.div>
  );
};

export default function Portfolio() {
  const sandboxRef = useRef(null);
  const timelineRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const { scrollYProgress: mainScroll } = useScroll();
  const scaleXMain = useTransform(mainScroll, [0, 1], [0, 1]);
  
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"]
  });

  // --- STATE UNTUK FITUR AI CHAT ---
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Halo! Saya adalah AI Engine representasi dari Mohamad Khoerul Fahmi. Ada yang ingin ditanyakan tentang keahlian, pengalaman, atau portofolio saya?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAILoading]);

  // Handle Pengiriman Pesan ke backend API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsAILoading(true);

    try {
      const token = localStorage.getItem('zephyr_token') || ""; 
      
      const res = await fetch('/api/external/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: newUserMessage.content,
          systemPrompt: "Kamu adalah AI Asisten di Portofolio Mohamad Khoerul Fahmi (MKF). Jawab dengan ramah, santai, dan cerdas. Jelaskan bahwa Fahmi adalah Full-Stack Developer otodidak asal Indramayu yang sangat ahli meracik Node.js, Termux, React, dan bot Discord skala besar.",
          history: messages.filter(m => m.role !== 'system')
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `[Sistem]: ${data.error || 'Autentikasi JWT ditolak. Pastikan token tersedia di penyimpanan lokal.'}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '[Sistem]: Gagal terhubung ke engine AI. Server mungkin offline.' }]);
    } finally {
      setIsAILoading(false);
    }
  };

  const evolutionBlocks = [
    { id: '1', title: 'Logic', icon: <Cpu size={18} />, desc: 'AI Prompt', x: 10, y: 10, bg: 'bg-[#FFD700]', text: 'text-black' },
    { id: '2', title: 'UI/UX', icon: <Code2 size={18} />, desc: 'Frontend', x: 160, y: 50, bg: 'bg-[#0055FF]', text: 'text-black' },
    { id: '3', title: 'Scripts', icon: <Terminal size={18} />, desc: 'Python', x: 20, y: 130, bg: 'bg-[#FF007F]', text: 'text-black' },
    { id: '4', title: 'Backend', icon: <Server size={18} />, desc: 'Node.js', x: 150, y: 180, bg: 'bg-white', text: 'text-black' },
  ];

  const projectsData = [
    {
      title: "ZEPHYR BOT INFRASTRUCTURE",
      desc: "Sistem moderasi dan utilitas skala besar untuk Discord. Dikembangkan berbasis objek dengan arsitektur Node.js yang berjalan mandiri via Termux Android.",
      url: "https://zephyr.mifahmi.my.id",
      tags: [{ name: "Node.js", color: "bg-[#FFD700] text-black" }, { name: "Termux", color: "bg-[#0055FF] text-black" }]
    },
    {
      title: "AI CHARACTER ENGINE",
      desc: "Integrasi bahasa alami (LLM) untuk menciptakan persona karakter digital yang mampu berinteraksi secara real-time dan dinamis.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      tags: [{ name: "AI Integration", color: "bg-[#FF007F] text-black" }, { name: "Prompt Eng.", color: "bg-white text-black" }]
    }
  ];

  return (
    <div className="relative min-h-screen bg-white bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:32px_32px]">
      {/* Progress Bar Atas */}
      <motion.div style={{ scaleX: scaleXMain }} className="fixed top-0 left-0 right-0 h-2 bg-[#FF007F] origin-left z-[9999]" />

      {/* --- NAVBAR MOBILE --- */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="brutal-box rounded-full bg-white px-5 py-3 overflow-x-auto whitespace-nowrap hide-scrollbar flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 brutal-box bg-[#FFD700] flex items-center justify-center rounded-full">
              <Terminal size={14} className="text-black" />
            </div>
            <span className="font-black tracking-widest text-base text-black">FAHMI</span>
          </div>
          <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-black shrink-0">
            <a href="#projects" className="flex items-center gap-1 hover:text-[#0055FF] transition-colors"><Briefcase size={14}/> Karya</a>
            <a href="#ai-chat" className="flex items-center gap-1 hover:text-[#FFD700] transition-colors"><MessageSquare size={14}/> Tanya AI</a>
            <a href="#contact" className="flex items-center gap-1 hover:text-[#FF007F] transition-colors"><Phone size={14}/> Kontak</a>
          </div>
        </div>
      </nav>

      {/* --- NAVBAR DESKTOP (SIDEBAR KANAN) --- */}
      <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6 brutal-box p-4 bg-white rounded-full shadow-[6px_6px_0_0_#111111]">
         <a href="#hero" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative bg-white">
            <Home size={18} className="text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 rounded font-bold uppercase pointer-events-none">Hero</span>
         </a>
         <a href="#timeline" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#0055FF] transition-colors group relative bg-white">
            <Compass size={18} className="text-black group-hover:text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-[#0055FF] text-black border-2 border-black text-xs px-3 py-2 rounded font-bold uppercase pointer-events-none">Jejak</span>
         </a>
         <a href="#sandbox" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FF007F] transition-colors group relative bg-white">
            <Box size={18} className="text-black group-hover:text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-[#FF007F] text-black border-2 border-black text-xs px-3 py-2 rounded font-bold uppercase pointer-events-none">Sandbox</span>
         </a>
         <a href="#projects" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative bg-white">
            <Briefcase size={18} className="text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-[#FFD700] text-black border-2 border-black text-xs px-3 py-2 rounded font-bold uppercase pointer-events-none">Karya</span>
         </a>
         <a href="#ai-chat" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#0055FF] transition-colors group relative bg-white">
            <MessageSquare size={18} className="text-black group-hover:text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 rounded font-bold uppercase pointer-events-none">Tanya AI</span>
         </a>
         <a href="#contact" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-white transition-colors group relative bg-white">
            <Phone size={18} className="text-black group-hover:text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 rounded font-bold uppercase pointer-events-none">Kontak</span>
         </a>
      </nav>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pt-32 md:pt-48 pb-20 flex flex-col items-stretch overflow-hidden">

        {/* --- HERO SECTION --- */}
        <section id="hero" className="min-h-[75vh] flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12 mb-20 md:mb-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full text-center md:text-left"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-block brutal-box px-4 py-2 mb-6 md:mb-8 bg-white cursor-pointer"
            >
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-black">Autodidact Full-Stack Dev</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-black drop-shadow-[4px_4px_0_#0055FF]">
              Mohamad <br />
              Khoerul Fahmi.
            </h1>

            <p className="text-base md:text-lg text-black font-bold max-w-md mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed border-l-4 border-black pl-4 text-left">
              Belajar coding <span className="bg-[#FFD700] px-1">secara otodidak</span>. Menguasai ekosistem Termux untuk merancang logika bot Discord, otomasi server, dan rekayasa web.
            </p>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="inline-flex items-center justify-center gap-3 brutal-btn px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest rounded-full cursor-pointer w-full md:w-auto text-sm md:text-base"
            >
              Eksplorasi Proyek <ArrowRight size={20} />
            </motion.a>
          </motion.div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <AbstractHeroArt />
          </div>
        </section>

        <Marquee />

        {/* --- JEJAK & PERSENJATAAN SECTION --- */}
        <section id="timeline" ref={timelineRef} className="mb-24 md:mb-40 mt-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16 md:mb-20 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black mb-4">Perjalanan <br/>& Senjata.</h2>
            <p className="text-black font-bold max-w-sm mx-auto md:mx-0 border-l-4 border-black pl-4 text-sm md:text-base">
              Scroll untuk melihat proses perjalanan pendidikan hingga perangkat arsitektur saat ini.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[28px] md:left-[40px] top-4 bottom-4 w-4 bg-gray-200 border-x-4 border-black z-0"></div>
            
            <motion.div 
              style={{ scaleY: timelineProgress }} 
              className="absolute left-[28px] md:left-[40px] top-4 bottom-4 w-4 bg-[#FF007F] border-x-4 border-black origin-top z-0" 
            />

            <div className="flex flex-col gap-10 md:gap-16 relative z-10">
              
              {/* 1. SD */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-[#FFD700] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <GraduationCap size={32} className="text-black" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-white flex flex-col w-full hover:-translate-y-2 transition-transform">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-2">Sekolah Dasar</h3>
                  <p className="text-sm md:text-base font-bold text-black/70 uppercase">MI-Alfalah Tanjakan <br/>Krangkeng, Indramayu.</p>
                </div>
              </motion.div>

              {/* 2. SMP */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-[#0055FF] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <GraduationCap size={32} className="text-black" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-white flex flex-col w-full hover:-translate-y-2 transition-transform relative overflow-hidden">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-2">SMP</h3>
                  <p className="text-sm md:text-base font-bold text-black/70 uppercase">SMPN Satap 1 Krangkeng.</p>
                  <span className="absolute top-6 right-6 text-black bg-[#FFD700] px-3 py-1 text-xs font-black uppercase border-2 border-black rotate-3">Lulus</span>
                </div>
              </motion.div>

              {/* 3. SMK */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-gray-200 border-dashed rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <GraduationCap size={32} className="text-black" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-gray-100 border-dashed flex flex-col w-full opacity-90 hover:-translate-y-2 transition-transform">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-2 text-gray-600">SMK</h3>
                  <p className="text-sm md:text-base font-bold text-gray-500 uppercase">Status: Belum Masuk.</p>
                </div>
              </motion.div>

              {/* 4. Perangkat Utama */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-[#FF007F] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <Smartphone size={32} className="text-black" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-white text-black flex flex-col w-full hover:-translate-y-2 transition-transform shadow-[6px_6px_0_0_#FF007F]">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-4 text-[#FF007F]">Perangkat Utama</h3>
                  <p className="text-sm md:text-lg font-black text-black uppercase leading-relaxed">
                    <span className="bg-white border-2 border-black text-black px-2 py-1 mr-2">Vivo Y12</span> <br className="md:hidden" />
                    RAM 3GB / 32GB ROM.<br/>
                    <span className="text-xs md:text-sm font-bold text-gray-600 mt-4 block border-t-2 border-black/10 pt-4">
                      (Mesin utama coding & kompilasi server)
                    </span>
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- INTERACTIVE SANDBOX SECTION --- */}
        <motion.section 
          id="sandbox"
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 md:mb-40 relative z-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">Sandbox <br/>Evolusi.</h2>
            </div>
            <p className="text-black font-bold max-w-sm text-left md:text-right mt-4 border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pr-4 text-sm md:text-base">
              Geser balok keahlian di bawah. Berawal dari Vivo Y12 menuju penguasaan sistem skala besar.
            </p>
          </div>
          
          <div ref={sandboxRef} className="w-full h-[350px] md:h-[400px] brutal-box relative overflow-hidden bg-white touch-none">
            {evolutionBlocks.map((block) => (
              <motion.div
                key={block.id}
                drag
                dragConstraints={sandboxRef}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                whileHover={{ scale: 1.05 }}
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

        {/* --- REAL WEB PROJECTS SECTION --- */}
        <section id="projects" className="mb-24 md:mb-40 relative z-10">
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
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center group"
              >
                <div className="w-full lg:w-1/3">
                  <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`px-3 py-1 border-2 border-black font-black text-[10px] uppercase tracking-widest ${tag.color}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 uppercase leading-none text-black group-hover:text-[#0055FF] transition-colors">{project.title}</h3>
                  <p className="text-black font-bold text-sm md:text-base leading-relaxed mb-6 md:mb-8">{project.desc}</p>
                  
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.url} target="_blank" rel="noreferrer"
                    className="inline-flex px-6 md:px-8 py-3 md:py-4 brutal-btn rounded-full text-xs md:text-sm font-black uppercase tracking-widest w-full md:w-auto justify-center"
                  >
                    Buka Halaman
                  </motion.a>
                </div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="w-full lg:w-2/3 h-[350px] md:h-[550px] brutal-box p-0 overflow-hidden bg-white"
                >
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
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- AI CHAT SECTION (TERBARU) --- */}
        <section id="ai-chat" className="mb-24 md:mb-40 mt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-black drop-shadow-[3px_3px_0_#FFD700]">
              Tanya <br/> AI Fahmi.
            </h2>
            <p className="text-black font-bold max-w-lg mx-auto mt-4 border-l-4 border-black pl-4 text-sm md:text-base px-4">
              Punya pertanyaan tentang skill atau project? Cobalah ngobrol langsung dengan entitas AI yang memuat memori portofolio saya.
            </p>
          </motion.div>

          <div className="w-full max-w-4xl mx-auto brutal-box bg-white p-4 md:p-6 h-[500px] flex flex-col relative">
            
            {/* Box Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-4 pr-2 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`brutal-box p-3 md:p-4 max-w-[85%] text-sm md:text-base font-bold text-black shadow-[2px_2px_0_0_#111] ${msg.role === 'user' ? 'bg-[#FFD700]' : 'bg-gray-100'}`}>
                    {msg.role !== 'user' && (
                      <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest border-b-2 border-black/10 pb-2">
                        <Cpu size={14} /> AI Engine
                      </div>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isAILoading && (
                <div className="flex w-full justify-start">
                   <div className="brutal-box p-3 md:p-4 max-w-[85%] text-sm font-bold text-black bg-gray-100 flex items-center gap-3">
                     <Terminal size={16} className="animate-pulse text-[#FF007F]" /> Sistem sedang merangkai jawaban...
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form AI */}
            <form onSubmit={handleSendMessage} className="flex flex-col md:flex-row gap-2 md:gap-4 border-t-4 border-black pt-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isAILoading}
                placeholder="Tanyakan keahlian, teknologi, atau project saya..."
                className="flex-1 brutal-box px-4 py-3 bg-white text-black font-bold outline-none focus:ring-4 focus:ring-[#FFD700] placeholder-black/50 text-sm md:text-base"
              />
              <button 
                type="submit" 
                disabled={isAILoading} 
                className="brutal-btn px-6 md:px-8 py-3 font-black uppercase flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Kirim <MessageSquare size={18} />
              </button>
            </form>
          </div>
        </section>

        {/* --- SERVICES, STATUS & CONTACT SECTION --- */}
        <section id="contact" className="pt-16 md:pt-20 border-t-8 border-black text-center relative z-10 bg-white/80 backdrop-blur-sm p-4 rounded-[2rem]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 uppercase text-black drop-shadow-[3px_3px_0_#FFD700]">Siap <br/>Membangun?</h2>
            <p className="text-black font-bold text-sm md:text-lg max-w-lg mx-auto mb-10 md:mb-16 px-4">
              Mulai dari setup bot moderasi hingga pembuatan portfolio web profesional.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16 md:mb-24 px-4">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex flex-col gap-4 w-full md:w-auto"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 brutal-btn rounded-full text-sm md:text-lg font-black uppercase tracking-widest"
              >
                Order Jasa Sekarang
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href="https://support.scarily.my.id" target="_blank" rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-4 brutal-box bg-[#FF007F] text-black hover:bg-white hover:text-black rounded-full text-sm md:text-base font-black uppercase tracking-widest transition-colors group"
              >
                <Heart size={20} className="fill-black stroke-black group-hover:fill-black group-hover:stroke-black transition-colors" /> 
                <span>Dukung / Donate</span>
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="w-full md:w-auto flex justify-center"
            >
              <a href="https://discord.com/users/1099980838722088991" target="_blank" rel="noreferrer" className="inline-block brutal-box p-2 bg-[#0055FF] hover:-translate-y-2 transition-transform">
                <img src="https://discord-catwidget.koyeb.app/widget/1099980838722088991.png" alt="Discord Status Widget" className="w-full max-w-[280px] md:max-w-[320px] border-2 border-black bg-white" />
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex justify-center gap-4 md:gap-6 mb-12"
          >
            <motion.a whileHover={{ y: -5 }} href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FFD700] transition-colors">
              <Github size={24} />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://discord.scarily.my.id" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#0055FF] hover:text-black transition-colors">
              <Globe size={24} />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="mailto:contact@mifahmi.my.id" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FF007F] hover:text-black transition-colors">
              <Mail size={24} />
            </motion.a>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-black tracking-widest uppercase border-t-4 border-black pt-6 md:pt-8 text-black">
            <p>© 2026 M.K FAHMI.</p>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <p>KRANGKENG, INDRAMAYU BASE</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
