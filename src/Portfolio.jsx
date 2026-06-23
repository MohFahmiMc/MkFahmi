import React, { useRef, useState, useEffect } from 'react';
import { 
  Github, Code2, Globe, Terminal, Server, Mail, Cpu, ArrowRight, Heart, 
  GraduationCap, Smartphone, MapPin, Compass, Box, Briefcase, Phone, Home, 
  FileJson, Palette, Zap, Cpu as BrainCircuit, Database, Cloud
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- Custom SVGs untuk Discord & TikTok ---
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.946 2.4189-2.1568 2.4189Z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 0012.67-1.74v-5a8.21 8.21 0 004.14 1.15V6.63a6.84 6.84 0 00-2.22.06z"/>
  </svg>
);

// --- Fitur Teks Interaktif (Klik 3x untuk Edit) ---
const EditableText = ({ initialText }) => {
  const [text, setText] = useState(initialText);
  const [clicks, setClicks] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    if (isEditing) return;
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 3) {
      setIsEditing(true);
      setClicks(0);
    }
    // Reset click kalau tidak cepat
    setTimeout(() => setClicks(0), 1000);
  };

  // Fungsi untuk me-render teks dan membungkus kata "otodidak" dengan styling khusus
  const renderText = () => {
    const parts = text.split(/(otodidak)/i);
    return parts.map((part, i) => 
      part.toLowerCase() === 'otodidak' ? (
        <span key={i} className="text-black bg-[#FFD700] px-2 py-0.5 border-2 border-black font-black leading-normal inline-block my-1 mx-1 shadow-[2px_2px_0_0_#111111]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (isEditing) {
    return (
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(e) => { if(e.key === 'Enter') setIsEditing(false) }}
        className="bg-[#FFD700] text-black w-full border-2 border-black outline-none font-bold p-2 shadow-[4px_4px_0_0_#111111]"
        autoFocus
        rows={4}
      />
    );
  }

  return (
    <span 
      onClick={handleClick} 
      className="cursor-pointer hover:bg-gray-100 transition-colors block border-l-4 border-black pl-4 text-left leading-relaxed py-1" 
      title="💡 Rahasia: Klik 3 kali cepat untuk mengedit teks ini!"
    >
      {renderText()}
    </span>
  );
};

