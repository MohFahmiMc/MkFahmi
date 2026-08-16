import React, { useRef, useState, useEffect, memo } from 'react';
import { 
  Github, Code2, Globe, Terminal, Server, Mail, Cpu, ArrowRight, Heart, 
  MapPin, FileJson, Palette, Zap, Cpu as BrainCircuit, Database, Cloud, Star, Instagram, Wrench, Sparkles, Play
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { DiscordIcon, TiktokIcon } from '../components/Icons';
import EditableText from '../components/EditableText';
import Marquee from '../components/Marquee';
import AbstractHeroArt from '../components/AbstractHeroArt';
import { projectsData } from '../data/projectsData';
import CommentSection from '../components/CommentSection';
import HeroLikeButton from '../components/HeroLikeButton';
import Navbar from '../components/Navbar';
import TimelineSection from '../components/TimelineSection';

// Sub-komponen Facade Iframe untuk Hemat Memori Mobile
const LazyProjectIframe = memo(({ url, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-[calc(100%-2rem)] md:h-[calc(100%-3rem)] bg-gray-100 flex items-center justify-center">
      {!isLoaded ? (
        <div className="flex flex-col items-center gap-3 p-4 text-center">
          <p className="font-bold text-xs uppercase text-gray-600">Klik untuk memuat preview interaktif</p>
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-[#FFD700] border-2 border-black font-black text-xs uppercase tracking-widest shadow-[3px_3px_0_0_#FF007F] hover:bg-[#FF007F] hover:text-white transition-colors cursor-pointer"
          >
            <Play size={14} className="fill-current" /> Live Demo
          </button>
        </div>
      ) : (
        <iframe 
          src={url} 
          className="w-full h-full border-none" 
          title={title}
          loading="lazy"
        />
      )}
    </div>
  );
});

export default function HomeView({ navigate, isRootAccess, setIsRootAccess }) {
  const sandboxRef = useRef(null);
  const timelineRef = useRef(null);
  const blockRefs = useRef({});
  
  const [fusionMessage, setFusionMessage] = useState("");
  const [secretClicks, setSecretClicks] = useState(0);
  const [blocks, setBlocks] = useState([]);
  
  const [aboutText, setAboutText] = useState("Belajar coding secara otodidak. Menguasai ekosistem Termux untuk merancang logika bot Discord, otomasi server, dan rekayasa web.");
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const [aboutMeText, setAboutMeText] = useState("Halo! Aku Mohamad Khoerul Fahmi, sering dipanggil Fahmi. Kesukaanku berpusat pada eksplorasi Teknologi dan Artificial Intelligence (AI).\n\nSaat ini aku adalah seorang Prompt Engineer & Software Engineer amatir namun bersemangat. Aku sangat suka merancang dan membuat berbagai macam karya digital seperti website interaktif, automasi Discord Bot, dan sistem-sistem logika lainnya.\n\nMembangun sesuatu dari barisan kode kosong hingga menjadi program yang bisa berinteraksi dengan pengguna nyata adalah kepuasan terbesarku. Aku selalu tertantang untuk mempelajari bahasa pemrograman baru dan mengasah logika backend maupun estetika frontend.");
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);

  const [achievement, setAchievement] = useState(null);

  const { scrollYProgress: mainScroll } = useScroll();
  const scaleXMain = useTransform(mainScroll, [0, 1], [0, 1]);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"]
  });

  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    const initialBlocks = [
      { id: '1', title: 'Logic', icon: <Cpu size={18} />, desc: 'AI Prompt', x: 15, y: 15, bg: 'bg-[#FFD700]', text: 'text-black', type: 'AI' },
      { id: '2', title: 'UI/UX', icon: <Code2 size={18} />, desc: 'Frontend', x: 130, y: 50, bg: 'bg-[#0055FF]', text: 'text-white', type: 'FE' },
      { id: '3', title: 'Scripts', icon: <Terminal size={18} />, desc: 'Python', x: 20, y: 120, bg: 'bg-[#FF007F]', text: 'text-white', type: 'PY' },
      { id: '4', title: 'Backend', icon: <Server size={18} />, desc: 'Node.js', x: 130, y: 160, bg: 'bg-white', text: 'text-black', type: 'BE' },
    ];

    if (isDesktop) {
      initialBlocks[0].x = 20; initialBlocks[0].y = 20;
      initialBlocks[1].x = 180; initialBlocks[1].y = 60;
      initialBlocks[2].x = 30; initialBlocks[2].y = 150;
      initialBlocks[3].x = 180; initialBlocks[3].y = 200;
      initialBlocks.push({ id: '5', title: 'Database', icon: <Database size={18} />, desc: 'MongoDB', x: 380, y: 40, bg: 'bg-black', text: 'text-white', type: 'DB' });
      initialBlocks.push({ id: '6', title: 'Cloud', icon: <Cloud size={18} />, desc: 'Hosting', x: 390, y: 180, bg: 'bg-gray-200', text: 'text-black', type: 'CLOUD' });
    }
    setBlocks(initialBlocks);
  }, []);

  const scrollToSection = (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const triggerUnlockRoot = (sourceInfo) => {
    setIsRootAccess(true);
    setAchievement({ 
      title: "ACHIEVEMENT UNLOCKED", 
      desc: `${sourceInfo}! Akses root terbuka, klik bar notifikasi ini atau isi About untuk mengedit.` 
    });
    
    setTimeout(() => {
      setAchievement(null);
    }, 5000);
  };

  const handleNavSecretClick = () => {
    const nextClick = secretClicks + 1;
    setSecretClicks(nextClick);
    if (nextClick === 5) {
      triggerUnlockRoot("Akses root diberikan dari Terminal Termux");
      setSecretClicks(0);
    }
  };

  const handleDesktopNameClick = () => {
    if (window.innerWidth >= 768) {
      triggerUnlockRoot("Akses root diberikan via Monitor click nama");
    }
  };

  const handleAchievementClick = (e) => {
    if (e) e.preventDefault();
    setIsRootAccess(true);
    setIsEditingAbout(true);
  };

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

        const rules = {
          'BE+FE': { title: 'Fullstack', desc: 'Web Master', bg: 'bg-black', text: 'text-[#FFD700]', type: 'FULL', icon: <Zap size={18}/> },
          'AI+PY': { title: 'AI Engineer', desc: 'AI Systems', bg: 'bg-[#FF007F]', text: 'text-white', type: 'AI_ENG', icon: <BrainCircuit size={18}/> },
          'CLOUD+DB': { title: 'SysAdmin', desc: 'Infrastructure', bg: 'bg-[#0055FF]', text: 'text-white', type: 'SYS', icon: <Server size={18}/> },
          'FULL+SYS': { title: 'Architect', desc: 'Tech Lead', bg: 'bg-white', text: 'text-black', type: 'ARCH', icon: <Globe size={18}/> },
          'AI_ENG+FULL': { title: 'AI Dev', desc: 'Smart Apps', bg: 'bg-[#FFD700]', text: 'text-black', type: 'AIDEV', icon: <Code2 size={18}/> },
          'AI_ENG+SYS': { title: 'AI Ops', desc: 'Model Server', bg: 'bg-gray-800', text: 'text-white', type: 'AIOPS', icon: <Database size={18}/> },
          'ARCH+AIDEV': { title: 'MKF CORE', icon: <Star size={18}/>, desc: 'Singularity', bg: 'bg-black border-[#FF007F]', text: 'text-[#FF007F]', type: 'ULTIMATE' },
          'ARCH+AIOPS': { title: 'MKF CORE', icon: <Star size={18}/>, desc: 'Singularity', bg: 'bg-black border-[#FF007F]', text: 'text-[#FF007F]', type: 'ULTIMATE' },
          'AIDEV+AIOPS': { title: 'MKF CORE', icon: <Star size={18}/>, desc: 'Singularity', bg: 'bg-black border-[#FF007F]', text: 'text-[#FF007F]', type: 'ULTIMATE' }
        };

        if (rules[pair]) {
          evolvedBlock = { id: Date.now().toString(), ...rules[pair] };
        }

        if (evolvedBlock) {
          hasFused = true;
          const sandboxRect = sandboxRef.current.getBoundingClientRect();
          evolvedBlock.x = b2.left - sandboxRect.left;
          evolvedBlock.y = b2.top - sandboxRect.top;

          setFusionMessage(`EVOLUSI: ${evolvedBlock.title.toUpperCase()} TERBENTUK!`);
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
      
      <AnimatePresence>
        {achievement && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            onClick={handleAchievementClick}
            className="fixed top-16 md:top-4 left-3 md:left-4 z-[99999] bg-[#FFD700] border-2 border-black p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2 shadow-[3px_3px_0_0_#111111] md:shadow-[4px_4px_0_0_#111111] max-w-[230px] sm:max-w-[280px] md:max-w-xs cursor-pointer hover:bg-yellow-300 transition-colors"
          >
            <div className="w-6 h-6 md:w-7 md:h-7 bg-black flex items-center justify-center rounded-full shrink-0 border border-white animate-spin-slow">
              <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#FFD700]" />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-black text-[10px] md:text-xs uppercase text-black mb-0.5 tracking-tight flex items-center gap-1">
                {achievement.title} <Zap className="w-2.5 h-2.5 md:w-2.5 md:h-2.5 fill-black" />
              </h4>
              <p className="font-bold text-[8px] md:text-[10px] text-black leading-tight truncate">
                {achievement.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ scaleX: scaleXMain }} className="fixed top-0 left-0 right-0 h-1.5 md:h-2 bg-[#FF007F] origin-left z-[9999]" />

      <Navbar 
        navigate={navigate} 
        scrollToSection={scrollToSection} 
        handleNavSecretClick={handleNavSecretClick} 
      />

      <main className="max-w-6xl mx-auto px-3.5 sm:px-6 md:px-12 pt-20 sm:pt-24 md:pt-48 pb-12 md:pb-20 flex flex-col items-stretch overflow-visible">

        {/* HERO */}
        <section id="hero" className="min-h-[60vh] md:min-h-[75vh] flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12 mb-12 md:mb-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full text-center md:text-left"
          >
            <motion.div 
              whileTap={{ scale: 0.9, rotate: -2, backgroundColor: "#FFD700" }}
              whileHover={{ scale: 1.05 }}
              className="inline-block px-3 py-1 mb-4 md:px-4 md:py-2 md:mb-8 bg-white cursor-pointer border-2 md:border-4 border-black shadow-[3px_3px_0_0_#111111] md:shadow-[4px_4px_0_0_#111111] select-none"
            >
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black tracking-widest uppercase text-black">Autodidact Full-Stack Dev</span>
            </motion.div>
            
            <motion.h1 
              whileTap={{ scale: 0.95, x: 10, color: "#FF007F" }}
              onClick={handleDesktopNameClick}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[0.95] md:leading-[0.9] mb-3 md:mb-6 uppercase text-black drop-shadow-[2px_2px_0_#0055FF] md:drop-shadow-[4px_4px_0_#0055FF] cursor-pointer select-none transition-colors duration-300 md:hover:text-[#0055FF]"
            >
              Mohamad <br />
              Khoerul Fahmi.
            </motion.h1>

            <HeroLikeButton />

            <div className="text-xs sm:text-sm md:text-lg text-black font-bold max-w-md mx-auto md:mx-0 mb-6 md:mb-10 mt-4 md:mt-8">
              <EditableText 
                text={aboutText}
                setText={setAboutText}
                isEditing={isEditingAbout}
                setIsEditing={setIsEditingAbout}
                isRootAccess={isRootAccess}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')}
                className="inline-flex items-center justify-center gap-2 md:gap-3 brutal-btn px-5 py-2.5 md:px-8 md:py-4 font-black uppercase tracking-widest rounded-full cursor-pointer w-full sm:w-auto text-xs md:text-base"
              >
                Kenali Lebih Lanjut <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
            </div>
          </motion.div>

          <div className="flex-1 w-full flex justify-center md:justify-end scale-90 sm:scale-100 origin-center">
            <AbstractHeroArt />
          </div>
        </section>

        <Marquee />

        {/* ABOUT */}
        <section id="about" className="mb-16 md:mb-40 mt-6 md:mt-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="brutal-box p-5 sm:p-8 md:p-12 bg-white text-black shadow-[4px_4px_0_0_#111111] md:shadow-[8px_8px_0_0_#111111]"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 md:mb-6 text-[#0055FF]">Tentang Saya.</h2>
            
            <div className="text-xs sm:text-sm md:text-base font-bold leading-relaxed opacity-90">
              <EditableText 
                text={aboutMeText}
                setText={setAboutMeText}
                isEditing={isEditingAboutMe}
                setIsEditing={setIsEditingAboutMe}
                isRootAccess={isRootAccess}
                borderColorClass="border-[#FF007F]"
              />
            </div>

            <div className="mt-8 md:mt-12">
              <h3 className="font-black text-base sm:text-xl md:text-2xl uppercase mb-4 md:mb-6 text-black text-center md:text-left underline decoration-2 md:decoration-4 decoration-[#FFD700]">Tech Stack & Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
                <div className="brutal-box p-2.5 md:p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform cursor-pointer">
                  <Code2 className="w-5 h-5 md:w-7 md:h-7 text-[#0055FF]" />
                  <span className="font-black text-[10px] sm:text-xs md:text-sm uppercase text-center">React / Vite</span>
                </div>
                <div className="brutal-box p-2.5 md:p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform cursor-pointer">
                  <Server className="w-5 h-5 md:w-7 md:h-7 text-[#FF007F]" />
                  <span className="font-black text-[10px] sm:text-xs md:text-sm uppercase text-center">Node.js</span>
                </div>
                <div className="brutal-box p-2.5 md:p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform cursor-pointer">
                  <FileJson className="w-5 h-5 md:w-7 md:h-7 text-[#FFD700]" />
                  <span className="font-black text-[10px] sm:text-xs md:text-sm uppercase text-center">Vanilla JS</span>
                </div>
                <div className="brutal-box p-2.5 md:p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform cursor-pointer">
                  <Palette className="w-5 h-5 md:w-7 md:h-7 text-[#00BFFF]" />
                  <span className="font-black text-[10px] sm:text-xs md:text-sm uppercase text-center">Tailwind CSS</span>
                </div>
                <div className="brutal-box p-2.5 md:p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform cursor-pointer">
                  <Globe className="w-5 h-5 md:w-7 md:h-7 text-[#E34F26]" />
                  <span className="font-black text-[10px] sm:text-xs md:text-sm uppercase text-center">HTML & CSS</span>
                </div>
                <div className="brutal-box p-2.5 md:p-4 bg-[#f4f4f0] text-black flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform cursor-pointer">
                  <Terminal className="w-5 h-5 md:w-7 md:h-7 text-black" />
                  <span className="font-black text-[10px] sm:text-xs md:text-sm uppercase text-center">Termux CLI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <TimelineSection 
          timelineRef={timelineRef} 
          timelineProgress={timelineProgress} 
        />

        {/* SANDBOX */}
        <section id="sandbox" className="mb-16 md:mb-40 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">Sandbox <br/>Evolusi.</h2>
            </div>
            <p className="text-black font-bold max-w-sm text-left md:text-right mt-2 md:mt-4 border-l-2 md:border-l-0 md:border-r-4 border-black pl-3 md:pl-0 md:pr-4 text-xs md:text-base">
              Geser dan tabrakan 2 balok keahlian yang cocok untuk menciptakan <b>EVOLUSI</b> baru sampai tersisa 1 balok!
            </p>
          </div>
          
          <div ref={sandboxRef} className="w-full h-[280px] sm:h-[320px] md:h-[400px] brutal-box relative overflow-hidden bg-white touch-none">
            {fusionMessage && (
              <div className="absolute top-3 md:top-6 left-1/2 -translate-x-1/2 brutal-box bg-black text-[#FFD700] px-3 py-1.5 md:px-6 md:py-3 z-50 animate-bounce">
                <span className="font-black text-[10px] sm:text-xs md:text-base uppercase tracking-widest">{fusionMessage}</span>
              </div>
            )}

            {blocks.map((block) => (
              <motion.div
                key={block.id}
                ref={(el) => (blockRefs.current[block.id] = el)}
                drag
                dragConstraints={sandboxRef}
                onDragEnd={(e, info) => handleDragEnd(e, info, block.id)}
                whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
                style={{ left: block.x, top: block.y }}
                className={`absolute p-2.5 sm:p-3 md:p-6 border-2 md:border-4 border-black shadow-[2px_2px_0_0_#111111] md:shadow-[4px_4px_0_0_#111111] cursor-grab w-[110px] sm:w-[130px] md:w-[150px] lg:w-[180px] select-none ${block.bg} ${block.text}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3 mb-1 md:mb-3 pointer-events-none">
                  <div className="shrink-0 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    {block.icon}
                  </div>
                  <h3 className="font-black text-[9px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-tight">{block.title}</h3>
                </div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold pointer-events-none uppercase tracking-wider opacity-90">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS (OPTIONAL LAZY IFRAME FOR SPEED) */}
        <section id="projects" className="mb-16 md:mb-40 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-8 md:mb-16 uppercase text-center text-black drop-shadow-[2px_2px_0_#FF007F] md:drop-shadow-[3px_3px_0_#FF007F]">
            Live <br/> Architectures.
          </h2>

          <div className="flex flex-col gap-10 sm:gap-12 md:gap-24 mb-10 md:mb-16">
            {projectsData.slice(0, 3).map((project, index) => (
              <div 
                key={index}
                className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center group"
              >
                <div className="w-full lg:w-1/3">
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`px-2 py-0.5 md:px-3 md:py-1 border-2 border-black font-black text-[9px] md:text-[10px] uppercase tracking-widest ${tag.color}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3 md:mb-6 uppercase leading-none text-black group-hover:text-[#0055FF] transition-colors">{project.title}</h3>
                  <p className="text-black font-bold text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-8">{project.descShort}</p>
                  
                  <button 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="inline-flex px-5 py-2.5 md:px-8 md:py-4 brutal-btn rounded-full text-xs md:text-sm font-black uppercase tracking-widest w-full md:w-auto justify-center"
                  >
                    Buka Halaman
                  </button>
                </div>

                <div className="w-full lg:w-2/3 h-[260px] sm:h-[320px] md:h-[550px] brutal-box p-0 overflow-hidden bg-white">
                  <div className="w-full h-8 md:h-12 bg-white border-b-2 md:border-b-4 border-black flex items-center px-3 md:px-6 gap-2 md:gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border md:border-2 border-black bg-[#FF007F]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border md:border-2 border-black bg-[#FFD700]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border md:border-2 border-black bg-[#0055FF]"></div>
                    <div className="ml-2 md:ml-4 text-[9px] md:text-xs font-black tracking-widest uppercase border-l-2 border-black pl-2 md:pl-4 text-black truncate">
                      {project.url.replace('https://', '')}
                    </div>
                  </div>
                  
                  {/* Panggil Facade Iframe Lazy Load */}
                  <LazyProjectIframe url={project.url} title={project.title} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center">
            <button 
              onClick={() => navigate('/project')}
              className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-white text-black border-2 md:border-4 border-black font-black uppercase text-xs md:text-base tracking-widest shadow-[4px_4px_0_0_#111111] md:shadow-[6px_6px_0_0_#111111] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#111111] md:hover:shadow-[4px_4px_0_0_#111111] transition-all rounded-xl"
            >
              Lihat Semua Project <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </section>

        <CommentSection />

        {/* BANNER LAYANAN JASA */}
        <section id="services-banner" className="my-12 md:my-28 relative z-10">
          <div className="brutal-box p-5 sm:p-8 md:p-12 bg-[#FFD700] text-black shadow-[6px_6px_0_0_#111111] md:shadow-[10px_10px_0_0_#111111] relative overflow-hidden rounded-2xl md:rounded-3xl">
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <Wrench size={260} className="text-black" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-full mb-3 md:mb-4 shadow-[2px_2px_0_0_#ffffff]">
                  <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#FFD700]" /> Solusi Digital & Automasi
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 md:mb-4 leading-tight">
                  Jasa Development & Automasi Bot Profesional.
                </h2>
                <p className="text-xs sm:text-sm md:text-base font-bold opacity-90 leading-relaxed">
                  Layanan pembuatan Bot Discord kustom, Website interaktif modern, Otomasi Server Termux, hingga Prompt Engineering AI terintegrasi.
                </p>
              </div>

              <div className="shrink-0 w-full lg:w-auto flex justify-center">
                <button 
                  onClick={() => navigate('/service')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3.5 md:px-10 md:py-5 brutal-box bg-white text-black hover:bg-black hover:text-white font-black text-xs sm:text-sm md:text-lg uppercase tracking-widest rounded-xl md:rounded-2xl transition-colors shadow-[4px_4px_0_0_#111111] md:shadow-[6px_6px_0_0_#111111]"
                >
                  <Wrench className="w-4 h-4 md:w-5 md:h-5" /> Halaman Layanan Jasa <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* KONTAK */}
        <section id="contact" className="pt-10 md:pt-20 border-t-4 md:border-t-8 border-black text-center relative z-10 bg-white/80 backdrop-blur-sm p-4 rounded-[1.5rem] md:rounded-[2rem]">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter mb-4 md:mb-8 uppercase text-black drop-shadow-[2px_2px_0_#FFD700] md:drop-shadow-[3px_3px_0_#FFD700]">Siap <br/>Membangun?</h2>
            <p className="text-black font-bold text-xs sm:text-sm md:text-lg max-w-lg mx-auto mb-6 md:mb-16 px-2 md:px-4">
              Mulai dari setup bot moderasi hingga pembuatan portfolio web profesional.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 mb-10 md:mb-24 px-2 md:px-4">
            <div className="flex flex-col gap-3 md:gap-4 w-full md:w-auto">
              <a 
                href="https://jasa.mifahmi.my.id" target="_blank" rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 md:py-5 brutal-btn rounded-full text-xs md:text-lg font-black uppercase tracking-widest"
              >
                Order Jasa Sekarang
              </a>
              <button 
                onClick={() => navigate('/service')}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 brutal-box bg-[#FFD700] text-black rounded-full text-xs md:text-base font-black uppercase tracking-widest transition-colors"
              >
                <Wrench className="w-4 h-4 md:w-5 md:h-5" /> Halaman Layanan
              </button>
              <a 
                href="https://support.scarily.my.id" target="_blank" rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 brutal-box bg-[#FF007F] text-black hover:bg-[#111111] hover:text-white rounded-full text-xs md:text-base font-black uppercase tracking-widest transition-colors group"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5 fill-black stroke-black group-hover:fill-white group-hover:stroke-white transition-colors" /> 
                <span>Dukung / Donate</span>
              </a>
            </div>

            <div className="w-full md:w-auto flex justify-center">
              <a href="https://discord.com/users/1099980838722088991" target="_blank" rel="noreferrer" className="inline-block brutal-box p-1.5 md:p-2 bg-[#0055FF] hover:-translate-y-1 md:hover:-translate-y-2 transition-transform">
                <img 
                  src="https://discord-catwidget.koyeb.app/widget/1099980838722088991.png" 
                  alt="Discord Status Widget" 
                  width="320" 
                  height="120"
                  loading="lazy" 
                  decoding="async"
                  className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] border-2 border-black bg-black" 
                />
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12 flex-wrap">
            <a href="https://github.com/MohFahmiMc" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FFD700] transition-colors">
              <Github className="w-4 h-4 md:w-6 md:h-6" />
            </a>
            <a href="https://instagram.com/mizephyr" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#E1306C] hover:text-white transition-colors">
              <Instagram className="w-4 h-4 md:w-6 md:h-6" />
            </a>
            <a href="https://discord.scarily.my.id" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#5865F2] hover:text-white transition-colors">
              <DiscordIcon />
            </a>
            <a href="https://tiktok.com/@mizephyrz" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#FF007F] hover:text-white transition-colors">
              <TiktokIcon />
            </a>
            <a href="mailto:contact@mifahmi.my.id" className="w-10 h-10 md:w-14 md:h-14 brutal-box bg-white rounded-full flex items-center justify-center text-black hover:bg-[#0055FF] hover:text-white transition-colors">
              <Mail className="w-4 h-4 md:w-6 md:h-6" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[9px] md:text-xs font-black tracking-widest uppercase border-t-2 md:border-t-4 border-black pt-4 md:pt-8 text-black">
            <p>© 2026 M.K FAHMI.</p>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <p>KRANGKENG, INDRAMAYU BASE</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
