<template>
  <section class="terminal">
    <header class="topbar">
      <span class="dots"><i></i><i></i><i></i></span>
      <span class="title">giona@terminal-cv:~</span>
      <span class="status">online</span>
    </header>

    <div ref="screenEl" class="screen">
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
        <a href="/Curriculum_Giona_Latex-2.pdf" download>download cv</a>
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

      <div v-if="showIdentity && neofetchVisible" class="neo-card-wrap">
        <div class="neo-card">
          <img class="neo-photo" :src="photoUrl" alt="Giona Granchelli photo" />
          <div class="neo-meta">
            <div class="neo-row"><span class="neo-label">name</span><span class="neo-value">Giona Granchelli</span></div>
            <div class="neo-row"><span class="neo-label">title</span><span class="neo-value">Senior Software Engineer / Chapter Lead</span></div>
            <div class="neo-row"><span class="neo-label">stack</span><span class="neo-value">Kotlin, Java, Vue, Azure, Kubernetes</span></div>
            <div class="neo-row"><span class="neo-label">focus</span><span class="neo-value">Banking, fintech, distributed systems</span></div>
            <div class="neo-row"><span class="neo-label">site</span><span class="neo-value">WhichDistro.com</span></div>
          </div>
        </div>
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

const { history, command, submit, prev, next, autocomplete, suggestions, applySuggestion, autocompleteHint } = useTerminal()
const screenEl = ref<HTMLElement | null>(null)
const promptEl = ref<{ focus: () => void } | null>(null)
const showWhoami = ref(false)
const showIdentity = ref(false)
const neofetchVisible = ref(false)
const whoamiTyped = ref('')
const identityTyped = ref('')

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
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
  nextTick(() => {
    screenEl.value?.scrollTo({ top: screenEl.value.scrollHeight, behavior: 'smooth' })
    promptEl.value?.focus()
  })
}

function runQuick(value: string) {
  command.value = value
  if (value === 'neofetch') neofetchVisible.value = true
  onSubmit()
}

watch(command, value => {
  if (value === 'neofetch') neofetchVisible.value = true
})

onMounted(async () => {
  await sleep(bootLines.length * 220 + 150)
  showWhoami.value = true
  await typeText(whoamiTyped, 'whoami', 70)
  await sleep(120)
  showIdentity.value = true
  await typeText(identityTyped, `${profile.name} — ${profile.title}`, 28)
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
.download a { color: #38bdf8; text-decoration: none; }
.download a:hover { text-decoration: underline; }
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
.fade-enter-active, .fade-leave-active { transition: opacity .35s ease, transform .35s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(4px); }
.section-block { margin: 4px 0 10px; padding: 12px 14px; border-left: 2px solid rgba(56,189,248,.5); background: rgba(255,255,255,.02); border-radius: 12px; }
.section-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
.section-subtitle { color: #cbd5e1; font-size: .95rem; margin-bottom: 4px; }
.section-meta { color: #94a3b8; font-size: .85rem; margin-bottom: 8px; }
.section-body { color: #e2e8f0; line-height: 1.65; }
.section-list { margin: 10px 0 0 18px; color: #cbd5e1; }
.section-list li { margin: 4px 0; }
.section-stack { margin-top: 8px; color: #7dd3fc; }
@media (max-width: 640px) {
  .neo-card { grid-template-columns: 1fr; }
  .neo-photo { width: 88px; height: 88px; }
}
</style>