// --- Elemen Running Text (Marquee) ---
const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-black py-3 border-y-4 border-black rotate-2 my-12 relative z-20 shadow-[0_8px_0_0_rgba(0,0,0,0.2)] hover:rotate-0 transition-transform duration-500 cursor-pointer">
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="flex whitespace-nowrap gap-8 items-center"
      >
        {[...Array(4)].map((_, i) => (
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
  const blockRefs = useRef({});
  
  const [fusionMessage, setFusionMessage] = useState("");
  const [secretClicks, setSecretClicks] = useState(0);
  const [blocks, setBlocks] = useState([]);
  
  // State untuk Pop-Up Achievement
  const [achievement, setAchievement] = useState(null);

  const { scrollYProgress: mainScroll } = useScroll();
  const scaleXMain = useTransform(mainScroll, [0, 1], [0, 1]);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"]
  });

  // Load block sesuai device
  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    const initialBlocks = [
      { id: '1', title: 'Logic', icon: <Cpu size={18} />, desc: 'AI Prompt', x: 20, y: 20, bg: 'bg-[#FFD700]', text: 'text-black', type: 'AI' },
      { id: '2', title: 'UI/UX', icon: <Code2 size={18} />, desc: 'Frontend', x: 180, y: 60, bg: 'bg-[#0055FF]', text: 'text-white', type: 'FE' },
      { id: '3', title: 'Scripts', icon: <Terminal size={18} />, desc: 'Python', x: 30, y: 150, bg: 'bg-[#FF007F]', text: 'text-white', type: 'PY' },
      { id: '4', title: 'Backend', icon: <Server size={18} />, desc: 'Node.js', x: 180, y: 200, bg: 'bg-white', text: 'text-black', type: 'BE' },
    ];

    if (isDesktop) {
      initialBlocks.push({ id: '5', title: 'Database', icon: <Database size={18} />, desc: 'MongoDB', x: 380, y: 40, bg: 'bg-black', text: 'text-white', type: 'DB' });
      initialBlocks.push({ id: '6', title: 'Cloud', icon: <Cloud size={18} />, desc: 'Hosting', x: 390, y: 180, bg: 'bg-gray-200', text: 'text-black', type: 'CLOUD' });
    }
    setBlocks(initialBlocks);
  }, []);

  const projectsData = [
    {
      title: "ZEPHYR BOT INFRASTRUCTURE",
      desc: "Sistem moderasi dan utilitas skala besar untuk Discord. Dikembangkan dengan arsitektur Node.js pada backend, dan antarmuka Dashboard Website murni dibangun dengan bahasa Vanilla JS, HTML, dan CSS.",
      url: "https://zephyr.mifahmi.my.id",
      tags: [
        { name: "Node.js", color: "brutal-tag-yellow" }, 
        { name: "Vanilla JS", color: "brutal-tag-blue" },
        { name: "HTML/CSS", color: "brutal-tag-pink" }
      ]
    },
    {
      title: "AI CHARACTER ENGINE",
      desc: "Integrasi bahasa alami (LLM) untuk menciptakan persona karakter digital yang mampu berinteraksi secara real-time dan dinamis.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      tags: [{ name: "AI Integration", color: "brutal-tag-pink" }, { name: "Prompt Eng.", color: "bg-black text-white" }]
    }
  ];

  // Logic klik tombol navbar Termux untuk Achievement Pop-Up
  const handleNavSecretClick = () => {
    const nextClick = secretClicks + 1;
    setSecretClicks(nextClick);
    
    if (nextClick === 5) {
      setAchievement({ 
        title: "ACHIEVEMENT UNLOCKED", 
        desc: "Akses 'root' Termux diberikan! Terus semangat ngoding 🔥" 
      });
      
      // Auto-hide pop up setelah 4.5 detik
      setTimeout(() => {
        setAchievement(null);
      }, 4500);
      
      setSecretClicks(0);
    }
  };

  // Logic Evolusi
  const handleDragEnd = (event, info, draggedId) => {
    const draggedEl = blockRefs.current[draggedId];
    if (!draggedEl) return;
    const b1 = draggedEl.getBoundingClientRect();
    let hasFused = false;

    blocks.forEach(target => {
      if (hasFused || target.id === draggedId) return;
      
      const targetEl = blockRefs.current[target.id];
      if (!targetEl) return;
      const b2 = targetEl.getBoundingClientRect();

      const isOverlap = !(b1.right < b2.left || b1.left > b2.right || b1.bottom < b2.top || b1.top > b2.bottom);

      if (isOverlap) {
        const type1 = blocks.find(b => b.id === draggedId).type;
        const type2 = target.type;
        const pair = [type1, type2].sort().join('+');
        
        let evolvedBlock = null;

        if (pair === 'BE+FE') {
          evolvedBlock = { id: Date.now().toString(), title: 'Fullstack', icon: <Zap size={18}/>, desc: 'Web Master', bg: 'bg-black', text: 'text-[#FFD700]', type: 'FULL' };
        } else if (pair === 'AI+PY' || pair === 'AI+BE') {
          evolvedBlock = { id: Date.now().toString(), title: 'AI Engineer', icon: <BrainCircuit size={18}/>, desc: 'AI Systems', bg: 'bg-[#FF007F]', text: 'text-white', type: 'AI_ENG' };
        } else if (pair === 'BE+DB' || pair === 'CLOUD+DB') {
          evolvedBlock = { id: Date.now().toString(), title: 'SysAdmin', icon: <Server size={18}/>, desc: 'Infrastructure', bg: 'bg-[#0055FF]', text: 'text-white', type: 'SYS' };
        } else if (pair === 'CLOUD+FE' || pair === 'CLOUD+FULL') {
          evolvedBlock = { id: Date.now().toString(), title: 'Live App', icon: <Globe size={18}/>, desc: 'Deployed', bg: 'bg-[#FFD700]', text: 'text-black', type: 'LIVE' };
        }

        if (evolvedBlock) {
          hasFused = true;
          const sandboxRect = sandboxRef.current.getBoundingClientRect();
          evolvedBlock.x = b2.left - sandboxRect.left;
          evolvedBlock.y = b2.top - sandboxRect.top;

          setFusionMessage(`🔥 EVOLUSI: ${evolvedBlock.title.toUpperCase()} TERBENTUK!`);
          setTimeout(() => setFusionMessage(""), 4000);

          setBlocks(prev => {
            const filtered = prev.filter(b => b.id !== draggedId && b.id !== target.id);
            return [...filtered, evolvedBlock];
          });
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-white bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:32px_32px]">
      
      {/* --- ACHIEVEMENT POP-UP (Kustom Notification) --- */}
      <AnimatePresence>
        {achievement && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed top-24 md:top-10 left-1/2 -translate-x-1/2 z-[99999] brutal-box bg-[#FFD700] border-4 border-black p-4 flex items-center gap-4 shadow-[8px_8px_0_0_#111111] w-[90%] max-w-[400px]"
          >
            <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full shrink-0 border-2 border-white">
              <Terminal size={24} className="text-[#FFD700]" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase text-black mb-1">{achievement.title}</h4>
              <p className="font-bold text-xs text-black leading-tight">{achievement.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ scaleX: scaleXMain }} className="fixed top-0 left-0 right-0 h-2 bg-[#FF007F] origin-left z-[9999]" />

      {/* --- NAVBAR MOBILE --- */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="brutal-box rounded-full bg-white px-5 py-3 flex items-center justify-between gap-4 shadow-[4px_4px_0_0_#111111]">
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={handleNavSecretClick}>
            <div className="w-7 h-7 brutal-box bg-[#FFD700] flex items-center justify-center rounded-full active:scale-90 transition-transform">
              <Terminal size={14} className="text-black" />
            </div>
            <span className="font-black tracking-widest text-base text-black">FAHMI</span>
          </div>
          <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-black shrink-0">
            <a href="#projects" className="flex items-center gap-1 hover:text-[#0055FF] transition-colors"><Briefcase size={14}/> Karya</a>
            <a href="#contact" className="flex items-center gap-1 hover:text-[#FF007F] transition-colors"><Phone size={14}/> Kontak</a>
          </div>
        </div>
      </nav>

      {/* --- NAVBAR DESKTOP --- */}
      <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6 brutal-box p-4 bg-white rounded-full shadow-[6px_6px_0_0_#111111]">
         <a href="#hero" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative bg-white hover:z-50 focus:z-50">
            <Home size={18} className="text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 font-black uppercase pointer-events-none z-50">Hero</span>
         </a>
         <a href="#about" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FF007F] transition-colors group relative bg-white hover:z-50 focus:z-50">
            <BrainCircuit size={18} className="text-black group-hover:text-white" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 font-black uppercase pointer-events-none z-50">Profil</span>
         </a>
         <a href="#timeline" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#0055FF] transition-colors group relative bg-white hover:z-50 focus:z-50">
            <Compass size={18} className="text-black group-hover:text-white" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 font-black uppercase pointer-events-none z-50">Jejak</span>
         </a>
         <a href="#sandbox" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative bg-white hover:z-50 focus:z-50">
            <Box size={18} className="text-black" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 font-black uppercase pointer-events-none z-50">Sandbox</span>
         </a>
         <a href="#projects" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FF007F] transition-colors group relative bg-white hover:z-50 focus:z-50">
            <Briefcase size={18} className="text-black group-hover:text-white" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 font-black uppercase pointer-events-none z-50">Karya</span>
         </a>
         <a href="#contact" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-black transition-colors group relative bg-white hover:z-50 focus:z-50">
            <Phone size={18} className="text-black group-hover:text-white" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-2 font-black uppercase pointer-events-none z-50">Kontak</span>
         </a>
      </nav>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pt-32 md:pt-48 pb-20 flex flex-col items-stretch overflow-visible">

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
              className="inline-block px-4 py-2 mb-6 md:mb-8 bg-white cursor-pointer border-4 border-black shadow-[4px_4px_0_0_#111111]"
            >
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-black">Autodidact Full-Stack Dev</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-black drop-shadow-[4px_4px_0_#0055FF]">
              Mohamad <br />
              Khoerul Fahmi.
            </h1>

            {/* IMPLEMENTASI TEKS INTERAKTIF DI SINI */}
            <div className="text-base md:text-lg text-black font-bold max-w-md mx-auto md:mx-0 mb-8 md:mb-10">
              <EditableText initialText="Belajar coding secara otodidak. Menguasai ekosistem Termux untuk merancang logika bot Discord, otomasi server, dan rekayasa web." />
            </div>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#about" 
              className="inline-flex items-center justify-center gap-3 brutal-btn px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest rounded-full cursor-pointer w-full md:w-auto text-sm md:text-base"
            >
              Kenali Lebih Lanjut <ArrowRight size={20} />
            </motion.a>
          </motion.div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <AbstractHeroArt />
          </div>
        </section>

        <Marquee />

        {/* --- ABOUT ME & TECH STACK SECTION --- */}
        <section id="about" className="mb-24 md:mb-40 mt-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brutal-box p-8 md:p-12 bg-white text-black shadow-[8px_8px_0_0_#111111]"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-[#0055FF]">Tentang Saya.</h2>
            <div className="space-y-4 text-sm md:text-base font-bold leading-relaxed opacity-90 border-l-4 border-[#FF007F] pl-4">
              <p>
                Halo! Aku Mohamad Khoerul Fahmi, sering dipanggil <span className="text-black bg-[#FFD700] px-2 py-0.5 border-2 border-black font-black">Fahmi</span>. Kesukaanku berpusat pada eksplorasi Teknologi dan <i>Artificial Intelligence (AI)</i>.
              </p>
              <p>
                Saat ini aku adalah seorang <strong>Prompt Engineer & Software Engineer</strong> amatir namun bersemangat. Aku sangat suka merancang dan membuat berbagai macam karya digital seperti website interaktif, automasi Discord Bot, dan sistem-sistem logika lainnya.
              </p>
              <p>
                Membangun sesuatu dari barisan kode kosong hingga menjadi program yang bisa berinteraksi dengan pengguna nyata adalah kepuasan terbesarku. Aku selalu tertantang untuk mempelajari bahasa pemrograman baru dan mengasah logika *backend* maupun estetika *frontend*.
              </p>
            </div>

            {/* Grid Teknologi */}
            <div className="mt-12">
              <h3 className="font-black text-xl md:text-2xl uppercase mb-6 text-black text-center md:text-left underline decoration-4 decoration-[#FFD700]">Tech Stack & Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="brutal-box p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-3 hover:-translate-y-2 transition-transform cursor-pointer">
                  <Code2 size={28} className="text-[#0055FF]" />
                  <span className="font-black text-xs md:text-sm uppercase text-center">React / Vite</span>
                </div>
                <div className="brutal-box p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-3 hover:-translate-y-2 transition-transform cursor-pointer">
                  <Server size={28} className="text-[#FF007F]" />
                  <span className="font-black text-xs md:text-sm uppercase text-center">Node.js</span>
                </div>
                <div className="brutal-box p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-3 hover:-translate-y-2 transition-transform cursor-pointer">
                  <FileJson size={28} className="text-[#FFD700]" />
                  <span className="font-black text-xs md:text-sm uppercase text-center">Vanilla JS</span>
                </div>
                <div className="brutal-box p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-3 hover:-translate-y-2 transition-transform cursor-pointer">
                  <Palette size={28} className="text-[#00BFFF]" />
                  <span className="font-black text-xs md:text-sm uppercase text-center">Tailwind CSS</span>
                </div>
                <div className="brutal-box p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-3 hover:-translate-y-2 transition-transform cursor-pointer">
                  <Globe size={28} className="text-[#E34F26]" />
                  <span className="font-black text-xs md:text-sm uppercase text-center">HTML & CSS</span>
                </div>
                <div className="brutal-box p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-3 hover:-translate-y-2 transition-transform cursor-pointer">
                  <Terminal size={28} className="text-black" />
                  <span className="font-black text-xs md:text-sm uppercase text-center">Termux CLI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- JEJAK & PERSENJATAAN (Timeline) --- */}
        <section id="timeline" ref={timelineRef} className="mb-24 md:mb-40 mt-10 relative z-10">
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
              
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-[#FFD700] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <GraduationCap size={32} className="text-black" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-white flex flex-col w-full hover:-translate-y-2 transition-transform">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-2">Sekolah Dasar</h3>
                  <p className="text-sm md:text-base font-bold text-black/70 uppercase">MI-Alfalah Tanjakan <br/>Krangkeng, Indramayu.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-[#0055FF] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <GraduationCap size={32} className="text-white" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-white flex flex-col w-full hover:-translate-y-2 transition-transform relative overflow-hidden">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-2">SMP</h3>
                  <p className="text-sm md:text-base font-bold text-black/70 uppercase">SMPN Satap 1 Krangkeng.</p>
                  <span className="absolute top-6 right-6 text-black bg-[#FFD700] px-3 py-1 text-xs font-black uppercase border-2 border-black rotate-3">Lulus</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-gray-200 border-dashed rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <GraduationCap size={32} className="text-gray-400" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-gray-100 border-dashed flex flex-col w-full opacity-90 hover:-translate-y-2 transition-transform">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-2 text-gray-600">SMK</h3>
                  <p className="text-sm md:text-base font-bold text-gray-500 uppercase">Status: Belum Masuk.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex items-center gap-6 md:gap-10">
                <motion.div whileHover={{ rotate: 15 }} className="w-16 h-16 md:w-20 md:h-20 shrink-0 brutal-box bg-[#FF007F] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-1 md:ml-2">
                  <Smartphone size={32} className="text-white" />
                </motion.div>
                <div className="brutal-box p-6 md:p-8 bg-white text-black flex flex-col w-full hover:-translate-y-2 transition-transform shadow-[6px_6px_0_0_#FF007F]">
                  <h3 className="font-black text-xl md:text-2xl uppercase mb-4 text-[#FF007F]">Perangkat Utama</h3>
                  <p className="text-sm md:text-lg font-black text-black uppercase leading-relaxed">
                    <span className="bg-black text-white px-2 py-1 mr-2">Vivo Y12</span> <br className="md:hidden" />
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
              Geser dan tabrakan 2 balok keahlian yang cocok untuk menciptakan <b>EVOLUSI</b> baru! (Contoh: Frontend + Backend)
            </p>
          </div>
          
          <div ref={sandboxRef} className="w-full h-[350px] md:h-[400px] brutal-box relative overflow-hidden bg-white touch-none">
            {fusionMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 brutal-box bg-black text-[#FFD700] px-6 py-3 z-50 animate-bounce"
              >
                <span className="font-black text-sm md:text-base uppercase tracking-widest">{fusionMessage}</span>
              </motion.div>
            )}

            {blocks.map((block) => (
              <motion.div
                key={block.id}
                ref={(el) => (blockRefs.current[block.id] = el)}
                drag
                dragConstraints={sandboxRef}
                onDragEnd={(e, info) => handleDragEnd(e, info, block.id)}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                whileHover={{ scale: 1.05 }}
                style={{ left: block.x, top: block.y }}
                className={`absolute p-4 md:p-6 border-4 border-black shadow-[4px_4px_0_0_#111111] cursor-grab w-[130px] md:w-[150px] lg:w-[180px] select-none ${block.bg} ${block.text}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-2 md:mb-3 pointer-events-none">
                  {block.icon}
                  <h3 className="font-black text-[10px] md:text-xs lg:text-sm uppercase tracking-tight">{block.title}</h3>
                </div>
                <p className="text-[9px] md:text-[10px] lg:text-xs font-bold pointer-events-none uppercase tracking-wider opacity-90">{block.desc}</p>
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
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-4 brutal-box bg-[#FF007F] text-black hover:bg-[#111111] hover:text-white rounded-full text-sm md:text-base font-black uppercase tracking-widest transition-colors group"
              >
                <Heart size={20} className="fill-black stroke-black group-hover:fill-white group-hover:stroke-white transition-colors" /> 
                <span>Dukung / Donate</span>
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="w-full md:w-auto flex justify-center"
            >
              <a href="https://discord.com/users/1099980838722088991" target="_blank" rel="noreferrer" className="inline-block brutal-box p-2 bg-[#0055FF] hover:-translate-y-2 transition-transform">
                <img src="https://discord-catwidget.koyeb.app/widget/1099980838722088991.png" alt="Discord Status Widget" className="w-full max-w-[280px] md:max-w-[320px] border-2 border-black bg-black" />
              </a>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex justify-center gap-4 md:gap-6 mb-12 flex-wrap"
          >
            <motion.a whileHover={{ y: -5 }} href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FFD700] transition-colors">
              <Github size={24} />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://discord.scarily.my.id" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#5865F2] hover:text-white transition-colors">
              <DiscordIcon />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://tiktok.com/@mizephyrz" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FF007F] hover:text-white transition-colors">
              <TiktokIcon />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="mailto:contact@mifahmi.my.id" className="w-12 h-12 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#0055FF] hover:text-white transition-colors">
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
