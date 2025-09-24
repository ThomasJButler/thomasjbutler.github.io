import { useState, useEffect } from 'react';

interface ParticleSettings {
  enabled: boolean;
  intensity: number;
  particleCount: number;
  particleLife: number;
  respectMotionPreference: boolean;
}

const DEFAULT_SETTINGS: ParticleSettings = {
  enabled: true,
  intensity: 0.8,
  particleCount: 12,
  particleLife: 1200,
  respectMotionPreference: true
};

const STORAGE_KEY = 'matrix-particle-settings';

export const useParticleSettings = () => {
  const [settings, setSettings] = useState<ParticleSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.warn('Failed to load particle settings:', error);
    }
  }, []);

  // Save settings to localStorage when they change
  const updateSettings = (newSettings: Partial<ParticleSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save particle settings:', error);
    }
  };

  // Check if particles should be enabled (respects user motion preferences)
  const isEnabled = (): boolean => {
    if (!settings.enabled) return false;

    if (settings.respectMotionPreference) {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    return true;
  };

  // Performance-based automatic intensity adjustment
  const getAdaptiveIntensity = (): number => {
    // Reduce intensity on mobile devices
    if (window.innerWidth < 768) {
      return Math.min(settings.intensity * 0.6, 0.5);
    }

    // Reduce intensity if low-end device (rough heuristic)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      return Math.min(settings.intensity * 0.7, 0.6);
    }

    return settings.intensity;
  };

  // Get adaptive particle count based on screen size and performance
  const getAdaptiveParticleCount = (): number => {
    const baseCount = settings.particleCount;

    // Reduce count on smaller screens
    if (window.innerWidth < 768) {
      return Math.max(Math.floor(baseCount * 0.5), 6);
    }

    if (window.innerWidth < 1024) {
      return Math.max(Math.floor(baseCount * 0.7), 8);
    }

    return baseCount;
  };

  // Preset configurations
  const presets = {
    off: () => updateSettings({ enabled: false }),
    subtle: () => updateSettings({
      enabled: true,
      intensity: 0.3,
      particleCount: 6,
      particleLife: 800
    }),
    normal: () => updateSettings({
      enabled: true,
      intensity: 0.8,
      particleCount: 12,
      particleLife: 1200
    }),
    intense: () => updateSettings({
      enabled: true,
      intensity: 1.2,
      particleCount: 20,
      particleLife: 1600
    }),
    matrix: () => updateSettings({
      enabled: true,
      intensity: 1.0,
      particleCount: 15,
      particleLife: 1400
    })
  };

  return {
    settings,
    updateSettings,
    isEnabled,
    getAdaptiveIntensity,
    getAdaptiveParticleCount,
    presets,
    reset: () => updateSettings(DEFAULT_SETTINGS)
  };
};