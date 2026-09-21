import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Heart } from 'lucide-react';
import { useStory } from '../context/StoryContext';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const { story } = useStory();
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Step progression timers for cinematic pacing
    const t1 = setTimeout(() => setStep(1), 1000);  // "Hey you…"
    const t2 = setTimeout(() => setStep(2), 2400);  // "Before you decide anything…"
    const t3 = setTimeout(() => setStep(3), 3800);  // "Can you give me a few minutes?"
    const t4 = setTimeout(() => setStep(4), 5200);  // "I made a little place for us." + Button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleEnterClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.12 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0214] text-[#fdf8f9] px-6 text-center select-none overflow-hidden"
        >
          {/* Emergence of glowing stars & hearts in the center */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Center soft pink/purple ambient radial glow */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.6, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
              className="w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(255,42,115,0.4) 0%, rgba(155,44,230,0.2) 50%, transparent 70%)',
              }}
            />

            {/* Floating tiny glowing hearts */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0.3, 1],
                  scale: [0, 1.2, 0.8, 1],
                  x: Math.cos((i * Math.PI) / 8) * (65 + (i % 3) * 50),
                  y: Math.sin((i * Math.PI) / 8) * (55 + (i % 3) * 45),
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.3 + i * 0.12,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="absolute text-[#ff4d8d]"
              >
                <Heart size={12 + (i % 3) * 4} fill="currentColor" />
              </motion.div>
            ))}
          </div>

          {/* Staggered Cinematic Text Lines */}
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4 py-8">
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#ff8fb5] tracking-wide"
              >
                {story.intro.line1}
              </motion.p>
            )}

            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="font-serif text-xl sm:text-2xl text-[#fdf8f9]/90 italic tracking-wide font-light"
              >
                {story.intro.line2}
              </motion.p>
            )}

            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="font-serif text-2xl sm:text-3xl text-shimmer tracking-wide"
              >
                {story.intro.line3}
              </motion.p>
            )}

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="flex flex-col items-center gap-8 mt-4"
              >
                <p className="font-sans text-sm sm:text-base text-[#ffc1d6]/80 tracking-widest uppercase flex items-center gap-2">
                  <Heart size={14} fill="currentColor" className="text-[#ff2a73]" />
                  {story.intro.line4}
                  <Heart size={14} fill="currentColor" className="text-[#ff2a73]" />
                </p>

                {/* Primary Enter Button with Rich Glow */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleEnterClick}
                  className="group relative inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-gradient-to-r from-[#ff2a73] via-[#9b2ce6] to-[#e60049] text-white font-medium tracking-wider border border-pink-300/40 shadow-[0_0_40px_rgba(255,42,115,0.7)] hover:shadow-[0_0_60px_rgba(155,44,230,0.8)] transition-all duration-300"
                >
                  <Heart size={18} className="text-white fill-white animate-pulse" />
                  <span className="font-serif text-xl text-white">
                    {story.intro.buttonText}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                {/* Headphones recommendation */}
                <p className="flex items-center gap-2 text-xs text-[#ffc1d6]/50 tracking-wider">
                  <Headphones size={14} className="text-[#ff8fb5]" />
                  {story.intro.headphonesNote}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
