import React, { useEffect, useRef } from 'react';

interface StarBackgroundProps {
  reducedDensity?: boolean;
}

export const StarBackground: React.FC<StarBackgroundProps> = ({ reducedDensity = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = reducedDensity ? 75 : Math.floor((width * height) / 8500);
    const stars = Array.from({ length: Math.min(starCount, 220) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.8 ? '#f7cad0' : Math.random() > 0.6 ? '#e5c583' : '#ffffff',
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    }));

    // Generate subtle shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      opacity: 0,
      active: false,
    };

    const resetShootingStar = () => {
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        active: true,
      };
    };

    let lastShootingStarTime = Date.now();
    const shootingStarInterval = 7000; // Every 7s

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render ambient soft nebulae glows
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 20, width * 0.2, height * 0.3, width * 0.45);
      grad1.addColorStop(0, 'rgba(74, 21, 46, 0.07)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 20, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, 'rgba(45, 12, 30, 0.08)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed * star.direction;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.direction = -1;
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.direction = 1;
        }

        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update & render shooting star
      const now = Date.now();
      if (!shootingStar.active && now - lastShootingStarTime > shootingStarInterval) {
        if (Math.random() < 0.3) {
          resetShootingStar();
          lastShootingStarTime = now;
        }
      }

      if (shootingStar.active) {
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const starGrad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
        starGrad.addColorStop(0, `rgba(247, 202, 208, ${shootingStar.opacity})`);
        starGrad.addColorStop(1, 'rgba(247, 202, 208, 0)');

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = shootingStar.opacity;
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedDensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};
