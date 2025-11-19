import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy tất cả request bắt đầu bằng /api đến backend
      '/api': {
        target: 'https://localhost:7228',  // URL backend của bạn
        changeOrigin: true,               // Thay đổi origin header thành target
        secure: false,                    // Không verify SSL (dev)
        rewrite: (path) => path.replace(/^\/api/, '/api'),  // Giữ nguyên path /api
      },
    },
  },
});