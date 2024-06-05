// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
export default defineConfig({
  plugins: [react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),],
  
  
   
   
  server: {
    host: '0.0.0.0',
    port: 5173, // You can change this to the port you are using
  },
});
