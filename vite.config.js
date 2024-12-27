import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { ElementUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
		vue2(),
		Components({
			resolvers: [ElementUiResolver()],
		}),
	],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: []
  }
});