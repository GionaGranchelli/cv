import type { Experience, Profile, Project } from '~/types/cv'
import { articles } from '~/data/articles'

export const projects: Project[] = [
  {
    slug: 'openclaw-qmd',
    name: 'OpenClaw & QMD',
    description: 'Research into agentic workflows and personal AI infrastructure. Built as a KMP/Ktor backend for autonomous execution and local knowledge retrieval.',
    stack: ['Kotlin', 'KMP', 'Ktor', 'Agentic AI', 'RAG'],
    content: 'OpenClaw is an experimental framework for multi-model AI orchestration, while QMD (Query Markdown) provides surgical retrieval over thousands of documents.'
  },
  {
    slug: 'vu-voetbal',
    name: 'VU-Voetbal',
    description: 'Match planning & team balancing platform for football groups.',
    url: 'https://vuvoetbal.gionag.com',
    stack: ['Nuxt 3', 'Prisma', 'PostgreSQL', 'Web Push'],
    content: 'A high-performance platform for organizing football matches and balancing teams based on player skills and availability.'
  },
  {
    slug: 'yous',
    name: 'Yous',
    description: 'Bilingual (EN/IT) storytelling platform for personal growth and transformation.',
    url: 'https://youscommunity.com',
    stack: ['Nuxt', 'Node.js', 'Storytelling'],
    content: 'A community platform focusing on story submission and collaborative growth through narratives.'
  },
  {
    slug: 'whichdistro',
    name: 'WhichDistro',
    description: 'Popular Linux distribution selection tool.',
    url: 'https://whichdistro.com',
    stack: ['Vue', 'Nuxt', 'Linux'],
    content: 'Helping users find the right Linux distribution since 2011.'
  }
]

export const profile: Profile = {
  name: 'Giona Granchelli',
  title: 'Senior Software Engineer / Chapter Lead',
  tagline:
    'Engineering lead focused on distributed systems, platform modernization, and agentic AI workflows.'
}

export const photoUrl = '/photo.jpg'

export const bootLines = [
  '[ ok ] Mounting profile data',
  '[ ok ] Loading experience blocks',
  '[ ok ] Initializing QMD retrieval',
  '[ ok ] Agentic environment ready',
  '[ ok ] Terminal ready'
]

export const directoryView = [
  { name: 'about', color: '#7dd3fc' },
  { name: 'experience', color: '#86efac' },
  { name: 'skills', color: '#fbbf24' },
  { name: 'education', color: '#c084fc' },
  { name: 'publications', color: '#fb7185' },
  { name: 'projects', color: '#38bdf8' },
  { name: 'contact', color: '#e2e8e8' }
]

export const listEntries = [
  { name: 'about', kind: 'file', perms: '-rw-r--r--', size: '1.2k', color: '#7dd3fc' },
  { name: 'experience', kind: 'dir', perms: 'drwxr-xr-x', size: '—', color: '#86efac' },
  { name: 'skills', kind: 'file', perms: '-rw-r--r--', size: '0.8k', color: '#fbbf24' },
  { name: 'agentic', kind: 'file', perms: '-rw-r--r--', size: '1.5k', color: '#c084fc' },
  { name: 'education', kind: 'file', perms: '-rw-r--r--', size: '1.0k', color: '#c084fc' },
  { name: 'publications', kind: 'file', perms: '-rw-r--r--', size: '0.6k', color: '#fb7185' },
  { name: 'articles', kind: 'file', perms: '-rw-r--r--', size: '0.9k', color: '#38bdf8' },
  { name: 'projects', kind: 'file', perms: '-rw-r--r--', size: '0.7k', color: '#38bdf8' },
  { name: 'contact', kind: 'file', perms: '-rw-r--r--', size: '0.5k', color: '#e2e8e8' }
]

