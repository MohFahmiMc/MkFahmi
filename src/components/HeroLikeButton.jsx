import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';

export default function HeroLikeButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState([]);
  const [visitorId, setVisitorId] = useState('');

  // Ambil atau buat ID unik HP/Browser & sinkronkan data dari MongoDB
  useEffect(() => {
    let storedId = typeof window !== 'undefined' ? localStorage.getItem('mkf_visitor_id') : null;
    if (!storedId) {
      storedId = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      if (typeof window !== 'undefined') {
        localStorage.setItem('mkf_visitor_id', storedId);
      }
    }
    setVisitorId(storedId);

    // Fetch data likes dari MongoDB khusus untuk ID HP ini
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

    // Optimistic UI Update (Ubah tampilan secara instan)
    const nextLiked = !hasLiked;
    setHasLiked(nextLiked);
    setLikes((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    // Animasi partikel jempol meletup saat klik Like
    if (nextLiked) {
      const pId = Date.now();
      setParticles((prev) => [...prev, pId]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((id) => id !== pId));
      }, 1000);
    }

    // Sinkronkan ke MongoDB via API
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
      console.error('Gagal memperbarui likes ke server:', err);
      // Revert status jika gagal terkoneksi ke server
      setHasLiked(!nextLiked);
      setLikes((prev) => (nextLiked ? Math.max(0, prev - 1) : prev + 1));
    }
  };

  return (
    <div className="relative inline-flex items-center my-3 select-none">
      <motion.button
        onClick={handleLike}
        whileHover={{ scale: 1.05, x: 2, y: -2 }}
        whileTap={{ scale: 0.9, rotate: -4 }}
        className={`relative z-10 flex items-center gap-3 px-5 py-2.5 rounded-2xl border-4 border-black font-black uppercase tracking-wider text-xs md:text-sm cursor-pointer shadow-[4px_4px_0_0_#111111] transition-colors ${
          hasLiked
            ? 'bg-[#FF007F] text-white'
            : 'bg-white text-black hover:bg-[#FFD700]'
        }`}
      >
        <motion.div
          animate={
            hasLiked
              ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] }
              : { scale: 1 }
          }
          transition={{ duration: 0.35 }}
        >
          <ThumbsUp
            size={20}
            className={
              hasLiked ? 'fill-white stroke-white' : 'fill-none stroke-black'
            }
          />
        </motion.div>

        <span>
          {isLoading ? '...' : likes}{' '}
          <span className="opacity-90">{hasLiked ? 'LIKED!' : 'LIKES'}</span>
        </span>
      </motion.button>

      {/* Animasi Floating ThumbsUp Particles saat Like */}
      <AnimatePresence>
        {particles.map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 1, y: 0, x: 10, scale: 0.6 }}
            animate={{
              opacity: 0,
              y: -50,
              x: (Math.random() - 0.5) * 50,
              scale: 1.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-0 left-4 pointer-events-none z-20"
          >
            <ThumbsUp
              size={22}
              className="fill-[#FF007F] stroke-black text-[#FF007F]"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
