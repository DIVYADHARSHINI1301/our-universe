import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive') ||
        target.closest('.polaroid-card') ||
        target.closest('.jar-star') ||
        target.tagName.toLowerCase() === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHoverCheck);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHoverCheck);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Small Glowing Inner Dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-[#f7cad0] transition-transform duration-75 ease-out shadow-[0_0_12px_#f7cad0]"
        style={{
          width: '6px',
          height: '6px',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 0.5 : 1})`,
        }}
      />
      {/* Outer Soft Expanding Aura */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border border-[#e5c583]/50 transition-all duration-300 ease-out"
        style={{
          width: isHovered ? '48px' : '26px',
          height: isHovered ? '48px' : '26px',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovered ? 'rgba(229, 197, 131, 0.12)' : 'rgba(247, 202, 208, 0.04)',
          boxShadow: isHovered ? '0 0 20px rgba(229, 197, 131, 0.3)' : 'none',
        }}
      />
    </>
  );
};
