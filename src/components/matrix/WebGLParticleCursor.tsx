import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

interface WebGLParticleCursorProps {
  enabled?: boolean;
  particleCount?: number;
  particleLife?: number;
  intensity?: number;
  attractionForce?: number;
  repulsionForce?: number;
}

export const WebGLParticleCursor: React.FC<WebGLParticleCursorProps> = ({
  enabled = true,
  particleCount = 100,
  particleLife = 2000,
  intensity = 1,
  attractionForce = 0.1,
  repulsionForce = 0.05
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const animationRef = useRef<number>();
  const particleSystemRef = useRef<THREE.Points>();
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const particlesDataRef = useRef<Array<{
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
    size: number;
    alpha: number;
  }>>([]);

  const { theme } = useTheme();

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Performance settings based on device
  const getPerformanceSettings = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    return {
      particleCount: isMobile ? 30 : isLowEnd ? 60 : particleCount,
      updateFrequency: isMobile ? 2 : 1,
      pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1 : 2),
      enablePhysics: !isMobile
    };
  }, [particleCount]);

  // Vertex shader for particles
  const vertexShader = `
    uniform float time;
    uniform vec2 mouse;
    attribute float size;
    attribute float alpha;
    attribute vec3 velocity;
    varying float vAlpha;

    void main() {
      vAlpha = alpha;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  // Fragment shader for particles with Matrix glow
  const fragmentShader = `
    uniform vec3 color;
    uniform float time;
    varying float vAlpha;

    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);

      // Create circular particle with glow
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

      // Add pulsing glow effect
      float glow = sin(time * 3.0) * 0.3 + 0.7;
      alpha *= glow;

      // Soft edges
      alpha *= vAlpha;

      if (alpha < 0.01) discard;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Initialize Three.js scene
  const initializeScene = useCallback(() => {
    if (!mountRef.current) return;

    const settings = getPerformanceSettings();

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2, window.innerWidth / 2,
      window.innerHeight / 2, -window.innerHeight / 2,
      1, 1000
    );
    camera.position.z = 100;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(settings.pixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    createParticleSystem();
  }, [getPerformanceSettings]);

  // Create particle system
  const createParticleSystem = useCallback(() => {
    if (!sceneRef.current) return;

    const settings = getPerformanceSettings();
    const geometry = new THREE.BufferGeometry();

    // Particle positions
    const positions = new Float32Array(settings.particleCount * 3);
    const sizes = new Float32Array(settings.particleCount);
    const alphas = new Float32Array(settings.particleCount);
    const velocities = new Float32Array(settings.particleCount * 3);

    // Initialize particle data
    particlesDataRef.current = [];
    for (let i = 0; i < settings.particleCount; i++) {
      const i3 = i * 3;

      // Random starting positions
      positions[i3] = (Math.random() - 0.5) * window.innerWidth;
      positions[i3 + 1] = (Math.random() - 0.5) * window.innerHeight;
      positions[i3 + 2] = 0;

      sizes[i] = Math.random() * 5 + 2;
      alphas[i] = 0;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      particlesDataRef.current.push({
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: particleLife + Math.random() * particleLife,
        size: sizes[i],
        alpha: 0
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Shader material with Matrix colors
    const matrixColor = theme === 'matrix' ?
      new THREE.Vector3(0, 1, 0) :     // Green for matrix
      new THREE.Vector3(1, 1, 1);     // White for dark

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() },
        color: { value: matrixColor }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    particleSystemRef.current = points;
    sceneRef.current.add(points);
  }, [theme, particleLife, getPerformanceSettings]);

  // Update mouse position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!particleSystemRef.current) return;

    const rect = mountRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current.lastX = mouseRef.current.x;
    mouseRef.current.lastY = mouseRef.current.y;
    mouseRef.current.x = e.clientX - rect.left - window.innerWidth / 2;
    mouseRef.current.y = -(e.clientY - rect.top - window.innerHeight / 2);

    // Update shader uniform
    const material = particleSystemRef.current.material as THREE.ShaderMaterial;
    material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !particleSystemRef.current) return;

    const time = performance.now() * 0.001;
    const settings = getPerformanceSettings();

    // Update shader time
    const material = particleSystemRef.current.material as THREE.ShaderMaterial;
    material.uniforms.time.value = time;

    // Update particles
    const geometry = particleSystemRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const alphas = geometry.attributes.alpha.array as Float32Array;
    const mouse = new THREE.Vector2(mouseRef.current.x, mouseRef.current.y);

    // Calculate mouse movement for spawning
    const mouseDistance = Math.sqrt(
      Math.pow(mouseRef.current.x - mouseRef.current.lastX, 2) +
      Math.pow(mouseRef.current.y - mouseRef.current.lastY, 2)
    );

    for (let i = 0; i < particlesDataRef.current.length; i++) {
      const particle = particlesDataRef.current[i];
      const i3 = i * 3;

      if (particle.life > 0) {
        // Update physics if enabled
        if (settings.enablePhysics) {
          // Distance from mouse
          const dx = positions[i3] - mouse.x;
          const dy = positions[i3 + 1] - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply forces
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.velocity.x += (dx / distance) * repulsionForce * force;
            particle.velocity.y += (dy / distance) * repulsionForce * force;
          }

          // Apply attraction to nearby particles
          for (let j = i + 1; j < particlesDataRef.current.length; j++) {
            const other = particlesDataRef.current[j];
            if (other.life <= 0) continue;

            const j3 = j * 3;
            const pdx = positions[j3] - positions[i3];
            const pdy = positions[j3 + 1] - positions[i3 + 1];
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

            if (pdist < 50 && pdist > 0) {
              const pforce = attractionForce / pdist;
              particle.velocity.x += (pdx / pdist) * pforce;
              particle.velocity.y += (pdy / pdist) * pforce;
            }
          }

          // Apply drag
          particle.velocity.multiplyScalar(0.98);

          // Update position
          positions[i3] += particle.velocity.x;
          positions[i3 + 1] += particle.velocity.y;
        }

        // Update life
        particle.life -= 16; // ~60fps
        const lifeRatio = particle.life / particle.maxLife;

        // Update alpha
        particle.alpha = lifeRatio * intensity;
        alphas[i] = particle.alpha;

        // Kill particle when life is over
        if (particle.life <= 0) {
          particle.alpha = 0;
          alphas[i] = 0;
        }
      } else if (mouseDistance > 1) {
        // Spawn new particle near mouse if moving
        const spawnChance = Math.min(mouseDistance / 50, 1) * intensity;
        if (Math.random() < spawnChance * 0.1) {
          positions[i3] = mouse.x + (Math.random() - 0.5) * 20;
          positions[i3 + 1] = mouse.y + (Math.random() - 0.5) * 20;
          positions[i3 + 2] = 0;

          particle.velocity.set(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            0
          );

          particle.life = particle.maxLife;
          particle.alpha = intensity;
          alphas[i] = particle.alpha;
        }
      }
    }

    // Update geometry
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.alpha.needsUpdate = true;

    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [intensity, attractionForce, repulsionForce, getPerformanceSettings]);

  // Handle resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    const camera = cameraRef.current;
    camera.left = -window.innerWidth / 2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = -window.innerHeight / 2;
    camera.updateProjectionMatrix();

    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  // Initialize on mount
  useEffect(() => {
    if (!enabled || prefersReducedMotion.current) return;

    initializeScene();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current && mountRef.current?.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [enabled, initializeScene, animate, handleMouseMove, handleResize]);

  // Update scene when theme changes
  useEffect(() => {
    if (particleSystemRef.current) {
      const material = particleSystemRef.current.material as THREE.ShaderMaterial;
      const matrixColor = theme === 'matrix' ?
        new THREE.Vector3(0, 1, 0) :     // Green for matrix
        new THREE.Vector3(1, 1, 1);     // White for dark

      material.uniforms.color.value = matrixColor;
    }
  }, [theme]);

  if (!enabled || prefersReducedMotion.current) {
    return null;
  }

  return (
    <div
      ref={mountRef}
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