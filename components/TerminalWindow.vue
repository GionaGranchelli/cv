<template>
  <section class="terminal">
    <header class="topbar">
      <span class="dots"><i></i><i></i><i></i></span>
      <span class="title">giona@terminal-cv:~</span>
      
      <div class="tour-control">
        <span class="tour-label">{{ isTourActive ? 'Autopilot On' : 'Guided Tour' }}</span>
        <label class="switch">
          <input type="checkbox" :checked="isTourActive" @change="toggleTour">
          <span class="slider"></span>
        </label>
      </div>

      <span class="status">online</span>
    </header>

    <div ref="screenEl" class="screen" @mousedown="isTourActive = false">
      <BootSequence :lines="bootLines" />

      <Transition name="fade">
        <span v-if="showWhoami" class="whoami-line"><span class="user">giona</span><span class="at">@</span><span class="host">cv</span><span class="path">:~</span><span class="dollar">$</span><span class="cmd"> {{ whoamiTyped }}</span></span>
      </Transition>

      <Transition name="fade">
        <p v-if="showIdentity" class="identity">{{ identityTyped }}</p>
      </Transition>
      <p v-if="showIdentity" class="tagline">{{ profile.tagline }}</p>
      <p v-if="showIdentity" class="hint">Type <b>help</b> to see available commands.</p>
      <p v-if="showIdentity" class="download">
        <a href="/Curriculum_Giona_Latex.pdf" download>download cv</a>
        <span class="sep">·</span>
        <a href="https://whichdistro.com" target="_blank" rel="noreferrer">whichdistro.com</a>
      </p>

      <div v-if="showIdentity" class="quick-actions">
        <button type="button" @click="runQuick('ls')">ls</button>
        <button type="button" @click="runQuick('experience ls')">experience ls</button>
        <button type="button" @click="runQuick('education')">education</button>
        <button type="button" @click="runQuick('publications')">publications</button>
        <button type="button" @click="runQuick('neofetch')">neofetch</button>
      </div>

      <CommandHistory v-if="showIdentity" :history="history" />
      <CommandPrompt
        v-if="showIdentity"
        ref="promptEl"
        v-model="command"
        :suggestions="suggestions"
        :hint="autocompleteHint"
        @submit="onSubmit"
        @up="prev"
        @down="next"
        @tab="autocomplete"
        @pick="applySuggestion"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { bootLines, photoUrl, profile } from '~/data/cv'
import { useTerminal } from '~/composables/useTerminal'
import { useTour } from '~/composables/useTour'

const { 
  history, 
  command, 
  submit, 
  runCommand,
  prev, 
  next, 
  autocomplete, 
  suggestions, 
  applySuggestion, 
  autocompleteHint,
  isTourActive 
} = useTerminal()

const screenEl = ref<HTMLElement | null>(null)
const promptEl = ref<{ focus: () => void } | null>(null)
const showWhoami = ref(false)
const showIdentity = ref(false)
const whoamiTyped = ref('')
const identityTyped = ref('')

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function scrollToBottom() {
  nextTick(() => {
    screenEl.value?.scrollTo({ top: screenEl.value.scrollHeight, behavior: 'smooth' })
  })
}

const { startTour } = useTour(isTourActive, command, (cmd) => {
  const result = runCommand(cmd)
  scrollToBottom()
  return result
}, scrollToBottom)

function toggleTour() {
  if (isTourActive.value) {
    isTourActive.value = false
  } else {
    startTour()
  }
}

async function typeText(target: Ref<string>, text: string, delay = 45) {
  target.value = ''
  for (const ch of text) {
    target.value += ch
    await sleep(delay)
  }
}

function onSubmit() {
  if (!submit()) return
  scrollToBottom()
  promptEl.value?.focus()
}

function runQuick(value: string) {
  isTourActive.value = false
  command.value = value
  onSubmit()
}

onMounted(async () => {
  await sleep(bootLines.length * 220 + 150)
  showWhoami.value = true
  await typeText(whoamiTyped, 'whoami', 70)
  await sleep(120)
  showIdentity.value = true
  await typeText(identityTyped, `${profile.name} — ${profile.title}`, 28)
  
  // Start the tour automatically
  startTour()
  
  nextTick(() => promptEl.value?.focus())
})
</script>

