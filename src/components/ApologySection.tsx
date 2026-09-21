import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Edit3, Check } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const ApologySection: React.FC = () => {
  const { story, updateApology } = useStory();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section id="apology" className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff2a73]/20 to-[#9b2ce6]/20 border border-[#ff8fb5]/30 mb-4"
        >
          <Mail size={14} className="text-[#ff2a73]" />
          <span className="text-xs font-serif tracking-widest text-[#ffc1d6] uppercase">
            Chapter 10 • From My Heart
          </span>
          <Heart size={14} className="text-[#ff2a73]" fill="currentColor" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl text-shimmer font-semibold uppercase tracking-tight mb-3"
        >
          An Honest Apology
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-base sm:text-lg text-[#ffc1d6]/80 italic"
        >
          Tap the envelope below to open this private letter.
        </motion.p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="group cursor-pointer relative w-full aspect-[16/10] max-w-md bg-gradient-to-tr from-[#350742] via-[#520d6b] to-[#20042a] border-2 border-[#ff8fb5]/40 rounded-3xl shadow-[0_20px_60px_rgba(255,42,115,0.5)] p-6 flex flex-col items-center justify-center transition-all duration-300"
          >
            {/* Envelope flap lines */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#ff8fb5]/25 bg-white/[0.02]" />
            </div>

            {/* Wax Seal */}
            <div className="w-16 h-16 rounded-full wax-seal border-2 border-[#ff8fb5] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-4">
              <span className="font-serif text-2xl text-white font-bold drop-shadow">
                🤍
              </span>
            </div>

            <span className="font-serif text-2xl text-white tracking-wider mb-1">
              {story.apology.envelopeLabel}
            </span>

            <span className="text-xs font-serif uppercase tracking-widest text-[#ff8fb5] group-hover:text-white transition-colors flex items-center gap-1.5">
              <span>Click to unfold letter</span>
              <span>→</span>
            </span>
          </motion.div>
        ) : (
          /* Unfolded Handwritten Letter */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#fdf6fa] text-[#1c041e] p-8 sm:p-12 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-2 border-[#ff8fb5]/40 text-left relative overflow-hidden"
            >
              {/* Paper Texture Top Accent Line */}
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#ff2a73]/40 to-transparent mb-8" />

              {/* Edit Toggle Button at Top Right of Letter */}
              <div className="absolute top-6 right-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3c0a5c]/10 hover:bg-[#3c0a5c]/20 text-[#3c0a5c] text-xs font-serif uppercase tracking-wider transition-all"
                >
                  {isEditing ? (
                    <>
                      <Check size={13} className="text-green-600" />
                      <span>Done Editing</span>
                    </>
                  ) : (
                    <>
                      <Edit3 size={13} className="text-[#ff2a73]" />
                      <span>Edit Letter Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Salutation (Editable) */}
              {!isEditing ? (
                <h3 className="font-handwriting text-3xl sm:text-4xl text-[#3c0a5c] font-bold mb-6">
                  {story.apology.salutation}
                </h3>
              ) : (
                <div className="mb-4">
                  <label className="text-[10px] uppercase font-serif text-[#ff2a73] font-bold block mb-1">
                    Letter Salutation
                  </label>
                  <input
                    type="text"
                    value={story.apology.salutation}
                    onChange={(e) => updateApology({ salutation: e.target.value })}
                    className="font-handwriting text-3xl text-[#3c0a5c] bg-white border border-[#ff2a73] rounded-lg px-3 py-1 w-full focus:outline-none"
                  />
                </div>
              )}

              {/* Body Paragraphs (Editable) */}
              <div className="flex flex-col gap-4 font-serif text-lg sm:text-xl text-[#26042b] leading-relaxed font-normal">
                {story.apology.bodyParagraphs.map((para, idx) => (
                  <div key={idx}>
                    {!isEditing ? (
                      <p className="leading-relaxed">{para}</p>
                    ) : (
                      <div className="mb-2">
                        <span className="text-[10px] uppercase font-serif text-[#ff2a73] font-bold block mb-0.5">
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
                          className="w-full font-serif text-lg text-[#26042b] bg-white border border-[#ff2a73] rounded-lg p-2.5 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Letter Closing & Sign-off (Editable) */}
              <div className="mt-10 pt-6 border-t border-[#ff8fb5]/30 flex flex-col items-end">
                {!isEditing ? (
                  <>
                    <p className="font-serif text-base text-[#ff2a73] italic">
                      {story.apology.closing}
                    </p>
                    <p className="font-handwriting text-3xl sm:text-4xl text-[#3c0a5c] font-bold mt-1">
                      {story.apology.signOff}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-end gap-2 w-full max-w-xs">
                    <input
                      type="text"
                      value={story.apology.closing}
                      onChange={(e) => updateApology({ closing: e.target.value })}
                      placeholder="Closing line..."
                      className="text-right font-serif text-base text-[#ff2a73] bg-white border border-[#ff2a73] rounded px-2 py-0.5 w-full focus:outline-none"
                    />
                    <input
                      type="text"
                      value={story.apology.signOff}
                      onChange={(e) => updateApology({ signOff: e.target.value })}
                      placeholder="Your signature..."
                      className="text-right font-handwriting text-3xl text-[#3c0a5c] bg-white border border-[#ff2a73] rounded px-2 py-0.5 w-full focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Fold Letter Back Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setIsOpen(false);
                  }}
                  className="px-5 py-2 rounded-full bg-[#3c0a5c]/10 hover:bg-[#3c0a5c]/20 text-[#3c0a5c] text-xs font-serif uppercase tracking-widest transition-all"
                >
                  Fold letter back
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
