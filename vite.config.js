import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Use API_TARGET_URL from .env if available, otherwise default to Azure
  const apiTarget = env.API_TARGET_URL || 'https://raaed-api-erfsgehsb6ashqh7.italynorth-01.azurewebsites.net';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
})
