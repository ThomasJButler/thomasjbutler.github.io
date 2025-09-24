import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HologramCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  href?: string;
  className?: string;
  variant?: 'default' | 'terminal' | 'cyberpunk' | 'ghost';
  glowIntensity?: 'low' | 'medium' | 'high';
}

export const HologramCard: React.FC<HologramCardProps> = ({
  title,
  description,
  image,
  tags = [],
  href,
  className,
  variant = 'default',
  glowIntensity = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const getVariantStyles = () => {
    const glowMap = {
      low: '5px',
      medium: '10px',
      high: '20px'
    };

    const glow = glowMap[glowIntensity];

    switch (variant) {
      case 'cyberpunk':
        return {
          borderColor: 'rgba(255, 0, 255, 0.6)',
          shadowColor: 'rgba(255, 0, 255, 0.4)',
          glowColor: '#ff00ff',
          textColor: 'text-pink-400',
          glow
        };
      case 'terminal':
        return {
          borderColor: 'rgba(255, 165, 0, 0.6)',
          shadowColor: 'rgba(255, 165, 0, 0.4)',
          glowColor: '#ffa500',
          textColor: 'text-orange-400',
          glow
        };
      case 'ghost':
        return {
          borderColor: 'rgba(100, 149, 237, 0.6)',
          shadowColor: 'rgba(100, 149, 237, 0.4)',
          glowColor: '#6495ed',
          textColor: 'text-blue-400',
          glow
        };
      default:
        return {
          borderColor: 'rgba(0, 255, 0, 0.6)',
          shadowColor: 'rgba(0, 255, 0, 0.4)',
          glowColor: '#00ff00',
          textColor: 'text-matrix-primary',
          glow
        };
    }
  };

  const styles = getVariantStyles();

  const CardComponent = motion(Card);

  const cardContent = (
    <CardComponent
      className={cn(
        'relative overflow-hidden border-2 bg-black/80 backdrop-blur-sm',
        'transition-[transform,border-color,box-shadow] duration-300 cursor-pointer group',
        'hover:scale-[1.02] hover:border-opacity-100',
        styles.textColor,
        className
      )}
      style={{
        borderColor: styles.borderColor,
        boxShadow: isHovered
          ? `0 0 ${styles.glow} ${styles.shadowColor}, inset 0 0 ${styles.glow} ${styles.shadowColor}`
          : `0 0 5px ${styles.shadowColor}`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Hologram scan lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-current to-transparent opacity-10 animate-pulse" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-current opacity-30"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Dynamic gradient overlay based on mouse position */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${styles.glowColor}40 0%, transparent 70%)`
            : 'none'
        }}
      />

      {/* Image section */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <CardHeader className="relative z-10">
        <CardTitle className="font-mono text-xl mb-2 tracking-wide">
          {title}
          {isHovered && (
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              ▶
            </motion.span>
          )}
        </CardTitle>
        <CardDescription className={cn('text-sm opacity-80', styles.textColor)}>
          {description}
        </CardDescription>
      </CardHeader>

      {tags.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="matrix"
                className="text-xs font-mono"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-current opacity-60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-current opacity-60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-current opacity-60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-current opacity-60" />

      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: styles.glowColor }}
        />
      </div>
    </CardComponent>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};