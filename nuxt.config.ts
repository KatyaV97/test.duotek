// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true
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
    '@/assets/scss/theme-duotek.scss'
  ],

  modules: ["@nuxt/image"]
})