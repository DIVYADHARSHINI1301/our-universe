import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const MemoryIntro: React.FC = () => {
  const { story } = useStory();

  return (
    <section
      id="memory-intro"
      className="relative min-h-[50vh] flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ff2a73] to-transparent mb-8" />

        <div className="inline-flex items-center gap-2 mb-4 text-[#ff8fb5]">
          <Heart size={15} fill="currentColor" />
          <span className="text-xs uppercase tracking-widest font-serif text-[#ffc1d6]">
            Chapter 02
          </span>
          <Heart size={15} fill="currentColor" />
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
          {story.memoryIntro.title}
        </h2>

        <p className="font-serif text-xl sm:text-2xl text-[#ff8fb5] italic font-light mb-6 max-w-xl">
          {story.memoryIntro.subtitle}
        </p>

        <p className="font-sans text-sm text-[#ffc1d6]/70 max-w-lg leading-relaxed">
          {story.memoryIntro.quote}
        </p>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ff2a73] to-transparent mt-8" />
      </motion.div>
    </section>
  );
};
