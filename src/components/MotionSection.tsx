import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionSection({ children, className, delay = 0 }: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
