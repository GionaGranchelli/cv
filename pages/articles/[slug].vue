<script setup lang="ts">
import { articles } from '~/data/articles'

const route = useRoute()
const slug = route.params.slug as string
const article = articles.find(a => a.slug === slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useSeoMeta({
  title: article.title,
  description: article.description,
  ogTitle: `${article.title} | Giona Granchelli`,
  ogDescription: article.description,
  ogType: 'article',
  ogUrl: `https://gionag.com/articles/${article.slug}`,
  ogImage: article.ogImage ? `https://gionag.com${article.ogImage}` : 'https://gionag.com/photo.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `https://gionag.com/articles/${article.slug}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://gionag.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Articles',
            'item': 'https://gionag.com/articles'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': article.title,
            'item': `https://gionag.com/articles/${article.slug}`
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': article.title,
        'description': article.description,
        'author': {
          '@type': 'Person',
          'name': 'Giona Granchelli',
          'url': 'https://gionag.com'
        },
        'datePublished': article.date,
        'image': article.ogImage ? `https://gionag.com${article.ogImage}` : 'https://gionag.com/photo.jpg',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://gionag.com/articles/${article.slug}`
        }
      })
    }
  ]
})
</script>

<template>
  <main class="article-page">
    <nav class="nav">
      <NuxtLink to="/articles" class="back-link">← Back to Articles</NuxtLink>
    </nav>

    <article class="article">
      <header class="header">
        <h1 class="title">{{ article.title }}</h1>
        <div class="meta">
          <span>{{ article.date }}</span>
          <span class="dot">·</span>
          <span>{{ article.readingTime }}</span>
        </div>
        <div class="tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <section class="content" v-html="article.content"></section>
    </article>
  </main>
</template>

<style scoped>
.article-page { max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #e2e8f0; line-height: 1.8; }
.nav { margin-bottom: 48px; }
.back-link { color: #38bdf8; text-decoration: none; font-weight: 600; }
.back-link:hover { text-decoration: underline; }

.header { margin-bottom: 48px; }
.title { font-size: 2.5rem; color: #f8fafc; margin-bottom: 16px; line-height: 1.2; }
.meta { color: #64748b; font-size: 0.95rem; margin-bottom: 24px; display: flex; align-items: center; gap: 8px; }
.dot { color: #334155; }

.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.content :deep(h2) { font-size: 1.8rem; color: #f8fafc; margin-top: 48px; margin-bottom: 20px; }
.content :deep(p) { margin-bottom: 24px; }
</style>
