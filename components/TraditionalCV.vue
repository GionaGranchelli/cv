<template>
  <div class="traditional-cv">
    <!-- Header / Profile -->
    <header class="cv-header">
      <div class="profile-row">
        <img :src="photoUrl" :alt="profile.name" class="profile-photo" />
        <div class="profile-info">
          <h1>{{ profile.name }}</h1>
          <p class="profile-title">{{ profile.title }}</p>
          <p class="profile-tagline">{{ profile.tagline }}</p>
        </div>
      </div>
      <div class="profile-links">
        <a :href="`mailto:giona.granchelli@gmail.com`">Email</a>
        <a href="https://www.linkedin.com/in/giona-granchelli" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://github.com/GionaGranchelli" target="_blank" rel="noopener">GitHub</a>
        <a href="/Curriculum_Giona_Latex.pdf" download>Download CV (PDF)</a>
      </div>
    </header>

    <!-- Core Skills -->
    <section class="cv-section">
      <h2>Core Skills</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <h3>Backend</h3>
          <ul>
            <li>Kotlin</li>
            <li>Java</li>
            <li>Spring Boot</li>
            <li>REST APIs</li>
            <li>Microservices</li>
            <li>Kafka</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>Cloud & Platform</h3>
          <ul>
            <li>Kubernetes</li>
            <li>Docker</li>
            <li>Azure / AKS</li>
            <li>AWS</li>
            <li>CI/CD Pipelines</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>Frontend</h3>
          <ul>
            <li>Vue.js / Nuxt 3</li>
            <li>TypeScript</li>
            <li>React</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>Architecture</h3>
          <ul>
            <li>Distributed Systems</li>
            <li>Event-Driven</li>
            <li>CQRS</li>
            <li>Agentic Workflows</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3>Database</h3>
          <ul>
            <li>PostgreSQL</li>
            <li>MariaDB</li>
            <li>Redis</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Professional Experience -->
    <section class="cv-section">
      <h2>Professional Experience</h2>
      <div class="experience-list">
        <article v-for="exp in experiences" :key="exp.slug" class="experience-card">
          <div class="exp-header">
            <div>
              <h3>{{ exp.role }}</h3>
              <p class="exp-company">{{ exp.company }}</p>
            </div>
            <div class="exp-meta">
              <span class="exp-period">{{ exp.period }}</span>
              <span class="exp-location">{{ exp.location }}</span>
            </div>
          </div>
          <p class="exp-summary">{{ exp.summary }}</p>
          <ul v-if="exp.bullets?.length" class="exp-bullets">
            <li v-for="bullet in exp.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <div v-if="exp.achievements?.length" class="exp-achievements">
            <h4>Key Achievements</h4>
            <ul>
              <li v-for="ach in exp.achievements" :key="ach">{{ ach }}</li>
            </ul>
          </div>
          <div class="exp-stack">
            <span v-for="tech in exp.stack" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <NuxtLink :to="`/experience/${exp.slug}`" class="exp-detail-link">
            Read more →
          </NuxtLink>
        </article>
      </div>
    </section>

    <!-- Education -->
    <section class="cv-section">
      <h2>Education</h2>
      <div class="education-list">
        <div v-for="edu in education" :key="edu.degree" class="education-card">
          <h3>{{ edu.degree }}</h3>
          <p class="edu-school">{{ edu.school }}</p>
          <p class="edu-meta">{{ edu.period }} · {{ edu.location }}{{ edu.note ? ` · ${edu.note}` : '' }}</p>
          <p v-if="edu.details" class="edu-details">{{ edu.details }}</p>
          <p v-if="edu.thesis" class="edu-thesis"><b>Thesis:</b> {{ edu.thesis }}</p>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="cv-section">
      <h2>Projects</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.slug" class="project-card">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-stack">
            <span v-for="tech in project.stack" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div class="project-links">
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">Site →</a>
            <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">GitHub →</a>
            <NuxtLink :to="`/projects/${project.slug}`">Details →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Publications -->
    <section v-if="publications?.length" class="cv-section">
      <h2>Publications</h2>
      <ul class="publications-list">
        <li v-for="pub in publications" :key="pub.title">
          <b>{{ pub.title }}</b>
          <span v-if="pub.venue"> — {{ pub.venue }}</span>
          <a v-if="pub.url" :href="pub.url" target="_blank" rel="noopener">(link)</a>
        </li>
      </ul>
    </section>

    <!-- Articles -->
    <section class="cv-section">
      <h2>Articles</h2>
      <div class="articles-list">
        <div v-for="article in articles" :key="article.slug" class="article-card">
          <NuxtLink :to="`/articles/${article.slug}`" class="article-link">
            <h3>{{ article.title }}</h3>
            <span class="article-meta">{{ article.date }} · {{ article.readingTime }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { experiences, education, projects, publications, profile, photoUrl } from '~/data/cv'
import { articles } from '~/data/articles'
</script>

<style scoped>
.traditional-cv {
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  color: #d6ffe0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.55;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Header */
.cv-header {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(99, 255, 154, 0.15);
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.profile-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(99, 255, 154, 0.3);
}

.profile-info h1 {
  font-size: 2rem;
  color: #f8fafc;
  margin: 0 0 4px;
  font-weight: 700;
}

.profile-title {
  font-size: 1.1rem;
  color: #63ff9a;
  margin: 0 0 4px;
}

.profile-tagline {
  font-size: 0.95rem;
  color: #8dc99b;
  margin: 0;
}

.profile-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.profile-links a {
  color: #63ff9a;
  text-decoration: none;
  font-size: 0.85rem;
}

.profile-links a:hover {
  text-decoration: underline;
}

/* Sections */
.cv-section {
  margin-bottom: 40px;
}

.cv-section h2 {
  font-size: 1.25rem;
  color: #63ff9a;
  margin: 0 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(99, 255, 154, 0.1);
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.skill-category h3 {
  font-size: 0.85rem;
  color: #9fffbf;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-category ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-category li {
  font-size: 0.9rem;
  color: #d6ffe0;
  padding: 2px 0;
}

/* Experience */
.experience-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(99, 255, 154, 0.1);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  transition: border-color 0.2s, background 0.2s;
}

.experience-card:hover {
  border-color: rgba(99, 255, 154, 0.25);
  background: rgba(255, 255, 255, 0.04);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.exp-header h3 {
  font-size: 1.1rem;
  color: #f8fafc;
  margin: 0;
}

.exp-company {
  font-size: 1rem;
  color: #63ff9a;
  margin: 0 0 4px;
}

.exp-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.exp-period {
  font-size: 0.85rem;
  color: #8dc99b;
  font-family: ui-monospace, monospace;
}

.exp-location {
  font-size: 0.8rem;
  color: #4a7a5f;
}

.exp-summary {
  font-size: 0.9rem;
  color: #8dc99b;
  margin: 8px 0 12px;
  line-height: 1.5;
}

.exp-bullets {
  margin: 0 0 12px 18px;
  padding: 0;
}

.exp-bullets li {
  font-size: 0.88rem;
  color: #d6ffe0;
  padding: 2px 0;
  line-height: 1.5;
}

.exp-achievements {
  margin: 12px 0;
  padding: 12px 16px;
  background: rgba(99, 255, 154, 0.05);
  border-radius: 8px;
  border-left: 2px solid #63ff9a;
}

.exp-achievements h4 {
  font-size: 0.8rem;
  color: #63ff9a;
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.exp-achievements ul {
  margin: 0;
  padding: 0 0 0 16px;
}

.exp-achievements li {
  font-size: 0.85rem;
  color: #d6ffe0;
  padding: 2px 0;
}

.exp-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
}

.exp-detail-link {
  display: inline-block;
  font-size: 0.8rem;
  color: #63ff9a;
  text-decoration: none;
  margin-top: 4px;
}

.exp-detail-link:hover {
  text-decoration: underline;
}

/* Tech tags */
.tech-tag {
  background: rgba(99, 255, 154, 0.1);
  color: #63ff9a;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  border: 1px solid rgba(99, 255, 154, 0.2);
}

/* Education */
.education-card {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(99, 255, 154, 0.08);
}

.education-card h3 {
  font-size: 1rem;
  color: #f8fafc;
  margin: 0 0 4px;
}

.edu-school {
  font-size: 0.9rem;
  color: #9fffbf;
  margin: 0 0 4px;
}

.edu-meta {
  font-size: 0.85rem;
  color: #8dc99b;
  margin: 0 0 4px;
  font-family: ui-monospace, monospace;
}

.edu-details {
  font-size: 0.88rem;
  color: #d6ffe0;
  margin: 4px 0 0;
}

.edu-thesis {
  font-size: 0.85rem;
  color: #8dc99b;
  margin: 4px 0 0;
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(99, 255, 154, 0.1);
  border-radius: 10px;
  padding: 18px;
  transition: border-color 0.2s;
}

.project-card:hover {
  border-color: rgba(99, 255, 154, 0.25);
}

.project-card h3 {
  font-size: 1rem;
  color: #f8fafc;
  margin: 0 0 6px;
}

.project-card p {
  font-size: 0.85rem;
  color: #8dc99b;
  margin: 0 0 10px;
  line-height: 1.4;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 10px;
}

.project-links {
  display: flex;
  gap: 12px;
}

.project-links a {
  font-size: 0.8rem;
  color: #63ff9a;
  text-decoration: none;
}

.project-links a:hover {
  text-decoration: underline;
}

/* Publications */
.publications-list {
  margin: 0;
  padding: 0 0 0 18px;
}

.publications-list li {
  font-size: 0.88rem;
  color: #d6ffe0;
  padding: 4px 0;
  line-height: 1.5;
}

.publications-list a {
  color: #63ff9a;
  text-decoration: none;
  font-size: 0.85rem;
}

/* Articles */
.articles-list {
  display: grid;
  gap: 12px;
}

.article-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(99, 255, 154, 0.1);
  border-radius: 8px;
  padding: 14px 18px;
  transition: border-color 0.2s;
}

.article-card:hover {
  border-color: rgba(99, 255, 154, 0.25);
}

.article-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.article-link h3 {
  font-size: 0.95rem;
  color: #f8fafc;
  margin: 0;
}

.article-meta {
  font-size: 0.78rem;
  color: #4a7a5f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 640px) {
  .profile-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-photo {
    width: 64px;
    height: 64px;
  }

  .profile-info h1 {
    font-size: 1.5rem;
  }

  .exp-header {
    flex-direction: column;
  }

  .exp-meta {
    align-items: flex-start;
  }

  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
