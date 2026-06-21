import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Grid, MapPin, Bot, Sparkles, Globe, ArrowUpRight, BookOpen, GraduationCap, Award } from 'lucide-react';

export default function Portfolio() {
  const [searchValue, setSearchValue] = useState("Karya dan Profil MohFahmiMc");
  const [isSearching, setIsSearching] = useState(false);

  // Pewarnaan akurat ala Google
  const googleColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  const nameLetters = [
    { char: 'M', color: 'text-[#4285F4]' },
    { char: 'o', color: 'text-[#EA4335]' },
    { char: 'h', color: 'text-[#FBBC05]' },
    { char: 'F', color: 'text-[#4285F4]' },
    { char: 'a', color: 'text-[#34A853]' },
    { char: 'h', color: 'text-[#EA4335]' },
    { char: 'm', color: 'text-[#FBBC05]' },
    { char: 'i', color: 'text-[#34A853]' },
    { char: 'M', color: 'text-[#4285F4]' },
    { char: 'c', color: 'text-[#EA4335]' }
  ];

  const education = [
    {
      level: "Sekolah Dasar",
      school: "MI Al-Falah Tanjakan",
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: "bg-[#4285F4]"
    },
    {
      level: "Sekolah Menengah Pertama",
      school: "SMP 1 Atap 1 Krangkeng",
      icon: <Award className="w-5 h-5 text-white" />,
      color: "bg-[#EA4335]"
    },
    {
      level: "Sekolah Menengah Kejuruan",
      school: "SMK NU Kamplongan",
      desc: "Krangkeng, Indramayu. Jurusan TKJ / TSM.",
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      color: "bg-[#34A853]"
    }
  ];

  const projects = [
    {
      title: "Zephyr Bot",
      desc: "Discord bot multifungsi dengan fitur moderasi, sistem ekonomi, dan integrasi premium.",
      url: "https://zephyr.mifahmi.my.id",
      icon: <Bot className="w-8 h-8 text-[#4285F4]" />,
      tags: ["Discord.js", "Node.js", "Server"],
      hoverBorder: "hover:border-[#4285F4]",
      hoverShadow: "hover:shadow-blue-100"
    },
    {
      title: "Zephyr AI Character",
      desc: "Eksperimen kecerdasan buatan untuk interaksi karakter dinamis dan natural.",
      url: "https://zephyr.mifahmi.my.id/ai/character",
      icon: <Sparkles className="w-8 h-8 text-[#FBBC05]" />,
      tags: ["AI", "Character", "Prompt"],
      hoverBorder: "hover:border-[#FBBC05]",
      hoverShadow: "hover:shadow-yellow-100"
    },
    {
      title: "mifahmi.my.id Web Services",
      desc: "Infrastruktur layanan web, hosting, dan optimasi SEO via Google Search Console.",
      url: "https://mifahmi.my.id",
      icon: <Globe className="w-8 h-8 text-[#34A853]" />,
      tags: ["React", "Vercel", "SEO"],
      hoverBorder: "hover:border-[#34A853]",
      hoverShadow: "hover:shadow-green-100"
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-[#202124] font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* Top Navbar ala Google */}
      <nav className="flex justify-end items-center p-4 gap-4 text-sm font-medium">
        <a href="#results" className="hover:underline hidden sm:block">Penelusuran</a>
        <a href="#education" className="hover:underline hidden sm:block">Pendidikan</a>
        <motion.div whileHover={{ bg: "#f1f3f4" }} className="p-2 rounded-full cursor-pointer transition-colors">
          <Grid className="w-5 h-5 text-gray-600" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-8 h-8 bg-[#4285F4] text-white rounded-full flex items-center justify-center font-bold cursor-pointer shadow-sm"
        >
          M
        </motion.div>
      </nav>

      {/* Hero Section (Search Engine Style) */}
      <section className="flex flex-col items-center justify-center mt-20 px-4 min-h-[50vh]">
        
        {/* Animated Google-style Logo */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-8 select-none"
        >
          {nameLetters.map((item, index) => (
            <motion.span 
              key={index} 
              className={item.color}
              whileHover={{ y: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.char}
            </motion.span>
          ))}
        </motion.div>

        {/* Search Bar Interactive */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl relative"
        >
          <div className="flex items-center w-full px-5 py-3.5 bg-white border border-[#dfe1e5] rounded-full hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] focus-within:shadow-[0_1px_6px_rgba(32,33,36,0.28)] focus-within:border-transparent transition-all duration-300 group">
            <Search className="w-5 h-5 text-[#9aa0a6] mr-4" />
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[16px] text-[#202124]"
            />
            <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer ml-3">
              <Mic className="w-5 h-5 text-[#4285F4]" />
            </motion.div>
          </div>

          {/* Search Buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <motion.button 
              whileHover={{ border: "1px solid #dadce0", boxShadow: "0 1px 1px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              className="bg-[#f8f9fa] border border-[#f8f9fa] text-[#3c4043] px-6 py-2.5 rounded text-sm transition-all"
            >
              Penelusuran Project
            </motion.button>
            <motion.button 
              whileHover={{ border: "1px solid #dadce0", boxShadow: "0 1px 1px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('education').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#f8f9fa] border border-[#f8f9fa] text-[#3c4043] px-6 py-2.5 rounded text-sm transition-all"
            >
              Saya Lagi Beruntung
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Loading Bar Animation (Triggers on search) */}
      {isSearching && (
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.6 }}
          className="h-1 bg-[#4285F4] fixed top-0 left-0 z-50"
        />
      )}

      {/* Main Content Area (Results) */}
      <div id="results" className="max-w-4xl mx-auto px-4 py-12 md:py-24">
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#70757a] text-sm mb-12"
        >
          Sekitar {projects.length + education.length} hasil (0,24 detik)
        </motion.p>

        {/* --- PROJECTS SECTION (Material 3 Cards) --- */}
        <div className="mb-20">
          <h2 className="text-2xl text-[#202124] mb-8 font-normal flex items-center gap-2">
            <Search className="w-6 h-6 text-[#4285F4]" />
            Hasil Penelusuran Web
          </h2>
          
          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`group block bg-white p-6 rounded-3xl border border-[#dadce0] shadow-sm transition-all duration-300 hover:-translate-y-1 ${project.hoverBorder} ${project.hoverShadow}`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Icon Box */}
                  <div className="bg-[#f8f9fa] p-4 rounded-2xl group-hover:scale-105 transition-transform">
                    {project.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#202124]">{project.url.replace('https://', '')}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#70757a] group-hover:text-[#4285F4] transition-colors" />
                    </div>
                    <h3 className="text-xl text-[#1a0dab] group-hover:underline font-medium mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[#4d5156] leading-relaxed mb-4 text-sm md:text-base">
                      {project.desc}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-[#f1f3f4] text-[#3c4043] text-xs font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* --- EDUCATION TIMELINE (Knowledge Panel Style) --- */}
        <div id="education" className="mb-10">
          <h2 className="text-2xl text-[#202124] mb-8 font-normal flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#34A853]" />
            Panel Pengetahuan: Pendidikan
          </h2>

          <div className="bg-white border border-[#dadce0] rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[28px] before:w-0.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:bg-[#f1f3f4]">
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-6"
                >
                  {/* Icon Timeline */}
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-white ${edu.color} shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:scale-110 transition-transform z-10`}>
                    {edu.icon}
                  </div>
                  
                  {/* Card Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-transparent hover:border-[#dadce0] hover:bg-[#f8f9fa] transition-all cursor-default">
                    <div className="flex flex-col mb-1">
                      <span className="text-sm font-medium text-[#70757a] uppercase tracking-wider">{edu.level}</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#202124]">{edu.school}</h3>
                    {edu.desc && <p className="text-[#4d5156] mt-2 text-sm">{edu.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer ala Google */}
      <footer className="bg-[#f2f2f2] text-[#70757a] text-sm">
        <div className="px-6 py-3 border-b border-[#dadce0] flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">Krangkeng, Indramayu</span>
          <span className="mx-2 text-[#dadce0]">|</span>
          <span>Berdasarkan aktivitas Anda</span>
        </div>
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#3c4043]">Bantuan</a>
            <a href="#" className="hover:text-[#3c4043]">Privasi</a>
            <a href="#" className="hover:text-[#3c4043]">Persyaratan</a>
          </div>
          <div>
            &copy; 2026 MohFahmiMc
          </div>
        </div>
      </footer>
    </div>
  );
}
