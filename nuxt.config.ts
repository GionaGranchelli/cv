export default defineNuxtConfig({
  extends: ['nuxt-umami'],
  ssr: true,
  compatibilityDate: '2025-04-12',
  devtools: { enabled: false },
  css: ['~/assets/main.css'],
  modules: ['@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-security'],
  site: {
    url: 'https://gionag.com',
    name: 'Giona Granchelli | Senior Software Engineer'
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: false, // Disabled for now to prevent breaking existing components, can be refined later
    },
    hidePoweredBy: true
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
    compressPublicAssets: true,
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
        { loc: '/', priority: 1.0, changefreq: 'weekly' },
        { loc: '/experience', priority: 0.8, changefreq: 'monthly' },
        { loc: '/projects', priority: 0.8, changefreq: 'monthly' },
        { loc: '/articles', priority: 0.8, changefreq: 'weekly' },
        { loc: '/Curriculum_Giona_Latex.pdf', priority: 0.8 },
        { loc: '/experience/abn-amro-bcdb', priority: 0.9 },
        { loc: '/experience/abn-amro-payday', priority: 0.8 },
        { loc: '/experience/ximedes-ns', priority: 0.7 },
        { loc: '/experience/blox-btc-direct', priority: 0.7 },
        { loc: '/experience/woodwing-elvis', priority: 0.7 },
        { loc: '/experience/trifork-ibe-blox', priority: 0.7 },
        { loc: '/experience/research-scholarship', priority: 0.6 },
        { loc: '/articles/agentic-workflows-modern-engineering', priority: 0.9 },
        { loc: '/articles/modernizing-banking-legacy-to-cloud', priority: 0.9 },
        { loc: '/projects/openclaw-qmd', priority: 0.8 },
        { loc: '/projects/vu-voetbal', priority: 0.7 },
        { loc: '/projects/yous', priority: 0.7 },
        { loc: '/projects/whichdistro', priority: 0.7 }
    ]
  },
  robots: {
    enabled: true
  }
})