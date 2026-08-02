import React from 'react';
import { 
  Terminal, Briefcase, Phone, Home, 
  Cpu as BrainCircuit, Compass, Box, Wrench 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ navigate, scrollToSection, handleNavSecretClick }) {
  return (
    <>
      {/* NAVBAR MOBILE */}
      <nav className="md:hidden fixed top-3 left-3 right-3 z-50">
        <div className="brutal-box rounded-full bg-white px-3.5 py-2 flex items-center justify-between gap-2 shadow-[3px_3px_0_0_#111111]">
          <div className="flex items-center gap-1.5 shrink-0 cursor-pointer" onClick={handleNavSecretClick}>
            <div className="w-6 h-6 brutal-box bg-[#FFD700] flex items-center justify-center rounded-full active:scale-90 transition-transform">
              <Terminal className="w-3 h-3 text-black" />
            </div>
            <span className="font-black tracking-widest text-xs text-black">FAHMI</span>
          </div>
          <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-black shrink-0">
            <button onClick={() => navigate('/project')} className="flex items-center gap-1 hover:text-[#0055FF] transition-colors">
              <Briefcase className="w-3 h-3"/> Karya
            </button>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="flex items-center gap-1 hover:text-[#FF007F] transition-colors">
              <Phone className="w-3 h-3"/> Kontak
            </a>
          </div>
        </div>
      </nav>

      {/* NAVBAR DESKTOP / MONITOR */}
      <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-[9999] flex-col items-center gap-4 brutal-box p-4 bg-white/90 backdrop-blur-md rounded-full shadow-[6px_6px_0_0_#111111] pointer-events-auto transform-gpu select-none">
         <motion.button 
            type="button"
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => scrollToSection(e, 'hero')}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative bg-white"
         >
            <Home size={18} className="text-black transition-transform group-hover:scale-110" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-1.5 font-black uppercase pointer-events-none z-50 shadow-[2px_2px_0_0_#111111]">Hero</span>
         </motion.button>

         <motion.button 
            type="button"
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => scrollToSection(e, 'about')}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FF007F] transition-colors group relative bg-white"
         >
            <BrainCircuit size={18} className="text-black group-hover:text-white transition-transform group-hover:scale-110" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-1.5 font-black uppercase pointer-events-none z-50 shadow-[2px_2px_0_0_#111111]">Profil</span>
         </motion.button>

         <motion.button 
            type="button"
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => scrollToSection(e, 'timeline')}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#0055FF] transition-colors group relative bg-white"
         >
            <Compass size={18} className="text-black group-hover:text-white transition-transform group-hover:scale-110" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-1.5 font-black uppercase pointer-events-none z-50 shadow-[2px_2px_0_0_#111111]">Jejak</span>
         </motion.button>

         <motion.button 
            type="button"
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => scrollToSection(e, 'sandbox')}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative bg-white"
         >
            <Box size={18} className="text-black transition-transform group-hover:scale-110" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-1.5 font-black uppercase pointer-events-none z-50 shadow-[2px_2px_0_0_#111111]">Sandbox</span>
         </motion.button>

         <motion.button 
            type="button"
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/service')} 
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors group relative bg-white"
         >
            <Wrench size={18} className="text-black transition-transform group-hover:scale-110" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-1.5 font-black uppercase pointer-events-none z-50 shadow-[2px_2px_0_0_#111111]">Layanan</span>
         </motion.button>

         <motion.button 
            type="button"
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/project')} 
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border-2 border-black hover:bg-[#FF007F] transition-colors group relative bg-white"
         >
            <Briefcase size={18} className="text-black group-hover:text-white transition-transform group-hover:scale-110" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-1.5 font-black uppercase pointer-events-none z-50 shadow-[2px_2px_0_0_#111111]">Karya</span>
         </motion.button>

         <motion.button 
            type="button"
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => scrollToSection(e, 'contact')}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border-2 border-black hover:bg-black transition-colors group relative bg-white"
         >
            <Phone size={18} className="text-black group-hover:text-white transition-transform group-hover:scale-110" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap brutal-box bg-white text-black border-2 border-black text-xs px-3 py-1.5 font-black uppercase pointer-events-none z-50 shadow-[2px_2px_0_0_#111111]">Kontak</span>
         </motion.button>
      </nav>
    </>
  );
}
