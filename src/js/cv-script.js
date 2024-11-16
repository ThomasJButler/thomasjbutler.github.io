document.addEventListener('DOMContentLoaded', () => {
    // Performance optimization flags
    const PERFORMANCE = {
        FPS: 30,
        BATCH_SIZE: 50,
        USE_OFFSCREEN: 'OffscreenCanvas' in window
    };

    // Core matrix configuration
    const MATRIX_CONFIG = {
        FONT_SIZE: 14,
        CHARS: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
        DROP_SPEED: 0.7,
        FADE_ALPHA: 0.05,
        MIN_BRIGHTNESS: 0.7,
        MAX_BRIGHTNESS: 1
    };

    // Create and configure canvas
    let canvas = document.createElement('canvas');
    canvas.id = 'matrix';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Setup context with optimized settings
    const ctx = canvas.getContext('2d', {
        alpha: true,
        desynchronized: true,
        willReadFrequently: false
    });

    // State management
    let animationId = null;
    let lastFrameTime = 0;
    let drops = [];
    let canvasWidth = 0;
    let canvasHeight = 0;

    // Pre-calculate frequently used values
    const frameInterval = 1000 / PERFORMANCE.FPS;
    const charArray = MATRIX_CONFIG.CHARS.split('');
    const getRandomChar = () => charArray[~~(Math.random() * charArray.length)];

    // Efficient canvas resize
    function resizeCanvas() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Reinitialize drops with optimized calculation
        const columnCount = ~~(canvasWidth / MATRIX_CONFIG.FONT_SIZE);
        drops = new Array(columnCount).fill(0)
            .map(() => -Math.random() * canvasHeight);

        // Reset context settings after resize
        ctx.font = `${MATRIX_CONFIG.FONT_SIZE}px monospace`;
        ctx.textBaseline = 'top';
    }

    // Optimized matrix drawing function
    function drawMatrix(timestamp) {
        if (!lastFrameTime) lastFrameTime = timestamp;
        
        const elapsed = timestamp - lastFrameTime;
        if (elapsed < frameInterval) {
            animationId = requestAnimationFrame(drawMatrix);
            return;
        }

        // Apply fade effect
        ctx.fillStyle = `rgba(0, 0, 0, ${MATRIX_CONFIG.FADE_ALPHA})`;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Process drops in batches
        for (let i = 0; i < drops.length; i++) {
            const x = i * MATRIX_CONFIG.FONT_SIZE;
            const y = drops[i];

            // Dynamic brightness based on position
            const brightness = MATRIX_CONFIG.MIN_BRIGHTNESS + 
                (1 - (y / canvasHeight)) * 
                (MATRIX_CONFIG.MAX_BRIGHTNESS - MATRIX_CONFIG.MIN_BRIGHTNESS);
            
            ctx.fillStyle = `rgba(0, 255, 0, ${brightness})`;
            ctx.fillText(getRandomChar(), x, y);

            // Update drop position
            drops[i] = y >= canvasHeight ? 
                0 : y + MATRIX_CONFIG.DROP_SPEED;
        }

        lastFrameTime = timestamp - (elapsed % frameInterval);
        animationId = requestAnimationFrame(drawMatrix);
    }

    // Event handlers
    const visibilityHandler = () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
            animationId = null;
        } else {
            lastFrameTime = 0;
            animationId = requestAnimationFrame(drawMatrix);
        }
    };

    // Optimized resize handler with debounce
    let resizeTimeout;
    const resizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    // Initialize
    function init() {
        resizeCanvas();
        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('resize', resizeHandler);
        animationId = requestAnimationFrame(drawMatrix);
    }

    // Cleanup
    function cleanup() {
        cancelAnimationFrame(animationId);
        document.removeEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('resize', resizeHandler);
    }

    // Start the matrix effect
    init();

    // Cleanup on page unload
    window.addEventListener('unload', cleanup);
});