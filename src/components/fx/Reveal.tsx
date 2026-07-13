import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_OUT_EXPO } from '@/lib/fx/easing';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Position in a group; drives the stagger. */
  index?: number;
  /** Explicit delay in seconds, overriding the index stagger. */
  delay?: number;
  as?: 'div' | 'section';
}

/**
 * Scroll reveal, to the v5 spec: 16px rise over 0.65s, once per mount.
 *
 * MotionConfig reducedMotion="user" (see Providers) neutralises the y offset for
 * users who ask for less motion, leaving a plain fade.
 */
export function Reveal({ children, className, index = 0, delay, as = 'div' }: RevealProps) {
  const Component = as === 'section' ? motion.section : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.65,
        ease: EASE_OUT_EXPO,
        delay: delay ?? index * 0.07,
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
