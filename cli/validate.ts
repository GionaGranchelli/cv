/**
 * Validates a cv.yaml file against the JSON Schema.
 * Usage: npx tsx cli/validate.ts --input cv.yaml
 *        npx tsx cli/validate.ts --input cv.yaml --strict  (fail on warnings too)
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function validateCv(yamlPath: string, strict = false): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Read and parse YAML
  let data: any
  try {
    const raw = readFileSync(resolve(yamlPath), 'utf-8')
    data = yaml.load(raw)
  } catch (e: any) {
    return { valid: false, errors: [`Failed to parse YAML: ${e.message}`], warnings: [] }
  }

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['cv.yaml must contain a YAML object'], warnings: [] }
  }

  // Validate against JSON Schema
  const schemaPath = resolve(__dirname, '../schema/cv.schema.json')
  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'))

  const ajv = new Ajv({ allErrors: true, strict: false })
  addFormats(ajv)
  const validate = ajv.compile(schema)
  const valid = validate(data)

  if (!valid && validate.errors) {
    for (const err of validate.errors) {
      const path = err.instancePath || '(root)'
      errors.push(`${path}: ${err.message}`)
    }
  }

  // Auto-generate slugs if missing
  if (data.experiences) {
    for (let i = 0; i < data.experiences.length; i++) {
      const exp = data.experiences[i]
      if (!exp.slug) {
        exp.slug = slugify(exp.company)
        warnings.push(`experiences[${i}]: auto-generated slug "${exp.slug}" from company name`)
      }
    }
  }

  if (data.projects) {
    for (let i = 0; i < data.projects.length; i++) {
      const proj = data.projects[i]
      if (!proj.slug) {
        proj.slug = slugify(proj.name)
        warnings.push(`projects[${i}]: auto-generated slug "${proj.slug}" from project name`)
      }
    }
  }

  // Validate tour commands exist
  if (data.tour?.steps) {
    const validCommands = new Set([
      'help', 'about', 'skills', 'agentic', 'experience', 'experience ls',
      'education', 'publications', 'articles', 'projects', 'study',
      'contact', 'clear', 'ls', 'cat cv', 'neofetch', 'search', 'next', 'prev', 'back'
    ])

    // Add experience and project slugs
    if (data.experiences) {
      for (const exp of data.experiences) {
        validCommands.add(`experience ${exp.slug}`)
      }
    }
    if (data.projects) {
      for (const proj of data.projects) {
        validCommands.add(`projects ${proj.slug}`)
      }
    }
    if (data.articles) {
      for (const art of data.articles) {
        validCommands.add(`articles ${art.slug}`)
      }
    }

    for (let i = 0; i < data.tour.steps.length; i++) {
      const step = data.tour.steps[i]
      if (!validCommands.has(step.command)) {
        errors.push(`tour.steps[${i}]: unknown command "${step.command}"`)
      }
    }
  }

  // Check for common mistakes
  if (data.profile && !data.socials) {
    warnings.push('No socials section — add email, linkedin, github for the contact command')
  }

  if (data.socials && !data.socials.email) {
    warnings.push('No email in socials — the contact command will not show an email')
  }

  if (data.articles) {
    for (const art of data.articles) {
      if (art.file && art.content) {
        warnings.push(`articles.${art.slug}: both "file" and "content" provided — "content" will be used`)
      }
      if (!art.file && !art.content) {
        errors.push(`articles.${art.slug}: must provide either "file" or "content"`)
      }
    }
  }

  const finalValid = errors.length === 0 && (!strict || warnings.length === 0)

  return {
    valid: finalValid,
    errors,
    warnings
  }
}

// CLI
const args = process.argv.slice(2)
const inputIdx = args.indexOf('--input')
const strict = args.includes('--strict')

if (inputIdx === -1 || !args[inputIdx + 1]) {
  console.error('Usage: npx tsx cli/validate.ts --input cv.yaml [--strict]')
  process.exit(1)
}

const yamlPath = args[inputIdx + 1]
const result = validateCv(yamlPath, strict)

if (result.errors.length > 0) {
  console.error('\n❌ ERRORS:')
  for (const e of result.errors) console.error(`   • ${e}`)
}

if (result.warnings.length > 0) {
  console.warn('\n⚠️  WARNINGS:')
  for (const w of result.warnings) console.warn(`   • ${w}`)
}

if (result.valid) {
  console.log('\n✅ Valid!')
  process.exit(0)
} else {
  console.error('\n❌ Validation failed.')
  process.exit(1)
}
