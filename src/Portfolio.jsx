import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, LayoutGrid, Gamepad2, GraduationCap, MapPin, Sparkles, ChevronDown, Terminal, Cpu } from 'lucide-react';

export default function Portfolio() {
  const [isHovered, setIsHovered] = useState(false);

  // Data Pendidikan (Timeline)
  const education = [
    {
      level: "Sekolah Dasar",
      school: "MI Al-Falah Tanjakan",
      color: "bg-blue-500",
      delay: 0.2
    },
    {
      level: "Sekolah Menengah Pertama",
      school: "SMP 1 Atap 1 Krangkeng",
      color: "bg-purple-500",
      delay: 0.4
    },
    {
      level: "Sekolah Menengah Kejuruan",
      school: "SMK NU Kamplongan",
      desc: "Krangkeng, Indramayu. Fokus pada pengembangan skill teknis dan jaringan.",
      color: "bg-indigo-600",
      delay: 0.6
    }
  ];

  // Data Proyek
  const projects = [
    {
      title: "Zephyr Bot",
      desc: "Discord bot multifungsi dengan fitur moderasi, sistem ekonomi, dan integrasi premium.",
      icon: <Server className="w-8 h-8 mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />,
      tags: ["Discord.js", "Node.js", "MongoDB"]
    },
    {
      title: "mifahmi.my.id Web Services",
      desc: "Infrastruktur layanan web dan hosting dengan optimasi SEO via Google Search Console.",
      icon: <LayoutGrid className="w-8 h-8 mb-4 text-purple-500 group-hover:scale-110 transition-transform duration-300" />,
      tags: ["React", "Vercel", "SEO"]
    },
    {
      title: "Stickman Ultra Craft",
      desc: "Game survival 2D bergaya Minecraft yang dibangun menggunakan Godot Engine, lancar di HP.",
      icon: <Gamepad2 className="w-8 h-8 mb-4 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />,
      tags: ["Godot", "GDScript", "Game Dev"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800 font-sans selection:bg-indigo-200 overflow-hidden relative">
      
      {/* Background Ornaments (Random Interactive Elements) */}
      <motion.div 
        drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 cursor-grab active:cursor-grabbing z-0 hidden md:block"
      />
      <motion.div 
        drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="absolute top-40 right-20 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 cursor-grab active:cursor-grabbing z-0 hidden md:block"
      />

      {/* Header Sticky Glassmorphism */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white flex items-center justify-center font-bold shadow-lg transform rotate-3 hover:rotate-0 transition-all cursor-pointer">
            MK
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800 hidden md:block">
            MohFahmi<span className="text-indigo-600">Mc</span>
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4 items-center"
        >
          <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
            <MapPin className="w-4 h-4 mr-1 text-red-500" />
            Indramayu
          </div>
        </motion.div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Welcome to my interactive space</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Mohamad Khoerul Fahmi
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Seorang pelajar dan tech-enthusiast yang suka mengotak-atik kode, membangun infrastruktur server, dan menciptakan pengalaman digital yang menarik.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Terminal className="w-5 h-5" />
              Lihat Project Saya
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('education').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-white text-gray-800 border border-gray-200 rounded-xl font-medium shadow-sm flex items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              Riwayat Pendidikan
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-gray-400 flex flex-col items-center"
        >
          <span className="text-sm mb-2 font-medium">Scroll ke bawah</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* EDUCATION TIMELINE SECTION */}
      <section id="education" className="py-24 bg-white relative z-10 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Jejak Pendidikan</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative border-l-4 border-indigo-100 ml-3 md:ml-6 space-y-12">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: edu.delay }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Dot */}
                <div className={`absolute w-8 h-8 ${edu.color} rounded-full -left-[18px] top-1 border-4 border-white shadow-md group-hover:scale-125 transition-transform duration-300 flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                
                {/* Content Card */}
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-sm font-bold text-indigo-500 tracking-wider uppercase">{edu.level}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1 mb-2">{edu.school}</h3>
                  {edu.desc && <p className="text-gray-600">{edu.desc}</p>}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-[#fafafa] relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Eksperimen & Project</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Beberapa hasil karya dari ngoding, setup server, dan game development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-in-out -z-10"></div>
                
                {project.icon}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center relative z-10">
        <p className="text-gray-500 font-medium flex items-center justify-center gap-2">
          Dibuat dengan <Cpu className="w-4 h-4 text-indigo-500" /> oleh MohFahmiMc
        </p>
      </footer>
    </div>
  );
}
