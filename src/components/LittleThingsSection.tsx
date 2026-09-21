import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  MessageCircle,
  Smile,
  Moon,
  Camera,
  HeartHandshake,
  BellRing,
  Sparkles,
  X,
  Calendar,
  Heart,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { LittleThing } from '../data/story';

interface LittleThingsProps {
  onImageClick?: (src: string, caption: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  PhoneCall: <PhoneCall size={20} className="text-[#ff8fb5]" />,
  MessageCircle: <MessageCircle size={20} className="text-[#ff2a73]" />,
  Smile: <Smile size={20} className="text-[#ffc1d6]" />,
  Moon: <Moon size={20} className="text-[#9b2ce6]" />,
  Camera: <Camera size={20} className="text-[#ff8fb5]" />,
  HeartHandshake: <HeartHandshake size={20} className="text-[#ff2a73]" />,
  BellRing: <BellRing size={20} className="text-[#e5c583]" />,
  Sparkles: <Sparkles size={20} className="text-[#ff8fb5]" />,
};

export const LittleThingsSection: React.FC<LittleThingsProps> = ({ onImageClick }) => {
  const { story } = useStory();
  const [selectedThing, setSelectedThing] = useState<LittleThing | null>(null);

  return (
    <section id="little-things" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
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
            Chapter 04 • The Micro Moments
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
          It Was Never Just The Big Moments.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-[#ffc1d6]/85 italic max-w-xl mx-auto"
        >
          The quiet habits, the everyday routines, and the small gestures that meant everything.
        </motion.p>
      </div>

      {/* Floating Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {story.littleThings.map((item: LittleThing, index: number) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedThing(item)}
              className="group cursor-pointer glass-panel glass-panel-hover p-6 rounded-3xl border border-[#ff8fb5]/20 relative overflow-hidden flex flex-col justify-between min-h-[200px]"
            >
              {/* Corner soft pink glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#ff2a73]/25 blur-2xl group-hover:bg-[#9b2ce6]/35 transition-all duration-500" />

              <div>
                {/* Icon Header */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-pink-400/20 flex items-center justify-center mb-4 group-hover:border-[#ff2a73] group-hover:scale-110 transition-all duration-300">
                  {iconMap[item.iconName] || <Heart size={20} className="text-[#ff8fb5]" />}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-white mb-2 group-hover:text-[#ff8fb5] transition-colors">
                  {item.title}
                </h3>

                {/* Preview */}
                <p className="font-sans text-xs text-[#ffc1d6]/70 leading-relaxed">
                  {item.preview}
                </p>
              </div>

              {/* Bottom prompt */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#ff8fb5] uppercase tracking-wider font-serif">
                <span>Read memory</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Detail View */}
      <AnimatePresence>
        {selectedThing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedThing(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#20062c] border-2 border-[#ff8fb5]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,42,115,0.4)] overflow-hidden"
            >
              {/* Background ambient lighting */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#ff2a73]/40 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedThing(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-[#ff2a73] text-white/70 hover:text-white transition-all"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#3c0a5c] border border-[#ff8fb5]/40 flex items-center justify-center shadow-lg">
                  {iconMap[selectedThing.iconName] || <Sparkles size={24} className="text-[#ff8fb5]" />}
                </div>
                <div>
                  <span className="text-[11px] font-serif uppercase tracking-widest text-[#ff8fb5] block">
                    A Treasured Little Thing
                  </span>
                  <h3 className="font-display text-2xl text-white">
                    {selectedThing.title}
                  </h3>
                </div>
              </div>

              {selectedThing.date && (
                <div className="flex items-center gap-1.5 text-xs text-[#ffc1d6]/70 mb-4 bg-white/5 px-3 py-1 rounded-full w-fit">
                  <Calendar size={13} className="text-[#ff2a73]" />
                  <span>{selectedThing.date}</span>
                </div>
              )}

              {/* Full story text */}
              <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed mb-6">
                {selectedThing.fullStory}
              </p>

              {/* Personal Note */}
              {selectedThing.personalNote && (
                <div className="p-4 rounded-2xl bg-[#3c0a5c]/60 border border-[#ff8fb5]/30 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#ff8fb5] font-serif block mb-1">
                    Personal Note
                  </span>
                  <p className="font-handwriting text-2xl text-white">
                    “{selectedThing.personalNote}”
                  </p>
                </div>
              )}

              {/* Associated image thumbnail */}
              {selectedThing.image && (
                <div
                  className="rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 cursor-pointer group relative"
                  onClick={() => {
                    if (onImageClick && selectedThing.image) {
                      onImageClick(selectedThing.image, selectedThing.title);
                    }
                  }}
                >
                  <img
                    src={selectedThing.image}
                    alt={selectedThing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-serif text-white tracking-widest uppercase bg-black/70 px-3 py-1.5 rounded-full border border-pink-400/30">
                      View Full Photo
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
