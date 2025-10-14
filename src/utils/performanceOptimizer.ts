/**
 * Performance Optimizer
 * Detects device capabilities and adjusts app performance settings
 */

export interface PerformanceSettings {
  enableAnimations: boolean;
  enableBackgroundEffects: boolean;
  enableTransitions: boolean;
  animationDuration: number;
  enableMatrixRain: boolean;
  enableParticles: boolean;
  reducedMotion: boolean;
}

class PerformanceOptimizer {
  private settings: PerformanceSettings;
  private isLowEndDevice: boolean = false;
  private isMobile: boolean = false;

  constructor() {
    this.settings = this.detectOptimalSettings();
    this.applySettings();
  }

  private detectOptimalSettings(): PerformanceSettings {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if mobile device
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check device memory (if available)
    const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory;
    const isLowMemory = deviceMemory && deviceMemory < 2; // Changed from 4 to 2GB

    // Check hardware concurrency (CPU cores)
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const isLowCPU = hardwareConcurrency < 2; // Changed from 4 to 2 cores

    // Check connection speed
    const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g'
      // Removed 3g - it's fast enough for animations
    );

    // Determine if low-end device - More restrictive conditions
    // Only mark as low-end if multiple conditions are met, not just one
    this.isLowEndDevice = (isLowMemory && isLowCPU) ||
                         (isSlowConnection && this.isMobile) ||
                         (isLowMemory && isSlowConnection);

    
    // Return optimized settings
    if (prefersReducedMotion) {
      return {
        enableAnimations: false,
        enableBackgroundEffects: false,
        enableTransitions: false,
        animationDuration: 0,
        enableMatrixRain: false,
        enableParticles: false,
        reducedMotion: true
      };
    }
    
    if (this.isLowEndDevice) {
      return {
        enableAnimations: true, // Keep animations enabled
        enableBackgroundEffects: false, // Disable heavy effects
        enableTransitions: true, // Keep transitions
        animationDuration: 300, // Normal duration for better UX
        enableMatrixRain: false, // Disable heavy background effects
        enableParticles: false, // Disable particles
        reducedMotion: false // Not reduced motion, just optimized
      };
    }
    
    // High-end device settings
    return {
      enableAnimations: true,
      enableBackgroundEffects: true,
      enableTransitions: true,
      animationDuration: 300,
      enableMatrixRain: true,
      enableParticles: true,
      reducedMotion: false
    };
  }

  private applySettings(): void {
    const root = document.documentElement;
    
    // Apply CSS custom properties for animations
    root.style.setProperty('--animation-duration', `${this.settings.animationDuration}ms`);
    root.style.setProperty('--transition-duration', this.settings.enableTransitions ? '0.3s' : '0s');
    
    // Add performance classes to body
    document.body.classList.toggle('reduced-motion', this.settings.reducedMotion);
    document.body.classList.toggle('low-end-device', this.isLowEndDevice);
    document.body.classList.toggle('mobile-device', this.isMobile);
    document.body.classList.toggle('disable-animations', !this.settings.enableAnimations);
    document.body.classList.toggle('disable-backgrounds', !this.settings.enableBackgroundEffects);
    
    // Log performance settings in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Performance settings applied:', {
        device: this.isLowEndDevice ? 'low-end' : 'high-end',
        mobile: this.isMobile,
        ...this.settings
      });
    }
  }

  public getSettings(): PerformanceSettings {
    return { ...this.settings };
  }

  public getMatrixRainEnabled(currentTheme?: string): boolean {
    // Always enable Matrix rain when Matrix theme is active, regardless of device capabilities
    if (currentTheme === 'matrix') {
      return true;
    }
    return this.settings.enableMatrixRain;
  }

  public forceEnableMatrixRain(): void {
    // Force enable Matrix rain regardless of performance settings
    this.settings.enableMatrixRain = true;
  }

  public updateSetting<K extends keyof PerformanceSettings>(
    key: K,
    value: PerformanceSettings[K]
  ): void {
    this.settings[key] = value;
    this.applySettings();
  }

  public enableHighPerformanceMode(): void {
    this.settings = {
      enableAnimations: false,
      enableBackgroundEffects: false,
      enableTransitions: false,
      animationDuration: 0,
      enableMatrixRain: false,
      enableParticles: false,
      reducedMotion: true
    };
    this.applySettings();
  }

  public enableFullEffects(): void {
    this.settings = {
      enableAnimations: true,
      enableBackgroundEffects: true,
      enableTransitions: true,
      animationDuration: 300,
      enableMatrixRain: true,
      enableParticles: true,
      reducedMotion: false
    };
    this.applySettings();
  }
}

// Export singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// Hook for React components
import { useEffect, useState } from 'react';

export function usePerformanceSettings() {
  const [settings, setSettings] = useState<PerformanceSettings>(
    performanceOptimizer.getSettings()
  );

  useEffect(() => {
    // Re-check settings on window resize (tablet rotation, etc.)
    const handleResize = () => {
      const newSettings = performanceOptimizer.getSettings();
      setSettings(newSettings);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return settings;
}