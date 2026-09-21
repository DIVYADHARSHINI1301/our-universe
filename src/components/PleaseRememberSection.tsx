import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const PleaseRememberSection: React.FC = () => {
  const { story } = useStory();

  return (
    <section
      id="please-remember"
      className="relative min-h-screen py-32 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Soft Floating Photographs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-[8%] w-60 sm:w-80 rounded-3xl overflow-hidden blur-[1px]"
        >
          <img
            src={story.hero.image}
            alt="Soft memory"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 right-[8%] w-60 sm:w-80 rounded-3xl overflow-hidden blur-[1px]"
        >
          <img
            src={story.timeline[2]?.image || story.hero.image}
            alt="Soft memory"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff2a73]/20 to-[#9b2ce6]/20 border border-[#ff8fb5]/30 mb-8"
        >
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 10 • Perspective
          </span>
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-5xl md:text-6xl text-shimmer font-semibold uppercase tracking-tight mb-12"
        >
          {story.pleaseRemember.heading}
        </motion.h2>

        {/* Staggered statements */}
        <div className="flex flex-col gap-6 mb-12">
          {story.pleaseRemember.statements.map((stmt, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.25 }}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-white/90 italic font-light"
            >
              “{stmt}”
            </motion.p>
          ))}
        </div>

        {/* Key Takeaway & Golden Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="p-8 sm:p-10 rounded-3xl glass-panel border-2 border-[#ff8fb5]/40 shadow-[0_0_50px_rgba(255,42,115,0.4)] max-w-2xl text-center relative"
        >
          <div className="inline-flex p-3 rounded-full bg-pink-500/20 border border-[#ff8fb5]/40 mb-4 text-[#ff2a73]">
            <Heart size={22} fill="currentColor" className="animate-pulse" />
          </div>

          <p className="text-xs font-serif uppercase tracking-widest text-[#ff8fb5] mb-3">
            {story.pleaseRemember.keyTakeaway}
          </p>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-snug font-normal">
            {story.pleaseRemember.quote}
          </h3>
        </motion.div>
      </div>
    </section>
  );
};
