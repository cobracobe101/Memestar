
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Ensures process.env.API_KEY from the instruction works in the browser
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
