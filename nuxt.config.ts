export default defineNuxtConfig({
  compatibilityDate: '2025-04-12',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  modules: ['@nuxt/image'],
  image: {
    domains : [
        'gionag.com', 'localhost'
    ]
  }
})