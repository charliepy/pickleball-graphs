import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dsv from '@rollup/plugin-dsv';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pickleball-graphs',
  plugins: [vue(), dsv()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
