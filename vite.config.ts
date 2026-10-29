// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const rootDir = dirname(fileURLToPath(import.meta.url))

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
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
      '@components': resolve(rootDir, 'src/components'),
      '@hooks': resolve(rootDir, 'src/hooks'),
      '@services': resolve(rootDir, 'src/services'),
      '@styles': resolve(rootDir, 'src/styles'),
      '@campaigns': resolve(rootDir, 'src/campaigns')
    }
  },
  base: '/tainted-grail-tracker/',
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material']
  }
})