<script setup lang="ts">
import { projects } from '~/data/cv'

const route = useRoute()
const slug = route.params.slug as string
const project = projects.find(p => p.slug === slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: `${project.name} | Giona Granchelli Project`,
  description: project.description,
  ogTitle: `${project.name} | Giona Granchelli Project`,
  ogDescription: project.description,
  ogType: 'article',
  ogUrl: `https://whichdistro.com/projects/${project.slug}`,
  ogImage: project.ogImage ? `https://whichdistro.com${project.ogImage}` : 'https://whichdistro.com/photo.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `https://whichdistro.com/projects/${project.slug}` }],
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
            'name': project.name,
            'item': `https://whichdistro.com/projects/${project.slug}`
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': project.name,
        'description': project.description,
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'Any',
        'url': project.url
      })
    }
  ]
})
</script>

<template>
  <main class="project-page">
    <nav class="nav">
      <NuxtLink to="/" class="back-link">← Back to Terminal</NuxtLink>
    </nav>
    
    <article class="content">
      <header>
        <h1 class="name">{{ project.name }}</h1>
        <p class="description">{{ project.description }}</p>
        <div v-if="project.url" class="links">
          <a :href="project.url" target="_blank" class="link-btn">Visit Project Site</a>
        </div>
      </header>

      <section class="details">
        <h3>About the project</h3>
        <p>{{ project.content }}</p>
      </section>

      <section class="stack">
        <h3>Tech Stack</h3>
        <div class="tags">
          <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
        </div>
      </section>
    </article>
  </main>
</template>

<style scoped>
.project-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  line-height: 1.6;
  color: #e2e8f0;
}
.nav { margin-bottom: 40px; }
.back-link { color: #38bdf8; text-decoration: none; font-weight: 600; }
.back-link:hover { text-decoration: underline; }

header { margin-bottom: 32px; border-bottom: 1px solid rgba(125, 211, 252, 0.1); padding-bottom: 24px; }
.name { font-size: 2.5rem; color: #f8fafc; margin: 0; }
.description { font-size: 1.2rem; color: #94a3b8; margin: 12px 0; }

.link-btn {
  display: inline-block;
  background: #38bdf8;
  color: #03070c;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 16px;
}
.link-btn:hover { background: #7dd3fc; }

h3 { color: #f8fafc; margin-top: 32px; margin-bottom: 16px; border-left: 3px solid #38bdf8; padding-left: 12px; }

.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}
</style>
