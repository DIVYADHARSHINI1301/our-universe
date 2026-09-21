import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, RotateCw, Heart, Video, Upload, Edit3, Check } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { PolaroidItem } from '../data/story';

interface PolaroidWallProps {
  onImageClick?: (src: string, caption: string, date?: string, location?: string, isVideo?: boolean, backNote?: string) => void;
}

export const PolaroidWall: React.FC<PolaroidWallProps> = ({ onImageClick }) => {
  const { story, updatePolaroid, handleFileUpload } = useStory();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetPolaroidId, setTargetPolaroidId] = useState<string | null>(null);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const triggerPolaroidUpload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetPolaroidId(id);
    fileInputRef.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetPolaroidId) return;

    handleFileUpload(file, (mediaUrl, mediaType) => {
      updatePolaroid(targetPolaroidId, {
        image: mediaType === 'image' ? mediaUrl : story.polaroids.find((p) => p.id === targetPolaroidId)?.image || '',
        video: mediaType === 'video' ? mediaUrl : undefined,
      });
      e.target.value = '';
    });
  };

  return (
    <section id="polaroids" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Hidden File Input for Polaroids */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelected}
        accept="image/*,video/*"
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
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 06 • The Film Wall
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
          Moments In Frame
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-[#ffc1d6]/85 italic max-w-xl mx-auto"
        >
          Scattered polaroids from days that felt timeless. Tap any photo to expand, upload your own photo/video, or flip to read and edit the secret back note.
        </motion.p>
      </div>

      {/* Scattered Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
        {story.polaroids.map((pol: PolaroidItem, index: number) => {
          const isFlipped = !!flippedCards[pol.id];
          const isVideo = !!pol.video;
          const mediaSrc = pol.video || pol.image;
          const isEditing = editingCardId === pol.id;

          return (
            <motion.div
              key={pol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ rotate: `${pol.rotation}deg` }}
              className="relative group cursor-pointer"
              onClick={() => {
                if (!isEditing) {
                  onImageClick &&
                    onImageClick(mediaSrc, pol.caption, pol.date, pol.location, isVideo, pol.backNote);
                }
              }}
            >
              {/* Decorative Love Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/40 backdrop-blur-sm border border-white/25 z-20 transform -rotate-1 shadow-sm opacity-80 pointer-events-none rounded-sm" />

              {/* Polaroid Card */}
              <div className="polaroid-card text-[#1c041e] relative">
                {!isFlipped ? (
                  /* Front of Polaroid */
                  <>
                    {/* Media Container with Quick Upload Overlay */}
                    <div className="relative aspect-[4/3] bg-neutral-900 rounded-[3px] overflow-hidden mb-3 group/media">
                      {isVideo ? (
                        <video
                          src={mediaSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={mediaSrc}
                          alt={pol.caption}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40" />

                      {/* Direct Upload Button Overlay on Hover */}
                      <button
                        onClick={(e) => triggerPolaroidUpload(pol.id, e)}
                        className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff2a73] hover:bg-[#e60049] text-white text-[11px] font-semibold shadow-lg transition-all"
                        title="Upload Photo or Video for this polaroid"
                      >
                        <Upload size={12} />
                        <span>Upload Photo/Video</span>
                      </button>

                      {isVideo && (
                        <span className="absolute top-2 right-2 flex items-center gap-1 bg-[#ff2a73] px-2 py-0.5 rounded-full text-[10px] text-white font-medium">
                          <Video size={10} /> Video
                        </span>
                      )}
                    </div>

                    {/* Handwritten Caption (Editable) */}
                    <div className="flex flex-col gap-1 px-1">
                      {!isEditing ? (
                        <p className="font-handwriting text-2xl text-[#26042b] leading-tight font-semibold">
                          {pol.caption}
                        </p>
                      ) : (
                        <input
                          type="text"
                          value={pol.caption}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updatePolaroid(pol.id, { caption: e.target.value })}
                          className="font-handwriting text-2xl text-[#26042b] bg-pink-50 border border-[#ff2a73] rounded px-2 py-0.5 focus:outline-none w-full"
                          placeholder="Handwritten caption..."
                        />
                      )}

                      <div className="flex items-center justify-between text-[11px] text-[#ff2a73] uppercase tracking-wider font-serif mt-1">
                        {pol.date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {pol.date}
                          </span>
                        )}
                        {pol.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {pol.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Back of Polaroid (Secret Handwritten Note - Editable) */
                  <div
                    className="aspect-[4/4.2] flex flex-col justify-between p-4 bg-[#fdf5f9] border border-[#ffc1d6] rounded-[3px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-serif tracking-widest text-[#ff2a73] block mb-2 font-bold flex items-center gap-1">
                        <Heart size={11} fill="currentColor" /> Handwritten Note On Back
                      </span>
                      {!isEditing ? (
                        <p className="font-handwriting text-xl text-[#3c0a5c] leading-relaxed">
                          {pol.backNote || 'You mean the absolute universe to me.'}
                        </p>
                      ) : (
                        <textarea
                          rows={4}
                          value={pol.backNote || ''}
                          onChange={(e) => updatePolaroid(pol.id, { backNote: e.target.value })}
                          className="w-full font-handwriting text-xl text-[#3c0a5c] bg-white border border-[#ff2a73] rounded p-2 focus:outline-none"
                          placeholder="Write your secret handwritten note..."
                        />
                      )}
                    </div>

                    <p className="text-[10px] font-serif text-[#ff2a73] italic">
                      — written with all my heart
                    </p>
                  </div>
                )}

                {/* Bottom Card Controls: Flip + Edit Text */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCardId(isEditing ? null : pol.id);
                    }}
                    className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#ff2a73] transition-all shadow-sm"
                    title={isEditing ? 'Save Text' : 'Edit Handwritten Text'}
                  >
                    {isEditing ? <Check size={13} className="text-green-600" /> : <Edit3 size={13} />}
                  </button>

                  <button
                    onClick={(e) => toggleFlip(pol.id, e)}
                    className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#ff2a73] transition-all shadow-sm"
                    title={isFlipped ? 'View Media' : 'Read/Edit Back Note'}
                    aria-label="Flip card"
                  >
                    <RotateCw size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
