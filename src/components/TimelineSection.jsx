import React from 'react';
import { GraduationCap, School, BookOpen, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TimelineSection({ timelineRef, timelineProgress }) {
  // Variasi animasi menarik untuk lingkaran icon
  const iconVariants = {
    hover: { 
      scale: 1.15, 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 10 
      } 
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="timeline" ref={timelineRef} className="mb-16 md:mb-40 mt-6 md:mt-10 relative z-10">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-10 md:mb-20 text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-black mb-2 md:mb-4">
          Perjalanan <br/>& Senjata.
        </h2>
        <p className="text-black font-bold max-w-sm mx-auto md:mx-0 border-l-2 md:border-l-4 border-black pl-3 md:pl-4 text-xs md:text-base">
          Scroll untuk melihat proses perjalanan pendidikan hingga perangkat arsitektur saat ini.
        </p>
      </motion.div>

      <div className="relative">
        {/* TIMELINE LINE TRACK */}
        <div className="absolute left-[18px] sm:left-[24px] md:left-[40px] top-4 bottom-4 w-2.5 md:w-4 bg-gray-200 border-x-2 md:border-x-4 border-black z-0"></div>
        
        {/* TIMELINE PROGRESS LINE */}
        <motion.div 
          style={{ scaleY: timelineProgress }} 
          className="absolute left-[18px] sm:left-[24px] md:left-[40px] top-4 bottom-4 w-2.5 md:w-4 bg-[#FF007F] border-x-2 md:border-x-4 border-black origin-top z-0" 
        />

        <div className="flex flex-col gap-8 sm:gap-10 md:gap-16 relative z-10">
          
          {/* ITEM 1: SD */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="flex items-center gap-3 sm:gap-4 md:gap-10"
          >
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 shrink-0 brutal-box bg-[#FFD700] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-0.5 md:ml-2"
            >
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-black" />
            </motion.div>
            <div className="brutal-box p-4 md:p-8 bg-white flex flex-col w-full hover:-translate-y-1 md:hover:-translate-y-2 transition-transform">
              <h3 className="font-black text-base sm:text-lg md:text-2xl uppercase mb-1 md:mb-2">Sekolah Dasar</h3>
              <p className="text-xs sm:text-sm md:text-base font-bold text-black/70 uppercase">MI Al-Falah Indramayu.</p>
            </div>
          </motion.div>

          {/* ITEM 2: SMP */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="flex items-center gap-3 sm:gap-4 md:gap-10"
          >
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 shrink-0 brutal-box bg-[#0055FF] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-0.5 md:ml-2"
            >
              <School className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-black" />
            </motion.div>
            <div className="brutal-box p-4 md:p-8 bg-white flex flex-col w-full hover:-translate-y-1 md:hover:-translate-y-2 transition-transform relative overflow-hidden">
              <h3 className="font-black text-base sm:text-lg md:text-2xl uppercase mb-1 md:mb-2">SMP</h3>
              <p className="text-xs sm:text-sm md:text-base font-bold text-black/70 uppercase">SMPN Satap 1 Krangkeng.</p>
              <span className="absolute top-3 right-3 md:top-6 md:right-6 text-black bg-[#FFD700] px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-xs font-black uppercase border-2 border-black rotate-3">Lulus</span>
            </div>
          </motion.div>

          {/* ITEM 3: SMK */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.3 }} 
            className="flex items-center gap-3 sm:gap-4 md:gap-10"
          >
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 shrink-0 brutal-box bg-[#00BFFF] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-0.5 md:ml-2"
            >
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-black" />
            </motion.div>
            <div className="brutal-box p-4 md:p-8 bg-white flex flex-col w-full hover:-translate-y-1 md:hover:-translate-y-2 transition-transform relative overflow-hidden">
              <h3 className="font-black text-base sm:text-lg md:text-2xl uppercase mb-1 md:mb-2">SMK</h3>
              <p className="text-xs sm:text-sm md:text-base font-bold text-black/70 uppercase">SMK NU Kaplongan.</p>
              <p className="text-[10px] sm:text-xs md:text-sm font-black text-[#0055FF] uppercase mt-1">Jurusan: Teknik Komputer dan Jaringan (TKJ)</p>
            </div>
          </motion.div>

          {/* ITEM 4: PERANGKAT UTAMA / SENJATA */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.4 }} 
            className="flex items-center gap-3 sm:gap-4 md:gap-10"
          >
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 shrink-0 brutal-box bg-[#FF007F] rounded-full flex items-center justify-center relative z-10 cursor-pointer ml-0.5 md:ml-2"
            >
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-black" />
            </motion.div>
            
            <div className="brutal-box p-4 md:p-8 bg-white text-black flex flex-col w-full hover:-translate-y-1 md:hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#FF007F] md:shadow-[6px_6px_0_0_#FF007F]">
              <h3 className="font-black text-base sm:text-lg md:text-2xl uppercase mb-2 md:mb-4 text-[#FF007F]">Perangkat Utama</h3>
              <p className="text-xs sm:text-sm md:text-lg font-black text-black uppercase leading-relaxed">
                <span className="bg-black text-white px-1.5 py-0.5 md:px-2 md:py-1 mr-2 text-[10px] sm:text-xs md:text-base">Vivo Y12</span> <br className="md:hidden" />
                RAM 3GB / 32GB ROM.<br/>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-600 mt-2 md:mt-4 block border-t-2 border-black/10 pt-2 md:pt-4">
                  (Mesin utama coding, otomasi bot & kompilasi server)
                </span>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
