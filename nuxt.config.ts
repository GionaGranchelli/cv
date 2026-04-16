export default defineNuxtConfig({
  extends: ['nuxt-umami'],
  ssr: true,
  compatibilityDate: '2025-04-12',
  devtools: { enabled: false },
  css: ['~/assets/main.css'],
  modules: ['@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  site: {
    url: 'https://gionag.com',
    name: 'Giona Granchelli | Senior Software Engineer'
  },
  image: {
    domains: ['gionag.com', 'localhost']
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      titleTemplate: '%s | Giona Granchelli',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'author', content: 'Giona Granchelli' },
        { property: 'og:site_name', content: 'Giona Granchelli | Senior Software Engineer' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@GionaGranchelli' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/experience/**': { prerender: true },
    '/articles/**': { prerender: true },
    '/projects/**': { prerender: true }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },
  sitemap: {
    enabled: true,
    cacheMaxAgeSeconds: 3600,
    defaults: {
      changefreq: 'monthly',
      priority: 0.7
    },
    urls: [
        { url: '/', priority: 1.0, changefreq: 'weekly' },
        { url: '/experience', priority: 0.8, changefreq: 'monthly' },
        { url: '/projects', priority: 0.8, changefreq: 'monthly' },
        { url: '/articles', priority: 0.8, changefreq: 'weekly' },
        { url: '/Curriculum_Giona_Latex.pdf', priority: 0.8 },
        { url: '/experience/abn-amro-bcdb', priority: 0.9 },
        { url: '/experience/abn-amro-payday', priority: 0.8 },
        { url: '/experience/ximedes-ns', priority: 0.7 },
        { url: '/experience/blox-btc-direct', priority: 0.7 },
        { url: '/experience/woodwing-elvis', priority: 0.7 },
        { url: '/experience/trifork-ibe-blox', priority: 0.7 },
        { url: '/experience/research-scholarship', priority: 0.6 },
        { url: '/articles/agentic-workflows-modern-engineering', priority: 0.9 },
        { url: '/articles/modernizing-banking-legacy-to-cloud', priority: 0.9 },
        { url: '/projects/openclaw-qmd', priority: 0.8 },
        { url: '/projects/vu-voetbal', priority: 0.7 },
        { url: '/projects/yous', priority: 0.7 },
        { url: '/projects/whichdistro', priority: 0.7 }
    ]
  },
  robots: {
    enabled: true,
    configPath: '~/robots.config'
  }
})