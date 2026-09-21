import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { ThingILove } from '../data/story';

export const ThingsILoveSection: React.FC = () => {
  const { story } = useStory();

  return (
    <section id="things-i-love" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff2a73]/20 to-[#9b2ce6]/20 border border-[#ff8fb5]/30 mb-4"
        >
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 12 • Little Truths
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
          Things I Love About Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-[#ffc1d6]/85 italic max-w-xl mx-auto"
        >
          Simple, honest things that remind me why our connection is so special.
        </motion.p>
      </div>

      {/* Floating Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {story.thingsILove.map((item: ThingILove, idx: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group glass-panel p-6 sm:p-7 rounded-3xl border border-[#ff8fb5]/20 relative overflow-hidden flex flex-col justify-between min-h-[220px]"
          >
            {/* Soft Ambient Heart Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#ff2a73]/25 blur-2xl group-hover:bg-[#9b2ce6]/35 transition-all duration-500" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-serif uppercase tracking-widest text-[#ff8fb5] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  {item.highlight || `Heart Note 0${idx + 1}`}
                </span>
                <Heart
                  size={18}
                  className="text-[#ff2a73] group-hover:scale-125 transition-transform"
                  fill="currentColor"
                />
              </div>

              {/* Statement */}
              <p className="font-serif text-lg text-white leading-snug">
                “{item.text}”
              </p>
            </div>

            {/* Bottom accent */}
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#ff2a73] to-transparent mt-4 opacity-70 group-hover:w-16 transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
