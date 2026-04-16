<script setup lang="ts">
import { profile, experiences, education, publications, sections, projects } from '~/data/cv'
import { articles } from '~/data/articles'

// This component is for SEO purposes, ensuring that all content is present in the initial HTML
// for crawlers that might not execute JavaScript or wait for terminal animations.
</script>

<template>
  <div class="sr-only" aria-hidden="true">
    <NuxtImg :src="photoUrl" :alt="profile.name" />
    <h1>{{ profile.name }} - {{ profile.title }}</h1>
    <p>{{ profile.tagline }}</p>

    <section id="about">
      <h2>About</h2>
      <div v-html="sections.about"></div>
    </section>

    <section id="experience">
      <h2>Experience</h2>
      <article v-for="exp in experiences" :key="exp.slug">
        <h3>
          <NuxtLink :to="`/experience/${exp.slug}`">{{ exp.role }} at {{ exp.company }}</NuxtLink>
        </h3>
        <p>{{ exp.period }} | {{ exp.location }}</p>
        <p>{{ exp.summary }}</p>
        <ul>
          <li v-for="bullet in exp.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <p><strong>Stack:</strong> {{ exp.stack.join(', ') }}</p>
      </article>
    </section>

    <section id="education">
      <h2>Education</h2>
      <article v-for="edu in education" :key="edu.degree">
        <h3>{{ edu.degree }} - {{ edu.school }}</h3>
        <p>{{ edu.period }} | {{ edu.location }}</p>
        <p>{{ edu.details }}</p>
        <p v-if="edu.thesis">Thesis: {{ edu.thesis }}</p>
      </article>
    </section>

    <section id="publications">
      <h2>Publications</h2>
      <article v-for="pub in publications" :key="pub.id">
        <h3>{{ pub.title }}</h3>
        <p>{{ pub.venue }}</p>
      </article>
    </section>

    <section id="articles">
      <h2>Articles & Case Studies</h2>
      <article v-for="article in articles" :key="article.slug">
        <h3>
          <NuxtLink :to="`/articles/${article.slug}`">{{ article.title }}</NuxtLink>
        </h3>
        <p>{{ article.description }}</p>
      </article>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <article v-for="project in projects" :key="project.slug">
        <h3>
          <NuxtLink :to="`/projects/${project.slug}`">{{ project.name }}</NuxtLink>
        </h3>
        <p>{{ project.description }}</p>
        <p><strong>Stack:</strong> {{ project.stack.join(', ') }}</p>
      </article>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <div v-html="sections.contact"></div>
    </section>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
