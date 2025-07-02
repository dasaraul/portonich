import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // Ensure proper base path for assets
  base: './',
  
  build: {
    // Smart chunk splitting for modern libraries
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'vendor-react': ['react', 'react-dom'],
          
          // Animation libraries (smart chunking)
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          
          // 3D libraries (separate chunk for conditional loading)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          
          // Utility libraries
          'vendor-utils': ['react-responsive'],
        },
      },
    },
    
    // Performance optimizations
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements
        dead_code: true, // Remove dead code
        unused: true, // Remove unused code
      },
      mangle: {
        safari10: true, // Fix Safari 10 bug
      },
    },
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000, // Warn for chunks > 1MB
  },
  
  // Optimize dependencies for faster builds
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'gsap',
      'react-responsive',
    ],
    // Exclude heavy libraries from pre-bundling for conditional loading
    exclude: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'animejs',
      '@barba/core',
      'lenis'
    ],
  },
  
  // Server configuration
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Enable HTTP/2 for better performance
    https: false,
    // Optimize HMR for better development experience
    hmr: {
      overlay: true,
    },
  },
  
  // Preview configuration
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  
  // Define global constants for smart loading
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __ENABLE_3D__: JSON.stringify(process.env.ENABLE_3D !== 'false'),
  },
});