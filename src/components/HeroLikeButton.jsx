import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function HeroLikeButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState([]);

  // Ambil data jumlah like & status dari DB dan localStorage saat dipasang
  useEffect(() => {
    const isLikedLocally = localStorage.getItem('mkf_hero_liked') === 'true';
    setHasLiked(isLikedLocally);

    fetch('/api/likes')
      ? fetch('/api/likes')
          .then((res) => res.json())
          .then((data) => {
            if (typeof data.count === 'number') setLikes(data.count);
          })
          .catch((err) => console.error('Gagal mengambil data likes:', err))
          .finally(() => setIsLoading(false))
      : setIsLoading(false);
  }, []);

  const handleLike = async () => {
    const newLikedState = !hasLiked;
    setHasLiked(newLikedState);
    localStorage.setItem('mkf_hero_liked', newLikedState.toString());

    // Update tampilan secara instan (Optimistic UI)
    setLikes((prev) => (newLikedState ? prev + 1 : Math.max(0, prev - 1)));

    // Animasi partikel hati meletup saat klik Like
    if (newLikedState) {
      const pId = Date.now();
      setParticles((prev) => [...prev, pId]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((id) => id !== pId));
      }, 1000);
    }

    // Sinkronkan ke MongoDB via API
    try {
      await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: newLikedState ? 'like' : 'unlike' }),
      });
    } catch (err) {
      console.error('Gagal memperbarui likes ke server:', err);
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
          <Heart
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

      {/* Animasi Floating Heart Particles saat Like */}
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
            <Heart
              size={22}
              className="fill-[#FF007F] stroke-black text-[#FF007F]"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
