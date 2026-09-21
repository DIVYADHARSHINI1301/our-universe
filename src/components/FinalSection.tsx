import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStory } from '../context/StoryContext';

export const FinalSection: React.FC = () => {
  const { story } = useStory();
  const [hasClickedCTA, setHasClickedCTA] = useState(false);
  const [showTimedPS, setShowTimedPS] = useState(false);

  // Trigger delayed postscript message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimedPS(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = (e: React.MouseEvent) => {
    setHasClickedCTA(true);

    // Heart stardust burst celebration in vibrant pink, purple and gold
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 65,
      spread: 100,
      origin: { x, y },
      colors: ['#ff2a73', '#ff8fb5', '#9b2ce6', '#ffc1d6', '#ffffff', '#ffd700'],
      shapes: ['circle', 'star'],
      scalar: 1.2,
      disableForReducedMotion: true,
    });
  };

  return (
    <section
      id="final-letter"
      className="relative min-h-screen py-32 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Soft Glow & Silhouette */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className={`w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-1000 ${
            hasClickedCTA
              ? 'bg-gradient-to-tr from-[#ff2a73]/40 via-[#9b2ce6]/30 to-[#e60049]/30 opacity-80'
              : 'bg-[#ff2a73]/20 opacity-40'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff2a73]/20 to-[#9b2ce6]/20 border border-[#ff8fb5]/30 mb-8"
        >
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 11 • Whenever You're Ready
          </span>
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-6xl text-shimmer font-semibold uppercase tracking-tight mb-8"
        >
          {story.finalMessage.heading}
        </motion.h2>

        {/* Staggered Final Paragraphs */}
        <div className="flex flex-col gap-5 mb-10 text-center">
          {story.finalMessage.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className={`font-serif leading-relaxed ${
                idx === story.finalMessage.paragraphs.length - 1
                  ? 'text-2xl sm:text-3xl text-[#ff8fb5] font-medium mt-2'
                  : 'text-xl sm:text-2xl text-white/90 italic font-light'
              }`}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Soft Glowing Heart */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#ff2a73] mb-10"
        >
          <Heart size={36} fill="currentColor" className="drop-shadow-[0_0_20px_rgba(255,42,115,0.8)]" />
        </motion.div>

        {/* Primary CTA Button: "Can we talk? 🤍" */}
        {!hasClickedCTA ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTAClick}
              className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-[#ff2a73] via-[#e60049] to-[#9b2ce6] text-white font-serif text-2xl tracking-wide border-2 border-pink-300/60 shadow-[0_0_50px_rgba(255,42,115,0.9)] hover:shadow-[0_0_70px_rgba(155,44,230,0.9)] transition-all duration-300"
            >
              <Heart size={26} className="text-white fill-white animate-pulse" />
              <span>{story.finalCTA.buttonText}</span>
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <span className="text-xs font-sans text-[#ffc1d6]/60 tracking-wider">
              {story.finalMessage.subtext}
            </span>
          </motion.div>
        ) : (
          /* Heartfelt Reassurance Box on Click */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="w-full max-w-lg p-8 sm:p-10 rounded-3xl glass-panel border-2 border-[#ff8fb5]/50 shadow-[0_0_60px_rgba(255,42,115,0.5)] text-center"
          >
            <div className="inline-flex p-3 rounded-full bg-[#3c0a5c] border border-[#ff8fb5]/40 mb-4 text-[#ff2a73]">
              <Sparkles size={26} className="animate-pulse" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">
              {story.finalCTA.reassuranceTitle}
            </h3>

            <div className="flex flex-col gap-2 font-serif text-lg sm:text-xl text-[#ffc1d6] italic font-light mb-6">
              {story.finalCTA.reassuranceLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <p className="font-handwriting text-3xl text-white">
              “{story.finalCTA.closingNote}”
            </p>
          </motion.div>
        )}

        {/* Timed Postscript Message (Revealed after delay) */}
        <AnimatePresence>
          {showTimedPS && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="mt-20 p-6 sm:p-8 rounded-3xl bg-black/40 border border-[#ff8fb5]/20 max-w-lg text-center shadow-lg"
            >
              <p className="font-handwriting text-2xl sm:text-3xl text-[#ff8fb5] leading-relaxed">
                {story.finalCTA.timedPSMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-24 text-xs font-serif text-[#ffc1d6]/40 tracking-widest uppercase flex items-center gap-2">
          <Heart size={10} fill="currentColor" className="text-[#ff2a73]" />
          <span>Our Little Universe • Kept Safe Forever</span>
          <Heart size={10} fill="currentColor" className="text-[#ff2a73]" />
        </div>
      </div>
    </section>
  );
};
