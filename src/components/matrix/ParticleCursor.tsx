import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface ParticleCursorProps {
  enabled?: boolean;
  particleCount?: number;
  particleLife?: number;
  trailLength?: number;
  intensity?: number;
}

export const ParticleCursor: React.FC<ParticleCursorProps> = ({
  enabled = true,
  particleCount = 15,
  particleLife = 1000,
  trailLength = 20,
  intensity = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const lastTimeRef = useRef(0);
  const { theme } = useTheme();

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Matrix-themed colors based on theme
  const getParticleColor = useCallback(() => {
    if (theme === 'matrix') {
      const colors = [
        'rgba(0, 255, 0, 0.8)',      // Bright green
        'rgba(0, 255, 100, 0.6)',    // Lime green
        'rgba(50, 255, 50, 0.4)',    // Light green
        'rgba(0, 200, 0, 0.7)',      // Dark green
        'rgba(100, 255, 100, 0.3)'   // Pale green
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    } else {
      // Dark theme uses subtle white particles
      const colors = [
        'rgba(255, 255, 255, 0.3)',
        'rgba(200, 200, 200, 0.2)',
        'rgba(150, 150, 150, 0.1)',
        'rgba(100, 100, 100, 0.2)'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }, [theme]);

  // Create a new particle
  const createParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 2 + 1) * intensity;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed * 0.3,
      vy: Math.sin(angle) * speed * 0.3,
      life: particleLife,
      maxLife: particleLife,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2
    };
  }, [particleLife, intensity]);

  // Update mouse position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current.lastX = mouseRef.current.x;
    mouseRef.current.lastY = mouseRef.current.y;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current || !enabled || prefersReducedMotion.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate mouse movement
    const mouseDistance = Math.sqrt(
      Math.pow(mouseRef.current.x - mouseRef.current.lastX, 2) +
      Math.pow(mouseRef.current.y - mouseRef.current.lastY, 2)
    );

    // Add new particles based on mouse movement
    if (mouseDistance > 2) {
      const particlesToAdd = Math.min(
        Math.floor(mouseDistance / 10) * intensity,
        particleCount
      );

      for (let i = 0; i < particlesToAdd; i++) {
        if (particlesRef.current.length < particleCount * 3) {
          // Create particles along the movement path
          const t = i / Math.max(particlesToAdd - 1, 1);
          const x = mouseRef.current.lastX + (mouseRef.current.x - mouseRef.current.lastX) * t;
          const y = mouseRef.current.lastY + (mouseRef.current.y - mouseRef.current.lastY) * t;

          particlesRef.current.push(createParticle(x, y));
        }
      }
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      // Update particle physics
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= deltaTime;

      // Apply slight gravity and friction
      particle.vy += 0.02;
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Calculate life ratio for fading
      const lifeRatio = particle.life / particle.maxLife;

      if (particle.life <= 0) return false;

      // Draw particle
      ctx.save();

      // Matrix theme gets special glow effect
      if (theme === 'matrix') {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, getParticleColor());
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.shadowBlur = particle.size * 2;
        ctx.shadowColor = '#00ff00';
      } else {
        ctx.fillStyle = getParticleColor();
      }

      ctx.globalAlpha = particle.opacity * lifeRatio;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2);
      ctx.fill();

      // Add a small trail for Matrix theme
      if (theme === 'matrix' && lifeRatio > 0.5) {
        ctx.fillStyle = `rgba(0, 255, 0, ${0.1 * lifeRatio})`;
        ctx.beginPath();
        ctx.arc(
          particle.x - particle.vx * 3,
          particle.y - particle.vy * 3,
          particle.size * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.restore();

      return true;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [enabled, createParticle, getParticleColor, theme, particleCount, intensity]);

  // Resize canvas to fill screen
  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // Initialize effect
  useEffect(() => {
    if (!enabled || prefersReducedMotion.current) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, animate, handleMouseMove, resizeCanvas]);

  // Clear particles when disabled
  useEffect(() => {
    if (!enabled) {
      particlesRef.current = [];
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [enabled]);

  if (!enabled || prefersReducedMotion.current) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: theme === 'matrix' ? 0.8 : 0.4
      }}
      aria-hidden="true"
    />
  );
};