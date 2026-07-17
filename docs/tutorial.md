# Deploy a Terminal Portfolio in 3 Minutes with terminal-cv

A step-by-step guide to building an interactive terminal-style developer portfolio with SSR, SEO, boot animation, and neofetch — from a single YAML file.

---

## What You're Building

By the end of this tutorial, you'll have a live website that looks like a terminal emulator. Visitors can type commands (`about`, `skills`, `experience`, `neofetch`) to explore your CV. Behind the scenes, every section has a full SEO-optimized page with OpenGraph tags, Schema.org markup, and a sitemap — so Google actually finds you.

Here's what the finished product looks like:

> `help` → lists all commands  
> `neofetch` → shows a system-info-style profile card  
> `experience ls` → lists your roles  
> `articles` → surfaces your blog posts with deep links  
> `cat cv` → prints a condensed resume  

All of this comes from one YAML file. You never touch a Vue component unless you want to.

---

## Prerequisites

- Node.js 18+
- A GitHub account
- 3 minutes

That's it. You don't need to know Nuxt, Vue, or TypeScript.

---

## Quick Start: Interactive Mode

Open a terminal and run:

```bash
npx create-terminal-cv
```

You'll see:

```
╔══════════════════════════════════════╗
║     create-terminal-cv v1.0.0        ║
║  Terminal portfolio in 3 minutes    ║
╚══════════════════════════════════════╝

Let's set up your terminal portfolio. Press Enter to accept defaults.

Your full name: Jane Developer
Your professional title: Full Stack Engineer
Tagline (one-line summary): Building things that matter
Email: jane@example.com
GitHub username: janedev
LinkedIn username: janedev
Site URL: https://janedev.com
```

It generates a `cv.yaml` with your answers, then produces `data/cv.ts` and `data/articles.ts` — the two files that power your entire portfolio. Then:

```bash
npm run dev        # Preview at http://localhost:3000
```

You'll see the boot sequence, then a blinking cursor. Type `help` and press Enter. You have a working terminal portfolio.

---

## How It Works: The YAML Is the Source of Truth

Everything is driven by `cv.yaml`. The CLI reads it, validates it against a JSON Schema, and generates TypeScript that slots into the Nuxt engine. You never edit generated files — you edit the YAML and regenerate.

Here's a minimal `cv.yaml`:

```yaml
profile:
  name: Jane Developer
  title: Full Stack Engineer
  tagline: Building things that matter
  siteUrl: https://janedev.com

socials:
  email: jane@example.com
  github: janedev
  linkedin: janedev

skills:
  - TypeScript
  - React
  - Node.js
  - PostgreSQL
  - Docker

experiences:
  - company: Acme Corp
    role: Senior Engineer
    period: Jan 2023 - Now
    location: San Francisco
    summary: Leading the platform team.
    bullets:
      - Built microservices serving 1M+ users
      - Migrated monolith to Kubernetes
    stack:
      - Go
      - Kubernetes
      - AWS

projects:
  - name: My Tool
    description: An open-source CLI tool
    url: https://mytool.dev
    repo: https://github.com/janedev/mytool
    stack:
      - Rust
      - TypeScript

tour:
  enabled: true
  steps:
    - command: about
      delay: 3500
    - command: experience acme-corp
      delay: 5000
    - command: projects
      delay: 4000
    - command: contact
      delay: 4000
```

Run `npx create-terminal-cv --config cv.yaml` and your portfolio is updated. That's the loop: edit YAML, regenerate, preview.

---

## Adding Experiences (The Detail Pages)

Each experience automatically gets a deep-linked SEO page at `/experience/<slug>`. Here's a full experience entry:

```yaml
experiences:
  - company: Acme Corp
    role: Senior Platform Engineer
    period: Jan 2023 - Now
    location: San Francisco, CA
    summary: Led the platform team in modernizing cloud infrastructure.
    bullets:
      - Designed microservices architecture serving 1M+ daily users
      - Migrated legacy monolith to Kubernetes on AWS EKS
      - Built CI/CD pipelines reducing deploy time by 70%
    stack:
      - Go
      - Kubernetes
      - AWS
      - Terraform
      - PostgreSQL
    achievements:
      - Reduced infra costs by 40% through spot instance optimization
      - Achieved 99.99% uptime for critical payment services
    challenges:
      - Navigating a complex multi-cloud migration with zero-downtime requirement
    impact: Transformed a single-point-of-failure monolith into a resilient distributed system.
    content: |
      <h3>Building the Platform Team</h3>
      <p>I was the first platform engineer at Acme Corp. The existing infrastructure was a decade-old monolith deployed manually to EC2 instances — every deploy was a white-knuckle event.</p>
      <p>Over 18 months, we migrated to EKS, standardized on Terraform, and built paved-road deployment patterns that any team could use. The key insight was...</p>
```

