import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FloatingHearts: React.FC = () => {
  // Pre-generate static layout positions for 20 floating hearts
  const hearts = [
    { x: '5%', size: 16, duration: 9, delay: 0, color: '#ff2a73' },
    { x: '12%', size: 24, duration: 13, delay: 2, color: '#ff8fb5' },
    { x: '20%', size: 14, duration: 8, delay: 4, color: '#e60049' },
    { x: '28%', size: 28, duration: 15, delay: 1, color: '#9b2ce6' },
    { x: '35%', size: 18, duration: 11, delay: 3, color: '#ff5c94' },
    { x: '42%', size: 22, duration: 14, delay: 5, color: '#ffc1d6' },
    { x: '50%', size: 16, duration: 10, delay: 2.5, color: '#ff2a73' },
    { x: '58%', size: 26, duration: 16, delay: 0.5, color: '#e60049' },
    { x: '65%', size: 14, duration: 9, delay: 3.5, color: '#b858f6' },
    { x: '72%', size: 20, duration: 12, delay: 1.5, color: '#ff8fb5' },
    { x: '80%', size: 25, duration: 14, delay: 4.5, color: '#ff2a73' },
    { x: '88%', size: 15, duration: 10, delay: 2, color: '#9b2ce6' },
    { x: '94%', size: 22, duration: 13, delay: 3, color: '#ff5c94' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          initial={{ y: '105vh', opacity: 0, x: h.x, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.45, 0.6, 0.35, 0],
            rotate: [0, 15, -15, 20, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: h.x,
            color: h.color,
            filter: `drop-shadow(0 0 8px ${h.color})`,
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};
