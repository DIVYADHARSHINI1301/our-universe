import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, Edit3, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStory } from '../context/StoryContext';
import type { JarStarMemory } from '../data/story';

export const MemoryJar: React.FC = () => {
  const { story, updateJarStar } = useStory();
  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);
  const [isEditingStar, setIsEditingStar] = useState(false);

  const selectedStar = story.memoryJar.stars.find((s) => s.id === selectedStarId) || null;

  const handleStarClick = (star: JarStarMemory, e: React.MouseEvent) => {
    setSelectedStarId(star.id);
    setIsEditingStar(false);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x, y },
      colors: ['#ff2a73', '#ff8fb5', '#9b2ce6', '#ffffff', '#e5c583'],
      shapes: ['circle', 'star'],
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="memory-jar" className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff2a73]/20 to-[#9b2ce6]/20 border border-[#ff8fb5]/30 mb-4"
        >
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 04 • The Keepsake Jar
          </span>
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl text-shimmer font-semibold uppercase tracking-tight mb-4"
        >
          {story.memoryJar.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-[#ffc1d6]/85 italic max-w-xl mx-auto mb-2"
        >
          {story.memoryJar.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs font-serif uppercase tracking-widest text-[#ff8fb5]"
        >
          ✨ {story.memoryJar.instruction} (Click any star to view & edit your memories) ✨
        </motion.p>
      </div>

      {/* Glass Jar Interactive Container */}
      <div className="relative max-w-md sm:max-w-lg mx-auto flex flex-col items-center">
        {/* Jar Lid */}
        <div className="w-48 sm:w-56 h-8 rounded-t-2xl bg-gradient-to-r from-[#3c0a5c] via-[#ff2a73] to-[#3c0a5c] border-t-2 border-x-2 border-[#ff8fb5]/50 shadow-lg relative z-20 flex items-center justify-center">
          <div className="w-24 h-1.5 rounded-full bg-white/70" />
        </div>

        {/* Jar Neck */}
        <div className="w-40 sm:w-48 h-4 bg-white/5 border-x border-white/20 z-10" />

        {/* Main Glass Jar Body in Glowing Purple Glass */}
        <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/4.2] rounded-[40px] sm:rounded-[50px] p-6 sm:p-8 bg-gradient-to-b from-white/10 via-[#3c0a5c]/35 to-[#1c0626]/80 border-2 border-pink-300/30 shadow-[0_20px_60px_rgba(255,42,115,0.4),inset_0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden flex items-center justify-center">
          {/* Glass reflection highlight streaks */}
          <div className="absolute top-6 left-6 w-4 h-3/4 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-[1px] pointer-events-none" />
          <div className="absolute top-8 right-8 w-2 h-1/2 rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-[1px] pointer-events-none" />

          {/* Floating interactive glowing stars */}
          <div className="relative w-full h-full">
            {story.memoryJar.stars.map((star: JarStarMemory, idx: number) => {
              const positions = [
                { top: '25%', left: '25%' },
                { top: '20%', left: '65%' },
                { top: '45%', left: '45%' },
                { top: '40%', left: '18%' },
                { top: '48%', left: '72%' },
                { top: '68%', left: '30%' },
                { top: '70%', left: '60%' },
                { top: '80%', left: '42%' },
              ];
              const pos = positions[idx % positions.length];

              return (
                <motion.button
                  key={star.id}
                  onClick={(e) => handleStarClick(star, e)}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 3.5 + (idx % 4) * 0.7,
                    repeat: Infinity,
                    delay: idx * 0.35,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.35 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ top: pos.top, left: pos.left }}
                  className="jar-star absolute -translate-x-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-full group cursor-pointer focus:outline-none"
                  title={star.title}
                >
                  {/* Star Glow */}
                  <div
                    className="absolute inset-0 rounded-full blur-md group-hover:blur-lg transition-all opacity-90"
                    style={{ backgroundColor: star.color || '#ff2a73' }}
                  />

                  {/* Star Icon */}
                  <Star
                    size={24}
                    fill={star.color || '#ff2a73'}
                    stroke={star.color || '#ff2a73'}
                    className="relative z-10 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                  />

                  {/* Label on hover */}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-serif text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-2 py-0.5 rounded-full border border-pink-400/40 pointer-events-none z-20">
                    {star.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Jar Base */}
        <div className="w-56 sm:w-64 h-5 rounded-b-2xl bg-[#14031c] border-b-2 border-x-2 border-pink-400/30 shadow-2xl" />
      </div>

      {/* Memory Star Modal Reveal WITH INLINE DIRECT EDITING */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStarId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-b from-[#2a083b] to-[#14031c] border-2 border-[#ff8fb5]/40 rounded-3xl p-7 sm:p-9 shadow-[0_0_50px_rgba(255,42,115,0.5)] text-center overflow-hidden"
            >
              {/* Star illumination bloom */}
              <div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-70 pointer-events-none"
                style={{ backgroundColor: selectedStar.color || '#ff2a73' }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedStarId(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-[#ff2a73] text-white/70 hover:text-white transition-all"
                aria-label="Close star memory"
              >
                <X size={20} />
              </button>

              {/* Floating Star in modal */}
              <div className="relative inline-flex p-4 rounded-full bg-white/5 border border-white/15 mb-4 shadow-[0_0_25px_rgba(255,42,115,0.5)]">
                <Star
                  size={36}
                  fill={selectedStar.color || '#ff2a73'}
                  stroke={selectedStar.color || '#ff2a73'}
                  className="animate-pulse"
                />
              </div>

              <span className="text-[11px] font-serif uppercase tracking-widest text-[#ff8fb5] block mb-1">
                A Keepsake From My Heart
              </span>

              {!isEditingStar ? (
                /* View Memory Mode */
                <>
                  <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">
                    {selectedStar.title}
                  </h3>

                  <p className="font-serif text-lg sm:text-xl text-[#fdf8f9]/95 italic leading-relaxed mb-6 font-light">
                    “{selectedStar.memory}”
                  </p>

                  <p className="text-xs font-handwriting text-[#ff8fb5] text-2xl mb-6">
                    Kept safe in our little universe forever.
                  </p>
                </>
              ) : (
                /* In-Modal Direct Editing Form */
                <div className="space-y-3 my-4 text-left">
                  <div>
                    <label className="text-[10px] uppercase font-serif text-[#ff8fb5] font-bold block mb-1">
                      Star Title / Topic
                    </label>
                    <input
                      type="text"
                      value={selectedStar.title}
                      onChange={(e) => updateJarStar(selectedStar.id, { title: e.target.value })}
                      placeholder="Star Title..."
                      className="w-full text-base font-display text-white bg-black/60 border border-[#ff2a73] rounded-xl px-3 py-1.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-serif text-[#ff8fb5] font-bold block mb-1">
                      Memory Text
                    </label>
                    <textarea
                      rows={3}
                      value={selectedStar.memory}
                      onChange={(e) => updateJarStar(selectedStar.id, { memory: e.target.value })}
                      placeholder="Write what you never want to forget..."
                      className="w-full text-sm font-serif text-[#ffc1d6] bg-black/60 border border-[#ff2a73] rounded-xl p-2.5 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Direct Edit Button */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsEditingStar(!isEditingStar)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  {isEditingStar ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span>Save Memory ✨</span>
                    </>
                  ) : (
                    <>
                      <Edit3 size={14} />
                      <span>Edit This Star's Memory</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
