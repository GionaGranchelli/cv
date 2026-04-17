<script setup lang="ts">
import { experiences } from '~/data/cv'

useSeoMeta({
  title: 'Professional Experience',
  description: 'Detailed professional history of Giona Granchelli, focusing on banking, fintech, and distributed systems.',
  ogTitle: 'Professional Experience | Giona Granchelli',
  ogDescription: 'Detailed professional history of Giona Granchelli, focusing on banking, fintech, and distributed systems.',
  ogType: 'website',
  ogUrl: 'https://gionag.com/experience',
  ogImage: 'https://gionag.com/photo.jpg'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://gionag.com/experience' }],
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
            'name': 'Experience',
            'item': 'https://gionag.com/experience'
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <main class="experience-index">
    <nav class="nav">
      <NuxtLink to="/" class="back-link">← Back to Terminal</NuxtLink>
    </nav>

    <header class="header">
      <h1 class="title">Professional Experience</h1>
      <p class="subtitle">Focusing on banking, fintech, and cloud-native architecture.</p>
    </header>

    <section class="experience-list">
      <article v-for="exp in experiences" :key="exp.slug" class="experience-card">
        <NuxtLink :to="`/experience/${exp.slug}`" class="experience-link">
          <div class="card-header">
            <h2 class="company">{{ exp.company }}</h2>
            <span class="period">{{ exp.period }}</span>
          </div>
          <h3 class="role">{{ exp.role }}</h3>
          <p class="summary">{{ exp.summary }}</p>
          <div class="stack">
            <span v-for="tech in exp.stack.slice(0, 5)" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </NuxtLink>
      </article>
    </section>
  </main>
</template>

<style scoped>
.experience-index { max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #e2e8f0; }
.nav { margin-bottom: 48px; }
.back-link { color: #38bdf8; text-decoration: none; font-weight: 600; }
.back-link:hover { text-decoration: underline; }

.header { margin-bottom: 56px; }
.title { font-size: 2.5rem; color: #f8fafc; margin-bottom: 12px; }
.subtitle { font-size: 1.1rem; color: #94a3b8; }

.experience-list { display: grid; gap: 32px; }
.experience-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(125, 211, 252, 0.1);
  border-radius: 16px;
  transition: all 0.25s ease;
}
.experience-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(125, 211, 252, 0.25);
  transform: translateY(-2px);
}
.experience-link { display: block; padding: 28px; text-decoration: none; color: inherit; }

.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px; }
.company { font-size: 1.5rem; color: #f8fafc; margin: 0; }
.period { font-size: 0.9rem; color: #64748b; font-family: monospace; }
.role { font-size: 1.1rem; color: #7dd3fc; margin: 0 0 16px 0; font-weight: 500; }
.summary { color: #94a3b8; margin-bottom: 24px; line-height: 1.6; }

.stack { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-tag {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}
</style>
