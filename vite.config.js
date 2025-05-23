import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  
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
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
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
