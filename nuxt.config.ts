// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      duotekHost: process.env.NUXT_PUBLIC_DUOTEK_HOST,
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        {
          charset: 'UTF-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        },
        {
          name: 'description',
          content: 'Duotek'
        }
      ]
    }
  },

  css: [
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '@/assets/scss/theme-duotek.scss'
  ],

  modules: ["@nuxt/image"]
})