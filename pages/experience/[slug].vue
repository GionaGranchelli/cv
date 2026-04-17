<script setup lang="ts">
import { experiences } from '~/data/cv'

const route = useRoute()
const slug = route.params.slug as string
const experience = experiences.find(e => e.slug === slug)

if (!experience) {
  throw createError({ statusCode: 404, statusMessage: 'Experience not found' })
}

useSeoMeta({
  title: `${experience.role} at ${experience.company}`,
  description: experience.summary,
  ogTitle: `${experience.role} at ${experience.company} | Giona Granchelli`,
  ogDescription: experience.summary,
  ogType: 'article',
  ogUrl: `https://gionag.com/experience/${experience.slug}`,
  ogImage: experience.ogImage ? `https://gionag.com${experience.ogImage}` : 'https://gionag.com/photo.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: `${experience.role} at ${experience.company} | Giona Granchelli`,
  twitterDescription: experience.summary,
  twitterImage: experience.ogImage ? `https://gionag.com${experience.ogImage}` : 'https://gionag.com/photo.jpg'
})

useHead({
  link: [{ rel: 'canonical', href: `https://gionag.com/experience/${experience.slug}` }],
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
            'name': experience.company,
            'item': `https://gionag.com/experience/${experience.slug}`
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Occupation',
        'name': experience.role,
        'description': experience.summary,
        'hiringOrganization': {
          '@type': 'Organization',
          'name': experience.company,
          'location': experience.location
        },
        'relevantOccupation': {
          '@type': 'Occupation',
          'name': 'Software Engineer'
        }
      })
    }
  ]
})
</script>

<template>
  <main class="experience-page">
    <nav class="nav">
      <NuxtLink to="/" class="back-link">← Back to Terminal</NuxtLink>
    </nav>
    
    <article class="content">
      <header>
        <h1 class="company">{{ experience.company }}</h1>
        <h2 class="role">{{ experience.role }}</h2>
        <p class="meta">{{ experience.period }} · {{ experience.location }}</p>
      </header>

      <section class="summary">
        <p>{{ experience.summary }}</p>
      </section>

      <div class="grid">
        <section v-if="experience.achievements?.length" class="rich-block achievements">
          <h3>Achievements</h3>
          <ul>
            <li v-for="item in experience.achievements" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section v-if="experience.challenges?.length" class="rich-block challenges">
          <h3>Challenges</h3>
          <ul>
            <li v-for="item in experience.challenges" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>

      <section v-if="experience.impact" class="rich-block impact">
        <h3>Impact</h3>
        <p>{{ experience.impact }}</p>
      </section>

      <section v-if="experience.content" class="rich-block story">
        <div class="prose" v-html="experience.content"></div>
      </section>

      <section class="details">
        <h3>Core Responsibilities</h3>
        <ul>
          <li v-for="bullet in experience.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </section>

      <section v-if="experience.stack" class="stack">
        <h3>Technologies</h3>
        <div class="tags">
          <span v-for="tech in experience.stack" :key="tech" class="tag">{{ tech }}</span>
        </div>
      </section>
    </article>
  </main>
</template>

<style scoped>
.experience-page {
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
.company { font-size: 2.5rem; color: #f8fafc; margin: 0; }
.role { font-size: 1.5rem; color: #7dd3fc; margin: 8px 0; }
.meta { color: #94a3b8; font-size: 1rem; }

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 32px 0;
}

.rich-block {
  margin-bottom: 32px;
}

.rich-block h3 {
  color: #f8fafc;
  margin-top: 0;
  margin-bottom: 16px;
  border-left: 3px solid #38bdf8;
  padding-left: 12px;
  font-size: 1.25rem;
}

.impact p {
  font-style: italic;
  color: #cbd5e1;
  font-size: 1.1rem;
}

.story .prose :deep(h3) {
  color: #7dd3fc;
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 1.4rem;
}

.story .prose :deep(p) {
  margin-bottom: 16px;
}

.story .prose :deep(b) {
  color: #38bdf8;
}

h3 { color: #f8fafc; margin-top: 32px; margin-bottom: 16px; border-left: 3px solid #38bdf8; padding-left: 12px; }
ul { padding-left: 20px; }
li { margin-bottom: 12px; }

.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

@media (max-width: 640px) {
  .company { font-size: 1.8rem; }
  .role { font-size: 1.2rem; }
  .grid { grid-template-columns: 1fr; }
}
</style>