The `slug` is auto-generated from the company name (e.g., `acme-corp`). You can override it with `slug: my-custom-slug`.

The `content` field becomes the full HTML of the deep-linked page. Write as much as you want — Google will index it.

Visitors in the terminal type `experience acme-corp` to see a summary, or visit `/experience/acme-corp` in a browser for the full page.

---

## Adding Projects

Same pattern as experiences. Each project gets a terminal command (`projects <slug>`) and a deep-linked page.

```yaml
projects:
  - name: QueryDash
    description: A lightweight SQL query runner with charting.
    url: https://querydash.dev
    repo: https://github.com/janedev/querydash
    stack:
      - Rust
      - Svelte
      - SQLite
    content: |
      <h2>Why QueryDash?</h2>
      <p>I was tired of opening DBeaver for quick SQL checks. QueryDash starts in under 100ms, connects to any Postgres or SQLite database, and renders charts with a single click.</p>
      <h2>Architecture</h2>
      <p>The backend is a Rust binary using sqlx for async database connections. The frontend is Svelte compiled to static assets. Everything runs locally — no cloud, no telemetry.</p>
```

---

## Writing Articles

The `articles` section creates blog posts with full SEO. Each article gets:
- A dedicated page at `/articles/<slug>`
- OpenGraph and Twitter Card metadata
- A tag system for related content
- Deep links from the terminal (`articles <slug>`)

```yaml
articles:
  - slug: why-i-built-terminal-cv
    title: Why I Built a Terminal Portfolio (And You Should Too)
    description: The story behind terminal-cv and why terminal UIs are making a comeback in developer tooling.
    date: "2026-05-01"
    readingTime: 6 min read
    tags:
      - Terminal
      - Portfolio
      - Web Development
    content: |
      <h2>The Resume Problem</h2>
      <p>Every developer has the same portfolio: a scrollable page with a photo, an "About Me" section, and a list of jobs. It's fine. It works. But nobody ever says "you have to check out this person's resume page."</p>

      <h2>Why a Terminal?</h2>
      <p>Terminals are the developer's natural habitat. When you land on a terminal-style portfolio, your brain immediately switches into exploration mode. You don't scroll — you type. You discover content at your own pace. The interface itself signals "this was built by someone who understands developers."</p>

      <p>More practically: a terminal interface forces you to structure information as a command system. Each section becomes a discrete, addressable unit. This naturally creates deep-linked pages with excellent SEO — every `experience <slug>` command maps to a full HTML page that Google can index independently.</p>

      <h2>The Technical Choices</h2>
      <p>I chose Nuxt 3 for SSR because a terminal portfolio that's invisible to Google defeats the purpose. Every command output is pre-rendered at build time. The terminal interface is a Vue component that parses commands client-side, but all the data and SEO pages are server-rendered HTML.</p>

      <p>This hybrid approach — terminal as UI, SSR as delivery — is what makes terminal-cv different from other terminal portfolios that are just JavaScript apps with no SEO.</p>
```

You can also reference external markdown files instead of inline content:

```yaml
articles:
  - slug: my-post
    title: My Post
    file: articles/my-post.md
```

The generator reads the markdown file at build time and embeds it. This is great if you write articles in Obsidian or a separate editor.

---

## Customizing the Boot Sequence

The boot animation is the first thing visitors see. Make it yours:

```yaml
bootSequence:
  - "[ ok ] Initializing kernel modules"
  - "[ ok ] Mounting filesystems"
  - "[ ok ] Loading experience database"
  - "[ ok ] Starting SSH daemon"
  - "[ ok ] Terminal ready — type 'help' to begin"
```

Each line types out with a slight delay, building anticipation.

---

## Customizing the Tour

The guided tour auto-plays commands when a visitor first arrives. It's a subtle way to showcase your best content without them needing to know the commands.

```yaml
tour:
  enabled: true
  steps:
    - command: about
      delay: 3500        # Wait 3.5 seconds after this command
    - command: neofetch
      delay: 5000
    - command: experience acme-corp
      delay: 5000        # Longer delay for detailed content
    - command: skills
      delay: 3500
    - command: projects
      delay: 4000
    - command: articles
      delay: 4000
    - command: contact
      delay: 4000
```

The `delay` is how long the output stays visible before the next command auto-types. Visitors can interrupt the tour at any time by pressing a key.

---

## Colors

Override the terminal color scheme to match your brand:

