import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';
import { default as compression } from 'vite-plugin-compression';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';

export default defineConfig({
  root: '.',
  base: '/ThomasJButler/',
  build: {
    outDir: 'dist',
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        // Main entry - redirects to React app
        main: resolve(__dirname, 'index.html'),
        // React app - fully migrated v3.5
        react: resolve(__dirname, 'react.html'),
        // Blog redirect for backward compatibility
        blog: resolve(__dirname, 'blog.html'),
      },
      output: {
        // Advanced chunking strategy for optimal loading
        manualChunks: {
          // Vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three'],
          'vendor-animation': ['animejs', 'gsap', 'aos'],
          'vendor-motion': ['framer-motion'],
          // Matrix components
          'matrix-components': [
            './src/components/matrix/WebGLMatrixRain',
            './src/components/matrix/WebGLParticleCursor',
            './src/components/matrix/MatrixLayout',
            './src/components/matrix/CommandPalette'
          ]
        },
        // Optimal chunk naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return `assets/media/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.css$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
        unsafe_arrows: true,
        unsafe_math: true,
        unsafe_methods: true
      },
      mangle: {
        safari10: true
      }
    }
  },
  // Custom plugins
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // Gzip compression for production
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Brotli compression for modern browsers
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Bundle analyzer - only in build mode
    process.env.ANALYZE && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
    // Development middleware to serve blog markdown files
    {
      name: 'serve-blog-files',
      configureServer(server) {
        // Serve markdown files - handle both /docs/blog and /ThomasJButler/docs/blog paths
        server.middlewares.use((req, res, next) => {
          // Check if this is a request for a blog markdown file
          const url = req.url;
          let blogPath = null;
          
          if (url.startsWith('/docs/blog/')) {
            blogPath = url.replace('/docs/blog/', '');
          } else if (url.startsWith('/ThomasJButler/docs/blog/')) {
            blogPath = url.replace('/ThomasJButler/docs/blog/', '');
          }
          
          if (blogPath && blogPath.endsWith('.md')) {
            const filePath = resolve(__dirname, 'docs/blog', blogPath);
            
            if (existsSync(filePath)) {
              try {
                const content = readFileSync(filePath, 'utf-8');
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Cache-Control', 'no-cache');
                res.end(content);
                return;
              } catch (error) {
                console.error('Error serving blog file:', error);
              }
            }
          }
          
          next();
        });

        // Redirect blog article routes to React app with hash
        server.middlewares.use('/ThomasJButler/blog/', (req, res, next) => {
          // Extract the blog slug from the URL
          const path = req.url;
          const slug = path.split('/').pop();
          
          if (slug && slug !== 'blog') {
            // Redirect to react.html with hash routing
            const redirectUrl = `/ThomasJButler/react.html#/blog/${slug}`;
            res.writeHead(302, { Location: redirectUrl });
            res.end();
          } else {
            // For /blog route, redirect to blog list
            const redirectUrl = `/ThomasJButler/react.html#/blog`;
            res.writeHead(302, { Location: redirectUrl });
            res.end();
          }
        });
      }
    },
    // Build-time plugin to copy blog markdown files
    {
      name: 'copy-blog-files',
      writeBundle() {
        const blogSrcDir = resolve(__dirname, 'docs/blog');
        const blogDestDir = resolve(__dirname, 'dist/docs/blog');
        
        // Ensure destination directory exists
        if (!existsSync(resolve(__dirname, 'dist/docs'))) {
          mkdirSync(resolve(__dirname, 'dist/docs'), { recursive: true });
        }
        if (!existsSync(blogDestDir)) {
          mkdirSync(blogDestDir, { recursive: true });
        }
        
        // Copy all markdown files
        if (existsSync(blogSrcDir)) {
          const files = readdirSync(blogSrcDir);
          files.forEach(file => {
            if (file.endsWith('.md')) {
              copyFileSync(resolve(blogSrcDir, file), resolve(blogDestDir, file));
              console.log(`Copied blog file: ${file}`);
            }
          });
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@css': resolve(__dirname, './src/css'),
      '@js': resolve(__dirname, './src/js'),
      '@images': resolve(__dirname, './src/images'),
      '@lib': resolve(__dirname, './src/lib'),
      '@components': resolve(__dirname, './src/components')
    }
  }
});