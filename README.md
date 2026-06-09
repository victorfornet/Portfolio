# Victor Fornet — Portfolio

A narrative, scroll-driven personal portfolio that tells my story as a series of cinematic chapters — from HEC Paris, through consulting at BearingPoint, to building consumer products at Rocapine and beyond.

**🔗 Live site: [victorfornet.com](https://victorfornet.com)**

---

## Overview

The site is built as a single, continuous storyline. Each chapter is a self-contained scene with its own pixel-art illustration, editorial layout, and motion design:

| # | Chapter | About |
|---|---------|-------|
| 0 | **Hero** | I ship consumer products. |
| I | **Foundation** | HEC Paris |
| II | **Corporate Lab** | BearingPoint |
| III | **Builder Studio** | Rocapine |
| IV | **Shipping** | Side projects |
| V | **About me** | Who I am |
| VI | **What's next** | Where I'm headed |
| — | **Contact** | Get in touch |

The desktop experience features a horizontally-scrolling chapter track pinned to the viewport, smooth inertial scrolling, parallax illustrations, and scroll-progress-driven reveals. The layout is fully responsive with a mobile-first vertical flow.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **[Tailwind CSS 4](https://tailwindcss.com)** for styling
- **[Framer Motion 12](https://www.framer.com/motion/)** for animation & micro-interactions
- **[Lenis](https://lenis.darkroom.engineering/)** for smooth scrolling
- **TypeScript** throughout
- **[Vitest](https://vitest.dev)** + **[Testing Library](https://testing-library.com/)** for unit tests, **[Playwright](https://playwright.dev)** for end-to-end tests
- Deployed on **[Vercel](https://vercel.com)**

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Lint with ESLint |
| `pnpm typecheck` | Type-check with `tsc` |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run end-to-end tests (Playwright) |

## Project structure

```
app/                 App Router entry, layout, global styles, OG image
components/
  chapters/          One component per story chapter
  motion/            Scroll scenes, parallax, smooth-scroll provider
  scene/             Cinematic background
  ui/                Reusable UI primitives (cursor, cards, CTA…)
content/             Chapter & project data
lib/                 Hooks and helpers (scroll math, active chapter…)
public/pixel/        Pixel-art chapter illustrations
tests/               Unit + e2e tests
```

## Contact

Reach me at **victor.fornet@hec.edu** or via the contact section on [victorfornet.com](https://victorfornet.com).
