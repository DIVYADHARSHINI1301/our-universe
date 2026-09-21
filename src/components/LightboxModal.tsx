import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Heart } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  isVideo?: boolean;
  caption?: string;
  date?: string;
  location?: string;
  backNote?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  image,
  isVideo = false,
  caption,
  date,
  location,
  backNote,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-[#ff2a73] text-white/80 hover:text-white transition-all backdrop-blur-sm"
            aria-label="Close image modal"
          >
            <X size={22} />
          </button>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center bg-[#1f062a] border-2 border-[#ff4d8d]/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,42,115,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media container */}
            <div className="relative w-full max-h-[68vh] overflow-hidden bg-black/70 flex items-center justify-center">
              {isVideo ? (
                <video
                  src={image}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full max-h-[68vh] object-contain"
                />
              ) : (
                <img
                  src={image}
                  alt={caption || "Memory photo"}
                  className="w-full h-full object-contain max-h-[68vh]"
                  loading="lazy"
                />
              )}
            </div>

            {/* Caption & info bar */}
            <div className="w-full p-6 bg-gradient-to-t from-[#180422] to-[#290738]/95 border-t border-[#ff4d8d]/20 flex flex-col gap-3">
              {caption && (
                <p className="font-serif text-xl sm:text-2xl text-[#fdf8f9] italic text-center flex items-center justify-center gap-2">
                  <Heart size={16} className="text-[#ff2a73] shrink-0" fill="currentColor" />
                  <span>“{caption}”</span>
                  <Heart size={16} className="text-[#ff2a73] shrink-0" fill="currentColor" />
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs tracking-wider uppercase text-[#ff8fb5]">
                {date && (
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Calendar size={13} className="text-[#ff2a73]" />
                    {date}
                  </span>
                )}
                {location && (
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <MapPin size={13} className="text-[#ff2a73]" />
                    {location}
                  </span>
                )}
              </div>

              {backNote && (
                <div className="mt-2 p-3.5 bg-[#3c0a5c]/50 border border-[#ff4d8d]/25 rounded-2xl text-center">
                  <span className="text-xs uppercase tracking-widest text-[#ff8fb5] block mb-1">
                    💌 Handwritten Secret Note
                  </span>
                  <p className="font-handwriting text-xl text-[#fdf8f9]">
                    {backNote}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
