import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface MontageProps {
  onImageClick?: (src: string, caption: string) => void;
}

const montageItems = [
  { image: '/images/hero-couple.jpg', caption: 'The quiet sunset where we didn’t need words.', style: 'polaroid' },
  { image: '/images/memory-first-date.jpg', caption: 'Coffee cups and three hours that felt like minutes.', style: 'film' },
  { image: '/images/memory-stargazing.jpg', caption: 'Looking at stars from the hilltop car hood.', style: 'framed' },
  { image: '/images/memory-laughing.jpg', caption: 'Your unfiltered laugh in the park.', style: 'polaroid' },
  { image: '/images/memory-beach-dusk.jpg', caption: 'Footprints on the wet sand at twilight.', style: 'framed' },
  { image: '/images/memory-rainy-lights.jpg', caption: 'Sharing one umbrella in the city rain.', style: 'film' },
];

export const MemoryMontage: React.FC<MontageProps> = ({ onImageClick }) => {
  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-[#f7cad0]/20 mb-4"
        >
          <Sparkles size={14} className="text-[#e5c583]" />
          <span className="text-xs font-serif tracking-widest text-[#e5c583] uppercase">
            A Living Montage
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-5xl md:text-6xl text-shimmer font-semibold uppercase tracking-tight mb-4"
        >
          Every Moment Was Real
        </motion.h2>
      </div>

      {/* Dynamic Montage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {montageItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onImageClick && onImageClick(item.image, item.caption)}
            className="group cursor-pointer glass-panel p-3.5 rounded-2xl border border-[#f7cad0]/15 overflow-hidden shadow-xl"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 mb-3">
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            <p className="font-handwriting text-2xl text-[#fdf8f5] px-2 leading-tight">
              “{item.caption}”
            </p>
          </motion.div>
        ))}
      </div>

      {/* Concluding montage sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-16 text-center max-w-xl mx-auto"
      >
        <p className="font-serif text-xl sm:text-2xl text-[#f7cad0] italic font-light mb-2">
          “All of these moments were real.”
        </p>
        <p className="font-serif text-lg sm:text-xl text-[#fdf8f5]/80 italic font-light">
          “And they mean more to me than I know how to explain.”
        </p>
      </motion.div>
    </section>
  );
};
