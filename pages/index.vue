<template>
  <main class="shell">
    <SsrContent />
    <TerminalWindow />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Senior Software Engineer & Chapter Lead',
  description:
    'Portfolio of Giona Granchelli, a senior software engineer and chapter lead building distributed systems, cloud platforms, and production AI applications.',
  ogTitle: 'Giona Granchelli | Senior Software Engineer & Chapter Lead',
  ogDescription:
    'Senior software engineer and chapter lead building distributed systems, cloud platforms, and production AI applications.',
  ogType: 'profile',
  ogUrl: 'https://gionag.com',
  ogImage: 'https://gionag.com/photo.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Giona Granchelli | Senior Software Engineer & Chapter Lead',
  twitterDescription:
    'Terminal-style CV for Giona Granchelli, senior software engineer and chapter lead in banking, fintech, cloud, and distributed systems.',
  twitterImage: 'https://gionag.com/photo.jpg'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://gionag.com' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://gionag.com/#person',
            name: 'Giona Granchelli',
            jobTitle: 'Senior Software Engineer & Chapter Lead',
            url: 'https://gionag.com',
            image: {
              '@type': 'ImageObject',
              url: 'https://gionag.com/photo.jpg'
            },
            sameAs: [
              'https://www.linkedin.com/in/giona-granchelli',
              'https://github.com/GionaGranchelli',
              'https://constant-labs.com',
              'https://tramai.dev'
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
              'Banking modernization',
              'Production AI agents'
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'University of L\'Aquila'
            }
          },
          {
            '@type': 'WebSite',
            '@id': 'https://gionag.com/#website',
            url: 'https://gionag.com',
            name: 'Giona Granchelli | Senior Software Engineer',
            inLanguage: 'en',
            publisher: {
              '@id': 'https://gionag.com/#person'
            }
          },
          {
            '@type': 'ProfilePage',
            '@id': 'https://gionag.com/#profile-page',
            url: 'https://gionag.com',
            name: 'Giona Granchelli | Senior Software Engineer & Chapter Lead',
            description: 'Portfolio of Giona Granchelli, a senior software engineer and chapter lead building distributed systems, cloud platforms, and production AI applications.',
            inLanguage: 'en',
            mainEntity: {
              '@id': 'https://gionag.com/#person'
            },
            isPartOf: {
              '@id': 'https://gionag.com/#website'
            }
          }
        ]
      })
    }
  ]
})
</script>

<style scoped>
.shell { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
</style>
