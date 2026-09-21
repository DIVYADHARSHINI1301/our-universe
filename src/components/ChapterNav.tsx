import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Edit3 } from 'lucide-react';
import { useStory } from '../context/StoryContext';

interface ChapterNavProps {
  activeChapter: string;
  isPlaying: boolean;
  isMuted: boolean;
  onToggleAudio: () => void;
  onToggleMute: () => void;
}

const chapters = [
  { id: 'hero', label: '01 • Universe' },
  { id: 'memory-intro', label: '02 • Memories' },
  { id: 'timeline', label: '03 • Our Story' },
  { id: 'memory-jar', label: '04 • Keepsake Jar' },
  { id: 'little-things', label: '05 • Micro Moments' },
  { id: 'polaroids', label: '06 • Polaroids' },
  { id: 'film-reel', label: '07 • Rewind' },
  { id: 'soundtrack', label: '08 • Soundtrack' },
  { id: 'the-pause', label: '09 • A Pause' },
  { id: 'apology', label: '10 • For You' },
  { id: 'please-remember', label: '11 • Remember' },
  { id: 'things-i-love', label: '12 • Things I Love' },
  { id: 'final-letter', label: '13 • Final Note' },
];

export const ChapterNav: React.FC<ChapterNavProps> = ({
  activeChapter,
  isPlaying,
  isMuted,
  onToggleAudio,
  onToggleMute,
}) => {
  const { openCustomizer } = useStory();
  const currentChapterIndex = chapters.findIndex((c) => c.id === activeChapter);
  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Floating Bar: Edit Studio, Audio & Current Chapter indicator */}
      <nav aria-label="Audio and Chapter Navigation" className="fixed top-5 right-5 z-40 flex items-center gap-3">
        {/* Personalize & Edit Studio Button */}
        <button
          onClick={openCustomizer}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] hover:scale-105 text-white font-serif text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(255,42,115,0.6)] transition-all"
          title="Open Live Personalization Studio"
        >
          <Edit3 size={14} className="text-white" />
          <span>Edit & Upload Media</span>
        </button>

        {/* Audio control button */}
        <button
          onClick={isPlaying ? onToggleMute : onToggleAudio}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-[#ff8fb5]/30 text-white hover:border-[#ff2a73] transition-all text-xs tracking-wider uppercase backdrop-blur-md shadow-lg"
          title={isPlaying ? (isMuted ? 'Unmute Audio' : 'Mute Audio') : 'Play Ambient Music'}
        >
          {isPlaying ? (
            isMuted ? (
              <VolumeX size={15} className="text-red-400" />
            ) : (
              <Volume2 size={15} className="text-[#ff8fb5] animate-pulse" />
            )
          ) : (
            <Sparkles size={15} className="text-[#ff2a73]" />
          )}
          <span className="hidden sm:inline">
            {isPlaying ? (isMuted ? 'Muted' : 'Music On') : 'Play Music'}
          </span>
        </button>

        {/* Current Chapter Badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-[#ff8fb5]/30 text-xs font-serif text-[#ff8fb5] tracking-widest uppercase">
          <Heart size={11} fill="currentColor" className="text-[#ff2a73]" />
          <span>{currentChapter.label}</span>
        </div>
      </nav>

      {/* Desktop Vertical Chapter Dots (Left side) */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {chapters.map((ch, idx) => {
          const isActive = ch.id === activeChapter;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToSection(ch.id)}
              className="group flex items-center gap-3 text-left focus:outline-none"
              title={ch.label}
            >
              {/* Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-6 bg-gradient-to-b from-[#ff2a73] to-[#9b2ce6] shadow-[0_0_15px_#ff2a73]'
                    : 'w-2 h-2 bg-white/20 group-hover:bg-[#ff8fb5] group-hover:scale-125'
                }`}
              />
              {/* Tooltip on hover */}
              <span
                className={`text-[11px] font-serif tracking-wider uppercase transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive ? 'text-[#ff8fb5] opacity-100 translate-x-0' : 'text-white/60'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
