import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';

export default function HeroLikeButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState([]);
  const [visitorId, setVisitorId] = useState('');

  useEffect(() => {
    // Generate atau ambil ID Unik untuk HP/Browser ini
    let storedId = localStorage.getItem('mkf_visitor_id');
    if (!storedId) {
      storedId = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('mkf_visitor_id', storedId);
    }
    setVisitorId(storedId);

    // Ambil data real-time MongoDB berdasarkan ID unik HP ini
    fetch(`/api/likes?visitorId=${storedId}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === 'number') setLikes(data.count);
        if (typeof data.hasLiked === 'boolean') setHasLiked(data.hasLiked);
      })
      .catch((err) => console.error('Gagal mengambil data likes:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLike = async () => {
    if (isLoading || !visitorId) return;

    // Optimistic UI Update (Respon langsung di layar)
    const nextLiked = !hasLiked;
    setHasLiked(nextLiked);
    setLikes((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    // Efek animasi jempol melayang meletup
    if (nextLiked) {
      const pId = Date.now();
      setParticles((prev) => [...prev, pId]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((id) => id !== pId));
      }, 1000);
    }

    // Kirim request ke MongoDB
    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      });
      const data = await res.json();
      if (typeof data.count === 'number') setLikes(data.count);
      if (typeof data.hasLiked === 'boolean') setHasLiked(data.hasLiked);
    } catch (err) {
      console.error('Gagal sinkronkan like ke server:', err);
      // Revert tampilan jika koneksi gagal
      setHasLiked(!nextLiked);
      setLikes((prev) => (nextLiked ? Math.max(0, prev - 1) : prev + 1));
    }
  };

  return (
    <div className="relative inline-flex items-center my-3 select-none w-full md:w-auto justify-center md:justify-start">
      <motion.button
        onClick={handleLike}
        whileHover={{ scale: 1.03, x: 2, y: -2 }}
        whileTap={{ scale: 0.92, rotate: -2 }}
        className={`relative z-10 flex items-center justify-between gap-3 px-5 py-2.5 rounded-2xl border-4 border-black font-black uppercase tracking-wider text-xs md:text-sm cursor-pointer shadow-[4px_4px_0_0_#111111] transition-all duration-200 ${
          hasLiked
            ? 'bg-[#0055FF] text-white'
            : 'bg-white text-black hover:bg-[#FFD700]'
        }`}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={
              hasLiked
                ? { scale: [1, 1.3, 1], rotate: [0, -12, 12, 0] }
                : { scale: 1 }
            }
            transition={{ duration: 0.3 }}
          >
            <ThumbsUp
              size={18}
              className={
                hasLiked
                  ? 'fill-white stroke-white'
                  : 'fill-none stroke-black'
              }
            />
          </motion.div>
          <span>{hasLiked ? 'APPRECIATED!' : 'GIVE LIKE'}</span>
        </div>

        {/* Badge Angka Count */}
        <span
          className={`px-2.5 py-0.5 rounded-lg border-2 border-black text-xs md:text-sm font-black tracking-tight ${
            hasLiked
              ? 'bg-[#FFD700] text-black'
              : 'bg-[#FF007F] text-white'
          }`}
        >
          {isLoading ? '...' : likes.toLocaleString()}
        </span>
      </motion.button>

      {/* Partikel Jempol Melayang saat diklik */}
      <AnimatePresence>
        {particles.map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 1, y: 0, x: 15, scale: 0.6 }}
            animate={{
              opacity: 0,
              y: -55,
              x: (Math.random() - 0.5) * 60,
              scale: 1.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-0 left-6 pointer-events-none z-20"
          >
            <ThumbsUp
              size={22}
              className="fill-[#0055FF] stroke-black text-[#0055FF]"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
