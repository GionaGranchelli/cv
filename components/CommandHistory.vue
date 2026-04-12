<template>
  <div class="history">
    <div v-for="entry in history" :key="entry.id" class="block">
      <p class="prompt-line">
        <span class="user">giona</span>
        <span class="at">@</span>
        <span class="host">cv</span>
        <span class="path">:~</span>
        <span class="dollar">$</span>
        <span class="cmd">{{ entry.command }}</span>
      </p>
      <div class="output" v-html="entry.output"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TerminalCommand } from '~/types/cv'

defineProps<{ history: TerminalCommand[] }>()
</script>

<style scoped>
.block { margin-bottom: 18px; }
.prompt-line { margin: 10px 0 8px; }
.user { color: #7dd3fc; }
.at { color: #c084fc; }
.host { color: #86efac; }
.path { color: #fbbf24; }
.dollar { color: #f87171; margin-left: 2px; margin-right: 6px; }
.cmd { color: #f8fafc; }
.output { color: var(--text); line-height: 1.7; }
</style>
