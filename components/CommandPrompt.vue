<template>
  <form class="commandbar" @submit.prevent="emit('submit')">
    <span class="prompt">giona@cv:~$</span>
    <div class="input-wrap">
      <div class="input-shell">
        <span class="typed">{{ model }}</span><span class="cursor" aria-hidden="true">█</span>
        <span v-if="hint" class="hint">{{ hint }}</span>
      </div>
      <input
        ref="inputEl"
        v-model="model"
        autocomplete="off"
        spellcheck="false"
        placeholder="type help, about, skills, experience, education..."
        @keydown.up.prevent="emit('up')"
        @keydown.down.prevent="emit('down')"
        @keydown.tab.prevent="emit('tab')"
      />
      <div v-if="suggestions.length" class="suggestions">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          type="button"
          class="suggestion"
          @click="emit('pick', suggestion)"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
    <button type="submit">run</button>
  </form>
</template>

<script setup lang="ts">
const model = defineModel<string>({ required: true })
const props = defineProps<{ suggestions: string[]; hint?: string }>()
const emit = defineEmits<{ submit: []; up: []; down: []; tab: []; pick: [value: string] }>()
const inputEl = ref<HTMLInputElement | null>(null)

defineExpose({ focus: () => inputEl.value?.focus() })
</script>

<style scoped>
.commandbar {
  display: grid; grid-template-columns: auto 1fr auto; gap: 12px;
  margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border);
  align-items: baseline;
}
.prompt {
  white-space: nowrap;
  color: #dbeafe;
  padding-top: 8px;
}
.input-wrap { position: relative; min-width: 0; }
.input-shell {
  position: absolute;
  inset: 0 auto auto 0;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  color: var(--text);
  white-space: nowrap;
  min-width: 0;
  gap: 6px;
}
.typed { color: var(--text); }
.cursor {
  color: #e2e8f0;
  margin-left: 1px;
  animation: blink 1s step-end infinite;
  text-shadow: 0 0 10px rgba(226, 232, 240, .2);
}
.hint { color: #38bdf8; opacity: .9; }
input {
  width: 100%;
  min-width: 0;
  border: 0; outline: 0; color: transparent;
  background: transparent; caret-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.suggestions {
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;
}
.suggestion {
  border: 1px solid var(--border); background: rgba(255,255,255,.02); color: var(--accent-2);
  padding: 4px 8px; border-radius: 999px; cursor: pointer;
}
button[type='submit'] {
  border: 1px solid var(--border); background: transparent; color: var(--accent);
  padding: 8px 14px; border-radius: 10px; cursor: pointer;
}
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@media (max-width: 640px) {
  .commandbar { grid-template-columns: 1fr; }
}
</style>
