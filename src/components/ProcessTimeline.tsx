/**
 * @author Tom Butler
 * @date 2026-01-10
 * @description Process Timeline component with Framer Motion animations
 *              Performance-optimized with throttled mouse tracking and cached positions
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import '../css/process-timeline.css';

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

/**
 * Magnetic Card Component with optimized spring physics
 */
const MagneticCard: React.FC<{
  step: ProcessStep;
  index: number;
  mouseX: any;
  mouseY: any;
}> = ({ step, index, mouseX, mouseY }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  // Cache bounds on hover start to avoid getBoundingClientRect on every frame
  const boundsRef = useRef({ centerX: 0, centerY: 0 });

  // Cache bounds when hover starts
  const handleHoverStart = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      boundsRef.current = {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    }
    setIsHovered(true);
  };

  // Calculate magnetic pull using cached bounds
  const distanceX = useTransform(mouseX, (x: number) => {
    if (!isHovered) return 0;
    const distance = x - boundsRef.current.centerX;
    return Math.abs(distance) < 200 ? distance * 0.12 : 0;
  });

  const distanceY = useTransform(mouseY, (y: number) => {
    if (!isHovered) return 0;
    const distance = y - boundsRef.current.centerY;
    return Math.abs(distance) < 200 ? distance * 0.12 : 0;
  });

  // Softer spring physics for smoother animation
  const springX = useSpring(distanceX, { stiffness: 80, damping: 20 });
  const springY = useSpring(distanceY, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      className="magnetic-card"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', bounce: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Number badge */}
      <motion.div
        className="step-number-badge"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring', bounce: 0.4 }}
      >
        {index + 1}
      </motion.div>

      {/* Icon */}
      <div className="magnetic-card-icon">
        <i className={step.icon} aria-hidden="true" />
      </div>

      {/* Content */}
      <h4 className="magnetic-card-title">{step.title}</h4>
      <p className="magnetic-card-description">{step.description}</p>
    </motion.div>
  );
};

/**
 * Simple Blob Background - CSS-based instead of SVG path morphing
 */
const SimpleBlob: React.FC<{ delay: number; position: number }> = ({ delay, position }) => {
  const positions = [
    { top: '-80px', left: '-40px' },
    { bottom: '-80px', right: '-40px' },
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  ];

  return (
    <motion.div
      className="blob"
      style={positions[position]}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 0.06,
        scale: [0.8, 1, 0.9, 1],
      }}
      transition={{
        delay,
        duration: 10,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );
};

/**
 * Main Process Timeline Component - Performance Optimized
 */
export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const lastUpdateRef = useRef(0);

  // Track mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Throttled mouse move handler - max 20fps for mouse tracking
  const handleMouseMove = (event: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateRef.current < 50) return;
    lastUpdateRef.current = now;
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  return (
    <motion.div
      ref={containerRef}
      className="process-timeline"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Simple CSS Blob Background - reduced from 3 SVG morphing to 2 CSS blobs */}
      <div className="background-blobs" aria-hidden="true">
        <SimpleBlob delay={0} position={0} />
        <SimpleBlob delay={0.5} position={1} />
      </div>

      {/* Title */}
      <motion.h3
        className="timeline-title"
        initial={{ opacity: 0, y: -15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
        transition={{ duration: 0.5 }}
      >
        How We Work Together
      </motion.h3>

      {/* Cards Grid */}
      <div className="timeline-grid">
        {steps.map((step, index) => (
          <MagneticCard
            key={index}
            step={step}
            index={index}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>
    </motion.div>
  );
};