export const experiences: Experience[] = [
  {
    slug: 'abn-amro-bcdb',
    company: 'ABN AMRO - BCDB',
    role: 'Chapter Lead Java & VueJS | Software Engineer IV',
    period: 'Oct 2024 - Now',
    location: 'Amsterdam, Netherlands',
    summary:
      'Leading technical modernization across a banking department responsible for legacy services and critical data flows, with a focus on cloud migration, engineering enablement, and reliability improvement.',
    bullets: [
      'Led modernization initiatives for legacy services, defining migration paths toward cloud-native architectures on Azure AKS.',
      'Designed Kubernetes-based platform patterns, CI/CD pipelines, and developer tooling to standardize containerization and deployment across teams.',
      'Built and improved reconciliation jobs validating financial data consistency across multiple banking systems in a regulated environment.',
      'Designed ETL pipelines and transformation flows for large-scale financial and master data processing used by downstream services and reporting.',
      'Improved reliability, observability, and operational robustness of batch and integration flows handling critical banking workloads.',
      'Acted as a technical multiplier for multiple teams by introducing reusable engineering patterns, paved-road style tooling, and migration guidance.',
      'Combined hands-on coding with technical leadership, supporting teams in modern engineering practices and reducing delivery friction during transformation.'
    ],
    stack: ['Kubernetes', 'Azure', 'AKS', 'Azure DevOps', 'Java', 'TypeScript', 'Kafka'],
    achievements: [
      'Successfully defined and initiated the migration strategy for 10+ legacy banking services to Azure AKS.',
      'Reduced developer onboarding time by 40% through standardized Kubernetes-based platform patterns and paved-road tooling.',
      'Improved financial data reconciliation accuracy by 99.9% through redesigned batch processing validation jobs.'
    ],
    challenges: [
      'Navigating complex regulatory requirements while pushing for cloud-native modernization in a legacy-heavy environment.',
      'Ensuring zero-downtime and strict data consistency during the migration of critical financial integration flows.'
    ],
    impact: 'Strengthened the department\'s engineering foundation by bridging the gap between legacy reliability and modern cloud agility, empowering teams to deliver faster and with higher confidence.',
    content: `
      <h3>Modernizing Banking at Scale</h3>
      <p>In this role, I lead the technical transformation of a department handling critical banking data flows. The challenge is not just technical; it's about shifting the engineering culture from "managing legacy" to "building the future."</p>
      <p>My focus is on creating <b>paved roads</b> for developers—standardized patterns and tools that make the right way also the easiest way. This includes defining how we use Kubernetes (AKS), how we build our CI/CD pipelines, and how we ensure observability across a hybrid landscape.</p>
      <p>A key part of my work involves <b>Agentic Workflow Research</b>, where I explore how autonomous agents can assist in codebase investigations, bug root-cause analysis, and migration tasks, significantly multiplying the department's output.</p>
    `
  },
  {
    slug: 'abn-amro-payday',
    company: 'ABN AMRO - Strategy and Innovation',
    role: 'Full-stack | Software Engineer IV',
    period: 'Sep 2020 - Sep 2024',
    location: 'Amsterdam, Netherlands',
    summary:
      'Core engineer for PayDay, a fintech platform enabling instant payouts for gig-economy workers and freelancers.',
    bullets: [
      'Designed and implemented Kotlin/Spring Boot backend services for payment and payout workflows in a regulated financial environment.',
      'Built and maintained frontend and mobile capabilities supporting operational finance flows and end-user interactions.',
      'Contributed to architecture decisions around transaction handling, system integration, and scalable service boundaries.',
      'Delivered distributed services supporting financial transactions, workflow reliability, and user-facing product capabilities.',
      'Worked across backend, frontend, and mobile layers, combining product delivery with technical problem-solving in a high-trust domain.'
    ],
    stack: ['Kotlin', 'Spring Boot', 'VueJS', 'Android', 'Docker', 'Kubernetes', 'AWS S3', 'PostgreSQL', 'GitLab CI'],
    achievements: [
      'Built a core payout engine handling thousands of daily transactions for gig workers with millisecond latency.',
      'Scaled the platform from a pilot project to a production system serving major recruitment and gig-economy partners.',
      'Implemented robust idempotent payment processing ensuring zero duplicate payouts.'
    ],
    impact: 'Enabled instant financial freedom for thousands of workers by building a reliable, secure, and user-centric payout platform from the ground up within a major bank.',
    content: `
      <h3>Building PayDay: From Vision to Reality</h3>
      <p>PayDay was an "intrapreneurial" venture within ABN AMRO. As one of the core engineers, I was responsible for architecting the technical backbone of a platform that needed to combine the speed of a fintech with the security of a bank.</p>
      <p>The system was built using a <b>hexagonal architecture</b> to isolate the core payment logic from external banking systems and payout providers. This allowed us to remain agile and adapt to changing requirements without compromising reliability.</p>
      <p>Working in a regulated environment taught me the importance of <b>auditability and traceability</b> in financial systems. Every transaction, every state change, and every external interaction was meticulously logged and verified.</p>
    `
  },
  {
    slug: 'ximedes-ns',
    company: 'Ximedes',
    role: 'Software Engineer',
    period: 'May 2020 - Jul 2020',
    location: 'Haarlem, Netherlands',
    summary:
      'Worked on a project for the Dutch public transportation sector (NS), contributing to an end-to-end solution enabling travel with QR codes instead of conventional tickets.',
    bullets: [
      'Built backend and integration components for ticketing workflows.',
      'Contributed to real-time communication features using WebSockets.'
    ],
    stack: ['Kotlin', 'Ktor', 'REST', 'WebSocket', 'ReactJS', 'TypeScript', 'Redis'],
    content: `
      <h3>Digital Ticketing with NS</h3>
      <p>This was a high-intensity project for the Dutch national railways (NS). I worked on the core services that allowed passengers to travel using dynamically generated QR codes.</p>
      <p>The project required extreme precision in handling ticketing state and real-time updates via WebSockets to ensure a smooth gate-passing experience for millions of travelers.</p>
    `
  },
  {
    slug: 'blox-btc-direct',
    company: 'BLOX - BTC Direct',
    role: 'Full Stack Developer',
    period: 'Oct 2019 - Apr 2020',
    location: 'Amsterdam / Nijmegen, Netherlands',
    summary:
      'Worked on BLOX, a cryptocurrency trading platform serving approximately 500k daily users.',
    bullets: [
      'Maintained and extended microservices supporting trading, account management, and analytics.',
      'Contributed to distributed event-driven architecture using Axon Framework and CQRS patterns.',
      'Improved stability and performance across multiple backend services.'
    ],
    stack: ['Java 8', 'Kotlin', 'Spring Boot', 'REST', 'gRPC', 'Axon Framework', 'Node.js', 'ReactJS', 'Cordova', 'MariaDB', 'Docker', 'Kubernetes', 'GitLab CI'],
    content: `
      <h3>Scaling Crypto Trading</h3>
      <p>At BLOX, I was part of a team managing a platform with massive traffic spikes. The architecture relied heavily on <b>CQRS and Event Sourcing</b> via the Axon Framework, which provided the scalability and auditability required for a trading system.</p>
      <p>I focused on improving the performance of the trading microservices and ensuring that the high-frequency account management operations remained consistent under load.</p>
    `
  },
  {
    slug: 'woodwing-elvis',
    company: 'WoodWing B.V.',
    role: 'Senior Software Developer',
    period: 'Jan 2019 - Sep 2019',
    location: 'Zaandam, Netherlands',
    summary:
      'Worked on Elvis, a scalable distributed Digital Asset Management system for creating, managing, and distributing digital assets.',
    bullets: [
      'Developed and maintained backend and frontend features.',
      'Participated in code reviews and peer programming.',
      'Implemented an SSO solution integrating third-party and internal applications, including AWS Cognito and Okta.'
    ],
    stack: ['Java 8', 'Spring Framework', 'Elasticsearch', 'AWS', 'Jenkins', 'Docker', 'REST', 'AngularJS', 'Node.js', 'Okta'],
    content: `
      <h3>Enterprise Asset Management</h3>
      <p>In this role, I worked on a large-scale Digital Asset Management (DAM) system used by major media organizations. A highlight of my work was designing and implementing a comprehensive <b>Single Sign-On (SSO)</b> solution.</p>
      <p>This involved integrating various identity providers like AWS Cognito and Okta, providing a seamless and secure authentication experience across the WoodWing product suite.</p>
    `
  },
  {
    slug: 'trifork-ibe-blox',
    company: 'Trifork B.V.',
    role: 'Full Stack Developer',
    period: 'Jul 2017 - Jan 2019',
    location: 'Amsterdam, Netherlands',
    summary:
      'Worked on multiple projects in small agile consultancy teams, including IBE and BLOX.',
    bullets: [
      'First project, IBE, a cloud-based teacher-student platform for creating, managing, and taking school exams.',
      'Developed new features and maintained legacy functionality.',
      'Built the frontend application from scratch.',
      'Migrated and rebuilt CI/CD pipelines from Jenkins to GitLab.',
      'Second project, BLOX, a cryptocurrency exchange app.',
      'Developed an end-to-end service for managing supported coins on the platform.',
      'Built functionality for trade trend analysis and usage statistics.'
    ],
    stack: ['J2EE', 'Kotlin', 'Spring Boot', 'REST', 'gRPC', 'Axon Framework', 'Node.js', 'ReactJS', 'Webpack', 'Babel', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI']
  },
  {
    slug: 'research-scholarship',
    company: 'University of L\'Aquila',
    role: 'Research Scholarship',
    period: 'Oct 2015 - Mar 2017',
    location: 'L\'Aquila, Italy',
    summary:
      'Worked on enterprise systems and distributed architectures in collaboration with industry partners including Thales, Leonardo, Regione Abruzzo, and USRA.',
    bullets: [
      'Service-oriented architectures.',
      'Distributed systems.',
      'Web applications.'
    ],
    stack: ['J2EE', 'Spring Framework', 'Spring Boot', 'SOAP', 'REST', 'Hibernate', 'jQuery', 'DDS', 'WebDDS']
  }
]

export const publications = [
  {
    id: 1,
    title: 'MicroART: A Software Architecture Recovery Tool for Maintaining Microservice-based Systems',
    venue: 'Proceedings of the 14th International Conference on Software Architecture (ICSA), IEEE, 2017',
    url: 'https://www.ivanomalavolta.com/files/papers/ICSA_2017_tool.pdf'
  },
  {
    id: 2,
    title: 'Towards Recovering the Software Architecture of Microservice-based Systems',
    venue: 'IEEE International Workshop on Architecting with MicroServices (AMS), April 2017',
    url: 'https://www.ivanomalavolta.com/files/papers/AMS_2017.pdf'
  }
]

export const education = [
  {
    period: 'Sep 2015 - Mar 2017',
    degree: 'Master Degree in Computer Science',
    school: 'University of L\'Aquila',
    location: 'L\'Aquila (AQ)',
    note: 'cum laude',
    details: 'Software Architecture, Embedded System, Model Driven Engineering, Research Methodologies, Formal Methods and Mobile Applications.',
    thesis: 'Architecture Recovery of Microservice-based Systems.',
    supervisors: 'dr. Amleto di Salle, dr. Ivano Malavolta and dr. Paolo di Francesco'
  },
  {
    period: 'Dec 2013 - Jun 2014',
    degree: 'First level postgraduate Master degree in Web Technologies',
    school: 'University of L\'Aquila',
    location: 'L\'Aquila (AQ)',
    note: '',
    details: 'LAMP, J2EE, UML for the web, ORM, XML, web services, SOA, web mining, SEO.',
    thesis: '',
    supervisors: ''
  },
  {
    period: 'Sep 2009 - Jul 2013',
    degree: 'Bachelor degree in Computer Science',
    school: 'University of L\'Aquila',
    location: 'L\'Aquila (AQ)',
    note: '99/110',
    details: 'Software engineering (UML), programming (Java, C), databases (SQL), web technologies (HTML, Javascript, PHP), algorithms, compilers and math.',
    thesis: 'Automation control and reachable degree of automation through usage of commercial drones.',
    supervisors: 'dr. Davide Di Ruscio di Salle, dr. Ivano Malavolta and dr. Patrizio Pellicione'
  }
]

export const commandList = [
  'help',
  'about',
  'skills',
  'agentic',
  'experience',
  'experience ls',
  'experience abn-amro-bcdb',
  'experience abn-amro-payday',
  'experience ximedes-ns',
  'experience blox-btc-direct',
  'experience woodwing-elvis',
  'experience trifork-ibe-blox',
  'experience research-scholarship',
  'education',
  'publications',
  'articles',
  'articles agentic-workflows-modern-engineering',
  'articles modernizing-banking-legacy-to-cloud',
  'study',
  'projects',
  'projects openclaw-qmd',
  'projects vu-voetbal',
  'projects yous',
  'projects whichdistro',
  'contact',
  'clear',
  'ls',
  'cat cv',
  'search',
  'next',
  'prev',
  'back',
  'neofetch'
]

function wrapSection(title: string, subtitle: string, body: string, accent = '#7dd3fc') {
  return `
<div class="section-block">
  <div class="section-title" style="color:${accent}">${title}</div>
  <div class="section-subtitle">${subtitle}</div>
  <div class="section-body">${body}</div>
</div>
  `.trim()
}

export const sections: Record<string, string> = {
  help: `Available commands:<br>• help<br>• about<br>• skills<br>• agentic (AI focus)<br>• experience<br>• experience ls<br>• experience &lt;slug&gt;<br>• articles<br>• search &lt;query&gt;<br>• next<br>• prev<br>• back<br>• education<br>• publications<br>• study<br>• projects<br>• contact<br>• clear<br>• ls<br>• cat cv<br>• neofetch`,
  about: wrapSection(
    'About',
    'Senior software engineer and chapter lead',
    `Chapter Lead & senior software engineer with 10+ years of experience designing and modernising distributed systems. Currently pioneering <b>agentic coding workflows</b> and personal AI infrastructure to multiply engineering output.`,
    '#7dd3fc'
  ),
  skills: wrapSection(
    'Core Skills',
    'Stack and leadership breadth',
    `Kotlin, Java, Spring Boot, REST APIs, microservices, Kafka, Kubernetes, Docker, Azure, AWS, Vue.js, Nuxt 3, TypeScript, Prisma, Zod, JWT, CI/CD, <b>Agentic Workflows</b>, <b>Context Engineering</b>, <b>Local RAG (QMD)</b>`,
    '#fbbf24'
  ),
  agentic: wrapSection(
    'Agentic Coding & AI Infrastructure',
    'Methodology and personal tooling',
    `<b>Context Engineering</b>: Designing surgical codebase retrieval patterns to maintain high-precision LLM context.<br>
    <b>Tool-Augmented LLMs</b>: Building CLI-first execution bridges (bash/shell) to enable autonomous agentic actions.<br>
    <b>Local RAG (QMD)</b>: Developed a Query Markdown system for fast, local knowledge retrieval over 1,000+ personal and project documents.<br>
    <b>Research (OpenClaw)</b>: Architecting a Kotlin Multiplatform (KMP) control surface for multi-model AI orchestration and stateful agent sessions.`,
    '#c084fc'
  ),
  study: wrapSection(
    'Study',
    'Academic background',
    `Master’s in Computer Science.<br>Strong foundation in distributed systems, software architecture, and engineering practice.`,
    '#c084fc'
  ),
  contact: wrapSection(
    'Contact',
    'Recruiter-friendly contact block',
    `giona.granchelli@gmail.com<br>LinkedIn: giona-granchelli<br>GitHub: GionaGranchelli`,
    '#86efac'
  ),
  clear: '',
  ls: `about  experience  skills  agentic  education  publications  articles  projects  contact  search`,
  'cat cv': `{{resume}}`
}

export const resume = `
<b>Professional Experience</b><br>
ABN AMRO - BCDB, Chapter Lead Java & VueJS | Software Engineer IV<br>
Leading technical modernization across a banking department responsible for legacy services and critical data flows, with a focus on cloud migration, engineering enablement, and reliability improvement.<br><br>
<b>AI & Agentic Systems</b><br>
Actively developing <b>agentic coding workflows</b> and personal AI infrastructure (OpenClaw, QMD). Focus on context engineering, tool-use orchestration, and building autonomous engineering assistants using Kotlin Multiplatform and local RAG systems.<br><br>
<b>Core Skills</b><br>
Finance & core modernization, backend engineering, cloud & platform, <b>Agentic AI Orchestration</b>, architecture & leadership<br><br>
<b>Projects & Contributions</b><br>
<b>VU-Voetbal</b>: Match planning & team balancing platform for football groups (<a href="https://vuvoetbal.gionag.com" target="_blank">vuvoetbal.gionag.com</a>).<br>
<b>Yous</b>: Bilingual storytelling platform for personal growth and transformation (<a href="https://youscommunity.com" target="_blank">youscommunity.com</a>).<br>
<b>WhichDistro.com</b>: Creator of the popular Linux distribution selection tool (<a href="https://whichdistro.com" target="_blank">whichdistro.com</a>).
`

export function renderArticles() {
  const list = articles.map(a => `• <b>${a.slug}</b>: ${a.title}`).join('<br>')
  return wrapSection(
    'Articles & Case Studies',
    `${articles.length} deep dives available`,
    `Use <b>articles &lt;slug&gt;</b> to read a preview and get a deep link.<br><br>${list}`,
    '#38bdf8'
  )
}

export function articleOutput(article: any) {
  return `
<div class="section-block">
  <div class="section-title" style="color:#38bdf8">${article.title}</div>
  <div class="section-meta">${article.date} · ${article.readingTime}</div>
  <div class="section-body">${article.description}</div>
  <div style="margin-top:12px; font-size:0.85rem; opacity:0.8;">
    <a href="/articles/${article.slug}" target="_blank">🔗 Read full article (Web Optimized)</a>
  </div>
</div>
  `.trim()
}

export function renderProjects() {
  const list = projects.map(p => `• <b>${p.slug}</b>: ${p.name}`).join('<br>')
  return wrapSection(
    'Projects',
    'Full-stack applications and AI research',
    `Use <b>projects &lt;slug&gt;</b> for more details.<br><br>${list}`,
    '#38bdf8'
  )
}

export function projectOutput(project: Project) {
  const links = project.url ? `<a href="${project.url}" target="_blank">🔗 Official Site</a>` : ''
  return `
<div class="section-block">
  <div class="section-title" style="color:#38bdf8">${project.name}</div>
  <div class="section-body">${project.description}</div>
  <div class="section-stack"><b>Stack:</b> ${project.stack.join(', ')}</div>
  <div style="margin-top:12px; font-size:0.85rem; display:flex; gap:16px;">
    ${links}
    <a href="/projects/${project.slug}" target="_blank">🔗 Deep Link / SEO Page</a>
  </div>
</div>
  `.trim()
}

export function experienceListOutput() {
  return experiences
    .map((e, index) => `${index + 1}. ${e.slug} — ${e.company} (${e.role})`)
    .join('<br>')
}

export function experienceSummaryOutput(currentSlug?: string) {
  const current = experiences.find(e => e.slug === currentSlug) ?? experiences[0]
  const dir = directoryView.map(item => `<span style="color:${item.color}">${item.name}</span>`).join('  ')
  return wrapSection(
    'Experience summary',
    `${experiences.length} roles, current focus: ${current.company}`,
    `Use <b>experience ls</b> to list entries, <b>experience &lt;slug&gt;</b> to open one, or <b>next</b> / <b>prev</b> to browse.<br><br><b>Available slugs</b><br>${experiences.map(e => `• ${e.slug}`).join('<br>')}<br><br><b>directory</b><br>${dir}`,
    '#86efac'
  )
}

export function experienceOutput(exp: Experience) {
  const stack = exp.stack?.length ? `<br><br><b>Stack</b><br>${exp.stack.join(', ')}` : ''
  const bullets = exp.bullets.map(b => `<li>${b}</li>`).join('')
  return `
<div class="section-block">
  <div class="section-title" style="color:#86efac">${exp.company}</div>
  <div class="section-subtitle">${exp.role}</div>
  <div class="section-meta">${exp.period} · ${exp.location}</div>
  <div class="section-body">${exp.summary}</div>
  <ul class="section-list">${bullets}</ul>
  <div class="section-stack">${stack}</div>
  <div style="margin-top:12px; font-size:0.85rem; opacity:0.8;">
    <a href="/experience/${exp.slug}" target="_blank">🔗 View dedicated page for SEO/Deep-linking</a>
  </div>
</div>
  `.trim()
}

export function renderEducation() {
  return education
    .map(item => `
<div class="section-block">
  <div class="section-title" style="color:#c084fc">${item.degree}</div>
  <div class="section-subtitle">${item.school}</div>
  <div class="section-meta">${item.period} · ${item.location}${item.note ? ` · ${item.note}` : ''}</div>
  <div class="section-body">${item.details}${item.thesis ? `<br><b>Thesis:</b> ${item.thesis}` : ''}${item.supervisors ? `<br><b>Supervisors:</b> ${item.supervisors}` : ''}</div>
</div>`)
    .join('<br>')
}

export function renderPublications() {
  return publications
    .map(pub => `
        <div class="section-block">
          <div class="section-title" style="color:#fb7185">
          <a href="${pub.url}">[${pub.id}] ${pub.title}</a>
          </div>
          <div class="section-body">${pub.venue}</div>
        </div>`)
    .join('<br>')
}

export function renderNeofetch() {
  return `[component:Neofetch]`
}

export function renderSearch(query: string) {
  const q = query.toLowerCase()
  const results: string[] = []

  // Search experiences
  experiences.forEach(exp => {
    if (exp.company.toLowerCase().includes(q) || exp.summary.toLowerCase().includes(q) || exp.stack.some(s => s.toLowerCase().includes(q))) {
      results.push(`• <b>Experience</b>: ${exp.company} (${exp.role}) - <a href="/experience/${exp.slug}" target="_blank">View</a>`)
    }
  })

  // Search projects
  projects.forEach(p => {
    if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.stack.some(s => s.toLowerCase().includes(q))) {
      results.push(`• <b>Project</b>: ${p.name} - <a href="/projects/${p.slug}" target="_blank">View</a>`)
    }
  })

  // Search articles
  articles.forEach(a => {
    if (a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))) {
      results.push(`• <b>Article</b>: ${a.title} - <a href="/articles/${a.slug}" target="_blank">View</a>`)
    }
  })

  if (results.length === 0) return `No matches found for "${query}".`
  
  return wrapSection(
    'Search Results',
    `Found ${results.length} matches for "${query}"`,
    results.join('<br>'),
    '#86efac'
  )
}

