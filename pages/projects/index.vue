<script setup lang="ts">
import { projects } from '~/data/cv'

useSeoMeta({
  title: 'Open Source Projects',
  description: 'A collection of open source projects and experiments by Giona Granchelli.',
  ogTitle: 'Open Source Projects | Giona Granchelli',
  ogDescription: 'A collection of open source projects and experiments by Giona Granchelli.',
  ogType: 'website',
  ogUrl: 'https://gionag.com/projects',
  ogImage: 'https://gionag.com/photo.jpg'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://gionag.com/projects' }],
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
            'name': 'Projects',
            'item': 'https://gionag.com/projects'
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <main class="projects-index">
    <nav class="nav">
      <NuxtLink to="/" class="back-link">← Back to Terminal</NuxtLink>
    </nav>

    <header class="header">
      <h1 class="title">Projects & Open Source</h1>
      <p class="subtitle">Experimental tools, platforms, and research in software engineering.</p>
    </header>

    <section class="projects-list">
      <article v-for="project in projects" :key="project.slug" class="project-card">
        <NuxtLink :to="`/projects/${project.slug}`" class="project-link">
          <h2 class="project-name">{{ project.name }}</h2>
          <p class="project-description">{{ project.description }}</p>
          <div class="stack">
            <span v-for="tech in project.stack" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </NuxtLink>
      </article>
    </section>
  </main>
</template>

<style scoped>
.projects-index { max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #e2e8f0; }
.nav { margin-bottom: 48px; }
.back-link { color: #38bdf8; text-decoration: none; font-weight: 600; }
.back-link:hover { text-decoration: underline; }

.header { margin-bottom: 56px; }
.title { font-size: 2.5rem; color: #f8fafc; margin-bottom: 12px; }
.subtitle { font-size: 1.1rem; color: #94a3b8; }

.projects-list { display: grid; gap: 32px; }
.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(125, 211, 252, 0.1);
  border-radius: 16px;
  transition: all 0.25s ease;
}
.project-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(125, 211, 252, 0.25);
  transform: translateY(-2px);
}
.project-link { display: block; padding: 28px; text-decoration: none; color: inherit; }

.project-name { font-size: 1.5rem; color: #f8fafc; margin: 0 0 12px 0; }
.project-description { color: #94a3b8; margin-bottom: 24px; line-height: 1.6; }

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
