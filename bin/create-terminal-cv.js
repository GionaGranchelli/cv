#!/usr/bin/env node

/**
 * create-terminal-cv — Scaffold a terminal portfolio from a YAML config or interactive prompts.
 * Usage:
 *   npx create-terminal-cv                           # interactive mode
 *   npx create-terminal-cv --config cv.yaml           # generate from YAML
 *   npx create-terminal-cv --config cv.yaml --dry-run # validate only, don't generate
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { execSync } from 'node:child_process'
import * as readline from 'node:readline'

// ---- Helpers ----

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()))
  })
}

async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  console.log('\n╔══════════════════════════════════════╗')
  console.log('║     create-terminal-cv v1.0.0        ║')
  console.log('║  Terminal portfolio in 3 minutes    ║')
  console.log('╚══════════════════════════════════════╝\n')

  console.log('Let\'s set up your terminal portfolio. Press Enter to accept defaults.\n')

  const name = await ask(rl, 'Your full name: ')
  const title = await ask(rl, 'Your professional title: ')
  const tagline = await ask(rl, 'Tagline (one-line summary): ')
  const email = await ask(rl, 'Email: ')
  const github = await ask(rl, 'GitHub username: ')
  const linkedin = await ask(rl, 'LinkedIn username: ')
  const siteUrl = await ask(rl, 'Site URL (e.g. https://yoursite.com): ')

  rl.close()

  // Build minimal YAML
  const yaml = `profile:
  name: ${name || 'Your Name'}
  title: ${title || 'Software Engineer'}
  tagline: ${tagline || 'Building things that matter'}
  siteUrl: ${siteUrl || 'https://localhost:3000'}
  siteName: ${name || 'Your Name'} | ${title || 'Software Engineer'}

socials:
  email: ${email || 'you@example.com'}
  github: ${github || 'your-handle'}
  linkedin: ${linkedin || 'your-handle'}

bootSequence:
  - "[ ok ] Mounting profile data"
  - "[ ok ] Terminal ready"

skills:
  - TypeScript
  - React
  - Node.js

experiences:
  - company: Your Company
    role: ${title || 'Software Engineer'}
    period: 2023 - Now
    summary: Working on interesting things.
    bullets:
      - Built features
      - Fixed bugs
    stack:
      - TypeScript
      - React
      - Node.js
    content: |
      <h3>Your Role</h3>
      <p>Describe what you did here. Full HTML is supported.</p>

projects:
  - name: My Project
    description: An interesting side project.
    url: https://example.com
    stack:
      - TypeScript
      - Next.js

tour:
  enabled: true
  steps:
    - command: about
      delay: 3500
    - command: skills
      delay: 3500
    - command: experience your-company
      delay: 5000
    - command: projects
      delay: 4000
    - command: contact
      delay: 4000
`

  const targetDir = process.cwd()
  const yamlPath = join(targetDir, 'cv.yaml')

  if (existsSync(yamlPath)) {
    console.error(`\n⚠️  cv.yaml already exists in ${targetDir}`)
    console.error('   Remove it first or use --config to point to a different file.')
    process.exit(1)
  }

  writeFileSync(yamlPath, yaml, 'utf-8')
  console.log(`\n✓ Created cv.yaml`)

  // Run the generator
  console.log('\nGenerating your terminal portfolio...\n')
  execSync(`npx tsx ${resolve(__dirname, '../cli/generate.ts')} --input ${yamlPath}`, {
    cwd: resolve(__dirname, '..'),
    stdio: 'inherit'
  })

  console.log('\n╔══════════════════════════════════════╗')
  console.log('║  Your portfolio is ready!            ║')
  console.log('╚══════════════════════════════════════╝')
  console.log('\nNext steps:')
  console.log('  1. Replace public/photo.jpg with your photo')
  console.log('  2. Edit cv.yaml to add more experiences, projects, and articles')
  console.log('  3. Run: npx create-terminal-cv --config cv.yaml   (to regenerate)')
  console.log('  4. Run: npm run dev                                (to preview)')
  console.log('  5. Run: npm run build                              (to build for production)')
  console.log('\nDeploy to Netlify, Vercel, or any static host.\n')
}

function configMode(yamlPath: string, dryRun: boolean) {
  const absPath = resolve(yamlPath)
  if (!existsSync(absPath)) {
    console.error(`Error: ${absPath} not found`)
    process.exit(1)
  }

  if (dryRun) {
    console.log(`Validating ${absPath}...`)
    execSync(`npx tsx ${resolve(__dirname, '../cli/validate.ts')} --input ${absPath}`, {
      cwd: resolve(__dirname, '..'),
      stdio: 'inherit'
    })
    return
  }

  console.log(`Generating from ${absPath}...\n`)
  execSync(`npx tsx ${resolve(__dirname, '../cli/generate.ts')} --input ${absPath}`, {
    cwd: resolve(__dirname, '..'),
    stdio: 'inherit'
  })

  console.log('\nDone! Run npm run dev to preview.\n')
}

// ---- Main ----

const args = process.argv.slice(2)
const configIdx = args.indexOf('--config')
const dryRun = args.includes('--dry-run')

if (configIdx !== -1 && args[configIdx + 1]) {
  configMode(args[configIdx + 1], dryRun)
} else {
  interactiveMode()
}
