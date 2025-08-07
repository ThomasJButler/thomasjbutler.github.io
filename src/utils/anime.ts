// Import and re-export all anime.js v4 functions
import { animate, stagger, createTimeline, spring, presets } from 'animejs';

// Export individual functions for v4 usage
export { animate, stagger, createTimeline, spring, presets };

// Export animate as default for backward compatibility
export default animate;