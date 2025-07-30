import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index-react.html'),
        // Legacy HTML files - will be removed after full React migration
        legacy_index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        skills: resolve(__dirname, 'skills.html'),
        projects: resolve(__dirname, 'projects.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        sitemap: resolve(__dirname, 'sitemap.html'),
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