```yaml
colors:
  about: "#7dd3fc"         # Light blue
  experience: "#86efac"    # Light green
  skills: "#fbbf24"        # Amber
  education: "#c084fc"     # Purple
  publications: "#fb7185"  # Rose
  projects: "#38bdf8"      # Sky blue
  contact: "#e2e8e8"       # Light gray
```

These apply to directory listings, section headers, and the `ls` command output.

---

## Deploying

### Netlify (5 clicks)

1. Push your repo to GitHub
2. Go to [netlify.com](https://netlify.com), click "Import from Git"
3. Select your repo
4. Build command: `npm run generate` — Command: (leave blank)
5. Publish directory: `dist`

Netlify auto-detects Nuxt. Your site is live in 30 seconds.

### Vercel (3 clicks)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com), import repo
3. Done — Vercel auto-configures Nuxt projects

### Any static host

```bash
npm run generate   # Produces dist/
# Upload dist/ to S3, GitHub Pages, Cloudflare Pages, or your VPS
```

The `nuxt generate` command pre-renders every page as static HTML. No server required. Host it anywhere.

---

## Architecture (For the Curious)

```
┌─────────────────────────────────────────┐
│                 cv.yaml                  │  ← You edit this
└─────────────────┬───────────────────────┘
                  │
     ┌────────────▼────────────┐
     │   cli/generate.ts       │  ← Reads YAML, validates against
     │   cli/validate.ts       │     JSON Schema, generates TypeScript
     └────────────┬────────────┘
                  │
     ┌────────────▼────────────┐
     │   data/cv.ts            │  ← All profile data, experiences,
     │   data/articles.ts      │     projects, commands, renderers
     └────────────┬────────────┘
                  │
     ┌────────────▼────────────┐
     │   Nuxt 3 (SSR)          │  ← Pre-renders every page as HTML
     │   + Vue components      │     for SEO, hydrates terminal UI
     └────────────┬────────────┘
                  │
     ┌────────────▼────────────┐
     │   Static HTML + JS      │  ← Deployed to Netlify/Vercel/anywhere
     └─────────────────────────┘
```

Key design decisions:
- **Data lives in YAML**, not code. This is the single most important architectural choice. It means non-developers can edit their portfolio, and developers can version-control their career.
- **SSR-first.** Every command output, every deep-linked page, every article is pre-rendered at build time. Google sees full HTML — not a blank page with a JavaScript app.
- **Terminal UI is the icing, not the cake.** The terminal is a Vue component that parses commands client-side, but all the SEO value comes from the server-rendered pages.
- **Zero-config deployment.** No environment variables, no databases, no API keys. Pre-render to HTML and serve from a CDN.

---

## Tips for a Great Portfolio

**Write the content as if you're explaining your work to a smart colleague over coffee.** The terminal format rewards substance. A bullet list of technologies is forgettable. A paragraph about why you chose Kafka over RabbitMQ for a specific use case is memorable.

**Lead with your best experience.** The tour and directory listing show experiences in order. Put the role you're most proud of first.

**Use the `achievements` and `challenges` fields.** Most CVs list responsibilities. The achievements field lets you list outcomes ("reduced deploy time by 70%"). The challenges field shows you've solved hard problems.

**Write at least one article.** The articles section is what separates a CV from a knowledge base. One good article about a technical decision you made is worth more SEO juice than ten experience entries.

**Keep the boot sequence short.** Five lines is the sweet spot. More than eight and visitors start checking if the page is broken.

**Don't over-customize colors.** The default palette is designed for readability on dark backgrounds. If you change colors, test with a color contrast checker.

---

## What Makes This Different

There are dozens of terminal portfolios on GitHub. Most of them are single-page JavaScript apps with no SEO — Google sees a blank screen. terminal-cv is different because:

1. **It generates full HTML pages for every section.** Google indexes your experiences, projects, and articles as standalone pages.
2. **It's a template engine, not a one-off site.** Fork the repo, edit a YAML file, deploy. You never touch Vue components.
3. **It has a guided tour.** Visitors don't need to guess commands — the tour walks them through your best content.
4. **It includes a neofetch-style system card.** A fun, memorable touch that makes people smile and share.

---

## Next Steps

```bash
npx create-terminal-cv          # Start interactive mode
# ... answer the prompts ...
npm run dev                     # Preview at localhost:3000
```

Then edit `cv.yaml` to add your real experiences, projects, and articles. Regenerate with `npx create-terminal-cv --config cv.yaml`. When you're happy, deploy to Netlify or Vercel.

Your terminal portfolio is now live. Go type `neofetch` and enjoy.
