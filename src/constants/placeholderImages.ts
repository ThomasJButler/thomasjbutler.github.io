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
  // AI/ML Projects - Real Cloudinary URLs
  modelViz: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767710994/ModelViz_blz9ct.png',
  aiCodeGenerator: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767710993/codegenerator3_z9dtie.png',
  sqlBall: 'https://res.cloudinary.com/depqttzlt/image/upload/v1765947198/sqlball_canxlv.png',
  morpheus: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767713745/Morpheus5_pdcmvr.png',
  reviewBotProtocol: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767707875/ReviewBot2_xzcin9.png',
  portfolioDashboard: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766595895/dashboardhomepage_xxsk0z.png',

  // Web Projects - Real Cloudinary URLs
  logo1: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766580999/logo_ofodr8.svg',
  newsPerspective: 'https://res.cloudinary.com/depqttzlt/image/upload/v1765947185/newsperspective2_ugdtqk.png',
  lfcReddit: 'https://res.cloudinary.com/depqttzlt/image/upload/v1765947167/lfcreddit2_wzbqty.png',
  pythonProjects: 'https://res.cloudinary.com/depqttzlt/image/upload/v1765947170/LorenzAttractor_bd2dps.png',
  dotnetCalendar: 'https://res.cloudinary.com/depqttzlt/image/upload/v1765947576/dotnetcalendar_fiu8p4.jpg',
  cssShowcase: 'https://res.cloudinary.com/depqttzlt/image/upload/v1765946936/cssshowcase_ugyvso.webp',
  bigBangGallery: 'https://res.cloudinary.com/depqttzlt/image/upload/v1765946935/bigbanggallery_ckmaw1.webp',
  versionTimeTravel: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767710995/portfoliotimetravel_rh7jgr.png',
  matrixArcadeStatic: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767710994/matrixarcade2_kbbnaf.png',

  // HomePage introduction images - GIFs and Video
  matrixArcadeGif: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767712404/matrixarcadegif2_ubesub.gif',
  modelVizGif: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767712413/modelvizgif2_wkl1lh.gif',
  morpheusVideo: 'https://res.cloudinary.com/depqttzlt/video/upload/v1767706547/2_1080_N_s5t1ww.mp4',
  morpheusGif: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767712416/morpheusgif2_zdkku9.gif',

  // Legacy - keeping for backward compatibility (now point to real images)
  aiComparisonLeft: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767712404/matrixarcadegif2_ubesub.gif',
  matrixArcade: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767712413/modelvizgif2_wkl1lh.gif',
  aiComparisonRight: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767712416/morpheusgif2_zdkku9.gif',
  aiComparisonShowcase3: 'https://res.cloudinary.com/depqttzlt/image/upload/v1767710994/ModelViz_blz9ct.png'
} as const;
