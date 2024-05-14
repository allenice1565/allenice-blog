import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  css: {
    preprocessorOptions: {
      // key + config key代表预处理器的名
      less: {
        // 整个的配置对象都会最终给到less的执行参数（全局参数）中去
        // 在webpack里就给less-loader去配置就好了
        math: 'always',
        globalVars: {
          // 全局变量
          mainColor: 'red',
        },
      },
    },
    devSourcemap: true,
  },
});
