export type CommandName =
  | 'help'
  | 'about'
  | 'skills'
  | 'experience'
  | 'study'
  | 'projects'
  | 'contact'
  | 'clear'
  | 'ls'
  | 'cat cv'
  | 'next'
  | 'prev'
  | 'back'
  | `experience ${string}`

export type TerminalCommand = {
  id: number
  command: string
  output: string
}

export type Profile = {
  name: string
  title: string
  tagline: string
}

export type Experience = {
  stack: string[];
  slug: string
  company: string
  role: string
  period: string
  location: string
  summary: string
  bullets: string[]
  
}
