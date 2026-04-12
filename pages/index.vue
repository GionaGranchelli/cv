<template>
  <main class="shell">
    <TerminalWindow />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Giona Granchelli | Senior Software Engineer / Chapter Lead',
  description:
    'Terminal-style CV for Giona Granchelli, senior software engineer and chapter lead in banking, fintech, cloud, and distributed systems. Includes experience, education, publications, and downloadable CV.',
  ogTitle: 'Giona Granchelli | Senior Software Engineer / Chapter Lead',
  ogDescription:
    'Terminal-style CV for Giona Granchelli, senior software engineer and chapter lead in banking, fintech, cloud, and distributed systems.',
  ogType: 'profile',
  ogUrl: 'https://whichdistro.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Giona Granchelli | Senior Software Engineer / Chapter Lead',
  twitterDescription:
    'Terminal-style CV for Giona Granchelli, senior software engineer and chapter lead in banking, fintech, cloud, and distributed systems.'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://whichdistro.com' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Giona Granchelli',
        jobTitle: 'Senior Software Engineer / Chapter Lead',
        url: 'https://whichdistro.com',
        sameAs: [
          'https://www.linkedin.com/in/giona-granchelli',
          'https://github.com/GionaGranchelli'
        ],
        knowsAbout: [
          'Kotlin',
          'Java',
          'Spring Boot',
          'Vue.js',
          'Kubernetes',
          'Azure',
          'Distributed systems',
          'Fintech',
          'Banking modernization'
        ],
        alumniOf: 'University of L\'Aquila'
      })
    }
  ]
})
</script>

<style scoped>
.shell { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
</style>
