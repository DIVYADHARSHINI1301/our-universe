import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Clock,
  ChevronLeft,
  ChevronRight,
  Heart,
  Video,
  Upload,
  Edit3,
  Check,
  CheckCircle2,
  Maximize2,
  FileVideo,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { FilmFrame } from '../data/story';

interface FilmReelProps {
  onImageClick?: (src: string, caption: string, date?: string, location?: string, isVideo?: boolean) => void;
}

export const FilmReelSection: React.FC<FilmReelProps> = ({ onImageClick }) => {
  const { story, updateFilmFrame, handleFileUpload } = useStory();
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const activeFrame = story.filmReel.frames[activeFrameIndex] || story.filmReel.frames[0];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditingText, setIsEditingText] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handlePrev = () => {
    setActiveFrameIndex((prev) =>
      prev === 0 ? story.filmReel.frames.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveFrameIndex((prev) =>
      prev === story.filmReel.frames.length - 1 ? 0 : prev + 1
    );
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const processUploadedFile = (file: File) => {
    if (!file || !activeFrame) return;

    const isVid = file.type.startsWith('video') || !!file.name.match(/\.(mp4|mov|webm|m4v|mkv|avi)$/i);
    setIsUploading(true);
    setUploadStatus(`Uploading ${isVid ? 'video' : 'photo'} "${file.name}"...`);

    handleFileUpload(file, (mediaUrl, detectedType) => {
      const isVideoMedia = detectedType === 'video' || isVid;
      updateFilmFrame(activeFrame.id, {
        image: mediaUrl,
        video: isVideoMedia ? mediaUrl : undefined,
      });
      setIsUploading(false);
      setUploadStatus(`Uploaded Frame #${activeFrame.frameNumber} successfully! ✨`);
      setTimeout(() => setUploadStatus(null), 4000);
    });
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const activeMediaSrc = activeFrame.video || activeFrame.image;
  const isCurrentFrameVideo = !!activeFrame.video;

  return (
    <section id="film-reel" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Universal File Input (Supports all Videos & Photos) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelected}
        accept="video/*,image/*,.mp4,.mov,.webm,.m4v,.mkv,.avi,.jpeg,.jpg,.png,.webp"
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
          <Film size={14} className="text-[#ff8fb5]" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 07 • The Film Reel
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
          {story.filmReel.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-[#ffc1d6]/85 italic max-w-xl mx-auto"
        >
          {story.filmReel.subtitle}
        </motion.p>
      </div>

      {/* 35mm Vintage Film Strip Container */}
      <div className="relative bg-[#16041f] border-y-4 border-[#3c0a5c] rounded-3xl p-4 sm:p-8 shadow-[0_0_50px_rgba(155,44,230,0.25)] overflow-hidden">
        {/* Top Sprocket Perforations */}
        <div className="w-full flex justify-between gap-3 pb-4 mb-2 border-b border-pink-500/20 overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-4.5 rounded-[3px] bg-black/80 border border-pink-500/30 shrink-0"
            />
          ))}
        </div>

        {/* Film Frames Carousel */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-4 px-2 scroll-smooth">
          {story.filmReel.frames.map((frame: FilmFrame, idx: number) => {
            const isActive = idx === activeFrameIndex;
            const isVid = !!frame.video;
            const mediaSrc = frame.video || frame.image;

            return (
              <motion.div
                key={frame.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => setActiveFrameIndex(idx)}
                className={`relative shrink-0 w-64 sm:w-80 cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 p-2.5 ${
                  isActive
                    ? 'bg-[#3c0a5c] border-2 border-[#ff2a73] shadow-[0_0_30px_rgba(255,42,115,0.5)] scale-102'
                    : 'bg-[#1e062b] border border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                {/* Frame Metadata Header */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#ff8fb5] mb-2 px-1">
                  <span>FRAME #{frame.frameNumber}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {frame.timecode}
                  </span>
                </div>

                {/* Frame Media */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black">
                  {isVid ? (
                    <video
                      src={mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={mediaSrc}
                      alt={frame.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 text-xs font-serif text-white truncate">
                    {frame.title}
                  </span>
                  {isVid && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 bg-[#ff2a73] px-2 py-0.5 rounded-full text-[10px] text-white font-medium shadow-md">
                      <Video size={10} /> Video
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Sprocket Perforations */}
        <div className="w-full flex justify-between gap-3 pt-4 mt-2 border-t border-pink-500/20 overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-4.5 rounded-[3px] bg-black/80 border border-pink-500/30 shrink-0"
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mt-4 px-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#ff2a73] text-white/80 hover:text-white transition-all"
            aria-label="Previous frame"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-serif text-[#ff8fb5] tracking-widest uppercase">
            Frame {activeFrameIndex + 1} of {story.filmReel.frames.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#ff2a73] text-white/80 hover:text-white transition-all"
            aria-label="Next frame"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Active Focal Frame Highlight & Direct Upload Box */}
      <motion.div
        key={activeFrame.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`mt-10 p-6 sm:p-8 rounded-3xl glass-panel border-2 transition-all duration-300 text-center max-w-3xl mx-auto shadow-[0_0_50px_rgba(255,42,115,0.3)] relative ${
          isDragging ? 'border-[#ff2a73] scale-[1.01] bg-[#2a0636]' : 'border-[#ff8fb5]/40'
        }`}
      >
        <p className="text-xs uppercase font-serif tracking-widest text-[#ff8fb5] mb-2 flex items-center justify-center gap-1.5">
          <Heart size={13} fill="currentColor" className="text-[#ff2a73]" />
          {story.filmReel.focalPrompt}
          <Heart size={13} fill="currentColor" className="text-[#ff2a73]" />
        </p>

        {/* Large Media Preview for Active Frame */}
        <div
          className="relative max-w-lg mx-auto aspect-[16/10] rounded-2xl overflow-hidden bg-black/80 border-2 border-[#ff8fb5]/30 mb-6 group cursor-pointer shadow-xl"
          onClick={() =>
            onImageClick &&
            onImageClick(
              activeMediaSrc,
              activeFrame.title,
              undefined,
              undefined,
              isCurrentFrameVideo
            )
          }
        >
          {isCurrentFrameVideo ? (
            <video
              src={activeMediaSrc}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={activeMediaSrc}
              alt={activeFrame.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}

          <div className="absolute top-3 right-3 flex items-center gap-2">
            {isCurrentFrameVideo && (
              <span className="flex items-center gap-1 bg-[#ff2a73] px-2.5 py-1 rounded-full text-xs text-white font-medium shadow-lg">
                <Video size={12} /> Active Video
              </span>
            )}
            <button
              className="p-2 rounded-full bg-black/60 hover:bg-[#ff2a73] text-white transition-colors"
              title="Fullscreen"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Title (Click to Edit or View) */}
        {!isEditingText ? (
          <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">
            {activeFrame.title}
          </h3>
        ) : (
          <input
            type="text"
            value={activeFrame.title}
            onChange={(e) => updateFilmFrame(activeFrame.id, { title: e.target.value })}
            placeholder="Frame Title..."
            className="w-full text-center font-display text-2xl sm:text-3xl text-white bg-black/40 border border-[#ff2a73] rounded-xl px-3 py-1 mb-3 focus:outline-none"
          />
        )}

        {/* Quote (Click to Edit or View) */}
        {!isEditingText ? (
          <blockquote className="font-serif text-lg sm:text-xl text-[#ffc1d6] italic font-light mb-6 max-w-xl mx-auto">
            “{activeFrame.quote}”
          </blockquote>
        ) : (
          <textarea
            rows={2}
            value={activeFrame.quote}
            onChange={(e) => updateFilmFrame(activeFrame.id, { quote: e.target.value })}
            placeholder="Frame Quote..."
            className="w-full text-center font-serif text-lg text-[#ffc1d6] bg-black/40 border border-[#ff2a73] rounded-xl px-3 py-1 mb-6 focus:outline-none"
          />
        )}

        {/* DIRECT ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Direct Upload Button for this Frame */}
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,42,115,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <Upload size={16} />
            <span>{isUploading ? 'Uploading Video/Photo...' : `Upload Video/Photo for Frame #${activeFrame.frameNumber}`}</span>
          </button>

          {/* Edit / Save Text Button */}
          <button
            onClick={() => setIsEditingText(!isEditingText)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium border border-white/15 transition-all"
          >
            {isEditingText ? (
              <>
                <Check size={14} className="text-green-400" />
                <span>Save Text</span>
              </>
            ) : (
              <>
                <Edit3 size={14} className="text-[#ff8fb5]" />
                <span>Edit Caption & Quote</span>
              </>
            )}
          </button>
        </div>

        {/* Drag and Drop Prompt */}
        <div
          onClick={handleUploadClick}
          className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-[#ffc1d6]/70 cursor-pointer hover:text-white transition-colors"
        >
          <FileVideo size={15} className="text-[#ff8fb5]" />
          <span>You can also drag & drop any MP4, MOV, or Video file directly here</span>
        </div>

        {/* Upload Status Notification */}
        <AnimatePresence>
          {uploadStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 inline-flex items-center gap-2 text-xs font-serif text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-4 py-2 rounded-full shadow-lg"
            >
              <CheckCircle2 size={15} />
              <span>{uploadStatus}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
