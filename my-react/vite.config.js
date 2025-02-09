import {
  defineConfig,
  normalizePath
} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import aliyunTheme from '@ant-design/aliyun-theme'
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    //项目路径前缀
    alias: {
      '@': path.join(__dirname, 'src'),
      '@assets': path.join(__dirname, 'src/assets'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      // 全局scss自动注入
      scss: {
      },
      // 全局less自动注入
      less: {
        // additionalData: `@import "${variablePath}";`,
        javascriptEnabled: true,
        modifyVars: aliyunTheme, // 阿里云主题
        // modifyVars: getThemeVariables({
        //     dark: true, // 开启暗黑模式
        //     compact: true, // 开启紧凑模式
        // }),
      },
    },
  },
  server: {
    proxy: {
      //   // 字符串简写写法
      //   '/foo': 'http://localhost:4567',
      //   // 选项写法
      //   '/api': {
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   },
      //   // 正则表达式写法
      //   '^/fallback/.*': {
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/fallback/, '')
      //   },
      // 使用 proxy 实例
      // '/api': {
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     configure: (proxy, options) => {
      //         // proxy 是 'http-proxy' 的实例
      //     },
      // },
    },
  },
  optimizeDeps: {
    // entries: ['*.html'],
    include: ['react'],
  },
})