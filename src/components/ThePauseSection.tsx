import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../data/story';

export const ThePauseSection: React.FC = () => {
  return (
    <section
      id="the-pause"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 bg-[#040103] text-center overflow-hidden"
    >
      {/* Absolute dark stillness layer */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-12 sm:gap-16">
        {storyData.thePause.lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 1.2,
              delay: index * 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`font-serif tracking-wide ${
              index === 0
                ? 'text-2xl sm:text-3xl text-[#fdf8f5]/50 italic font-light'
                : index === 1
                ? 'text-3xl sm:text-4xl md:text-5xl text-[#f7cad0] font-normal'
                : index === 2
                ? 'text-2xl sm:text-3xl text-[#fdf8f5]/80 font-light'
                : 'text-3xl sm:text-4xl md:text-5xl text-[#e5c583] font-medium'
            }`}
          >
            {line}
          </motion.p>
        ))}

        {/* Quiet subtle divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2.2 }}
          className="w-16 h-px bg-white/20 mt-6"
        />
      </div>
    </section>
  );
};
