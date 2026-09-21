import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storyData } from '../data/story';

export const SecretEasterEggs: React.FC = () => {
  const [activeSecret, setActiveSecret] = useState<string | null>(null);

  const triggerSecret = (message: string, e: React.MouseEvent) => {
    setActiveSecret(message);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x, y },
      colors: ['#e5c583', '#f7cad0', '#ffb3c1'],
      scalar: 0.8,
      disableForReducedMotion: true,
    });
  };

  return (
    <>
      {/* 1. Interactive Moon in Top Right Sky */}
      <motion.button
        onClick={(e) => triggerSecret(storyData.easterEggs.moonMessage, e)}
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-20 right-6 z-30 p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#e5c583]/50 text-[#e5c583] shadow-[0_0_20px_rgba(229,197,131,0.2)] backdrop-blur-md cursor-pointer transition-all"
        title="A silent spectator in our universe (Click me)"
        aria-label="Secret moon Easter egg"
      >
        <Moon size={18} fill="#e5c583" className="opacity-90" />
      </motion.button>

      {/* Secret Toast / Modal Reveal */}
      <AnimatePresence>
        {activeSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSecret(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#200818] border border-[#f7cad0]/30 rounded-3xl p-7 text-center shadow-2xl"
            >
              <button
                onClick={() => setActiveSecret(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white"
                aria-label="Close secret note"
              >
                <X size={18} />
              </button>

              <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 mb-4 text-[#e5c583]">
                <Sparkles size={24} className="animate-spin" />
              </div>

              <span className="text-[10px] uppercase font-serif tracking-widest text-[#e5c583] block mb-2">
                ✨ Hidden Easter Egg Discovered ✨
              </span>

              <p className="font-handwriting text-2xl text-[#fdf8f5] leading-relaxed mb-4">
                {activeSecret}
              </p>

              <p className="text-xs font-serif text-[#f7cad0]/70 italic">
                (Tap anywhere to close)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
