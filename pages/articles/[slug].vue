<script setup lang="ts">
import { articles } from '~/data/articles'

const route = useRoute()
const slug = route.params.slug as string
const article = articles.find(a => a.slug === slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

onMounted(() => {
  document.querySelectorAll<HTMLElement>('[data-code-tabs]').forEach((tabGroup) => {
    const tabs = Array.from(tabGroup.querySelectorAll<HTMLButtonElement>('[data-code-tab]'))
    const panels = Array.from(tabGroup.querySelectorAll<HTMLElement>('[data-code-panel]'))

    const selectTab = (selected: HTMLButtonElement) => {
      const target = selected.dataset.codeTab
      tabs.forEach((tab) => {
        const active = tab === selected
        tab.setAttribute('aria-selected', String(active))
        tab.tabIndex = active ? 0 : -1
      })
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.codePanel !== target
      })
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab))
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        let nextIndex = index
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
        if (event.key === 'Home') nextIndex = 0
        if (event.key === 'End') nextIndex = tabs.length - 1
        tabs[nextIndex]?.focus()
        if (tabs[nextIndex]) selectTab(tabs[nextIndex])
      })
    })
  })
})

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

      <figure v-if="article.ogImage" class="cover">
        <img
          :src="article.ogImage"
          :alt="article.ogImageAlt || `${article.title} cover image`"
          width="1200"
          height="630"
          fetchpriority="high"
        >
      </figure>

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

.cover {
  aspect-ratio: 1200 / 630;
  overflow: hidden;
  margin: 0 0 48px;
  border: 1px solid rgba(125, 211, 252, 0.16);
  border-radius: 8px;
  background: #050709;
}
.cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content :deep(h2) { font-size: 1.8rem; color: #f8fafc; margin-top: 48px; margin-bottom: 20px; }
.content :deep(p) { margin-bottom: 24px; }
.content :deep(pre) {
  overflow-x: auto;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(125, 211, 252, 0.12);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  font-size: 0.85rem;
  line-height: 1.6;
}
.content :deep(code) {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  font-size: 0.85rem;
  background: rgba(125, 211, 252, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  color: #e2e8f0;
}
.content :deep(pre code) {
  background: none;
  padding: 0;
  color: #94a3b8;
}
.content :deep(ul), .content :deep(ol) {
  margin-bottom: 24px;
  padding-left: 24px;
  color: #cbd5e1;
}
.content :deep(li) {
  margin-bottom: 8px;
  line-height: 1.7;
}
.content :deep(a) {
  color: #38bdf8;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.content :deep(.article-checklist) {
  margin: 32px 0 48px;
  padding: 20px 24px;
  border-left: 3px solid #22c55e;
  background: rgba(15, 23, 42, 0.56);
}
.content :deep(.article-checklist h2) {
  margin: 0 0 12px;
  font-size: 1.05rem;
  color: #f8fafc;
}
.content :deep(.article-checklist ul) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 24px;
  margin: 0;
  padding-left: 20px;
}
.content :deep(.article-checklist li) {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
}
.content :deep(.code-tabs) {
  margin-bottom: 28px;
}
.content :deep(.code-tab-list) {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  border-bottom: 1px solid rgba(125, 211, 252, 0.16);
  scrollbar-width: thin;
}
.content :deep(.code-tab-list button) {
  flex: 0 0 auto;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #94a3b8;
  padding: 10px 14px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}
.content :deep(.code-tab-list button[aria-selected='true']) {
  border-bottom-color: #38bdf8;
  color: #e2e8f0;
}
.content :deep(.code-tab-list button:focus-visible) {
  outline: 2px solid #38bdf8;
  outline-offset: -2px;
}
.content :deep([data-code-panel] pre) {
  min-height: 260px;
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
@media (max-width: 560px) {
  .article-page {
    padding: 28px 16px;
  }
  .nav {
    margin-bottom: 36px;
  }
  .header,
  .cover {
    margin-bottom: 36px;
  }
  .title {
    font-size: 2rem;
  }
  .content :deep(.article-checklist) {
    padding: 18px 20px;
  }
  .content :deep(.article-checklist ul) {
    grid-template-columns: 1fr;
  }
  .content :deep(.code-tab-list button) {
    padding: 10px 12px;
    font-size: 0.82rem;
  }
  .content :deep([data-code-panel] pre) {
    min-height: 0;
  }
}
</style>
