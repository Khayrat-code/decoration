import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Bump the warning ceiling — the bundle includes framer-motion + YARL + lucide,
    // and the resulting single chunk sits ~630 KB unminified. Acceptable for the
    // scope; silence the warning rather than splitting (which would add HTTP
    // round-trips on the public site for a 630 KB total payload).
    chunkSizeWarningLimit: 1000,
  },
})
