import { useState, useEffect } from 'react';
import { StarBackground } from './components/StarBackground';
import { FloatingHearts } from './components/FloatingHearts';
import { CustomCursor } from './components/CustomCursor';
import { IntroScreen } from './components/IntroScreen';
import { ChapterNav } from './components/ChapterNav';
import { HeroSection } from './components/HeroSection';
import { MemoryIntro } from './components/MemoryIntro';
import { MemoryTimeline } from './components/MemoryTimeline';
import { MemoryJar } from './components/MemoryJar';
import { LittleThingsSection } from './components/LittleThingsSection';
import { PolaroidWall } from './components/PolaroidWall';
import { FilmReelSection } from './components/FilmReelSection';
import { MusicPlayer } from './components/MusicPlayer';
import { ThePauseSection } from './components/ThePauseSection';
import { ApologySection } from './components/ApologySection';
import { PleaseRememberSection } from './components/PleaseRememberSection';
import { ThingsILoveSection } from './components/ThingsILoveSection';
import { SecretEasterEggs } from './components/SecretEasterEggs';
import { FinalSection } from './components/FinalSection';
import { LightboxModal } from './components/LightboxModal';
import { LiveCustomizer } from './components/LiveCustomizer';
import { StoryProvider, useStory } from './context/StoryContext';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useScrollSpy } from './hooks/useScrollSpy';

const sectionIds = [
  'hero',
  'memory-intro',
  'timeline',
  'memory-jar',
  'little-things',
  'polaroids',
  'film-reel',
  'soundtrack',
  'the-pause',
  'apology',
  'please-remember',
  'things-i-love',
  'final-letter',
];

function UniverseApp() {
  const { story } = useStory();
  const [hasEntered, setHasEntered] = useState(false);

  // Universal Lightbox State (supports both images and videos)
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    image: string;
    isVideo?: boolean;
    caption?: string;
    date?: string;
    location?: string;
    backNote?: string;
  }>({
    isOpen: false,
    image: '',
    isVideo: false,
  });

  // Audio Engine Hook
  const {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    togglePlay,
    startAudio,
    toggleMute,
    seek,
    fadeVolume,
  } = useAudioPlayer(story.soundtrack.audioSrc);

  // Active Chapter Scroll Spy
  const activeChapter = useScrollSpy(sectionIds, 300);

  // Handle Enter universe
  const handleEnterUniverse = () => {
    setHasEntered(true);
    startAudio();
  };

  // Lightbox Open Handler
  const openLightbox = (
    image: string,
    caption?: string,
    date?: string,
    location?: string,
    isVideo: boolean = false,
    backNote?: string
  ) => {
    setLightboxState({
      isOpen: true,
      image,
      isVideo,
      caption,
      date,
      location,
      backNote,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  // Adjust audio volume dynamically during "The Pause" section
  useEffect(() => {
    if (activeChapter === 'the-pause') {
      fadeVolume(0.1, 1000);
    } else if (hasEntered) {
      fadeVolume(0.45, 1200);
    }
  }, [activeChapter, hasEntered, fadeVolume]);

  return (
    <div className="relative min-h-screen bg-[#0a020f] text-[#fdf8f9] font-sans selection:bg-[#ff2a73] selection:text-white">
      {/* 35mm Film Grain Overlay */}
      <div className="film-grain" />

      {/* Floating Animated Hearts Across Universe */}
      <FloatingHearts />

      {/* Interactive Custom Desktop Cursor */}
      <CustomCursor />

      {/* Living Twinkling Stars & Purple Nebula Background */}
      <StarBackground reducedDensity={activeChapter === 'the-pause'} />

      {/* Opening Screen (Dissolves into Universe) */}
      {!hasEntered && <IntroScreen onEnter={handleEnterUniverse} />}

      {/* Main Universe Experience */}
      {hasEntered && (
        <div className="relative z-10 transition-opacity duration-1000">
          {/* Chapter Navigation & Audio Controls */}
          <ChapterNav
            activeChapter={activeChapter}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onToggleAudio={togglePlay}
            onToggleMute={toggleMute}
          />

          {/* Interactive Easter Eggs (Moon in sky, etc.) */}
          <SecretEasterEggs />

          {/* 01. Hero Section */}
          <HeroSection onImageClick={(src, cap, d, loc, isVid) => openLightbox(src, cap, d, loc, isVid)} />

          {/* 02. Memory Introduction */}
          <MemoryIntro />

          {/* 03. Interactive Story Timeline (with Direct Editable Lifeline Text) */}
          <MemoryTimeline onImageClick={(src, cap, d, loc, isVid) => openLightbox(src, cap, d, loc, isVid)} />

          {/* 04. Interactive Memory Jar with Editable Glowing Stars */}
          <MemoryJar />

          {/* 05. The Micro Moments & Little Things */}
          <LittleThingsSection onImageClick={(src, cap) => openLightbox(src, cap)} />

          {/* 06. Polaroid Photo Wall with Direct Upload & Flip Note Editing */}
          <PolaroidWall onImageClick={(src, cap, d, loc, isVid, note) => openLightbox(src, cap, d, loc, isVid, note)} />

          {/* 07. Film Reel / Rewind Section with Direct Frame Media Upload */}
          <FilmReelSection onImageClick={(src, cap, d, loc, isVid) => openLightbox(src, cap, d, loc, isVid)} />

          {/* 08. Our Soundtrack Audio Player with Direct MP3 Upload */}
          <MusicPlayer
            isPlaying={isPlaying}
            isMuted={isMuted}
            currentTime={currentTime}
            duration={duration}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
            onSeek={seek}
          />

          {/* 09. The Emotional Pause */}
          <ThePauseSection />

          {/* 10. The Apology & 3D Envelope with Direct Inline Letter Editing */}
          <ApologySection />

          {/* 11. "Please Remember" Perspective */}
          <PleaseRememberSection />

          {/* 12. Things I Love About Us */}
          <ThingsILoveSection />

          {/* 13. Final Message, Gentle CTA & Timed P.S. */}
          <FinalSection />

          {/* Universal Fullscreen Photo & Video Lightbox */}
          <LightboxModal
            isOpen={lightboxState.isOpen}
            onClose={closeLightbox}
            image={lightboxState.image}
            isVideo={lightboxState.isVideo}
            caption={lightboxState.caption}
            date={lightboxState.date}
            location={lightboxState.location}
            backNote={lightboxState.backNote}
          />

          {/* Live Personalization Studio Modal */}
          <LiveCustomizer />
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <StoryProvider>
      <UniverseApp />
    </StoryProvider>
  );
}

export default App;
