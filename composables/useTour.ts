import type { Ref } from 'vue'

export interface TourStep {
  command: string
  delay: number
}

export const tourSteps: TourStep[] = [
  { command: 'about', delay: 3500 },
  { command: 'skills', delay: 3500 },
  { command: 'experience abn-amro-bcdb', delay: 5000 },
  { command: 'experience abn-amro-payday', delay: 5000 },
  { command: 'experience blox-btc-direct', delay: 5000 },
  { command: 'agentic', delay: 5000 },
  { command: 'projects', delay: 4000 },
  { command: 'education', delay: 4000 },
  { command: 'publications', delay: 4000 },
  { command: 'contact', delay: 4000 }
]

export function useTour(
  isTourActive: Ref<boolean>,
  command: Ref<string>,
  runCommand: (cmd: string) => boolean,
  onStepExecuted?: () => void
) {
  async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function typeText(target: Ref<string>, text: string, delay = 60) {
    target.value = ''
    for (const ch of text) {
      if (!isTourActive.value) return false
      target.value += ch
      await sleep(delay)
    }
    return true
  }

  async function startTour() {
    isTourActive.value = true
    
    // Initial wait after boot
    await sleep(1500)
    
    for (const step of tourSteps) {
      if (!isTourActive.value) break

      const success = await typeText(command, step.command)
      if (!success || !isTourActive.value) break

      await sleep(400)
      if (!isTourActive.value) break
      
      runCommand(step.command)
      if (onStepExecuted) onStepExecuted()
      
      await sleep(step.delay)
    }

    if (isTourActive.value) {
      isTourActive.value = false
      command.value = ''
      runCommand('help')
      if (onStepExecuted) onStepExecuted()
    }
  }

  return { startTour }
}
