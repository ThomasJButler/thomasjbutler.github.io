// Import named exports from anime.js v4
import { animate, stagger, createTimeline, eases } from 'animejs';

// Create a wrapper that matches the v3 API
const anime = (params: any) => {
  return animate(params.targets, params);
};

// Add utility methods to match v3 API
anime.stagger = stagger;
anime.timeline = () => createTimeline();
anime.easing = eases;

// Re-export as default
export default anime;