import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

interface WebGLMatrixRainProps {
  intensity?: number;
  adaptiveDimming?: boolean;
  particleSize?: number;
  fallSpeed?: number;
  glowIntensity?: number;
}

// Matrix characters for authentic feel
const MATRIX_CHARS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
const LATIN_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALL_CHARS = MATRIX_CHARS + LATIN_CHARS;

export const WebGLMatrixRain: React.FC<WebGLMatrixRainProps> = ({
  intensity = 1.0,
  adaptiveDimming = true,
  particleSize = 16,
  fallSpeed = 1.0,
  glowIntensity = 2.0
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const animationRef = useRef<number>();
  const rainGroupRef = useRef<THREE.Group>();
  const timeRef = useRef(0);
  const { theme } = useTheme();

  // Performance settings based on device
  const getPerformanceSettings = useCallback(() => {
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    return {
      columnCount: isMobile ? 30 : isLowEnd ? 60 : 120,
      trailLength: isMobile ? 15 : isLowEnd ? 20 : 30,
      updateFrequency: isMobile ? 8 : isLowEnd ? 6 : 4,
      pixelRatio: isMobile ? 1 : pixelRatio,
      enableGlow: !isMobile && !isLowEnd
    };
  }, []);

  // Create Matrix character texture
  const createCharacterTexture = useCallback((char: string, color: string) => {
    const canvas = document.createElement('canvas');
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Clear canvas
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, size, size);

    // Draw character
    ctx.fillStyle = color;
    ctx.font = `bold ${size * 0.8}px 'Courier New', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, size / 2, size / 2);

    // Add glow effect
    if (getPerformanceSettings().enableGlow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fillText(char, size / 2, size / 2);
    }

    return new THREE.CanvasTexture(canvas);
  }, [getPerformanceSettings]);

  // Initialize Three.js scene
  const initializeScene = useCallback(() => {
    if (!mountRef.current) return;

    const settings = getPerformanceSettings();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
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
    renderer.autoClear = false;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create rain group
    const rainGroup = new THREE.Group();
    rainGroupRef.current = rainGroup;
    scene.add(rainGroup);

    createRainColumns();
  }, [getPerformanceSettings]);

  // Create Matrix rain columns
  const createRainColumns = useCallback(() => {
    if (!rainGroupRef.current) return;

    const settings = getPerformanceSettings();
    const { columnCount, trailLength } = settings;
    const columnWidth = window.innerWidth / columnCount;

    // Colors based on theme
    const colors = theme === 'matrix' ? [
      '#00ff00', // Bright green
      '#00cc00', // Medium green
      '#008800', // Dark green
      '#004400'  // Very dark green
    ] : [
      '#ffffff', // White
      '#cccccc', // Light gray
      '#888888', // Medium gray
      '#444444'  // Dark gray
    ];

    for (let col = 0; col < columnCount; col++) {
      const columnGroup = new THREE.Group();

      for (let row = 0; row < trailLength; row++) {
        const char = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
        const colorIndex = Math.min(row, colors.length - 1);
        const color = colors[colorIndex];

        const texture = createCharacterTexture(char, color);
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 1 - (row / trailLength) * 0.8
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.setScalar(particleSize);
        sprite.position.x = (col * columnWidth) - (window.innerWidth / 2);
        sprite.position.y = window.innerHeight / 2 + (row * particleSize);

        // Store metadata for animation
        (sprite as any).columnIndex = col;
        (sprite as any).rowIndex = row;
        (sprite as any).fallSpeed = Math.random() * fallSpeed + fallSpeed * 0.5;
        (sprite as any).changeTime = Math.random() * 100;

        columnGroup.add(sprite);
      }

      rainGroupRef.current.add(columnGroup);
    }
  }, [theme, particleSize, fallSpeed, createCharacterTexture, getPerformanceSettings]);

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !rainGroupRef.current) return;

    timeRef.current += 0.016; // ~60fps
    const settings = getPerformanceSettings();

    // Update every few frames for performance
    if (Math.floor(timeRef.current * 60) % settings.updateFrequency === 0) {
      rainGroupRef.current.children.forEach((column: any) => {
        column.children.forEach((sprite: any) => {
          // Move character down
          sprite.position.y -= sprite.fallSpeed * intensity;

          // Reset when off screen
          if (sprite.position.y < -window.innerHeight / 2 - particleSize) {
            sprite.position.y = window.innerHeight / 2 + (sprite.rowIndex * particleSize);

            // Change character occasionally
            sprite.changeTime -= 1;
            if (sprite.changeTime <= 0) {
              const newChar = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
              const colorIndex = Math.min(sprite.rowIndex, 3);
              const colors = theme === 'matrix' ?
                ['#00ff00', '#00cc00', '#008800', '#004400'] :
                ['#ffffff', '#cccccc', '#888888', '#444444'];

              const newTexture = createCharacterTexture(newChar, colors[colorIndex]);
              sprite.material.map = newTexture;
              sprite.material.needsUpdate = true;
              sprite.changeTime = Math.random() * 100 + 50;
            }
          }
        });
      });
    }

    // Adaptive dimming based on props
    if (adaptiveDimming) {
      const dimFactor = Math.max(0.1, 1 - intensity * 0.5);
      rainGroupRef.current.children.forEach((column: any) => {
        column.children.forEach((sprite: any) => {
          sprite.material.opacity = sprite.material.opacity * 0.99 + (1 - sprite.rowIndex / 30) * dimFactor * 0.01;
        });
      });
    }

    rendererRef.current.clear();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [intensity, adaptiveDimming, theme, particleSize, createCharacterTexture, getPerformanceSettings]);

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
    initializeScene();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
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
  }, [initializeScene, animate, handleResize]);

  // Update scene when theme changes
  useEffect(() => {
    if (rainGroupRef.current) {
      // Clear existing rain
      while (rainGroupRef.current.children.length > 0) {
        rainGroupRef.current.remove(rainGroupRef.current.children[0]);
      }
      // Recreate with new theme
      createRainColumns();
    }
  }, [theme, createRainColumns]);

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
        zIndex: -1,
        opacity: theme === 'matrix' ? 0.8 : 0.3
      }}
      aria-hidden="true"
    />
  );
};