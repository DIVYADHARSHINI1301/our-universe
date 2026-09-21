import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Disc,
  Volume2,
  VolumeX,
  Heart,
  Upload,
  Music,
  CheckCircle2,
  FileAudio,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';

interface MusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSeek: (time: number) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  onTogglePlay,
  onToggleMute,
  onSeek,
}) => {
  const { story, updateSoundtrack, handleFileUpload } = useStory();
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs <= 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const processAudioFile = (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadStatus(`Uploading "${file.name}"...`);

    handleFileUpload(file, (audioUrl) => {
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '');
      updateSoundtrack({
        audioSrc: audioUrl,
        songTitle: cleanTitle,
        artist: 'Our Custom Track',
      });
      setIsUploading(false);
      setUploadStatus(`Loaded: "${cleanTitle}" 🎵`);
      setTimeout(() => setUploadStatus(null), 4000);
    });
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAudioFile(file);
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('audio') || file.name.match(/\.(mp3|wav|m4a|ogg|aac|opus|flac)$/i))) {
      processAudioFile(file);
    }
  };

  const hasCustomTrack = !!story.soundtrack.audioSrc && story.soundtrack.audioSrc !== '';

  return (
    <section id="soundtrack" className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Hidden Audio File Input */}
      <input
        type="file"
        ref={audioInputRef}
        onChange={handleAudioUpload}
        accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.opus,.flac"
        className="hidden"
      />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff2a73]/20 to-[#9b2ce6]/20 border border-[#ff8fb5]/30 mb-4"
        >
          <Disc size={14} className="text-[#ff8fb5]" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 08 • The Melody
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
          {story.soundtrack.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-[#ffc1d6]/85 italic max-w-xl mx-auto"
        >
          {story.soundtrack.subtitle}
        </motion.p>
      </div>

      {/* Main Luxury Player Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`glass-panel p-6 sm:p-10 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
          isDragging
            ? 'border-[#ff2a73] shadow-[0_0_60px_rgba(255,42,115,0.6)] scale-[1.01]'
            : 'border-[#ff8fb5]/30 shadow-[0_0_50px_rgba(255,42,115,0.3)]'
        }`}
      >
        {/* Ambient Turntable Lighting */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#ff2a73]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#9b2ce6]/20 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          {/* Vinyl Disc with Rotating Animation */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-4 rounded-full bg-[#ff2a73]/30 blur-2xl group-hover:bg-[#9b2ce6]/40 transition-all duration-700" />

            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 12,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-[#0a020f] via-[#1c0626] to-[#3c0a5c] border-4 border-[#ff2a73]/60 shadow-2xl flex items-center justify-center p-3 cursor-pointer"
              onClick={onTogglePlay}
              title="Click to play / pause"
            >
              {/* Vinyl Grooves */}
              <div className="w-full h-full rounded-full border border-pink-500/20 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border border-pink-500/20 flex items-center justify-center">
                  {/* Center Album Cover */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#ff8fb5] shadow-inner relative">
                    <img
                      src={story.soundtrack.albumArt || '/images/hero-couple.jpg'}
                      alt="Soundtrack cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>
              </div>

              {/* Center spindle hole */}
              <div className="absolute w-4 h-4 rounded-full bg-pink-300 border border-black" />
            </motion.div>
          </div>

          {/* Player Controls & Info */}
          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xs uppercase font-serif tracking-widest text-[#ff8fb5]">
                Currently Playing
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] text-pink-300 border border-pink-400/20">
                <Music size={10} />
                {hasCustomTrack ? 'Custom Audio' : 'Ambient Harmony'}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-white mb-1 truncate max-w-md">
              {story.soundtrack.songTitle}
            </h3>

            <p className="text-sm font-sans text-[#ffc1d6]/80 mb-4">
              {story.soundtrack.artist}
            </p>

            <blockquote className="font-serif text-sm text-white/80 italic mb-5 border-l-2 border-[#ff2a73] pl-3">
              {story.soundtrack.lyricsSnippet}
            </blockquote>

            {/* Audio Waveform Bars Simulation */}
            <div className="flex items-center justify-center md:justify-start gap-1 h-7 mb-5">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [4, 12 + ((i * 7) % 20), 6, 22, 4] : 4,
                  }}
                  transition={{
                    duration: 0.9 + (i % 6) * 0.15,
                    repeat: isPlaying ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  className={`w-1 rounded-full ${
                    isPlaying ? 'bg-gradient-to-t from-[#ff2a73] to-[#ff8fb5]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-6">
              <div
                className="w-full h-2.5 rounded-full bg-white/10 cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
                  onSeek(newPercent * duration);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#ff2a73] via-[#ff8fb5] to-[#9b2ce6] rounded-full transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-white/60 mt-1.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Action Buttons: Play/Pause, Mute & Upload */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onTogglePlay}
                className="p-4 rounded-full bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white font-bold shadow-[0_0_25px_rgba(255,42,115,0.6)] hover:scale-108 active:scale-95 transition-all"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>

              <button
                onClick={onToggleMute}
                className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10 transition-all"
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} />}
              </button>

              {/* DIRECT UPLOAD BUTTON */}
              <button
                onClick={() => audioInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#ff2a73]/30 via-[#9b2ce6]/30 to-[#ff2a73]/20 hover:from-[#ff2a73] hover:to-[#9b2ce6] border-2 border-[#ff8fb5]/50 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,42,115,0.4)] hover:shadow-[0_0_30px_rgba(255,42,115,0.8)] hover:scale-105 active:scale-95"
              >
                <Upload size={16} className="text-pink-300" />
                <span>{isUploading ? 'Uploading Audio...' : '🎵 Upload / Change Song (MP3)'}</span>
              </button>
            </div>

            {/* Upload Notification Message */}
            <AnimatePresence>
              {uploadStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-serif text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-full"
                >
                  <CheckCircle2 size={14} />
                  <span>{uploadStatus}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Drag and drop helper callout */}
        <div
          onClick={() => audioInputRef.current?.click()}
          className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left cursor-pointer group hover:bg-white/5 p-3 rounded-2xl transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 text-[#ff8fb5] group-hover:scale-110 transition-transform">
              <FileAudio size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-white group-hover:text-[#ff8fb5] transition-colors">
                Drop your MP3, WAV, or WhatsApp Audio anywhere here
              </p>
              <p className="text-[11px] text-white/50">
                Supports all audio files • Saves permanently to your browser & disk
              </p>
            </div>
          </div>

          <span className="text-xs font-serif uppercase tracking-widest text-[#ff8fb5] bg-pink-500/10 px-3 py-1.5 rounded-full border border-pink-500/30 group-hover:bg-[#ff2a73] group-hover:text-white transition-all">
            Browse Audio File →
          </span>
        </div>
      </motion.div>
    </section>
  );
};
