// Anime.js v4 wrapper to provide a default-like export
import { animate, stagger, createTimeline, eases } from 'animejs';

// Wrapper function that matches v3 API
const anime = (params: any) => {
  const { targets, ...options } = params;
  return animate(targets, options);
};

// Add utility functions
anime.stagger = stagger;
anime.timeline = createTimeline;
anime.easing = eases;

export default anime;