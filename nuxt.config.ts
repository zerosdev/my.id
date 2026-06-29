import { profile } from './app/data'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui'
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      scripts: {
        googleAnalytics: {
          id: ''
        }
      }
    }
  },

  fonts: {
    families: [
      { name: 'Geist Mono', provider: 'fontsource' }
    ]
  },

  scripts: {
    registry: {
      googleAnalytics: { trigger: 'onNuxtReady' }
    }
  },

  routeRules: {
    '/download': { redirect: { to: profile.resumeUrl, statusCode: 302 } }
  },

  nitro: {
    preset: 'cloudflare_module'
  }
})