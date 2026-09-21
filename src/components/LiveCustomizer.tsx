import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Music,
  Heart,
  Mail,
  Camera,
  Download,
  Copy,
  RotateCcw,
  Check,
  Sparkles,
  PenTool,
  Film,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const LiveCustomizer: React.FC = () => {
  const {
    story,
    isCustomizerOpen,
    closeCustomizer,
    updateCouple,
    updateApology,
    updateHero,
    updateSoundtrack,
    updateTimelineItem,
    updatePolaroid,
    updateFilmFrame,
    updateLittleThing,
    updateJarStar,
    updateGeneralStory,
    handleFileUpload,
    exportConfigToClipboard,
    exportConfigAsJSON,
    resetToDefault,
  } = useStory();

  const [activeTab, setActiveTab] = useState<
    'couple' | 'apology' | 'handwriting' | 'chapter7' | 'memories' | 'music' | 'export'
  >('chapter7');
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTarget, setUploadTarget] = useState<{
    type: 'hero' | 'timeline' | 'polaroid' | 'film' | 'soundtrack' | 'musicAudio';
    id?: string;
  } | null>(null);

  const triggerUpload = (target: {
    type: 'hero' | 'timeline' | 'polaroid' | 'film' | 'soundtrack' | 'musicAudio';
    id?: string;
  }) => {
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    handleFileUpload(file, (mediaUrl, mediaType) => {
      if (uploadTarget.type === 'hero') {
        updateHero({
          image: mediaType === 'image' ? mediaUrl : story.hero.image,
          video: mediaType === 'video' ? mediaUrl : undefined,
        });
      } else if (uploadTarget.type === 'soundtrack') {
        updateSoundtrack({ albumArt: mediaUrl });
      } else if (uploadTarget.type === 'musicAudio') {
        updateSoundtrack({
          audioSrc: mediaUrl,
          songTitle: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'Our Custom Track',
        });
      } else if (uploadTarget.type === 'timeline' && uploadTarget.id) {
        updateTimelineItem(uploadTarget.id, {
          image: mediaType === 'image' ? mediaUrl : story.timeline.find((t) => t.id === uploadTarget.id)?.image || '',
          video: mediaType === 'video' ? mediaUrl : undefined,
          mediaType: mediaType === 'video' ? 'video' : 'image',
        });
      } else if (uploadTarget.type === 'polaroid' && uploadTarget.id) {
        updatePolaroid(uploadTarget.id, {
          image: mediaType === 'image' ? mediaUrl : story.polaroids.find((p) => p.id === uploadTarget.id)?.image || '',
          video: mediaType === 'video' ? mediaUrl : undefined,
        });
      } else if (uploadTarget.type === 'film' && uploadTarget.id) {
        updateFilmFrame(uploadTarget.id, {
          image: mediaType === 'image' ? mediaUrl : story.filmReel.frames.find((f) => f.id === uploadTarget.id)?.image || '',
          video: mediaType === 'video' ? mediaUrl : undefined,
        });
      }
      e.target.value = '';
    });
  };

  const handleCopyCode = () => {
    exportConfigToClipboard();
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  if (!isCustomizerOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg"
      >
        {/* Hidden Master File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelected}
          accept="image/*,video/*,audio/*,.mp3,.wav,.m4a"
          className="hidden"
        />

        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#1c0626] border-2 border-[#ff4d8d]/30 rounded-3xl shadow-[0_0_60px_rgba(255,42,115,0.4)] overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-[#2a083b] via-[#480d61] to-[#250733] border-b border-[#ff4d8d]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#ff2a73]/20 border border-[#ff4d8d]/30 text-[#ff8fb5]">
                <Sparkles size={22} className="animate-spin" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-shimmer font-semibold">
                  Personalization Studio
                </h2>
                <p className="text-xs text-[#ffc1d6]/70">
                  Upload photos, videos, custom song, and edit all handwritten notes
                </p>
              </div>
            </div>

            <button
              onClick={closeCustomizer}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all"
              aria-label="Close studio"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-3 bg-[#14031c] border-b border-white/10 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('chapter7')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'chapter7'
                  ? 'bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film size={15} />
              <span>🎬 Chapter 6 Film Reel</span>
            </button>

            <button
              onClick={() => setActiveTab('handwriting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'handwriting'
                  ? 'bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <PenTool size={15} />
              <span>✍️ Handwritten Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('music')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'music'
                  ? 'bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Music size={15} />
              <span>🎵 Custom Music (MP3)</span>
            </button>

            <button
              onClick={() => setActiveTab('memories')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'memories'
                  ? 'bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Camera size={15} />
              <span>All Memories & Media</span>
            </button>

            <button
              onClick={() => setActiveTab('apology')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'apology'
                  ? 'bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail size={15} />
              <span>Apology Letter</span>
            </button>

            <button
              onClick={() => setActiveTab('couple')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'couple'
                  ? 'bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart size={15} />
              <span>Names & Dates</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'export'
                  ? 'bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Download size={15} />
              <span>Save / Export</span>
            </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
            {/* TAB: CHAPTER 6 FILM REEL */}
            {activeTab === 'chapter7' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-[#ff2a73]/20 border border-[#ff4d8d]/40">
                  <h3 className="font-serif text-base font-semibold text-white mb-1">
                    🎬 Chapter 6 (If I Could Rewind / Film Reel) Media Manager
                  </h3>
                  <p className="text-xs text-[#ffc1d6]">
                    Upload your own photo or video for each frame in Chapter 6. You can also edit the title and quotes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.filmReel.frames.map((frame) => (
                    <div
                      key={frame.id}
                      className="p-4 rounded-2xl bg-black/40 border border-white/15 flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/20">
                          {frame.video ? (
                            <video src={frame.video} className="w-full h-full object-cover" muted />
                          ) : (
                            <img src={frame.image} alt={frame.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#ff8fb5] font-mono block">
                            FRAME #{frame.frameNumber} • {frame.timecode}
                          </span>
                          <input
                            type="text"
                            value={frame.title}
                            onChange={(e) => updateFilmFrame(frame.id, { title: e.target.value })}
                            placeholder="Frame title..."
                            className="text-xs font-serif text-white bg-black/50 border border-white/10 rounded px-2 py-1 w-full focus:outline-none focus:border-[#ff2a73] mb-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-white/60 font-serif block mb-0.5">
                          Memory Quote
                        </label>
                        <textarea
                          rows={2}
                          value={frame.quote}
                          onChange={(e) => updateFilmFrame(frame.id, { quote: e.target.value })}
                          placeholder="Memory quote..."
                          className="text-xs font-serif text-[#ffc1d6] bg-black/50 border border-white/10 rounded p-1.5 w-full focus:outline-none focus:border-[#ff2a73]"
                        />
                      </div>

                      <button
                        onClick={() => triggerUpload({ type: 'film', id: frame.id })}
                        className="flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] text-white text-xs font-semibold shadow-md hover:scale-102 transition-all"
                      >
                        <Upload size={13} />
                        <span>Upload Photo/Video for Frame #{frame.frameNumber}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: HANDWRITTEN NOTES */}
            {activeTab === 'handwriting' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-serif text-base font-semibold text-white mb-1">
                    ✍️ Edit All Handwritten Writings
                  </h3>
                  <p className="text-xs text-[#ffc1d6]">
                    Customize all intimate handwritten messages, polaroid captions, secret back notes, and the final postscript note.
                  </p>
                </div>

                {/* Final Timed P.S. Handwritten Note */}
                <div className="p-4 rounded-2xl bg-black/40 border border-[#ff4d8d]/30">
                  <label className="text-xs font-serif uppercase tracking-widest text-[#ff8fb5] font-bold block mb-1">
                    Final Chapter P.S. Handwritten Message
                  </label>
                  <textarea
                    rows={2}
                    value={story.finalCTA.timedPSMessage}
                    onChange={(e) =>
                      updateGeneralStory({
                        ...story,
                        finalCTA: { ...story.finalCTA, timedPSMessage: e.target.value },
                      })
                    }
                    className="w-full font-handwriting text-2xl text-white bg-black/50 border border-white/15 rounded-xl p-3 focus:outline-none focus:border-[#ff2a73]"
                  />
                </div>

                {/* Polaroids Captions & Back Notes */}
                <h4 className="font-display text-lg text-[#ff8fb5] pt-2">
                  Polaroid Handwritten Captions & Secret Back Notes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.polaroids.map((pol) => (
                    <div key={pol.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center gap-3">
                        <img src={pol.image} alt={pol.caption} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <label className="text-[10px] uppercase font-serif text-[#ff8fb5] block">
                            Front Handwritten Caption
                          </label>
                          <input
                            type="text"
                            value={pol.caption}
                            onChange={(e) => updatePolaroid(pol.id, { caption: e.target.value })}
                            className="w-full font-handwriting text-xl text-white bg-black/50 border border-white/15 rounded px-2 py-1 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-serif text-[#ff8fb5] block mb-0.5">
                          Secret Note On Back
                        </label>
                        <textarea
                          rows={2}
                          value={pol.backNote || ''}
                          onChange={(e) => updatePolaroid(pol.id, { backNote: e.target.value })}
                          className="w-full font-handwriting text-lg text-[#ffc1d6] bg-black/50 border border-white/15 rounded p-2 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Little Things Personal Notes */}
                <h4 className="font-display text-lg text-[#ff8fb5] pt-2">
                  Little Things Personal Handwritten Notes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.littleThings.map((lt) => (
                    <div key={lt.id} className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                      <span className="text-xs font-serif text-white font-medium block mb-1">
                        {lt.title}
                      </span>
                      <textarea
                        rows={2}
                        value={lt.personalNote || ''}
                        onChange={(e) => updateLittleThing(lt.id, { personalNote: e.target.value })}
                        className="w-full font-handwriting text-lg text-[#ffc1d6] bg-black/50 border border-white/15 rounded p-2 focus:outline-none"
                        placeholder="Personal handwritten note..."
                      />
                    </div>
                  ))}
                </div>

                {/* Memory Jar Keepsakes */}
                <h4 className="font-display text-lg text-[#ff8fb5] pt-2">
                  Memory Jar Star Keepsakes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.memoryJar.stars.map((st) => (
                    <div key={st.id} className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => updateJarStar(st.id, { title: e.target.value })}
                        className="text-xs font-serif text-white font-medium bg-black/50 border border-white/10 rounded px-2 py-1 w-full mb-1 focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        value={st.memory}
                        onChange={(e) => updateJarStar(st.id, { memory: e.target.value })}
                        className="w-full font-serif text-xs text-[#ffc1d6] bg-black/50 border border-white/15 rounded p-2 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: MUSIC (MP3 UPLOADER) */}
            {activeTab === 'music' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#ff2a73]/25 via-[#9b2ce6]/25 to-black border border-[#ff4d8d]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white">
                      Upload Custom Song (MP3 / WAV / Audio)
                    </h3>
                    <p className="text-xs text-[#ffc1d6]/80">
                      Choose an audio file from your computer or phone. It will immediately play as your background soundtrack!
                    </p>
                  </div>

                  <button
                    onClick={() => triggerUpload({ type: 'musicAudio' })}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff2a73] to-[#9b2ce6] hover:scale-105 text-white text-sm font-semibold shadow-xl transition-all"
                  >
                    <Upload size={16} />
                    <span>Select Audio File</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Song Title
                    </label>
                    <input
                      type="text"
                      value={story.soundtrack.songTitle}
                      onChange={(e) => updateSoundtrack({ songTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Artist / Credit
                    </label>
                    <input
                      type="text"
                      value={story.soundtrack.artist}
                      onChange={(e) => updateSoundtrack({ artist: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                    Lyrical Quote
                  </label>
                  <input
                    type="text"
                    value={story.soundtrack.lyricsSnippet}
                    onChange={(e) => updateSoundtrack({ lyricsSnippet: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB: ALL MEMORIES & MEDIA */}
            {activeTab === 'memories' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-[#ffc1d6]">
                    📸 Replace any photo or video with your original media!
                  </p>
                </div>

                <h3 className="font-display text-xl text-[#ff8fb5]">
                  Timeline Milestones (01 - 08)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.timeline.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                          {item.video ? (
                            <video src={item.video} className="w-full h-full object-cover" muted />
                          ) : (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] text-[#e5c583] font-mono">
                            NODE #{item.number}
                          </span>
                          <p className="font-serif text-sm text-white font-medium truncate max-w-[140px]">
                            {item.title}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerUpload({ type: 'timeline', id: item.id })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#9b2ce6]/40 hover:bg-[#ff2a73] text-white text-xs transition-colors shrink-0"
                      >
                        <Upload size={12} />
                        <span>Upload</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: APOLOGY LETTER */}
            {activeTab === 'apology' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Envelope Label
                    </label>
                    <input
                      type="text"
                      value={story.apology.envelopeLabel}
                      onChange={(e) => updateApology({ envelopeLabel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Letter Salutation
                    </label>
                    <input
                      type="text"
                      value={story.apology.salutation}
                      onChange={(e) => updateApology({ salutation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                    Apology Paragraphs
                  </label>
                  {story.apology.bodyParagraphs.map((para, idx) => (
                    <div key={idx} className="mb-3">
                      <span className="text-[11px] text-[#ffc1d6]/70 block mb-1">
                        Paragraph {idx + 1}
                      </span>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const updated = [...story.apology.bodyParagraphs];
                          updated[idx] = e.target.value;
                          updateApology({ bodyParagraphs: updated });
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#ff2a73] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Closing Line
                    </label>
                    <input
                      type="text"
                      value={story.apology.closing}
                      onChange={(e) => updateApology({ closing: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Sign-Off Signature
                    </label>
                    <input
                      type="text"
                      value={story.apology.signOff}
                      onChange={(e) => updateApology({ signOff: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COUPLE & NAMES */}
            {activeTab === 'couple' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Your Name / Nickname
                    </label>
                    <input
                      type="text"
                      value={story.couple.myName}
                      onChange={(e) => updateCouple({ myName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      His Name
                    </label>
                    <input
                      type="text"
                      value={story.couple.hisName}
                      onChange={(e) => updateCouple({ hisName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Pet Name / Nickname for Him
                    </label>
                    <input
                      type="text"
                      value={story.couple.nickname}
                      onChange={(e) => updateCouple({ nickname: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#ff8fb5] font-serif mb-2">
                      Special Date
                    </label>
                    <input
                      type="text"
                      value={story.couple.ourDate}
                      onChange={(e) => updateCouple({ ourDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#ff2a73] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SAVE & EXPORT */}
            {activeTab === 'export' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="font-display text-xl text-white">
                    Permanent Saving & Export Options
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    All your uploaded media and text edits are saved in your browser. You can also copy the configuration code to clipboard or download a JSON backup.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleCopyCode}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#ff2a73]/20 border border-[#ff4d8d]/40 hover:bg-[#ff2a73]/30 transition-all text-center gap-2"
                  >
                    {copySuccess ? <Check size={28} className="text-green-400" /> : <Copy size={28} className="text-[#ff8fb5]" />}
                    <span className="font-serif text-base font-semibold text-white">
                      {copySuccess ? 'Copied to Clipboard!' : 'Copy Config for story.ts'}
                    </span>
                    <span className="text-xs text-white/60">
                      Paste directly into src/data/story.ts
                    </span>
                  </button>

                  <button
                    onClick={exportConfigAsJSON}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#9b2ce6]/20 border border-[#b858f6]/40 hover:bg-[#9b2ce6]/30 transition-all text-center gap-2"
                  >
                    <Download size={28} className="text-[#d48eff]" />
                    <span className="font-serif text-base font-semibold text-white">
                      Download JSON Backup
                    </span>
                    <span className="text-xs text-white/60">
                      Save configuration to your device
                    </span>
                  </button>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button
                    onClick={resetToDefault}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs transition-all"
                  >
                    <RotateCcw size={14} />
                    <span>Reset All to Original Defaults</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
