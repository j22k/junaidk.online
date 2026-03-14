# Apple-Inspired Minimalist Portfolio

A fiercely minimal, typography-driven portfolio built with Next.js 14, React, Tailwind CSS, and Framer Motion. Heavily inspired by Apple's editorial design language.

## 🎨 Design Philosophy
* **Extreme Minimalism:** Restraint is the design. Every element earns its place.
* **Palette:** Two colors only. `--ink` (`#1D1D1F`) and `--paper` (`#F5F5F7`). Hierarchy is achieved exclusively through opacity variants of the ink color. No gradients, glows, or noise textures.
* **Typography:** 
    * `Cormorant Garamond` (High-contrast, elegant serif) for all headings.
    * `DM Sans` (Clean, humanist sans-serif) for body text and UI labels.
* **Motion:** Very subtle Framer Motion reveals. Staggered fade-ins with slight 16px upward slides, smooth ease-outs, and a fully custom multilingual preloader that delays execution using `sessionStorage`.

## 🚀 Tech Stack
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Deployment:** Netlify Ready (`netlify.toml` included)

## 📂 Project Structure
All data and personal information is centrally managed. To update your portfolio, you usually only need to edit one file:
* **Content:** All text, skills, experiences, and links are typed and stored in `lib/data.ts`.
* **Layout:** `app/layout.tsx` handles fonts and document structure.
* **Styles:** `app/globals.css` and `tailwind.config.js` enforce the strict Apple design constraints.
* **Components:** Individual sections (e.g., `Hero.tsx`, `Experience.tsx`, `Skills.tsx`) are neatly housed in the `/components` folder.

## 💻 Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/j22k/your-repo-name.git
cd your-repo-name
npm install
```

Start the local Next.js development server:

```bash
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

## 🌐 Deployment to Netlify

This project is pre-configured for Netlify deployment via the `@netlify/plugin-nextjs`.

1. Push your code to GitHub.
2. Go to your [Netlify Dashboard](https://app.netlify.com/).
3. Connect your GitHub repository.
4. The Build command (`npm run build`) and Publish directory (`.next`) will automatically be read from `netlify.toml`.
5. Click **Deploy**.

## 📄 License
This design architecture was built as a custom template but can be forked and utilized freely.
