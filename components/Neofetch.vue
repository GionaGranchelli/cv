<script setup lang="ts">
import { profile, photoUrl } from '~/data/cv'
</script>

<template>
  <div class="neo-card-wrap">
    <div class="neo-card">
      <NuxtImg
        class="neo-photo"
        :src="photoUrl"
        :alt="profile.name"
        width="96"
        height="96"
        format="webp"
        loading="eager"
        fetchpriority="high"
      />
      <div class="neo-meta">
        <div class="neo-row"><span class="neo-label">name</span><span class="neo-value">{{ profile.name }}</span></div>
        <div class="neo-row"><span class="neo-label">title</span><span class="neo-value">{{ profile.title }}</span></div>
        <div class="neo-row"><span class="neo-label">ai-focus</span><span class="neo-value">Agentic Workflows & Infrastructure</span></div>
        <div class="neo-row"><span class="neo-label">stack</span><span class="neo-value">Kotlin, Java, Vue, Azure, Kubernetes</span></div>
        <div class="neo-row"><span class="neo-label">focus</span><span class="neo-value">Banking, fintech, distributed systems</span></div>
        <div class="neo-row"><span class="neo-label">site</span><span class="neo-value">WhichDistro.com</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neo-card-wrap { margin: 14px 0 8px; }
.neo-card {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 14px;
  align-items: start;
  padding: 14px;
  border: 1px solid rgba(125, 211, 252, 0.12);
  border-radius: 16px;
  background: rgba(255,255,255,.03);
}
.neo-photo {
  width: 96px;
  height: 96px;
  border-radius: 14px;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 0 0 1px rgba(125,211,252,.08), 0 10px 30px rgba(0,0,0,.35);
}
.neo-meta { display: grid; gap: 8px; min-width: 0; }
.neo-row { display: flex; gap: 10px; flex-wrap: wrap; }
.neo-label { color: #38bdf8; min-width: 56px; text-transform: uppercase; font-size: .8rem; letter-spacing: .06em; }
.neo-value { color: #e2e8f0; }

@media (max-width: 640px) {
  .neo-card { grid-template-columns: 1fr; }
  .neo-photo { width: 88px; height: 88px; }
}
</style>
