<script setup lang="ts">
import { articles } from '~/data/articles'

useSeoMeta({
  title: 'Technical Articles | Giona Granchelli',
  description: 'Deep dives into agentic workflows, cloud modernization, and software architecture.',
  ogTitle: 'Technical Articles | Giona Granchelli',
  ogDescription: 'Deep dives into agentic workflows, cloud modernization, and software architecture.',
  ogType: 'website',
  ogUrl: 'https://whichdistro.com/articles'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://whichdistro.com/articles' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://whichdistro.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Articles',
            'item': 'https://whichdistro.com/articles'
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': 'Giona Granchelli - Technical Blog',
        'description': 'Deep dives into agentic workflows, cloud modernization, and software architecture.',
        'publisher': {
          '@type': 'Person',
          'name': 'Giona Granchelli'
        },
        'blogPost': articles.map(article => ({
          '@type': 'BlogPosting',
          'headline': article.title,
          'url': `https://whichdistro.com/articles/${article.slug}`,
          'datePublished': article.date
        }))
      })
    }
  ]
})
</script>

<template>
  <main class="articles-index">
    <nav class="nav">
      <NuxtLink to="/" class="back-link">← Back to Terminal</NuxtLink>
    </nav>

    <header class="header">
      <h1 class="title">Articles & Case Studies</h1>
      <p class="subtitle">Focusing on distributed systems, agentic AI, and platform modernization.</p>
    </header>

    <section class="articles-list">
      <article v-for="article in articles" :key="article.slug" class="article-card">
        <NuxtLink :to="`/articles/${article.slug}`" class="article-link">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-excerpt">{{ article.description }}</p>
          <div class="article-meta">
            <span>{{ article.date }}</span>
            <span class="dot">·</span>
            <span>{{ article.readingTime }}</span>
          </div>
        </NuxtLink>
      </article>
    </section>
  </main>
</template>

<style scoped>
.articles-index { max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #e2e8f0; }
.nav { margin-bottom: 48px; }
.back-link { color: #38bdf8; text-decoration: none; font-weight: 600; }
.back-link:hover { text-decoration: underline; }

.header { margin-bottom: 56px; }
.title { font-size: 2.5rem; color: #f8fafc; margin-bottom: 12px; }
.subtitle { font-size: 1.1rem; color: #94a3b8; }

.articles-list { display: grid; gap: 32px; }
.article-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(125, 211, 252, 0.1);
  border-radius: 16px;
  transition: all 0.25s ease;
}
.article-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(125, 211, 252, 0.25);
  transform: translateY(-2px);
}
.article-link { display: block; padding: 28px; text-decoration: none; color: inherit; }
.article-title { font-size: 1.5rem; color: #f8fafc; margin-bottom: 12px; }
.article-excerpt { color: #94a3b8; margin-bottom: 20px; line-height: 1.6; }
.article-meta { color: #64748b; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
.dot { color: #334155; }
</style>
