import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, LayoutGrid, Server, Gamepad2 } from 'lucide-react';

export default function Portfolio() {
  const [isHovered, setIsHovered] = useState(false);

  // Pewarnaan teks ala Google untuk tulisan MohFahmiMc
  const nameLetters = "MohFahmiMc".split("");
  const googleColors = [
    "text-blue-500", "text-red-500", "text-yellow-500", "text-blue-500", 
    "text-green-500", "text-red-500", "text-yellow-500", "text-blue-500",
    "text-green-500", "text-red-500"
  ];

  const projects = [
    {
      title: "Zephyr Bot",
      desc: "Discord bot multifungsi dengan fitur moderasi, sistem ekonomi, dan integrasi premium.",
      icon: <Server className="text-blue-500 w-8 h-8 mb-4" />,
      color: "hover:border-blue-500"
    },
    {
      title: "mifahmi.my.id Web Services",
      desc: "Infrastruktur layanan web dan hosting dengan optimasi SEO via Google Search Console.",
      icon: <LayoutGrid className="text-red-500 w-8 h-8 mb-4" />,
      color: "hover:border-red-500"
    },
    {
      title: "Stickman Ultra Craft",
      desc: "Game survival 2D bergaya Minecraft yang dibangun menggunakan Godot Engine.",
      icon: <Gamepad2 className="text-green-500 w-8 h-8 mb-4" />,
      color: "hover:border-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-200 overflow-x-hidden">
      
      {/* Header Sticky */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-bold tracking-tighter flex"
        >
          {nameLetters.map((letter, index) => (
            <span key={index} className={googleColors[index]}>{letter}</span>
          ))}
        </motion.h1>
        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-transform cursor-pointer">
          M
        </div>
      </header>

      {/* Hero Section - Ala Google Search */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl flex flex-col items-center"
        >
          {/* Logo Tengah */}
          <div className="flex justify-center mb-8 text-5xl md:text-7xl font-bold tracking-tighter">
            {nameLetters.map((letter, index) => (
              <span key={index} className={googleColors[index]}>{letter}</span>
            ))}
          </div>

          {/* Interactive Search Bar */}
          <motion.div 
            whileHover={{ boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }}
            className="flex items-center bg-white border border-gray-200 rounded-full px-6 py-4 shadow-sm hover:shadow-md transition-shadow w-full max-w-xl"
          >
            <Search className="text-gray-400 w-5 h-5 mr-3" />
            <input 
              type="text" 
              readOnly
              value="Mohamad Khoerul Fahmi - Fullstack & Game Dev"
              className="flex-1 outline-none text-gray-700 bg-transparent cursor-default text-sm md:text-base truncate"
            />
            <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
              <Mic className="text-blue-500 w-5 h-5 ml-3" />
            </motion.div>
          </motion.div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 md:gap-4 mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="bg-gray-50 text-gray-700 border border-gray-200 px-4 md:px-6 py-2 rounded-md text-sm hover:border-gray-300"
            >
              Penelusuran Project
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="bg-gray-50 text-gray-700 border border-gray-200 px-4 md:px-6 py-2 rounded-md text-sm hover:border-gray-300"
            >
              {isHovered ? "Scroll ke bawah!" : "Saya Lagi Beruntung"}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Interactive Animation Spacer (Random Box) */}
      <section className="h-40 md:h-64 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, rotate: 360 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-tr from-blue-400 via-red-400 to-yellow-400 shadow-lg cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        >
          <span className="flex h-full w-full items-center justify-center text-white text-xs md:text-sm font-bold text-center drop-shadow-md">
            Tarik<br/>Aku!
          </span>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen px-6 py-20 bg-gray-50 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl mb-12 flex items-center gap-3 border-b border-gray-200 pb-4"
        >
          <span className="text-xl font-normal text-gray-800">Sekitar {projects.length} hasil (0,24 detik)</span>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ${project.color}`}
            >
              {project.icon}
              <h3 className="text-lg md:text-xl font-medium text-blue-600 mb-2 hover:underline cursor-pointer">
                {project.title}
              </h3>
              <p className="text-green-700 text-xs mb-3">https://mohfahmimc.vercel.app › {project.title.toLowerCase().replace(/\s/g, '-')}</p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {project.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