export function resolveOutput(command: string) {
  const key = command.trim().toLowerCase()
  if (key === 'cat cv') return resume
  if (key.startsWith('search ')) {
    const query = key.replace('search ', '').trim()
    return renderSearch(query)
  }
  if (key === 'search') return 'Usage: <b>search &lt;query&gt;</b> (e.g., search kubernetes)'
  if (key === 'education') return renderEducation()
  if (key === 'publications') return renderPublications()
  if (key === 'articles') return renderArticles()
  if (key.startsWith('articles ')) {
    const slug = key.replace('articles ', '').trim()
    const article = articles.find(a => a.slug === slug)
    return article ? articleOutput(article) : `Unknown article slug. Try: articles`
  }
  if (key === 'projects') return renderProjects()
  if (key.startsWith('projects ')) {
    const slug = key.replace('projects ', '').trim()
    const project = projects.find(p => p.slug === slug)
    return project ? projectOutput(project) : `Unknown project slug. Try: projects`
  }
  if (key === 'neofetch') return renderNeofetch()
  if (key === 'ls') return renderLs()
  if (key === 'experience ls') return experienceListOutput()
  return sections[key] ?? `Unknown command. Try: help`
}

export function renderLs() {
  return listEntries
    .map(item => `<span style="color:${item.color}">${item.perms} 1 giona staff ${item.size} ${item.name}</span>`)
    .join('<br>')
}
