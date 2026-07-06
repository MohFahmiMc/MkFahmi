import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AbstractHeroArt() {
  const [isStraight, setIsStraight] = useState(false);

  useEffect(() => {
    const handleResetTilt = () => {
      setIsStraight(false);
    };

    window.addEventListener('scroll', handleResetTilt);
    window.addEventListener('click', handleResetTilt);

    return () => {
      window.removeEventListener('scroll', handleResetTilt);
      window.removeEventListener('click', handleResetTilt);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring" }}
      className="relative w-full max-w-[280px] md:max-w-[400px] aspect-square flex items-center justify-center mt-10 md:mt-0 select-none"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute w-[85%] h-[85%] border-4 border-dashed border-black rounded-full z-20"
      />

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute w-[65%] h-[65%] border-[6px] border-black rounded-3xl z-10 bg-white/20"
      />

      <motion.div 
        onClick={(e) => {
          e.stopPropagation(); 
          setIsStraight(!isStraight);
        }}
        animate={{ rotate: isStraight ? 0 : -8 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
        className="brutal-box w-[45%] h-[45%] flex items-center justify-center z-0 bg-[#FFD700] shadow-[6px_6px_0_0_#000] cursor-pointer"
      >
        <span className="text-3xl md:text-5xl font-black text-black tracking-tighter">MKF</span>
      </motion.div>
    </motion.div>
  );
}
