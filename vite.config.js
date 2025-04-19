import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import legacy from '@vitejs/plugin-legacy'
import basicSsl from '@vitejs/plugin-basic-ssl'
import {setting} from './src/config/setting.js'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
const {
  base,
  publicDir,
  outDir,
  assetsDir,
  sourcemap,
  cssCodeSplit,
  host,
  port,
  strictPort,
  open,
  cors,
  brotliSize,
  logLevel,
  clearScreen,
  chunkSizeWarningLimit,
} = setting
export default defineConfig({
  root: process.cwd(),
  base,
  publicDir,
  logLevel,
  clearScreen,
  plugins: [react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    basicSsl(),
    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: 'src/auto-imports.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  server: {
    host,
    port,
    cors,
    strictPort,
    open,
    fs: {
      strict: false,
    },
    https: true, // Bật HTTPS
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.71.17:5187',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //     secure: false,
    //   },
    // },
    watch: {
      usePolling: true, // Bật chế độ polling
      interval: 100, // (Tùy chọn) Khoảng thời gian kiểm tra thay đổi (ms)
    },
  },
  corePlugins: {
    preflight: false,
  },

  build: {
    outDir,
    assetsDir,
    sourcemap,
    cssCodeSplit,
    brotliSize,
    chunkSizeWarningLimit,
  },
  resolve: {
    alias: {
      styles: fileURLToPath(new URL('./src/styles', import.meta.url)), // use ES module
      views: fileURLToPath(new URL('./src/views', import.meta.url)), // path.resolve(__dirname, 'src/views') // use CommonJS
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/index.scss" as *; @use "@/styles/element/index.scss" as *;`,
        charset: false,
      },
    },
  },
  
})
