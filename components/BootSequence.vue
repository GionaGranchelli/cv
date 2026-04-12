<template>
  <div class="boot">
    <p
      v-for="(line, index) in visibleLines"
      :key="line + index"
      class="boot-line"
      :class="{ glitch: index === currentGlitch }"
      :style="{ animationDelay: `${index * 140}ms` }"
    >
      {{ line }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ lines: string[] }>()
const visibleLines = ref<string[]>([])
const currentGlitch = ref(-1)

onMounted(() => {
  props.lines.forEach((line, index) => {
    setTimeout(() => {
      visibleLines.value.push(line)
      currentGlitch.value = index
      setTimeout(() => {
        if (currentGlitch.value === index) currentGlitch.value = -1
      }, 180)
    }, index * 220)
  })
})
</script>

<style scoped>
.boot { margin-bottom: 10px; }
.boot-line {
  margin: 0 0 6px;
  color: #7dd3fc;
  opacity: 0;
  animation: fadeIn 220ms ease forwards;
  text-shadow: 0 0 0 rgba(125, 211, 252, 0);
}
.boot-line.glitch {
  animation: fadeIn 220ms ease forwards, glitch 180ms steps(2, end) 1;
  color: #e2e8f0;
  text-shadow: -1px 0 #c084fc, 1px 0 #86efac;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glitch {
  0% { transform: translateX(0); }
  25% { transform: translateX(-1px); }
  50% { transform: translateX(1px); }
  75% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
}
</style>
