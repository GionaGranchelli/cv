# Graph Report - /home/gionag/Development/terminal-cv  (2026-05-24)

## Corpus Check
- Corpus is ~20,197 words - fits in a single context window. You may not need a graph.

## Summary
- 324 nodes · 379 edges · 47 communities (42 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_type  required|type / required]]
- [[_COMMUNITY_cv.ts  useTerminal.ts|cv.ts / useTerminal.ts]]
- [[_COMMUNITY_package.json  dependencies|package.json / dependencies]]
- [[_COMMUNITY_properties  cv.schema.json|properties / cv.schema.json]]
- [[_COMMUNITY_properties  siteUrl|properties / siteUrl]]
- [[_COMMUNITY_TerminalWindow.vue  trackFirstInteraction()|TerminalWindow.vue / trackFirstInteraction()]]
- [[_COMMUNITY_properties  skills|properties / skills]]
- [[_COMMUNITY_properties  email|properties / email]]
- [[_COMMUNITY_properties  company|properties / company]]
- [[_COMMUNITY_generate.ts  generateCvTs()|generate.ts / generateCvTs()]]
- [[_COMMUNITY_validate.ts  slugify()|validate.ts / slugify()]]
- [[_COMMUNITY_create-terminal-cv.js  ask()|create-terminal-cv.js / ask()]]
- [[_COMMUNITY_repo  description|repo / description]]
- [[_COMMUNITY_slug  description|slug / description]]
- [[_COMMUNITY_url  description|url / description]]
- [[_COMMUNITY_content  description|content / description]]
- [[_COMMUNITY_date  format|date / format]]
- [[_COMMUNITY_file  description|file / description]]
- [[_COMMUNITY_location  default|location / default]]
- [[_COMMUNITY_note  description|note / description]]
- [[_COMMUNITY_period  description|period / description]]
- [[_COMMUNITY_ogImage  description|ogImage / description]]
- [[_COMMUNITY_summary  description|summary / description]]
- [[_COMMUNITY_readingTime  default|readingTime / default]]
- [[_COMMUNITY_venue  description|venue / description]]
- [[_COMMUNITY_degree  type|degree / type]]
- [[_COMMUNITY_description  type|description / type]]
- [[_COMMUNITY_role  type|role / type]]
- [[_COMMUNITY_thesis  type|thesis / type]]
- [[_COMMUNITY_extends  tsconfig.json|extends / tsconfig.json]]

## God Nodes (most connected - your core abstractions)
1. `resolveOutput()` - 12 edges
2. `scripts` - 7 edges
3. `trackFirstInteraction()` - 6 edges
4. `skills` - 6 edges
5. `required` - 6 edges
6. `siteUrl` - 5 edges
7. `bootSequence` - 5 edges
8. `projects` - 5 edges
9. `education` - 5 edges
10. `publications` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (47 total, 5 thin omitted)

### Community 0 - "type / required"
Cohesion: 0.06
Nodes (38): items, type, items, type, description, items, type, items (+30 more)

### Community 1 - "cv.ts / useTerminal.ts"
Cohesion: 0.11
Nodes (31): Article, articles, articleOutput(), bootLines, commandList, directoryView, education, experienceListOutput() (+23 more)

### Community 2 - "package.json / dependencies"
Cohesion: 0.06
Nodes (34): bin, create-terminal-cv, dependencies, ajv, ajv-formats, js-yaml, nuxt, @nuxt/image (+26 more)

### Community 3 - "properties / cv.schema.json"
Cohesion: 0.08
Nodes (25): description, type, default, description, items, type, description, default (+17 more)

### Community 4 - "properties / siteUrl"
Cohesion: 0.08
Nodes (25): description, type, default, description, type, properties, required, type (+17 more)

### Community 5 - "TerminalWindow.vue / trackFirstInteraction()"
Cohesion: 0.13
Nodes (19): firstInteractionTracked, handleGlobalClick(), handleGlobalKeyDown(), { 
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
}, identityTyped, onSubmit(), runQuick(), scrollToBottom() (+11 more)

### Community 6 - "properties / skills"
Cohesion: 0.11
Nodes (18): default, type, description, properties, type, default, type, default (+10 more)

### Community 7 - "properties / email"
Cohesion: 0.13
Nodes (15): format, type, description, type, description, type, email, github (+7 more)

### Community 8 - "properties / company"
Cohesion: 0.15
Nodes (13): type, type, type, properties, command, company, delay, details (+5 more)

### Community 9 - "generate.ts / generateCvTs()"
Cohesion: 0.38
Nodes (8): __dirname, esc(), escTemplate(), __filename, generateArticlesTs(), generateCvTs(), main(), slugify()

### Community 10 - "validate.ts / slugify()"
Cohesion: 0.22
Nodes (9): args, __dirname, __filename, inputIdx, result, slugify(), strict, validateCv() (+1 more)

### Community 11 - "create-terminal-cv.js / ask()"
Cohesion: 0.33
Nodes (5): args, ask(), configIdx, dryRun, interactiveMode()

### Community 12 - "repo / description"
Cohesion: 0.50
Nodes (4): repo, description, format, type

### Community 13 - "slug / description"
Cohesion: 0.50
Nodes (4): slug, description, pattern, type

### Community 14 - "url / description"
Cohesion: 0.50
Nodes (4): url, description, format, type

### Community 15 - "content / description"
Cohesion: 0.67
Nodes (3): description, type, content

### Community 16 - "date / format"
Cohesion: 0.67
Nodes (3): format, type, date

### Community 17 - "file / description"
Cohesion: 0.67
Nodes (3): description, type, file

### Community 18 - "location / default"
Cohesion: 0.67
Nodes (3): default, type, location

### Community 19 - "note / description"
Cohesion: 0.67
Nodes (3): description, type, note

### Community 20 - "period / description"
Cohesion: 0.67
Nodes (3): description, type, period

### Community 21 - "ogImage / description"
Cohesion: 0.67
Nodes (3): description, type, ogImage

### Community 22 - "summary / description"
Cohesion: 0.67
Nodes (3): summary, description, type

### Community 23 - "readingTime / default"
Cohesion: 0.67
Nodes (3): readingTime, default, type

### Community 24 - "venue / description"
Cohesion: 0.67
Nodes (3): venue, description, type

## Knowledge Gaps
- **167 isolated node(s):** `extends`, `name`, `version`, `private`, `type` (+162 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `properties` connect `properties / company` to `type / required`, `properties / siteUrl`, `repo / description`, `slug / description`, `url / description`, `content / description`, `date / format`, `file / description`, `location / default`, `note / description`, `period / description`, `ogImage / description`, `summary / description`, `readingTime / default`, `venue / description`, `degree / type`, `description / type`, `role / type`, `thesis / type`?**
  _High betweenness centrality (0.215) - this node is a cross-community bridge._
- **Why does `properties` connect `properties / cv.schema.json` to `type / required`, `properties / siteUrl`, `properties / skills`, `properties / email`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **What connects `extends`, `name`, `version` to the rest of the system?**
  _167 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `type / required` be split into smaller, more focused modules?**
  _Cohesion score 0.059743954480796585 - nodes in this community are weakly interconnected._
- **Should `cv.ts / useTerminal.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10793650793650794 - nodes in this community are weakly interconnected._
- **Should `package.json / dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `properties / cv.schema.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._