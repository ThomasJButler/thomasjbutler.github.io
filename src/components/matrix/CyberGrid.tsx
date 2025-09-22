import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberGridProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'terminal' | 'cyberpunk' | 'ghost';
  gridSize?: number;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  pulseNodes?: boolean;
  showConnections?: boolean;
  interactive?: boolean;
  nodeCount?: number;
}

interface GridNode {
  id: string;
  x: number;
  y: number;
  active: boolean;
  connections: string[];
  pulseDelay: number;
}

export const CyberGrid: React.FC<CyberGridProps> = ({
  children,
  className,
  variant = 'default',
  gridSize = 30,
  animationSpeed = 'medium',
  pulseNodes = true,
  showConnections = true,
  interactive = true,
  nodeCount = 50
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<GridNode[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const getVariantStyles = () => {
    switch (variant) {
      case 'cyberpunk':
        return {
          primary: 'rgba(255, 0, 255, 0.8)',
          secondary: 'rgba(255, 20, 147, 0.6)',
          accent: 'rgba(255, 105, 180, 0.4)',
          glow: '#ff00ff'
        };
      case 'terminal':
        return {
          primary: 'rgba(255, 165, 0, 0.8)',
          secondary: 'rgba(255, 140, 0, 0.6)',
          accent: 'rgba(255, 165, 0, 0.4)',
          glow: '#ffa500'
        };
      case 'ghost':
        return {
          primary: 'rgba(100, 149, 237, 0.8)',
          secondary: 'rgba(135, 206, 250, 0.6)',
          accent: 'rgba(100, 149, 237, 0.4)',
          glow: '#6495ed'
        };
      default:
        return {
          primary: 'rgba(0, 255, 0, 0.8)',
          secondary: 'rgba(50, 255, 50, 0.6)',
          accent: 'rgba(0, 255, 0, 0.4)',
          glow: '#00ff00'
        };
    }
  };

  const styles = getVariantStyles();

  const speedSettings = {
    slow: 0.005,
    medium: 0.01,
    fast: 0.02
  };

  const speed = speedSettings[animationSpeed];

  // Initialize grid nodes
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newNodes: GridNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node: GridNode = {
        id: `node-${i}`,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        active: Math.random() > 0.7,
        connections: [],
        pulseDelay: Math.random() * 2000
      };

      // Find nearby nodes for connections
      const nearbyNodes = newNodes.filter(n => {
        const distance = Math.sqrt(
          Math.pow(n.x - node.x, 2) + Math.pow(n.y - node.y, 2)
        );
        return distance < 150 && distance > 0;
      });

      if (nearbyNodes.length > 0 && Math.random() > 0.6) {
        const randomNearby = nearbyNodes[Math.floor(Math.random() * nearbyNodes.length)];
        node.connections.push(randomNearby.id);
        randomNearby.connections.push(node.id);
      }

      newNodes.push(node);
    }

    setNodes(newNodes);
  }, [nodeCount]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(ctx, timestamp);

      // Draw connections
      if (showConnections) {
        drawConnections(ctx, timestamp);
      }

      // Draw nodes
      drawNodes(ctx, timestamp);

      // Draw mouse interaction
      if (interactive) {
        drawMouseInteraction(ctx);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [nodes, mousePosition, interactive, showConnections]);

  const drawGrid = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const { width, height } = ctx.canvas;

    ctx.strokeStyle = styles.accent;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;

    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      const offset = Math.sin(timestamp * speed + x * 0.01) * 2;
      ctx.beginPath();
      ctx.moveTo(x + offset, 0);
      ctx.lineTo(x + offset, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      const offset = Math.cos(timestamp * speed + y * 0.01) * 2;
      ctx.beginPath();
      ctx.moveTo(0, y + offset);
      ctx.lineTo(width, y + offset);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    ctx.strokeStyle = styles.secondary;
    ctx.lineWidth = 1;

    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const connectedNode = nodes.find(n => n.id === connectionId);
        if (connectedNode && node.active && connectedNode.active) {
          const opacity = 0.3 + Math.sin(timestamp * speed + node.pulseDelay) * 0.2;
          ctx.globalAlpha = opacity;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        }
      });
    });

    ctx.globalAlpha = 1;
  };

  const drawNodes = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    nodes.forEach(node => {
      const pulse = pulseNodes
        ? 3 + Math.sin(timestamp * speed * 2 + node.pulseDelay) * 2
        : 3;

      if (node.active) {
        // Glow effect
        ctx.shadowColor = styles.glow;
        ctx.shadowBlur = 10;
        ctx.fillStyle = styles.primary;
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = styles.accent;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, pulse, 0, 2 * Math.PI);
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;
    });
  };

  const drawMouseInteraction = (ctx: CanvasRenderingContext2D) => {
    const nearbyNodes = nodes.filter(node => {
      const distance = Math.sqrt(
        Math.pow(node.x - mousePosition.x, 2) + Math.pow(node.y - mousePosition.y, 2)
      );
      return distance < 100;
    });

    nearbyNodes.forEach(node => {
      ctx.strokeStyle = styles.primary;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;

      ctx.beginPath();
      ctx.moveTo(mousePosition.x, mousePosition.y);
      ctx.lineTo(node.x, node.y);
      ctx.stroke();
    });

    ctx.globalAlpha = 1;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    // Activate nearby nodes
    if (interactive) {
      setNodes(prevNodes =>
        prevNodes.map(node => {
          const distance = Math.sqrt(
            Math.pow(node.x - (e.clientX - rect.left), 2) +
            Math.pow(node.y - (e.clientY - rect.top), 2)
          );
          return {
            ...node,
            active: distance < 80 || Math.random() > 0.8
          };
        })
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Overlay effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${styles.accent} 0%, transparent 50%)`,
          zIndex: 2
        }}
      />

      {/* Content layer */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${styles.primary} 50%, transparent 100%)`,
          width: '2px',
          zIndex: 3
        }}
        animate={{
          x: [-10, containerRef.current?.clientWidth || 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};