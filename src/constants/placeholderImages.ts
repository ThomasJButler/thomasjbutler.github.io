/**
 * Centralized placeholder image URLs for projects
 * Using placeholder.com service for distinct gray placeholders with text overlays
 * These will be replaced with actual CDN URLs when images are available
 */

// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'depqttzlt',
  baseUrl: 'https://res.cloudinary.com/depqttzlt/image/upload'
} as const;

// Image dimensions for different contexts
export const PLACEHOLDER_DIMENSIONS = {
  projectCard: { width: 600, height: 400 },
  homeIntro: { width: 400, height: 300 }
} as const;

/**
 * Helper function to generate placeholder image URLs
 * Uses placeholder.com for consistent gray placeholders with text
 */
export const generatePlaceholder = (
  width: number,
  height: number,
  text: string = 'Placeholder'
): string => {
  const encodedText = encodeURIComponent(text);
  // Using placeholder.com with gray background and white text
  return `https://via.placeholder.com/${width}x${height}/808080/ffffff?text=${encodedText}`;
};

/**
 * Pre-defined placeholder images for all missing project images
 * These replace the local images that were removed from source control
 */
export const PLACEHOLDER_IMAGES = {
  // ProjectsPage placeholders (600x400)
  aiCodeGenerator: generatePlaceholder(600, 400, 'AI+Code+Generator'),
  sqlBall: generatePlaceholder(600, 400, 'SQL+Ball'),
  logo1: generatePlaceholder(600, 400, 'Commercial+Portfolio'),
  lfcReddit: generatePlaceholder(600, 400, 'LFC+News+Reddit'),
  dotnetCalendar: generatePlaceholder(600, 400, '.NET+React+Calendar'),
  cssShowcase: generatePlaceholder(600, 400, 'CSS+Showcase'),
  bigBangGallery: generatePlaceholder(600, 400, 'Big+Bang+Gallery'),
  pythonProjects: generatePlaceholder(600, 400, 'Python+Projects'),
  versionTimeTravel: generatePlaceholder(600, 400, 'Version+TimeTravel'),
  newsPerspective: generatePlaceholder(600, 400, 'News+Perspective'),
  aiComparisonShowcase3: generatePlaceholder(600, 400, 'AI+Comparison'),

  // HomePage placeholders (400x300)
  aiComparisonLeft: generatePlaceholder(400, 300, 'AI+Comparison'),
  matrixArcade: generatePlaceholder(400, 300, 'Matrix+Arcade'),
  aiComparisonRight: generatePlaceholder(400, 300, 'AI+Comparison')
} as const;
