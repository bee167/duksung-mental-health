import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/DungGeunMo.ttf', 'icons/icon.svg', 'icons/maskable.svg'],
      manifest: {
        name: '마음봄 — 덕성여대 정신건강 지원',
        short_name: '마음봄',
        description: '덕성여대 학우를 위한 정신건강 자가진단, 감정일기, 호흡 케어 앱',
        start_url: '/duksung-mental-health/',
        scope: '/duksung-mental-health/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#190019',
        theme_color: '#190019',
        lang: 'ko',
        categories: ['health', 'lifestyle'],
        icons: [
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'icons/maskable.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'icons/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            form_factor: 'narrow',
            label: '마음봄 홈 화면',
          },
        ],
        shortcuts: [
          {
            name: '자가진단',
            short_name: '진단',
            url: '/duksung-mental-health/#/survey',
            icons: [{ src: 'icons/icon.svg', sizes: 'any' }],
          },
          {
            name: '감정일기',
            short_name: '일기',
            url: '/duksung-mental-health/#/diary',
            icons: [{ src: 'icons/icon.svg', sizes: 'any' }],
          },
          {
            name: '호흡',
            short_name: '호흡',
            url: '/duksung-mental-health/#/breathe',
            icons: [{ src: 'icons/icon.svg', sizes: 'any' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.ttf'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  base: '/duksung-mental-health/',
})
