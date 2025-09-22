import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Matrix theme utilities
export function matrixClass(baseClass: string, matrixVariant?: string): string {
  const base = cn(baseClass)
  if (matrixVariant) {
    return cn(base, matrixVariant)
  }
  return base
}

// Cyberpunk effect utilities
export function cyberpunkGlow(intensity: 'low' | 'medium' | 'high' = 'medium'): string {
  const glowMap = {
    low: 'shadow-matrix',
    medium: 'shadow-matrix-lg',
    high: 'shadow-matrix-glow'
  }
  return glowMap[intensity]
}

// Matrix animation utilities
export function matrixAnimation(type: 'glow' | 'pulse' | 'interactive' = 'glow'): string {
  const animationMap = {
    glow: 'matrix-glow',
    pulse: 'matrix-pulse',
    interactive: 'matrix-interactive'
  }
  return animationMap[type]
}