import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/electrician_capstone/',
  server: {
    host: '127.0.0.1',
    port: 5000,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})

