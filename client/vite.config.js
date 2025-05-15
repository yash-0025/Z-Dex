import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
   server: {
    watch: {
      usePolling: true,         // 👈 Enable polling (important for WSL, Docker, macOS)
      interval: 100             // Optional: how often to poll (ms)
    },
    hmr: {
      overlay: true             // 👈 Show errors on screen
    }
  }
})


