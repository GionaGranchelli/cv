<template>
  <main class="shell">
    <ViewToggle current="plain" />
    <TraditionalCV />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'CV',
  description:
    'Full CV of Giona Granchelli: senior software engineer and chapter lead in banking, fintech, cloud, distributed systems, and production AI applications.',
  ogTitle: 'Giona Granchelli | CV',
  ogDescription:
    'Senior software engineer and chapter lead. Banking, fintech, cloud platforms, distributed systems, and production AI applications.',
  ogType: 'profile',
  ogUrl: 'https://gionag.com/plain',
  ogImage: 'https://gionag.com/photo.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Giona Granchelli | CV',
  twitterDescription:
    'Senior software engineer and chapter lead in banking, fintech, cloud, and distributed systems.',
  twitterImage: 'https://gionag.com/photo.jpg'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://gionag.com/plain' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': 'https://gionag.com/plain#profile-page',
        url: 'https://gionag.com/plain',
        name: 'Giona Granchelli | CV',
        inLanguage: 'en',
        mainEntity: {
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
          ]
        }
      })
    }
  ]
})
</script>
