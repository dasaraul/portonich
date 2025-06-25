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
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['motion', 'maath'],
          'vendor-ui': ['tailwind-merge', 'react-responsive'],
        },
      },
    },
    // Enable compression
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements in production
      },
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'motion',
      'tailwind-merge',
    ],
  },
  
  // Server config for VPS
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  
  // Preview config
  preview: {
    host: '0.0.0.0',
    port: 4173,
  }
});
