// Import named exports from anime.js v4
import { animate, stagger, createTimeline, eases } from 'animejs';

// Create a wrapper that matches the v3 API
const anime = (params: any) => {
  if (!params || !params.targets) {
    console.error('Anime.js: No targets specified');
    return;
  }
  
  // Extract targets and create animation options
  const { targets, ...animationOptions } = params;
  
  // Ensure all values are properly formatted
  const options: any = {};
  for (const key in animationOptions) {
    const value = animationOptions[key];
    // Convert arrays to proper format for anime.js v4
    if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'number') {
      options[key] = { from: value[0], to: value[1] };
    } else {
      options[key] = value;
    }
  }
  
  return animate(targets, options);
};

// Add utility methods to match v3 API
anime.stagger = stagger;
anime.timeline = () => createTimeline();
anime.easing = eases;

// Re-export as default
export default anime;