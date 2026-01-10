/**
 * @author Tom Butler
 * @date 2026-01-10
 * @description Process Timeline component with Framer Motion animations
 *              Features magnetic hover, morphing blobs, and glassmorphism
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
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
 * Magnetic Card Component with spring physics
 */
const MagneticCard: React.FC<{
  step: ProcessStep;
  index: number;
  mouseX: any;
  mouseY: any;
}> = ({ step, index, mouseX, mouseY }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate magnetic pull based on mouse distance
  const distanceX = useTransform(mouseX, (x: number) => {
    if (!cardRef.current || !isHovered) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = x - centerX;
    // Pull card toward mouse within 200px radius
    return Math.abs(distance) < 200 ? distance * 0.15 : 0;
  });

  const distanceY = useTransform(mouseY, (y: number) => {
    if (!cardRef.current || !isHovered) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distance = y - centerY;
    return Math.abs(distance) < 200 ? distance * 0.15 : 0;
  });

  // Spring physics for smooth movement
  const springX = useSpring(distanceX, { stiffness: 150, damping: 15 });
  const springY = useSpring(distanceY, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={cardRef}
      className="magnetic-card"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.15, type: 'spring', bounce: 0.4 }}
      whileHover={{ scale: 1.03, rotateZ: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Number badge */}
      <motion.div
        className="step-number-badge"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: index * 0.15 + 0.3, type: 'spring', bounce: 0.6 }}
      >
        {index + 1}
      </motion.div>

      {/* Icon with glow */}
      <motion.div
        className="magnetic-card-icon"
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <i className={step.icon} aria-hidden="true" />
      </motion.div>

      {/* Content */}
      <h4 className="magnetic-card-title">{step.title}</h4>
      <p className="magnetic-card-description">{step.description}</p>

      {/* Glassmorphism shimmer effect */}
      <motion.div
        className="card-shimmer"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

/**
 * Morphing Blob SVG Background
 */
const MorphingBlob: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <motion.svg
      className="blob"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.08 }}
      transition={{ delay }}
    >
      <motion.path
        fill="currentColor"
        animate={{
          d: [
            'M47.3,-57.4C59.7,-48.3,67.3,-32.4,70.2,-16.1C73.1,0.3,71.2,17,63.3,30.9C55.4,44.7,41.4,55.7,25.8,61.8C10.1,67.9,-7.2,69.1,-22.8,64.5C-38.4,59.9,-52.2,49.6,-60.5,35.8C-68.7,22,-71.3,4.7,-68.2,-11.6C-65.1,-27.9,-56.2,-43.3,-43.3,-52.2C-30.4,-61.1,-13.2,-63.6,2.3,-66.5C17.9,-69.4,34.9,-66.5,47.3,-57.4Z',
            'M37.8,-52.7C48.6,-43.3,56.5,-30.5,60.4,-16.5C64.3,-2.5,64.2,12.6,58.4,24.8C52.6,37,41.1,46.3,28.2,52.7C15.3,59.1,1,62.7,-13.7,61.1C-28.3,59.5,-43.2,52.8,-53.7,42.3C-64.2,31.8,-70.3,17.5,-70.1,3.3C-69.9,-10.9,-63.3,-24.9,-53.5,-35.5C-43.6,-46.1,-30.4,-53.3,-17.2,-57.6C-4,-62,-3.8,-63.5,7.2,-72.7C18.2,-81.8,27,-61.2,37.8,-52.7Z',
            'M44.7,-56.9C56.9,-48.4,64.8,-33.2,67.8,-17.4C70.8,-1.6,69,14.8,61.5,27.9C54,41,40.8,50.7,26.5,56.8C12.1,62.9,-3.4,65.4,-18.2,62.1C-32.9,58.8,-46.8,49.7,-56.1,37C-65.4,24.3,-70.1,8,-67.9,-7.3C-65.7,-22.6,-56.6,-37,-44.8,-45.7C-33,-54.3,-18.7,-57.2,-2.7,-53.9C13.3,-50.6,32.5,-65.4,44.7,-56.9Z',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
};

/**
 * Main Process Timeline Component
 */
export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Track mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent) => {
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
      transition={{ duration: 0.6 }}
    >
      {/* Morphing Background Blobs */}
      <div className="background-blobs" aria-hidden="true">
        <MorphingBlob delay={0} />
        <MorphingBlob delay={0.3} />
        <MorphingBlob delay={0.6} />
      </div>

      {/* Title with gradient animation */}
      <motion.h3
        className="timeline-title"
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: -20, filter: 'blur(10px)' }
        }
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
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
