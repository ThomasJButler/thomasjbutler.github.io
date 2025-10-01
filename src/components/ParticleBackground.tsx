import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Initialize particles (2x density for epic effect)
    const particleCount = Math.floor((canvas.width * canvas.height) / 7500); // Doubled particle density
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.02;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction - gentle attraction with glow enhancement
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let opacityBoost = 1;
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.015;
          particle.speedX += (dx / distance) * force; // Attract toward cursor
          particle.speedY += (dy / distance) * force;

          // Boost opacity near cursor for glow effect
          opacityBoost = 1 + (150 - distance) / 150 * 0.5;
        }

        // Apply drag
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Draw particle with enhanced glow near cursor
        const pulseOpacity = (Math.sin(particle.pulse) + 1) / 2;
        ctx.fillStyle = `rgba(74, 158, 255, ${particle.opacity * pulseOpacity * opacityBoost})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles (enhanced connection distance)
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 180) {
            let opacity = (1 - distance2 / 180) * 0.2;

            // Brighten connections near cursor
            const midX = (particle.x + otherParticle.x) / 2;
            const midY = (particle.y + otherParticle.y) / 2;
            const distToMouse = Math.sqrt(
              Math.pow(mouseRef.current.x - midX, 2) +
              Math.pow(mouseRef.current.y - midY, 2)
            );

            if (distToMouse < 150) {
              opacity *= 1 + (150 - distToMouse) / 150 * 1.5;
            }

            ctx.strokeStyle = `rgba(74, 158, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.75
      }}
    />
  );
};