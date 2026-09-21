import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, Camera, Video } from 'lucide-react';
import { useStory } from '../context/StoryContext';

interface HeroSectionProps {
  onImageClick?: (src: string, caption: string, date?: string, location?: string, isVideo?: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onImageClick }) => {
  const { story, updateHero, handleFileUpload } = useStory();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 text-center overflow-hidden"
    >
      {/* Subtle floating heart dust particles */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: (i % 2 === 0 ? -1 : 1) * (100 + i * 45),
              y: 120 + (i % 3) * 60,
              opacity: 0.2,
            }}
            animate={{
              y: [120 + (i % 3) * 60, -140 - (i % 3) * 40],
              opacity: [0.1, 0.5, 0],
              scale: [0.8, 1.25, 0.9],
            }}
            transition={{
              duration: 7 + i * 1.2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
            className="absolute text-[#ff4d8d]/30"
          >
            <Heart size={14 + (i % 3) * 8} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top subtle love badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff2a73]/20 via-[#9b2ce6]/20 to-[#e60049]/20 border border-[#ff8fb5]/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,42,115,0.2)]"
        >
          <Heart size={13} className="text-[#ff2a73] animate-pulse" fill="currentColor" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            A Love Letter In Our Private Universe
          </span>
          <Heart size={13} className="text-[#ff2a73] animate-pulse" fill="currentColor" />
        </motion.div>

        {/* Main Grand Romantic Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-shimmer font-semibold uppercase leading-tight mb-4 drop-shadow-[0_0_35px_rgba(255,42,115,0.4)]"
        >
          {story.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-[#fdf8f9]/95 italic font-light max-w-2xl mb-4"
        >
          “{story.hero.subtitle}”
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-xs sm:text-sm text-[#ffc1d6]/70 tracking-wider max-w-lg mb-10"
        >
          {story.hero.tagline}
        </motion.p>

        {/* Romantic Framed Photo / Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer"
          onClick={() =>
            onImageClick &&
            onImageClick(
              story.hero.video || story.hero.image,
              "Where time stands still with you.",
              story.couple.ourDate,
              story.couple.specialPlace,
              !!story.hero.video
            )
          }
        >
          {/* Ambient Glow behind frame in vibrant pink & purple */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#ff2a73] via-[#9b2ce6] to-[#e60049] opacity-60 blur-xl group-hover:opacity-85 transition-opacity duration-700" />

          {/* Framed Media Container */}
          <div className="relative p-2.5 sm:p-3.5 rounded-2xl bg-[#26063b]/90 border-2 border-[#ff8fb5]/40 shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="relative w-72 sm:w-96 md:w-[480px] h-56 sm:h-68 md:h-80 rounded-xl overflow-hidden bg-black">
              {story.hero.video ? (
                <video
                  src={story.hero.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <img
                  src={story.hero.image}
                  alt="Us in our universe"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-3 left-4 right-4 text-left flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-serif text-[#ff8fb5] tracking-widest uppercase block">
                    {story.couple.myName} & {story.couple.hisName}
                  </span>
                  <span className="font-handwriting text-xl text-white/95">
                    Click to expand {story.hero.video ? 'video' : 'photo'}
                  </span>
                </div>
                {story.hero.video && (
                  <span className="flex items-center gap-1 bg-[#ff2a73] px-2.5 py-1 rounded-full text-[10px] text-white font-medium uppercase tracking-wider">
                    <Video size={12} /> Video
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Direct Quick Upload Trigger */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <label
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] hover:from-[#ff4d8d] hover:to-[#b042ff] text-white text-xs font-medium cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,42,115,0.4)] transition-all transform hover:scale-105"
            >
              <Camera size={14} />
              <span>Change Cover Photo / Video</span>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file, (mediaUrl, mediaType) => {
                      if (mediaType === 'video') {
                        updateHero({ video: mediaUrl, image: '' });
                      } else {
                        updateHero({ image: mediaUrl, video: undefined });
                      }
                    });
                  }
                }}
              />
            </label>
          </div>
        </motion.div>

        {/* Scroll Down Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-xs text-[#ffc1d6]/60 tracking-widest uppercase cursor-pointer hover:text-[#ff8fb5] transition-colors"
          onClick={() => {
            const el = document.getElementById('memory-intro');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="flex items-center gap-1.5">
            <Heart size={12} fill="currentColor" className="text-[#ff2a73]" />
            Scroll to explore our story
            <Heart size={12} fill="currentColor" className="text-[#ff2a73]" />
          </span>
          <ChevronDown size={18} className="text-[#ff8fb5] animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
