/**
 * Generates data/cv.ts and data/articles.ts from a cv.yaml file.
 * Usage: npx tsx cli/generate.ts --input cv.yaml [--output-dir ./generated]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ---- Helpers ----

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function esc(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
}

function escTemplate(str: string): string {
  return str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function indent(str: string, level: number): string {
  const pad = '  '.repeat(level)
  return str.split('\n').map(line => line ? pad + line : line).join('\n')
}

// ---- Generate data/cv.ts ----

function generateCvTs(data: any): string {
  const p = data.profile
  const s = data.socials || {}
  const exps = data.experiences || []
  const projs = data.projects || []
  const edu = data.education || []
  const pubs = data.publications || []
  const arts = data.articles || []
  const boot = data.bootSequence || ['[ ok ] Mounting profile data', '[ ok ] Terminal ready']
  const skills = data.skills || []
  const agenticSkills = data.agenticSkills || ''

  // Auto-slugify
  for (const exp of exps) { if (!exp.slug) exp.slug = slugify(exp.company) }
  for (const proj of projs) { if (!proj.slug) proj.slug = slugify(proj.name) }

  const lines: string[] = []

  lines.push(`import type { Experience, Profile, Project } from '~/types/cv'`)
  lines.push(`import { articles } from '~/data/articles'`)
  lines.push('')

  // Projects
  lines.push('export const projects: Project[] = [')
  for (let i = 0; i < projs.length; i++) {
    const pj = projs[i]
    const comma = i < projs.length - 1 ? ',' : ''
    lines.push('  {')
    lines.push(`    slug: '${esc(pj.slug)}',`)
    lines.push(`    name: '${esc(pj.name)}',`)
    lines.push(`    description: '${esc(pj.description)}',`)
    if (pj.url) lines.push(`    url: '${esc(pj.url)}',`)
    if (pj.repo) lines.push(`    repo: '${esc(pj.repo)}',`)
    if (pj.stack?.length) lines.push(`    stack: [${pj.stack.map((t: string) => `'${esc(t)}'`).join(', ')}],`)
    if (pj.content) lines.push(`    content: '${esc(pj.content)}'`)
    lines.push(`  }${comma}`)
  }
  lines.push(']')
  lines.push('')

  // Profile
  lines.push('export const profile: Profile = {')
  lines.push(`  name: '${esc(p.name)}',`)
  lines.push(`  title: '${esc(p.title)}',`)
  lines.push(`  tagline: '${esc(p.tagline)}'`)
  lines.push('}')
  lines.push('')

  // Photo
  lines.push(`export const photoUrl = '/${p.photo || 'photo.jpg'}'`)
  lines.push('')

  // Boot lines
  lines.push('export const bootLines = [')
  for (const b of boot) lines.push(`  '${esc(b)}',`)
  lines.push(']')
  lines.push('')

  // Directory view
  lines.push('export const directoryView = [')
  lines.push(`  { name: 'about', color: '${data.colors?.about || '#7dd3fc'}' },`)
  lines.push(`  { name: 'experience', color: '${data.colors?.experience || '#86efac'}' },`)
  lines.push(`  { name: 'skills', color: '${data.colors?.skills || '#fbbf24'}' },`)
  lines.push(`  { name: 'education', color: '${data.colors?.education || '#c084fc'}' },`)
  if (pubs.length > 0) lines.push(`  { name: 'publications', color: '${data.colors?.publications || '#fb7185'}' },`)
  lines.push(`  { name: 'projects', color: '${data.colors?.projects || '#38bdf8'}' },`)
  lines.push(`  { name: 'contact', color: '${data.colors?.contact || '#e2e8e8'}' }`)
  lines.push(']')
  lines.push('')

  // List entries
  lines.push('export const listEntries = [')
  lines.push(`  { name: 'about', kind: 'file', perms: '-rw-r--r--', size: '1.2k', color: '${data.colors?.about || '#7dd3fc'}' },`)
  lines.push(`  { name: 'experience', kind: 'dir', perms: 'drwxr-xr-x', size: '\u2014', color: '${data.colors?.experience || '#86efac'}' },`)
  lines.push(`  { name: 'skills', kind: 'file', perms: '-rw-r--r--', size: '0.8k', color: '${data.colors?.skills || '#fbbf24'}' },`)
  lines.push(`  { name: 'agentic', kind: 'file', perms: '-rw-r--r--', size: '1.5k', color: '${data.colors?.education || '#c084fc'}' },`)
  lines.push(`  { name: 'education', kind: 'file', perms: '-rw-r--r--', size: '1.0k', color: '${data.colors?.education || '#c084fc'}' },`)
  if (pubs.length > 0) lines.push(`  { name: 'publications', kind: 'file', perms: '-rw-r--r--', size: '0.6k', color: '${data.colors?.publications || '#fb7185'}' },`)
  if (arts.length > 0) lines.push(`  { name: 'articles', kind: 'file', perms: '-rw-r--r--', size: '0.9k', color: '${data.colors?.projects || '#38bdf8'}' },`)
  lines.push(`  { name: 'projects', kind: 'file', perms: '-rw-r--r--', size: '0.7k', color: '${data.colors?.projects || '#38bdf8'}' },`)
  lines.push(`  { name: 'contact', kind: 'file', perms: '-rw-r--r--', size: '0.5k', color: '${data.colors?.contact || '#e2e8e8'}' }`)
  lines.push(']')
  lines.push('')

  // Experiences
  lines.push('export const experiences: Experience[] = [')
  for (let i = 0; i < exps.length; i++) {
    const e = exps[i]
    const comma = i < exps.length - 1 ? ',' : ''
    lines.push('  {')
    lines.push(`    slug: '${esc(e.slug)}',`)
    lines.push(`    company: '${esc(e.company)}',`)
    lines.push(`    role: '${esc(e.role)}',`)
    lines.push(`    period: '${esc(e.period)}',`)
    if (e.location) lines.push(`    location: '${esc(e.location)}',`)
    lines.push(`    summary: '${esc(e.summary)}',`)
    if (e.bullets?.length) {
      lines.push('    bullets: [')
      for (const b of e.bullets) lines.push(`      '${esc(b)}',`)
      lines.push('    ],')
    }
    if (e.stack?.length) lines.push(`    stack: [${e.stack.map((t: string) => `'${esc(t)}'`).join(', ')}],`)
    if (e.achievements?.length) {
      lines.push('    achievements: [')
      for (const a of e.achievements) lines.push(`      '${esc(a)}',`)
      lines.push('    ],')
    }
    if (e.challenges?.length) {
      lines.push('    challenges: [')
      for (const c of e.challenges) lines.push(`      '${esc(c)}',`)
      lines.push('    ],')
    }
    if (e.impact) lines.push(`    impact: '${esc(e.impact)}',`)
    if (e.content) lines.push(`    content: \`${escTemplate(e.content)}\`,`)
    if (e.ogImage) lines.push(`    ogImage: '${esc(e.ogImage)}',`)
    lines.push(`  }${comma}`)
  }
  lines.push(']')
  lines.push('')

  // Publications
  if (pubs.length > 0) {
    lines.push('export const publications = [')
    for (const pub of pubs) {
      lines.push('  {')
      lines.push(`    id: ${pubs.indexOf(pub) + 1},`)
      lines.push(`    title: '${esc(pub.title)}',`)
      lines.push(`    venue: '${esc(pub.venue)}',`)
      if (pub.url) lines.push(`    url: '${esc(pub.url)}'`)
      lines.push('  },')
    }
    lines.push(']')
    lines.push('')
  }

  // Education
  if (edu.length > 0) {
    lines.push('export const education = [')
    for (const ed of edu) {
      lines.push('  {')
      lines.push(`    period: '${esc(ed.period)}',`)
      lines.push(`    degree: '${esc(ed.degree)}',`)
      lines.push(`    school: '${esc(ed.school)}',`)
      if (ed.location) lines.push(`    location: '${esc(ed.location)}',`)
      lines.push(`    note: '${esc(ed.note || '')}',`)
      lines.push(`    details: '${esc(ed.details || '')}',`)
      lines.push(`    thesis: '${esc(ed.thesis || '')}',`)
      lines.push(`    supervisors: '${esc(ed.supervisors || '')}'`)
      lines.push('  },')
    }
    lines.push(']')
    lines.push('')
  }

  // Command list
  const cmdList = ['help', 'about', 'skills', 'agentic', 'experience', 'experience ls']
  for (const e of exps) cmdList.push(`experience ${e.slug}`)
  cmdList.push('education')
  if (pubs.length > 0) cmdList.push('publications')
  if (arts.length > 0) {
    cmdList.push('articles')
    for (const a of arts) cmdList.push(`articles ${a.slug}`)
  }
  cmdList.push('study', 'projects')
  for (const pj of projs) cmdList.push(`projects ${pj.slug}`)
  cmdList.push('contact', 'clear', 'ls', 'cat cv', 'search', 'next', 'prev', 'back', 'neofetch')

  lines.push('export const commandList = [')
  for (const c of cmdList) lines.push(`  '${esc(c)}',`)
  lines.push(']')
  lines.push('')

  // Section outputs
  lines.push('function wrapSection(title: string, subtitle: string, body: string, accent = \'#7dd3fc\') {')
  lines.push('  return `')
  lines.push('<div class="section-block">')
  lines.push('  <div class="section-title" style="color:${accent}">${title}</div>')
  lines.push('  <div class="section-subtitle">${subtitle}</div>')
  lines.push('  <div class="section-body">${body}</div>')
  lines.push('</div>')
  lines.push('  `.trim()')
  lines.push('}')
  lines.push('')

  // Skills section
  const skillsStr = skills.length > 0 ? skills.join(', ') : 'Add your skills to cv.yaml'
  lines.push('export const sections: Record<string, string> = {')
  lines.push(`  help: \`Available commands:<br>${['help', 'about', 'skills', 'agentic', 'experience', 'education', 'projects', 'contact', 'clear', 'ls', 'cat cv', 'neofetch', 'search'].map(c => '• ' + c).join('<br>')}\`,`)
  lines.push(`  about: wrapSection('About', '${esc(p.title)}', '${esc(p.tagline)}'),`)
  lines.push(`  skills: wrapSection('Core Skills', 'Stack and expertise', '${esc(skillsStr)}', '#fbbf24'),`)

  if (agenticSkills) {
    lines.push(`  agentic: wrapSection('AI & Agentic Skills', 'Methodology and tooling', '${esc(agenticSkills)}', '#c084fc'),`)
  }

  lines.push(`  study: wrapSection('Study', 'Academic background', 'Educational background — see education and publications commands for details.', '#c084fc'),`)

  // Contact
  const contactParts: string[] = []
  if (s.email) contactParts.push(s.email)
  if (s.linkedin) contactParts.push(`LinkedIn: <a href="https://www.linkedin.com/in/${esc(s.linkedin)}" target="_blank">${esc(s.linkedin)}</a>`)
  if (s.github) contactParts.push(`GitHub: <a href="https://github.com/${esc(s.github)}" target="_blank">github.com/${esc(s.github)}</a>`)
  if (s.twitter) contactParts.push(`Twitter: <a href="https://twitter.com/${esc(s.twitter)}" target="_blank">@${esc(s.twitter)}</a>`)
  const contactStr = contactParts.length > 0 ? contactParts.join('<br>') : 'Add socials to cv.yaml'
  lines.push(`  contact: wrapSection('Contact', 'Get in touch', '${esc(contactStr)}', '#86efac'),`)
  lines.push(`  clear: '',`)
  lines.push(`  ls: \`${['about', 'experience', 'skills', 'agentic', 'education', ...(pubs.length ? ['publications'] : []), ...(arts.length ? ['articles'] : []), 'projects', 'contact', 'search'].join('  ')}\`,`)
  lines.push(`  'cat cv': '{{resume}}'`)
  lines.push('}')
  lines.push('')

  // Resume
  const stackPart = skills.length > 0 ? skills.join(', ') : 'Add skills to cv.yaml'
  lines.push('export const resume = `')
  lines.push(`<b>${esc(p.name)}</b> — ${esc(p.title)}<br><br>`)
  lines.push(`<b>Core Skills</b><br>${esc(stackPart)}<br><br>`)
  if (exps.length > 0) {
    lines.push('<b>Professional Experience</b><br>')
    for (const e of exps) {
      lines.push(`${esc(e.company)} — ${esc(e.role)} (${esc(e.period)})<br>`)
    }
  }
  lines.push('`')
  lines.push('')

  // Article rendering (unchanged logic)
  lines.push('export function renderArticles() {')
  lines.push('  const list = articles.map(a => `\u2022 <b>${a.slug}</b>: ${a.title}`).join(\'<br>\')')
  lines.push('  return wrapSection(\'Articles & Case Studies\', `${articles.length} deep dives available`, `Use <b>articles &lt;slug&gt;</b> to read a preview.<br><br>${list}`, \'#38bdf8\')')
  lines.push('}')
  lines.push('')

  lines.push('export function articleOutput(article: any) {')
  lines.push('  return `')
  lines.push('<div class="section-block">')
  lines.push('  <div class="section-title" style="color:#38bdf8">${article.title}</div>')
  lines.push('  <div class="section-meta">${article.date} \u00b7 ${article.readingTime}</div>')
  lines.push('  <div class="section-body">${article.description}</div>')
  lines.push('  <div style="margin-top:12px; font-size:0.85rem; opacity:0.8;">')
  lines.push('    <a href="/articles/${article.slug}" target="_blank">\u{1f517} Read full article (Web Optimized)</a>')
  lines.push('  </div>')
  lines.push('</div>')
  lines.push('  `.trim()')
  lines.push('}')
  lines.push('')

  // Projects rendering
  lines.push('export function renderProjects() {')
  lines.push('  const list = projects.map(p => `\u2022 <b>${p.slug}</b>: ${p.name}`).join(\'<br>\')')
  lines.push('  return wrapSection(\'Projects\', \'Applications and research\', `Use <b>projects &lt;slug&gt;</b> for details.<br><br>${list}`, \'#38bdf8\')')
  lines.push('}')
  lines.push('')

  lines.push('export function projectOutput(project: Project) {')
  lines.push('  const officialLink = project.url ? `<a href="${project.url}" target="_blank">\u{1f517} Official Site</a>` : \'\'')
  lines.push('  const repoLink = project.repo ? `<a href="${project.repo}" target="_blank">\u{1f517} GitHub Repository</a>` : \'\'')
  lines.push('  return `')
  lines.push('<div class="section-block">')
  lines.push('  <div class="section-title" style="color:#38bdf8">${project.name}</div>')
  lines.push('  <div class="section-body">${project.description}</div>')
  lines.push('  <div class="section-stack"><b>Stack:</b> ${project.stack.join(\', \')}</div>')
  lines.push('  <div style="margin-top:12px; font-size:0.85rem; display:flex; gap:16px;">')
  lines.push('    ${officialLink}')
  lines.push('    ${repoLink}')
  lines.push('    <a href="/projects/${project.slug}" target="_blank">\u{1f517} Deep Link / SEO Page</a>')
  lines.push('  </div>')
  lines.push('</div>')
  lines.push('  `.trim()')
  lines.push('}')
  lines.push('')

  // Experience rendering (unchanged)
  lines.push('export function experienceListOutput() {')
  lines.push('  return experiences.map((e, index) => `${index + 1}. ${e.slug} \u2014 ${e.company} (${e.role})`).join(\'<br>\')')
  lines.push('}')
  lines.push('')

  lines.push('export function experienceSummaryOutput(currentSlug?: string) {')
  lines.push('  const current = experiences.find(e => e.slug === currentSlug) ?? experiences[0]')
  lines.push('  const dir = directoryView.map(item => `<span style="color:${item.color}">${item.name}</span>`).join(\'  \')')
  lines.push('  return wrapSection(\'Experience summary\', `${experiences.length} roles, current focus: ${current.company}`, `Use <b>experience ls</b> to list entries, <b>experience &lt;slug&gt;</b> to open, or <b>next</b> / <b>prev</b> to browse.<br><br><b>Available slugs</b><br>${experiences.map(e => `\u2022 ${e.slug}`).join(\'<br>\')}<br><br><b>directory</b><br>${dir}`, \'#86efac\')')
  lines.push('}')
  lines.push('')

  lines.push('export function experienceOutput(exp: Experience) {')
  lines.push('  const stack = exp.stack?.length ? `<br><br><b>Stack</b><br>${exp.stack.join(\', \')}` : \'\'')
  lines.push('  const bullets = exp.bullets.map(b => `<li>${b}</li>`).join(\'\')')
  lines.push('  return `')
  lines.push('<div class="section-block">')
  lines.push('  <div class="section-title" style="color:#86efac">${exp.company}</div>')
  lines.push('  <div class="section-subtitle">${exp.role}</div>')
  lines.push('  <div class="section-meta">${exp.period} \u00b7 ${exp.location}</div>')
  lines.push('  <div class="section-body">${exp.summary}</div>')
  lines.push('  <ul class="section-list">${bullets}</ul>')
  lines.push('  <div class="section-stack">${stack}</div>')
  lines.push('  <div style="margin-top:12px; font-size:0.85rem; opacity:0.8;">')
  lines.push('    <a href="/experience/${exp.slug}" target="_blank">\u{1f517} View dedicated page for SEO/Deep-linking</a>')
  lines.push('  </div>')
  lines.push('</div>')
  lines.push('  `.trim()')
  lines.push('}')
  lines.push('')

  // Education rendering
  if (edu.length > 0) {
    lines.push('export function renderEducation() {')
    lines.push('  return education')
    lines.push('    .map(item => `')
    lines.push('<div class="section-block">')
    lines.push('  <div class="section-title" style="color:#c084fc">${item.degree}</div>')
    lines.push('  <div class="section-subtitle">${item.school}</div>')
    lines.push('  <div class="section-meta">${item.period} \u00b7 ${item.location}${item.note ? ` \u00b7 ${item.note}` : \'\'}</div>')
    lines.push('  <div class="section-body">${item.details}${item.thesis ? `<br><b>Thesis:</b> ${item.thesis}` : \'\'}${item.supervisors ? `<br><b>Supervisors:</b> ${item.supervisors}` : \'\'}</div>')
    lines.push('</div>`)')
    lines.push('    .join(\'<br>\')')
    lines.push('}')
    lines.push('')
  }

  // Publications rendering
  if (pubs.length > 0) {
    lines.push('export function renderPublications() {')
    lines.push('  return publications')
    lines.push('    .map(pub => `')
    lines.push('        <div class="section-block">')
    lines.push('          <div class="section-title" style="color:#fb7185">')
    lines.push('          <a href="${pub.url}">[${pub.id}] ${pub.title}</a>')
    lines.push('          </div>')
    lines.push('          <div class="section-body">${pub.venue}</div>')
    lines.push('        </div>`)')
    lines.push('    .join(\'<br>\')')
    lines.push('}')
    lines.push('')
  }

  // Neofetch
  lines.push('export function renderNeofetch() {')
  lines.push('  return `[component:Neofetch]`')
  lines.push('}')
  lines.push('')

  // Search
  lines.push('export function renderSearch(query: string) {')
  lines.push('  const q = query.toLowerCase()')
  lines.push('  const results: string[] = []')
  lines.push('  experiences.forEach(exp => {')
  lines.push('    if (exp.company.toLowerCase().includes(q) || exp.summary.toLowerCase().includes(q) || exp.stack.some(s => s.toLowerCase().includes(q))) {')
  lines.push('      results.push(`\u2022 <b>Experience</b>: ${exp.company} (${exp.role}) - <a href="/experience/${exp.slug}" target="_blank">View</a>`)')
  lines.push('    }')
  lines.push('  })')
  lines.push('  projects.forEach(p => {')
  lines.push('    if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.stack.some(s => s.toLowerCase().includes(q))) {')
  lines.push('      results.push(`\u2022 <b>Project</b>: ${p.name} - <a href="/projects/${p.slug}" target="_blank">View</a>`)')
  lines.push('    }')
  lines.push('  })')
  lines.push('  articles.forEach(a => {')
  lines.push('    if (a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))) {')
  lines.push('      results.push(`\u2022 <b>Article</b>: ${a.title} - <a href="/articles/${a.slug}" target="_blank">View</a>`)')
  lines.push('    }')
  lines.push('  })')
  lines.push('  if (results.length === 0) return `No matches found for "${query}".`')
  lines.push('  return wrapSection(\'Search Results\', `Found ${results.length} matches for "${query}"`, results.join(\'<br>\'), \'#86efac\')')
  lines.push('}')
  lines.push('')

  // resolveOutput
  lines.push('export function resolveOutput(command: string) {')
  lines.push('  const key = command.trim().toLowerCase()')
  lines.push('  if (key === \'cat cv\') return resume')
  lines.push('  if (key.startsWith(\'search \')) {')
  lines.push('    const query = key.replace(\'search \', \'\').trim()')
  lines.push('    return renderSearch(query)')
  lines.push('  }')
  lines.push('  if (key === \'search\') return \'Usage: <b>search &lt;query&gt;</b> (e.g., search kubernetes)\'')
  lines.push('  if (key === \'education\') return renderEducation()')
  if (pubs.length > 0) lines.push('  if (key === \'publications\') return renderPublications()')
  if (arts.length > 0) {
    lines.push('  if (key === \'articles\') return renderArticles()')
    lines.push('  if (key.startsWith(\'articles \')) {')
    lines.push('    const slug = key.replace(\'articles \', \'\').trim()')
    lines.push('    const article = articles.find(a => a.slug === slug)')
    lines.push('    return article ? articleOutput(article) : `Unknown article slug. Try: articles`')
    lines.push('  }')
  }
  lines.push('  if (key === \'projects\') return renderProjects()')
  lines.push('  if (key.startsWith(\'projects \')) {')
  lines.push('    const slug = key.replace(\'projects \', \'\').trim()')
  lines.push('    const project = projects.find(p => p.slug === slug)')
  lines.push('    return project ? projectOutput(project) : `Unknown project slug. Try: projects`')
  lines.push('  }')
  lines.push('  if (key === \'neofetch\') return renderNeofetch()')
  lines.push('  if (key === \'ls\') return renderLs()')
  lines.push('  if (key === \'experience ls\') return experienceListOutput()')
  lines.push('  return sections[key] ?? `Unknown command. Try: help`')
  lines.push('}')
  lines.push('')

  // renderLs
  lines.push('export function renderLs() {')
  lines.push('  return listEntries')
  lines.push('    .map(item => `<span style="color:${item.color}">${item.perms} 1 user staff ${item.size} ${item.name}</span>`)')
  lines.push('    .join(\'<br>\')')
  lines.push('}')

  return lines.join('\n')
}

// ---- Generate data/articles.ts ----

function generateArticlesTs(data: any): string {
  const arts = data.articles || []
  const lines: string[] = []

  lines.push('export type Article = {')
  lines.push('  slug: string')
  lines.push('  title: string')
  lines.push('  description: string')
  lines.push('  date: string')
  lines.push('  readingTime: string')
  lines.push('  tags: string[]')
  lines.push('  content: string')
  lines.push('  ogImage?: string')
  lines.push('}')
  lines.push('')
  lines.push('export const articles: Article[] = [')

  for (let i = 0; i < arts.length; i++) {
    const a = arts[i]
    const comma = i < arts.length - 1 ? ',' : ''
    lines.push('  {')
    lines.push(`    slug: '${esc(a.slug)}',`)
    lines.push(`    title: '${esc(a.title)}',`)
    lines.push(`    description: '${esc(a.description)}',`)
    lines.push(`    date: '${esc(a.date)}',`)
    lines.push(`    readingTime: '${esc(a.readingTime || '5 min read')}',`)
    if (a.tags?.length) lines.push(`    tags: [${a.tags.map((t: string) => `'${esc(t)}'`).join(', ')}],`)
    if (a.ogImage) lines.push(`    ogImage: '${esc(a.ogImage)}',`)
    lines.push(`    content: \`${escTemplate(a.content || '')}\``)
    lines.push(`  }${comma}`)
  }

  lines.push(']')
  lines.push('')

  return lines.join('\n')
}

// ---- Main ----

function main() {
  const args = process.argv.slice(2)
  const inputIdx = args.indexOf('--input')
  const outputIdx = args.indexOf('--output-dir')

  if (inputIdx === -1 || !args[inputIdx + 1]) {
    console.error('Usage: npx tsx cli/generate.ts --input cv.yaml [--output-dir ./data]')
    process.exit(1)
  }

  const yamlPath = resolve(args[inputIdx + 1])
  const outDir = outputIdx !== -1 ? resolve(args[outputIdx + 1]) : resolve(__dirname, '../data')

  // Read YAML
  const raw = readFileSync(yamlPath, 'utf-8')
  const data = yaml.load(raw) as any

  if (!data || typeof data !== 'object') {
    console.error('Error: cv.yaml must contain a YAML object')
    process.exit(1)
  }

  // Ensure slugs
  if (data.experiences) {
    for (const e of data.experiences) {
      if (!e.slug) e.slug = slugify(e.company)
    }
  }
  if (data.projects) {
    for (const p of data.projects) {
      if (!p.slug) p.slug = slugify(p.name)
    }
  }

  // Generate files
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  const cvTs = generateCvTs(data)
  writeFileSync(join(outDir, 'cv.ts'), cvTs, 'utf-8')
  console.log(`✓ Generated ${join(outDir, 'cv.ts')}`)

  const articlesTs = generateArticlesTs(data)
  writeFileSync(join(outDir, 'articles.ts'), articlesTs, 'utf-8')
  console.log(`✓ Generated ${join(outDir, 'articles.ts')}`)

  console.log('\nNext steps:')
  console.log('  npm run dev     # Start development server')
  console.log('  npm run build   # Build for production')
}

main()
