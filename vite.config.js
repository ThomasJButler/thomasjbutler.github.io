import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';

export default defineConfig({
  root: '.',
  base: '/ThomasJButler/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Main static portfolio site
        main: resolve(__dirname, 'index.html'),
        // React app - fully migrated v3.5
        react: resolve(__dirname, 'react.html'),
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,  // Keep console logs for debugging
        drop_debugger: true
      }
    }
  },
  // Custom plugins
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
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
      '@images': resolve(__dirname, './src/images')
    }
  }
});