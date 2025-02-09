import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true
    })
  ],
  optimizeDeps: {
    exclude: ['element-ui']
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname,'src')
    }
  }
});