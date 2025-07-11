// Anime.js v4 wrapper to provide a default-like export
import { animate, stagger, createTimeline, eases } from 'animejs';

// Create anime namespace object that matches v3 API
const anime = Object.assign(animate, {
  stagger,
  timeline: createTimeline,
  easing: eases,
  // Add other utilities as needed
});

export default anime;