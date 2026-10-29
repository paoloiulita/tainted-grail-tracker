// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          i18n: ['react-i18next', 'i18next', 'i18next-http-backend']
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        implementation: sass
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@styles': '/src/styles',
      '@campaigns': '/src/campaigns'
    }
  },
  base: '/tainted-grail-tracker/',
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material']
  }
})