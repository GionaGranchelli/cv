import { commandList, experienceListOutput, experienceOutput, experienceSummaryOutput, experiences, resolveOutput, sections } from '~/data/cv'
import type { Experience, TerminalCommand } from '~/types/cv'

export function useTerminal() {
  const history = ref<TerminalCommand[]>([])
  const command = ref('')
  const commandLog = ref<string[]>([])
  const historyIndex = ref(-1)
  const activeExperienceIndex = ref(0)
  const autocompleteHint = ref('')
  const isTourActive = ref(false)
  let nextId = 1

  const suggestions = computed(() => {
    const value = command.value.trim().toLowerCase()
    if (!value) return []
    return commandList.filter(cmd => cmd.startsWith(value)).slice(0, 5)
  })

  function setActiveExperience(index: number) {
    activeExperienceIndex.value = Math.min(Math.max(index, 0), experiences.length - 1)
  }

  function experienceDetail(exp: Experience) {
    return experienceOutput(exp)
  }

  function allAutocompleteOptions() {
    return [...commandList, ...experiences.map(e => `experience ${e.slug}`)]
  }

  function resolveCommand(value: string) {
    const key = value.trim().toLowerCase()
    if (key === 'clear') {
      history.value = []
      return ''
    }
    if (key === 'experience') return experienceSummaryOutput(experiences[activeExperienceIndex.value]?.slug)
    if (key === 'experience ls') return experienceListOutput()
    if (key === 'next') {
      setActiveExperience(activeExperienceIndex.value + 1)
      return experienceDetail(experiences[activeExperienceIndex.value])
    }
    if (key === 'prev') {
      setActiveExperience(activeExperienceIndex.value - 1)
      return experienceDetail(experiences[activeExperienceIndex.value])
    }
    if (key === 'back') return experienceSummaryOutput(experiences[activeExperienceIndex.value]?.slug)
    if (key.startsWith('experience ')) {
      const slug = key.replace('experience ', '').trim()
      const index = experiences.findIndex(e => e.slug === slug || e.company.toLowerCase().includes(slug))
      if (index >= 0) {
        setActiveExperience(index)
        return experienceDetail(experiences[index])
      }
      return `Unknown experience slug. Try: experience ls`
    }
    return resolveOutput(value)
  }

  function runCommand(value: string) {
    const trimmed = value.trim()
    if (!trimmed) return false
    if (trimmed === 'clear') {
      history.value = []
      command.value = ''
      autocompleteHint.value = ''
      return true
    }
    const output = resolveCommand(trimmed)
    history.value.push({ id: nextId++, command: trimmed, output })
    commandLog.value.push(trimmed)
    historyIndex.value = commandLog.value.length
    command.value = ''
    autocompleteHint.value = ''
    return true
  }

  function submit() {
    isTourActive.value = false
    return runCommand(command.value)
  }

  function prev() {
    isTourActive.value = false
    if (!commandLog.value.length) return
    historyIndex.value = Math.max(0, historyIndex.value - 1)
    command.value = commandLog.value[historyIndex.value] ?? ''
  }

  function next() {
    isTourActive.value = false
    if (!commandLog.value.length) return
    historyIndex.value = Math.min(commandLog.value.length, historyIndex.value + 1)
    command.value = commandLog.value[historyIndex.value] ?? ''
  }

  function autocomplete() {
    isTourActive.value = false
    const current = command.value.trim().toLowerCase()
    autocompleteHint.value = ''
    if (!current) return
    const options = allAutocompleteOptions().filter(opt => opt.startsWith(current))
    if (options.length === 1) {
      command.value = options[0]
      autocompleteHint.value = options[0]
      return
    }
    if (options.length > 1) {
      command.value = options[0]
      autocompleteHint.value = `${options[0]} (+${options.length - 1} more)`
      history.value.push({
        id: nextId++,
        command: 'tab',
        output: `Possible matches:<br>${options.slice(0, 8).map(o => `• ${o}`).join('<br>')}`
      })
      commandLog.value.push('tab')
      historyIndex.value = commandLog.value.length
    }
  }

  function applySuggestion(value: string) {
    isTourActive.value = false
    command.value = value
    autocompleteHint.value = value
  }

  return { 
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
  }
}

