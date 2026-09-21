import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, Video, Edit3, Check, Upload } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { TimelineMemory } from '../data/story';

interface MemoryTimelineProps {
  onImageClick?: (src: string, caption: string, date?: string, location?: string, isVideo?: boolean) => void;
}

export const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ onImageClick }) => {
  const { story, updateTimelineItem, handleFileUpload } = useStory();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetTimelineId, setTargetTimelineId] = useState<string | null>(null);

  const triggerUpload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetTimelineId(id);
    fileInputRef.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetTimelineId) return;

    handleFileUpload(file, (mediaUrl, mediaType) => {
      updateTimelineItem(targetTimelineId, {
        image: mediaType === 'image' ? mediaUrl : story.timeline.find((t) => t.id === targetTimelineId)?.image || '',
        video: mediaType === 'video' ? mediaUrl : undefined,
        mediaType: mediaType === 'video' ? 'video' : 'image',
      });
      e.target.value = '';
    });
  };

  return (
    <section id="timeline" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Hidden File Input for Timeline */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelected}
        accept="image/*,video/*"
        className="hidden"
      />

      {/* Header */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff2a73]/20 to-[#9b2ce6]/20 border border-[#ff8fb5]/30 mb-4"
        >
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 03 • The Journey Of Us
          </span>
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-shimmer font-semibold uppercase tracking-tight mb-4"
        >
          Our Story So Far
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-[#ffc1d6]/85 italic max-w-xl mx-auto"
        >
          Click "Edit Text" on any milestone to write your own memories, dates, and quotes next to the photos!
        </motion.p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Central glowing vertical timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#ff2a73]/30 via-[#9b2ce6] to-[#e60049]/40 -translate-x-1/2 shadow-[0_0_15px_rgba(255,42,115,0.6)]" />

        {/* Timeline Items */}
        <div className="flex flex-col gap-16 md:gap-24">
          {story.timeline.map((item: TimelineMemory, index: number) => {
            const isEven = index % 2 === 0;
            const isVideo = item.mediaType === 'video' || !!item.video;
            const mediaSource = item.video || item.image;
            const isEditing = editingItemId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-14 pl-12 md:pl-0`}
              >
                {/* Central Heart Node Badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-[#3c0a5c] to-[#ff2a73] border-2 border-[#ff8fb5] shadow-[0_0_20px_rgba(255,42,115,0.7)] flex items-center justify-center z-10">
                  <span className="font-serif text-xs font-bold text-white">
                    {item.number}
                  </span>
                </div>

                {/* Content Card (DIRECTLY EDITABLE TEXT NEXT TO PHOTO) */}
                <div className="w-full md:w-[45%]">
                  <div className="glass-panel p-6 sm:p-7 rounded-3xl border-2 border-[#ff8fb5]/30 relative overflow-hidden shadow-xl">
                    {/* Top Edit Toggle Button */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                      <span className="text-[11px] uppercase tracking-widest font-serif text-[#ff8fb5] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        {item.tag || `Milestone ${item.number}`}
                      </span>

                      <button
                        onClick={() => setEditingItemId(isEditing ? null : item.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff2a73]/20 hover:bg-[#ff2a73] text-white text-xs font-serif uppercase tracking-wider transition-all border border-[#ff8fb5]/30"
                      >
                        {isEditing ? (
                          <>
                            <Check size={13} className="text-green-400" />
                            <span>Done Editing</span>
                          </>
                        ) : (
                          <>
                            <Edit3 size={13} className="text-[#ff8fb5]" />
                            <span>Edit Text</span>
                          </>
                        )}
                      </button>
                    </div>

                    {!isEditing ? (
                      /* Normal Display Mode */
                      <>
                        {/* Date & Location */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-[#ffc1d6]/80">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-[#ff2a73]" />
                            <span>{item.date}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-1.5 text-[#e5c583]">
                              <MapPin size={12} />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.emoji && <span className="text-xl">{item.emoji}</span>}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-sm sm:text-base text-[#fdf8f9]/90 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Emotional quote */}
                        {item.quote && (
                          <blockquote className="border-l-2 border-[#ff2a73] pl-3.5 py-0.5 font-serif text-sm sm:text-base text-[#ffc1d6] italic font-light">
                            {item.quote}
                          </blockquote>
                        )}
                      </>
                    ) : (
                      /* Live In-Place Editing Form Mode */
                      <div className="space-y-3 text-left">
                        {/* Edit Title */}
                        <div>
                          <label className="text-[10px] uppercase font-serif text-[#ff8fb5] font-bold block mb-1">
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateTimelineItem(item.id, { title: e.target.value })}
                            className="w-full font-display text-xl text-white bg-black/60 border border-[#ff2a73] rounded-xl px-3 py-1.5 focus:outline-none"
                            placeholder="Milestone Title..."
                          />
                        </div>

                        {/* Edit Date & Location */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] uppercase font-serif text-[#ff8fb5] font-bold block mb-1">
                              Date
                            </label>
                            <input
                              type="text"
                              value={item.date}
                              onChange={(e) => updateTimelineItem(item.id, { date: e.target.value })}
                              className="w-full text-xs text-white bg-black/60 border border-[#ff2a73] rounded-lg px-2.5 py-1.5 focus:outline-none"
                              placeholder="e.g. 14 Oct 2024"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-serif text-[#ff8fb5] font-bold block mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={item.location || ''}
                              onChange={(e) => updateTimelineItem(item.id, { location: e.target.value })}
                              className="w-full text-xs text-white bg-black/60 border border-[#ff2a73] rounded-lg px-2.5 py-1.5 focus:outline-none"
                              placeholder="e.g. Our Cafe"
                            />
                          </div>
                        </div>

                        {/* Edit Description Text */}
                        <div>
                          <label className="text-[10px] uppercase font-serif text-[#ff8fb5] font-bold block mb-1">
                            Memory Story & Details
                          </label>
                          <textarea
                            rows={3}
                            value={item.description}
                            onChange={(e) => updateTimelineItem(item.id, { description: e.target.value })}
                            className="w-full font-sans text-xs text-white bg-black/60 border border-[#ff2a73] rounded-xl p-2.5 focus:outline-none"
                            placeholder="Write your story details here..."
                          />
                        </div>

                        {/* Edit Quote */}
                        <div>
                          <label className="text-[10px] uppercase font-serif text-[#ff8fb5] font-bold block mb-1">
                            Personal Quote / Note
                          </label>
                          <input
                            type="text"
                            value={item.quote || ''}
                            onChange={(e) => updateTimelineItem(item.id, { quote: e.target.value })}
                            className="w-full font-serif text-xs text-[#ffc1d6] italic bg-black/60 border border-[#ff2a73] rounded-lg px-2.5 py-1.5 focus:outline-none"
                            placeholder="“Personal quote...”"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Media Card (Photo/Video with Direct Upload button) */}
                <div className="w-full md:w-[45%]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative rounded-3xl overflow-hidden glass-panel p-2.5 cursor-pointer shadow-[0_15px_35px_rgba(32,7,46,0.6)] border border-[#ff8fb5]/25"
                    onClick={() =>
                      onImageClick &&
                      onImageClick(mediaSource, item.title, item.date, item.location, isVideo)
                    }
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/50">
                      {isVideo ? (
                        <video
                          src={mediaSource}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                      ) : (
                        <img
                          src={mediaSource}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          loading="lazy"
                        />
                      )}

                      {/* Direct Upload Button on Media */}
                      <button
                        onClick={(e) => triggerUpload(item.id, e)}
                        className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff2a73] hover:bg-[#e60049] text-white text-[11px] font-semibold shadow-2xl transition-all"
                        title="Upload Photo or Video for this milestone"
                      >
                        <Upload size={12} />
                        <span>Upload Media</span>
                      </button>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 pointer-events-none">
                        <span className="text-xs font-handwriting text-white text-xl">
                          Click to expand • {item.title}
                        </span>
                        {isVideo && (
                          <span className="flex items-center gap-1 bg-[#ff2a73] px-2 py-0.5 rounded-full text-[10px] text-white font-medium">
                            <Video size={11} /> Video
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
