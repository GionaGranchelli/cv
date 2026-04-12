# Terminal CV

A terminal-style interactive CV and portfolio showcase built with Nuxt 3, Vue, and TypeScript. This project presents professional experience, education, skills, and projects through a simulated command-line interface.

## 🚀 Features

- **Interactive Terminal UI:** A fully functional terminal emulator built from scratch with Vue components.
- **Boot Sequence & Typing Animations:** Realistic terminal boot-up sequence and command typing effects.
- **Rich Command Ecosystem:** Supports a variety of commands to navigate the CV:
  - `help`: List available commands.
  - `about`, `skills`, `study`, `projects`, `contact`: View specific sections.
  - `experience`: Interactive experience explorer with `ls`, `next`, `prev`, and specific slugs.
  - `education`, `publications`: View academic background and published papers.
  - `ls`: List available "files" and "directories".
  - `neofetch`: Displays a classic Neofetch-style system and profile summary card.
  - `clear`: Clear the terminal screen.
- **Autocompletion & History:** Press `Tab` for command autocompletion and use `Up`/`Down` arrows to navigate command history.
- **Quick Actions:** Clickable helper buttons for common commands.

## 🛠️ Tech Stack

- **Framework:** Nuxt 3 & Vue 3 (Composition API)
- **Language:** TypeScript
- **Styling:** Vanilla CSS with a custom modern terminal aesthetic (glow effects, terminal styling)
- **Data:** Static structured data defined in TypeScript (`data/cv.ts`)

## 📦 Project Structure

- `components/`: Vue components including the terminal window, command prompt, and boot sequence.
- `composables/`: Reusable logic like `useTerminal.ts` for handling terminal state, history, and command parsing.
- `data/`: Contains `cv.ts` which holds all the resume data (experiences, education, skills) and command definitions.
- `types/`: TypeScript interfaces for the CV data structures.
- `app.vue` & `pages/`: Nuxt entry points.

## 💻 Setup & Development

Make sure to install the dependencies:

```bash
# Install dependencies
npm install

# Start the development server at http://localhost:3000
npm run dev
```

Build for production:

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

## 📝 Data Customization

To use this template for your own CV, simply modify the data structures in `data/cv.ts`, replace the `public/photo.jpg`, and update the quick action buttons if necessary in `components/TerminalWindow.vue`.
