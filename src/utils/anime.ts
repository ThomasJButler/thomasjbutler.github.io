/**
 * @author Tom Butler
 * @date 2025-10-27
 * @description Anime.js v4 wrapper providing typed imports and re-exports.
 *              Centralises animation library dependencies for easier version management.
 */

// Import and re-export all anime.js v4 functions
import { animate, stagger, createTimeline, spring, presets } from 'animejs';

// Export individual functions for v4 usage
export { animate, stagger, createTimeline, spring, presets };

// Export animate as default for backward compatibility
export default animate;
