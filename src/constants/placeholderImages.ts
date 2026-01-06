/**
 * Centralized image URLs for projects
 * Using Cloudinary CDN for project images
 * Synced with Agentic AI Projects Portfolio (agenticaiprojectsportfolio.vercel.app)
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
  // AI/ML Projects - Real Cloudinary URLs from Agentic AI Portfolio
  modelViz: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766581000/ModelViz_rgtovj.png',
  aiCodeGenerator: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758201680/codegeneratordocs_snywas.png',
  sqlBall: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766581001/sqlball_rtdaag.png',
  morpheus: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766580765/morpheuschat_evuiol.png',
  reviewBotProtocol: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766581001/rvp_vr7mvr.png',
  portfolioDashboard: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766595895/dashboardhomepage_xxsk0z.png',

  // Web Projects - Placeholders (to be replaced with real images later)
  logo1: generatePlaceholder(600, 400, 'Commercial+Portfolio'),
  lfcReddit: generatePlaceholder(600, 400, 'LFC+News+Reddit'),
  dotnetCalendar: generatePlaceholder(600, 400, '.NET+React+Calendar'),
  cssShowcase: generatePlaceholder(600, 400, 'CSS+Showcase'),
  bigBangGallery: generatePlaceholder(600, 400, 'Big+Bang+Gallery'),
  pythonProjects: generatePlaceholder(600, 400, 'Python+Projects'),
  versionTimeTravel: generatePlaceholder(600, 400, 'Version+TimeTravel'),
  newsPerspective: generatePlaceholder(600, 400, 'News+Perspective'),

  // HomePage placeholders (400x300)
  aiComparisonLeft: generatePlaceholder(400, 300, 'AI+Comparison'),
  matrixArcade: generatePlaceholder(400, 300, 'Matrix+Arcade'),
  aiComparisonRight: generatePlaceholder(400, 300, 'AI+Comparison'),

  // Legacy - keeping for backward compatibility
  aiComparisonShowcase3: generatePlaceholder(600, 400, 'AI+Comparison')
} as const;