<style scoped>
.terminal {
  width: min(100%, 1080px);
  border: 1px solid rgba(125, 211, 252, 0.18);
  border-radius: 18px;
  background: radial-gradient(circle at top, rgba(125, 211, 252, 0.08), transparent 35%), linear-gradient(180deg, #0a1118, #03070c);
  box-shadow: 0 20px 80px rgba(0,0,0,.45);
  overflow: hidden;
}
.topbar {
  display: flex; gap: 12px; align-items: center;
  padding: 14px 18px; border-bottom: 1px solid rgba(125, 211, 252, 0.12);
  color: #94a3b8;
}
.status { margin-left: auto; color: #86efac; }
.tour-control {
  display: flex; align-items: center; gap: 10px; margin: 0 10px;
}
.tour-label { font-size: 0.75rem; font-weight: 600; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; }
.switch { position: relative; display: inline-block; width: 34px; height: 18px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(125, 211, 252, 0.1); transition: .4s; border-radius: 34px;
  border: 1px solid rgba(125, 211, 252, 0.2);
}
.slider:before {
  position: absolute; content: ""; height: 12px; width: 12px; left: 3px; bottom: 2px;
  background-color: #38bdf8; transition: .4s; border-radius: 50%;
}
input:checked + .slider { background-color: rgba(56, 189, 248, 0.3); }
input:checked + .slider:before { transform: translateX(16px); }
input:checked ~ .slider { animation: pulse-slider 2s infinite; }
@keyframes pulse-slider {
  0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
  70% { box-shadow: 0 0 0 4px rgba(56, 189, 248, 0); }
  100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
}
.title { color: #dbeafe; }
.dots i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:6px; background: #38bdf8; opacity:.7; }
.screen { padding: 22px; max-height: 80vh; overflow: auto; }
.whoami-line {
  display: inline-block;
  white-space: nowrap;
  color: #f8fafc;
  margin: 10px 0 8px;
}
.user { color: #7dd3fc; }
.at { color: #c084fc; }
.host { color: #86efac; }
.path { color: #fbbf24; }
.dollar { color: #f87171; margin-left: 2px; margin-right: 0; }
.cmd { color: #f8fafc; }
.identity { color: #f8fafc; font-size: 1.1rem; }
.tagline { color: #94a3b8; }
.hint { color: #94a3b8; }
.download a, .screen :deep(a) { color: #38bdf8; text-decoration: none; }
.download a:hover, .screen :deep(a):hover { text-decoration: underline; }
.sep { color: #64748b; margin: 0 6px; }
.quick-actions { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 6px; }
.quick-actions button {
  border: 1px solid rgba(125, 211, 252, 0.18);
  background: rgba(255,255,255,.03);
  color: #7dd3fc;
  border-radius: 999px;
  padding: 6px 10px;
  cursor: pointer;
}
.neo-card-wrap { margin: 14px 0 8px; }
.screen :deep(.neo-card) {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 14px;
  align-items: start;
  padding: 14px;
  border: 1px solid rgba(125, 211, 252, 0.12);
  border-radius: 16px;
  background: rgba(255,255,255,.03);
}
.screen :deep(.neo-photo) {
  width: 96px;
  height: 96px;
  border-radius: 14px;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 0 0 1px rgba(125,211,252,.08), 0 10px 30px rgba(0,0,0,.35);
}
.screen :deep(.neo-meta) { display: grid; gap: 8px; min-width: 0; }
.screen :deep(.neo-row) { display: flex; gap: 10px; flex-wrap: wrap; }
.screen :deep(.neo-label) { color: #38bdf8; min-width: 56px; text-transform: uppercase; font-size: .8rem; letter-spacing: .06em; }
.screen :deep(.neo-value) { color: #e2e8f0; }
.fade-enter-active, .fade-leave-active { transition: opacity .35s ease, transform .35s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(4px); }
.screen :deep(.section-block) { margin: 4px 0 10px; padding: 12px 14px; border-left: 2px solid rgba(56,189,248,.5); background: rgba(255,255,255,.02); border-radius: 12px; }
.screen :deep(.section-title) { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
.screen :deep(.section-subtitle) { color: #cbd5e1; font-size: .95rem; margin-bottom: 4px; }
.screen :deep(.section-meta) { color: #94a3b8; font-size: .85rem; margin-bottom: 8px; }
.screen :deep(.section-body) { color: #e2e8f0; line-height: 1.65; }
.screen :deep(.section-list) { margin: 10px 0 0 18px; color: #cbd5e1; }
.screen :deep(.section-list li) { margin: 4px 0; }
.screen :deep(.section-stack) { margin-top: 8px; color: #7dd3fc; }
@media (max-width: 640px) {
  .screen :deep(.neo-card) { grid-template-columns: 1fr; }
  .screen :deep(.neo-photo) { width: 88px; height: 88px; }
}
</style>
