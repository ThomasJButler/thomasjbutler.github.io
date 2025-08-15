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
    const deviceMemory = (navigator as any).deviceMemory;
    const isLowMemory = deviceMemory && deviceMemory < 4;
    
    // Check hardware concurrency (CPU cores)
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const isLowCPU = hardwareConcurrency < 4;
    
    // Check connection speed
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.effectiveType === '3g'
    );
    
    // Determine if low-end device
    this.isLowEndDevice = isLowMemory || isLowCPU || isSlowConnection || this.isMobile;
    
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
        enableAnimations: true,
        enableBackgroundEffects: false,
        enableTransitions: true,
        animationDuration: 200,
        enableMatrixRain: false,
        enableParticles: false,
        reducedMotion: false
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
    
    // Log performance settings
    console.log('Performance settings applied:', {
      device: this.isLowEndDevice ? 'low-end' : 'high-end',
      mobile: this.isMobile,
      ...this.settings
    });
  }

  public getSettings(): PerformanceSettings {
    return { ...this.settings };
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