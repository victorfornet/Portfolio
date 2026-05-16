# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Victor Fornet's personal portfolio — a single-page Next.js site that scrolls through 7 chapters of his founder journey, set inside a Cofounder-inspired pixel-art world with rich animations and modern floating cards.

**Architecture:** Next.js 15 App Router (static export friendly) + TypeScript + Tailwind v4 + Framer Motion + Lenis smooth scroll. Content separated from components in `content/*.ts`. Pixel scenes are layered SVG/PNG with parallax; UI cards are modern Tailwind. Animations respect `prefers-reduced-motion`. Deploys to Vercel.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, Vitest + Testing Library (component tests), Playwright (smoke tests), pnpm.

**Spec:** [`docs/superpowers/specs/2026-05-16-portfolio-design.md`](../specs/2026-05-16-portfolio-design.md)

**Working directory:** `/Users/fornetvictor/potfolio2`

---

## Phase 1 — Bootstrap

### Task 1: Initialize Next.js project and git

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`
- Modify: (none)

- [ ] **Step 1: Bootstrap Next.js**

Run from the project root:
```bash
cd /Users/fornetvictor/potfolio2
pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-pnpm --skip-install --yes
```
Expected: scaffolds `app/`, `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts` or v4 inline config, `app/globals.css`, `.gitignore`.

- [ ] **Step 2: Install dependencies**

```bash
pnpm install
```
Expected: `node_modules/` populated, `pnpm-lock.yaml` created.

- [ ] **Step 3: Init git repo**

```bash
git init
git add -A
git commit -m "chore: bootstrap next.js project"
```
Expected: initial commit on `main`.

- [ ] **Step 4: Verify dev server**

```bash
pnpm dev
```
Open http://localhost:3000 — Next.js default page renders. Stop the server (Ctrl+C).

---

### Task 2: Install runtime + test dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install animation libs**

```bash
pnpm add framer-motion lenis clsx tailwind-merge
```

- [ ] **Step 2: Install test stack**

```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test
```

- [ ] **Step 3: Add scripts to package.json**

Edit `package.json`, set `"scripts"` to:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: install animation libs and test stack"
```

---

### Task 3: Configure Vitest

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 2: Create `tests/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add `vitest/globals` to tsconfig types**

In `tsconfig.json` under `compilerOptions`:
```json
"types": ["vitest/globals", "@testing-library/jest-dom"]
```

- [ ] **Step 4: Smoke test**

Create `tests/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";
describe("vitest setup", () => {
  it("runs", () => expect(1 + 1).toBe(2));
});
```

Run: `pnpm test`. Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: configure vitest"
```

---

### Task 4: Tailwind theme + global CSS + fonts

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css` with the theme**

```css
@import "tailwindcss";

@theme {
  /* Colors — Cofounder-inspired palette */
  --color-sky-50:  #eaf6ff;
  --color-sky-200: #bfe4ff;
  --color-sky-400: #5cb9ff;
  --color-sky-500: #2ea1ff;
  --color-sky-700: #1366b0;
  --color-grass-200: #c6f0bd;
  --color-grass-400: #6fd05a;
  --color-grass-600: #2f9d33;
  --color-dawn-100: #fce8d8;
  --color-dawn-300: #f4b78a;
  --color-dusk-700: #2a2440;
  --color-sunset-400: #ffb064;

  /* Fonts */
  --font-sans:  "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-mono:  "JetBrains Mono", ui-monospace, monospace;
  --font-pixel: "Press Start 2P", ui-monospace, monospace;
}

/* Pixel-rendered images */
.pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }

/* Custom cursor enabled */
html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }

/* Reduced motion: kill loops + parallax */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
}

html, body { background: var(--color-sky-50); color: #0c1726; }
```

- [ ] **Step 2: Load fonts via `next/font` in `app/layout.tsx`**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans-loaded" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-loaded" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel-loaded" });

export const metadata: Metadata = {
  title: "Victor Fornet — I build consumer apps from idea to growth",
  description:
    "Product & Growth at Rocapine. Building Vibo. HEC Paris gap year. Open to founder collabs and pre-seed product roles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm typecheck && pnpm build
```
Expected: both succeed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: tailwind theme, fonts, global CSS"
```

---

### Task 5: Scaffold project file structure

**Files:**
- Create: empty `.gitkeep` files in each target directory

- [ ] **Step 1: Create directories**

```bash
mkdir -p components/{chapters,pixel/sprites,ui,motion} content lib public/pixel tests/e2e
touch components/chapters/.gitkeep components/pixel/.gitkeep components/pixel/sprites/.gitkeep components/ui/.gitkeep components/motion/.gitkeep content/.gitkeep lib/.gitkeep public/pixel/.gitkeep tests/e2e/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: scaffold project structure"
```

---

## Phase 2 — Content layer

### Task 6: Define content types and chapter data

**Files:**
- Create: `content/chapters.ts`, `content/projects.ts`
- Test: `tests/content.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { CHAPTERS } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";

describe("content/chapters", () => {
  it("has exactly 7 chapters numbered 0-6", () => {
    expect(CHAPTERS.length).toBe(7);
    CHAPTERS.forEach((c, i) => expect(c.index).toBe(i));
  });

  it("every chapter has required fields", () => {
    for (const c of CHAPTERS) {
      expect(c.id).toBeTruthy();
      expect(c.label).toBeTruthy();
      expect(c.title).toBeTruthy();
    }
  });
});

describe("content/projects", () => {
  it("has 4 projects", () => {
    expect(PROJECTS.length).toBe(4);
  });

  it("every project has required fields", () => {
    for (const p of PROJECTS) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.summary).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test
```
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `content/chapters.ts`**

```ts
export type ChapterId =
  | "hero" | "foundation" | "corporate-lab" | "builder-studio"
  | "shipping" | "whats-next" | "contact";

export type Chapter = {
  index: number;
  id: ChapterId;
  label: string;            // "Chapter I"
  title: string;            // "It started at HEC Paris."
  body?: string[];          // Paragraphs
  navLabel: string;         // Short label for nav
};

export const CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "hero",
    label: "Hero",
    title: "I build consumer apps — from idea to growth.",
    body: [
      "Product & Growth at Rocapine. Building Vibo on the side.",
      "Studying at HEC Paris, learning by shipping.",
    ],
    navLabel: "Home",
  },
  {
    index: 1,
    id: "foundation",
    label: "Chapter I",
    title: "It started at HEC Paris.",
    body: [
      "I'm doing a gap year built around one question: how do consumer products actually get built, tested, and scaled?",
      "Not the theory version. The real one — the messy middle between an idea and a product people use every day.",
      "So I went to find people doing it.",
    ],
    navLabel: "Foundation",
  },
  {
    index: 2,
    id: "corporate-lab",
    label: "Chapter II",
    title: "The first stop was consulting.",
    body: [
      "I joined BearingPoint to work on digital transformation projects for the public sector.",
      "I sat with people who used software they hated. I watched information systems get deployed at scale. I learned how organizations resist change, and how products actually land in users' hands.",
      "It was slow. It was real. It taught me to care about the gap between what a product promises and what people actually experience.",
      "That gap is where I want to spend my career.",
    ],
    navLabel: "Consulting",
  },
  {
    index: 3,
    id: "builder-studio",
    label: "Chapter III",
    title: "Now I build at Rocapine.",
    body: [
      "Rocapine is a mobile app publisher. We build, test and scale consumer apps from scratch.",
      "My job is hands-on: scout promising studios, analyze product opportunities, improve onboarding and monetization, test ad concepts, follow growth metrics, and turn data into product iterations.",
      "It's the closest I've found to early-stage building with real budgets and real users.",
    ],
    navLabel: "Builder",
  },
  {
    index: 4,
    id: "shipping",
    label: "Chapter IV",
    title: "Things I'm shipping.",
    body: [
      "Side projects are how I learn the stack. Some are tools I needed at work. Some are bets on where consumer software is going.",
    ],
    navLabel: "Projects",
  },
  {
    index: 5,
    id: "whats-next",
    label: "Chapter V",
    title: "Where I'm going.",
    body: [
      "I want to spend the next decade building consumer products with founders who move fast — AI-powered apps, growth systems, and the messy infrastructure underneath.",
      "Eventually, I'll start my own. For now, I'm getting the reps in: shipping, breaking things, learning the stack, and finding the people I want to build with.",
    ],
    navLabel: "What's next",
  },
  {
    index: 6,
    id: "contact",
    label: "Chapter VI",
    title: "Let's build something.",
    body: [
      "If you're working on consumer apps, AI products, or anything ambitious — I'd love to talk.",
    ],
    navLabel: "Contact",
  },
];

export const WHAT_I_DO = [
  { icon: "🛠️", title: "Product & Growth", body: "Onboarding, paywalls, retention." },
  { icon: "📱", title: "Consumer Apps",   body: "Mobile-first, B2C, fast iteration." },
  { icon: "⚡", title: "Growth Experiments", body: "UA, creative testing, funnels." },
  { icon: "🤖", title: "AI Tools",        body: "LLM-powered products and internal tools." },
  { icon: "🚀", title: "Mobile MVPs",     body: "Idea → TestFlight in weeks." },
  { icon: "🧩", title: "Internal Systems", body: "CRMs, dashboards, scouting tools." },
] as const;

export const TASK_CARDS_HERO = [
  { status: "Currently building", label: "Vibo" },
  { status: "Shipping",           label: "Growth experiments" },
  { status: "Open to",            label: "Builder collabs" },
] as const;

export const WHATS_NEXT_CARDS = [
  { status: "Open to",      title: "Founder collabs",        body: "Building consumer apps and AI tools." },
  { status: "Curious about", title: "Pre-seed product roles", body: "Where I can ship, not just advise." },
] as const;

export const TIMELINE_CARDS = {
  foundation:   { status: "Active",    title: "HEC Paris — Gap year",   body: "Focus: startups, product, growth." },
  corporateLab: { status: "Completed", title: "BearingPoint — Consultant", body: "Digital transformation · Public sector · User needs · IS deployment · Change management." },
} as const;
```

- [ ] **Step 4: Create `content/projects.ts`**

```ts
export type ProjectStatus = "Building" | "Internal tool" | "Open-source";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  summary: string;          // Short copy on collapsed card
  stack?: string[];         // Optional tech stack tags
  problem?: string;         // Expanded content
  approach?: string;        // Expanded content
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    id: "vibo",
    name: "Vibo",
    status: "Building",
    summary: "A mobile app teaching non-technical people to ship with AI coding tools.",
    stack: ["React Native", "Expo", "TypeScript"],
    problem: "Most non-technical people want to use AI coding tools but don't know where to start. Tutorials are scattered, intimidating, and rarely mobile-first.",
    approach: "Short, interactive lessons on iOS and Android. Each lesson ends with a concrete output. Built in React Native with Expo.",
  },
  {
    id: "creative-testing-dashboard",
    name: "Creative Testing Dashboard",
    status: "Internal tool",
    summary: "A dashboard to analyze ad creatives and growth metrics at Rocapine.",
    problem: "Creative testing data was scattered across Meta, TikTok and internal sheets. Hard to see which concepts moved CPI.",
    approach: "Aggregates spend, CTR, CPI, ROAS by creative concept. Surfaces winners and losers at a glance.",
  },
  {
    id: "consumer-app-starter-kit",
    name: "Consumer App Starter Kit",
    status: "Open-source",
    summary: "A React Native starter kit for early-stage consumer apps: auth, paywall, analytics, ready to ship in a weekend.",
    stack: ["React Native", "Expo", "RevenueCat"],
    problem: "Every consumer app rebuilds the same boilerplate: auth, paywall, analytics, deep links. Wastes weeks before the actual product.",
    approach: "Opinionated starter wired with the tools we use in production. Clone, rename, ship.",
  },
  {
    id: "app-scouting-crm",
    name: "App Scouting CRM",
    status: "Internal tool",
    summary: "A CRM to manage app scouting and studio outreach.",
    problem: "Scouting promising app studios meant tracking hundreds of contacts in spreadsheets.",
    approach: "Lightweight CRM with pipeline stages, notes, and reminders tailored to studio outreach.",
  },
];
```

- [ ] **Step 5: Run tests**

```bash
pnpm test
```
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: content layer (chapters + projects + supporting data)"
```

---

## Phase 3 — Motion primitives

### Task 7: `cn` utility + motion presets

**Files:**
- Create: `lib/cn.ts`, `lib/motion-presets.ts`

- [ ] **Step 1: Create `lib/cn.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create `lib/motion-presets.ts`**

```ts
import type { Variants, Transition } from "framer-motion";

export const easeOut: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
export const easeSpring: Transition = { type: "spring", stiffness: 220, damping: 22 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: easeOut },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: easeOut },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0, transition: easeOut },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: easeOut },
};

export const staggerChildren: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const tilt3DHover = {
  whileHover: { rotateX: -4, rotateY: 4, scale: 1.02 },
  transition: easeSpring,
};
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: cn utility and motion presets"
```

---

### Task 8: `Reveal` and `Parallax` motion wrappers

**Files:**
- Create: `components/motion/Reveal.tsx`, `components/motion/Parallax.tsx`
- Test: `tests/Reveal.test.tsx`

- [ ] **Step 1: Write the failing test for Reveal**

Create `tests/Reveal.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Reveal } from "@/components/motion/Reveal";

describe("Reveal", () => {
  it("renders children", () => {
    render(<Reveal><span>hello</span></Reveal>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test — expect fail**

```bash
pnpm test
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create `components/motion/Reveal.tsx`**

```tsx
"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion-presets";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  amount = 0.3,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create `components/motion/Parallax.tsx`**

```tsx
"use client";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-driven Y parallax. `depth` 0 = static, 1 = full scroll speed.
 */
export function Parallax({
  children,
  depth = 0.3,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    [`${depth * 60}px`, `${-depth * 60}px`],
  );
  if (reduced) {
    return <div ref={ref} className={cn(className)}>{children}</div>;
  }
  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Run tests**

```bash
pnpm test
```
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Reveal + Parallax motion wrappers"
```

---

### Task 9: Lenis smooth scroll provider

**Files:**
- Create: `components/motion/SmoothScrollProvider.tsx`

- [ ] **Step 1: Create `components/motion/SmoothScrollProvider.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: Build + typecheck**

```bash
pnpm typecheck && pnpm build
```
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Lenis smooth scroll provider"
```

---

## Phase 4 — UI primitives

### Task 10: TaskCard primitive

**Files:**
- Create: `components/ui/TaskCard.tsx`
- Test: `tests/TaskCard.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/TaskCard.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TaskCard } from "@/components/ui/TaskCard";

describe("TaskCard", () => {
  it("renders status and label", () => {
    render(<TaskCard status="Currently building" label="Vibo" />);
    expect(screen.getByText("Currently building")).toBeInTheDocument();
    expect(screen.getByText("Vibo")).toBeInTheDocument();
  });

  it("renders body if provided", () => {
    render(<TaskCard status="Open to" label="Collabs" body="Building together." />);
    expect(screen.getByText("Building together.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test — expect fail**

```bash
pnpm test
```
Expected: FAIL.

- [ ] **Step 3: Create `components/ui/TaskCard.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function TaskCard({
  status,
  label,
  body,
  className,
}: {
  status: string;
  label: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-col gap-1 rounded-lg bg-white/95 px-4 py-3 shadow-[0_6px_24px_-8px_rgba(15,40,80,0.25)] ring-1 ring-black/5 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
        <span>{status}</span>
        <span className="font-semibold text-slate-900">{label}</span>
      </div>
      {body && <p className="text-sm text-slate-600">{body}</p>}
    </div>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: TaskCard primitive"
```

---

### Task 11: ChapterCard + CTA primitives

**Files:**
- Create: `components/ui/ChapterCard.tsx`, `components/ui/CTA.tsx`

- [ ] **Step 1: Create `components/ui/ChapterCard.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function ChapterCard({
  status,
  title,
  body,
  className,
}: {
  status?: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/95 p-6 shadow-[0_18px_50px_-20px_rgba(15,40,80,0.35)] ring-1 ring-black/5 backdrop-blur",
        className,
      )}
    >
      {status && (
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          {status}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {body && <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/ui/CTA.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

export function CTA({
  variant = "primary",
  className,
  children,
  ...props
}: { variant?: Variant } & ComponentProps<"a">) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-shadow";
  const styles = {
    primary:   "bg-slate-900 text-white shadow-[0_8px_24px_-8px_rgba(15,40,80,0.5)] hover:shadow-[0_12px_30px_-8px_rgba(46,161,255,0.6)]",
    secondary: "bg-white/95 text-slate-900 ring-1 ring-slate-200 shadow-[0_8px_24px_-12px_rgba(15,40,80,0.25)] hover:ring-slate-300",
  } as const;
  return (
    <motion.a
      className={cn(base, styles[variant], className)}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      {...(props as ComponentProps<typeof motion.a>)}
    >
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 3: Build**

```bash
pnpm typecheck && pnpm build
```
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: ChapterCard + CTA primitives"
```

---

### Task 12: Expandable ProjectCard

**Files:**
- Create: `components/ui/ProjectCard.tsx`
- Test: `tests/ProjectCard.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/ProjectCard.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ProjectCard } from "@/components/ui/ProjectCard";

const fixture = {
  id: "vibo",
  name: "Vibo",
  status: "Building" as const,
  summary: "Mobile learning app.",
  problem: "Tutorials are scattered.",
  approach: "Short interactive lessons.",
};

describe("ProjectCard", () => {
  it("renders collapsed by default with summary", () => {
    render(<ProjectCard project={fixture} />);
    expect(screen.getByText("Vibo")).toBeInTheDocument();
    expect(screen.getByText("Mobile learning app.")).toBeInTheDocument();
    expect(screen.queryByText("Tutorials are scattered.")).toBeNull();
  });

  it("expands on click and reveals problem/approach", async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={fixture} />);
    await user.click(screen.getByRole("button", { name: /read more/i }));
    expect(screen.getByText("Tutorials are scattered.")).toBeInTheDocument();
    expect(screen.getByText("Short interactive lessons.")).toBeInTheDocument();
  });

  it("collapses again on second click", async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={fixture} />);
    const toggle = screen.getByRole("button", { name: /read more/i });
    await user.click(toggle);
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    expect(screen.queryByText("Tutorials are scattered.")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test — expect fail**

```bash
pnpm test
```
Expected: FAIL.

- [ ] **Step 3: Create `components/ui/ProjectCard.tsx`**

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      className={cn(
        "group flex flex-col gap-3 rounded-2xl bg-white/95 p-6 shadow-[0_18px_50px_-20px_rgba(45,15,80,0.35)] ring-1 ring-black/5 backdrop-blur",
        className,
      )}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
        {project.status}
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{project.summary}</p>
      {project.stack && (
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-700">{s}</span>
          ))}
        </div>
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-700">
              {project.problem && (<p><strong>Problem.</strong> {project.problem}</p>)}
              {project.approach && (<p><strong>Approach.</strong> {project.approach}</p>)}
              {project.link && (
                <a href={project.link.href} className="font-semibold text-sky-700 underline-offset-4 hover:underline">{project.link.label} ↗</a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="self-start font-mono text-xs text-slate-500 hover:text-slate-800"
        aria-expanded={open}
      >
        {open ? "Collapse ↑" : "Read more ↓"}
      </button>
    </motion.article>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: expandable ProjectCard"
```

---

### Task 13: NavBar with scroll-spy

**Files:**
- Create: `components/ui/NavBar.tsx`, `lib/use-active-chapter.ts`
- Test: `tests/use-active-chapter.test.tsx`

- [ ] **Step 1: Write the failing test for the hook**

`tests/use-active-chapter.test.tsx`:
```tsx
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useActiveChapter } from "@/lib/use-active-chapter";

function Probe({ ids }: { ids: string[] }) {
  const active = useActiveChapter(ids);
  return <div data-testid="active">{active ?? "none"}</div>;
}

describe("useActiveChapter", () => {
  let observers: Array<{ cb: IntersectionObserverCallback; targets: Element[] }> = [];

  beforeEach(() => {
    observers = [];
    // @ts-expect-error mock
    global.IntersectionObserver = class {
      cb: IntersectionObserverCallback;
      targets: Element[] = [];
      constructor(cb: IntersectionObserverCallback) { this.cb = cb; observers.push({ cb, targets: this.targets }); }
      observe(t: Element) { this.targets.push(t); }
      unobserve() {}
      disconnect() {}
    };
  });

  it("returns the most-visible section id", () => {
    document.body.innerHTML = `<section id="a"></section><section id="b"></section>`;
    render(<Probe ids={["a", "b"]} />);
    expect(screen.getByTestId("active").textContent).toBe("none");
    act(() => {
      observers[0].cb(
        [{ isIntersecting: true, target: document.getElementById("b")!, intersectionRatio: 0.8 } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(screen.getByTestId("active").textContent).toBe("b");
  });
});
```

- [ ] **Step 2: Run test — expect fail**

```bash
pnpm test
```
Expected: FAIL.

- [ ] **Step 3: Create `lib/use-active-chapter.ts`**

```ts
"use client";
import { useEffect, useState } from "react";

export function useActiveChapter(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        setActive(top.target.id);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
```

- [ ] **Step 4: Run hook test**

```bash
pnpm test
```
Expected: pass.

- [ ] **Step 5: Create `components/ui/NavBar.tsx`**

```tsx
"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useActiveChapter } from "@/lib/use-active-chapter";
import { CHAPTERS } from "@/content/chapters";
import { cn } from "@/lib/cn";

const NAV_IDS = ["hero", "foundation", "corporate-lab", "builder-studio", "shipping", "whats-next", "contact"];

export function NavBar() {
  const active = useActiveChapter(NAV_IDS);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120);
  });

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
    >
      <ul className="flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1.5 ring-1 ring-white/10 backdrop-blur-md">
        {CHAPTERS.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className={cn(
                  "block rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive ? "bg-white text-slate-900" : "text-white/80 hover:text-white",
                )}
              >
                {c.navLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
```

- [ ] **Step 6: Build + test**

```bash
pnpm typecheck && pnpm test && pnpm build
```
Expected: all succeed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: NavBar with scroll-spy and auto-hide"
```

---

### Task 14: ScrollProgress bar

**Files:**
- Create: `components/ui/ScrollProgress.tsx`

- [ ] **Step 1: Create `components/ui/ScrollProgress.tsx`**

```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[3px] origin-left bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400"
      style={{ scaleX }}
    />
  );
}
```

- [ ] **Step 2: Build**

```bash
pnpm build
```
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: ScrollProgress bar"
```

---

### Task 15: CustomCursor with touch detection

**Files:**
- Create: `components/ui/CustomCursor.tsx`
- Test: `tests/CustomCursor.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/CustomCursor.test.tsx`:
```tsx
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CustomCursor } from "@/components/ui/CustomCursor";

describe("CustomCursor", () => {
  it("does not render or set has-custom-cursor on touch devices", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((q) => ({
      matches: q === "(pointer: coarse)",
      media: q, addListener: () => {}, removeListener: () => {},
      addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false, onchange: null,
    }));
    document.documentElement.classList.remove("has-custom-cursor");
    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
    expect(document.documentElement.classList.contains("has-custom-cursor")).toBe(false);
  });

  it("renders and sets has-custom-cursor on fine pointer devices", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((q) => ({
      matches: q === "(pointer: fine)",
      media: q, addListener: () => {}, removeListener: () => {},
      addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false, onchange: null,
    }));
    document.documentElement.classList.remove("has-custom-cursor");
    render(<CustomCursor />);
    expect(document.documentElement.classList.contains("has-custom-cursor")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test — expect fail**

```bash
pnpm test
```
Expected: FAIL.

- [ ] **Step 3: Create `components/ui/CustomCursor.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40 });
  const sy = useSpring(y, { stiffness: 600, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] size-3 rounded-[2px] bg-slate-900 mix-blend-difference pixelated"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    />
  );
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: CustomCursor with touch detection"
```

---

## Phase 5 — Pixel sprites and scenes

> **Note on assets:** v1 uses CSS-rendered pixel-art (colored blocks, `image-rendering: pixelated`) and inline SVG. Real PNG/SVG pixel-art is produced and slotted in during a polish pass (post-MVP) — components are structured to accept an `<img>` swap later without code changes.

### Task 16: Reusable pixel sprites (Cloud, Ladybug, CoffeeSteam, Flag)

**Files:**
- Create: `components/pixel/sprites/Cloud.tsx`, `Ladybug.tsx`, `CoffeeSteam.tsx`, `Flag.tsx`

- [ ] **Step 1: Create `components/pixel/sprites/Cloud.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function Cloud({ className, size = 80 }: { className?: string; size?: number }) {
  // Simple 8x4 pixel cloud rendered via background grid
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 16 8"
      className={cn("pixelated", className)}
      shape-rendering="crispEdges"
      aria-hidden
    >
      <rect x="2" y="3" width="12" height="3" fill="#fff" />
      <rect x="3" y="2" width="3" height="1" fill="#fff" />
      <rect x="8" y="1" width="4" height="2" fill="#fff" />
      <rect x="2" y="6" width="12" height="1" fill="#e6f2ff" />
    </svg>
  );
}
```

- [ ] **Step 2: Create `components/pixel/sprites/Ladybug.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";

const frames = [
  // Each frame is a tiny SVG; we cycle them on a CSS-driven loop
  "ladybug-1", "ladybug-2", "ladybug-3", "ladybug-2",
];

export function Ladybug({ className }: { className?: string }) {
  // Sprite uses CSS keyframes — but for simplicity we use Framer Motion frame cycle
  return (
    <motion.svg
      viewBox="0 0 8 6"
      className={className}
      width={24}
      height={18}
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "steps(4)" }}
      shape-rendering="crispEdges"
      aria-hidden
    >
      <rect x="1" y="1" width="6" height="4" fill="#d8261c" />
      <rect x="3" y="1" width="1" height="4" fill="#0c1726" />
      <rect x="2" y="2" width="1" height="1" fill="#0c1726" />
      <rect x="5" y="2" width="1" height="1" fill="#0c1726" />
      <rect x="2" y="3" width="1" height="1" fill="#0c1726" />
      <rect x="5" y="3" width="1" height="1" fill="#0c1726" />
      <rect x="0" y="2" width="1" height="1" fill="#0c1726" />
      <rect x="7" y="2" width="1" height="1" fill="#0c1726" />
    </motion.svg>
  );
}
```

- [ ] **Step 3: Create `components/pixel/sprites/CoffeeSteam.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";

export function CoffeeSteam({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 8 12"
      width={20}
      height={30}
      className={className}
      shape-rendering="crispEdges"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={2 + i}
          y={10}
          width={1}
          height={1}
          fill="#cfd8e3"
          animate={{ y: [10, 0], opacity: [0.8, 0] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
        />
      ))}
    </motion.svg>
  );
}
```

- [ ] **Step 4: Create `components/pixel/sprites/Flag.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";

export function Flag({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 8 12" width={24} height={36} className={className} shape-rendering="crispEdges" aria-hidden>
      <rect x="3" y="0" width="1" height="12" fill="#3a2418" />
      <motion.g
        animate={{ skewX: [0, 6, 0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "3px 1px" }}
      >
        <rect x="4" y="1" width="4" height="3" fill="#d8261c" />
      </motion.g>
    </motion.svg>
  );
}
```

- [ ] **Step 5: Build**

```bash
pnpm typecheck && pnpm build
```
Expected: success.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: reusable pixel sprites (Cloud, Ladybug, CoffeeSteam, Flag)"
```

---

### Task 17: HeroScene + remaining chapter scenes (low-fi v1)

**Files:**
- Create: `components/pixel/HeroScene.tsx`, `CampusScene.tsx`, `OfficeScene.tsx`, `StudioScene.tsx`, `WorkshopScene.tsx`, `HorizonScene.tsx`, `SunsetScene.tsx`

> These scenes use the v1 CSS/SVG-rendered approach. Each is a layered composition with parallax-ready depth attributes. Real pixel-art PNGs replace these later by editing only this folder.

- [ ] **Step 1: Create `components/pixel/HeroScene.tsx`**

```tsx
"use client";
import { Parallax } from "@/components/motion/Parallax";
import { Cloud } from "./sprites/Cloud";
import { Ladybug } from "./sprites/Ladybug";

export function HeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-50" />
      {/* Far clouds */}
      <Parallax depth={0.15} className="absolute inset-x-0 top-[10%] flex justify-between px-10 opacity-90">
        <Cloud size={120} /><Cloud size={90} /><Cloud size={140} />
      </Parallax>
      {/* Near clouds */}
      <Parallax depth={0.35} className="absolute inset-x-0 top-[28%] flex justify-around opacity-80">
        <Cloud size={70} /><Cloud size={110} />
      </Parallax>
      {/* Skyline */}
      <div className="absolute inset-x-0 bottom-[28%] h-24 bg-[linear-gradient(to_top,#7da7d9_0%,#7da7d9_60%,transparent_60%)] mix-blend-multiply opacity-60" />
      {/* Grass */}
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(to_top,#3aa84a_0%,#56c067_40%,#7ad07d_100%)]" />
      {/* Workspace cluster */}
      <div className="absolute right-[14%] bottom-[22%] flex items-end gap-2">
        <div className="size-16 rounded-sm bg-slate-700 ring-1 ring-slate-800 pixelated" aria-label="laptop" />
        <div className="size-8 rounded-sm bg-slate-800 pixelated" aria-label="phone" />
        <Ladybug />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the remaining six scenes (boilerplate, palettes per spec §4)**

`components/pixel/CampusScene.tsx`:
```tsx
import { Parallax } from "@/components/motion/Parallax";
import { Cloud } from "./sprites/Cloud";

export function CampusScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-200 via-sky-100 to-amber-50" />
      <Parallax depth={0.2} className="absolute inset-x-0 top-6 flex justify-around opacity-80"><Cloud size={70} /><Cloud size={90} /></Parallax>
      {/* Building */}
      <div className="absolute bottom-12 left-1/2 h-40 w-48 -translate-x-1/2 rounded-t-md bg-amber-100 ring-2 ring-amber-300 pixelated" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-40 w-48">
        {[0, 1, 2].map((c) => (
          <div key={c} className="absolute bottom-0 h-32 w-3 bg-amber-200" style={{ left: 12 + c * 60 }} />
        ))}
      </div>
      {/* Grass */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-emerald-400 pixelated" />
    </div>
  );
}
```

`components/pixel/OfficeScene.tsx`:
```tsx
import { CoffeeSteam } from "./sprites/CoffeeSteam";

export function OfficeScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100" />
      {/* Cubicle wall */}
      <div className="absolute inset-x-6 bottom-12 h-24 rounded-md bg-slate-400 ring-1 ring-slate-500" />
      {/* Monitor */}
      <div className="absolute left-12 bottom-20 size-16 rounded-sm bg-slate-800 ring-1 ring-slate-900 pixelated">
        <div className="absolute inset-1 bg-slate-700 pixelated" />
        <div className="absolute left-2 top-2 h-1 w-4 bg-rose-300" />
      </div>
      {/* Mug + steam */}
      <div className="absolute right-12 bottom-24 size-6 rounded-sm bg-amber-200 pixelated" />
      <div className="absolute right-12 bottom-30"><CoffeeSteam /></div>
      {/* Floor */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-300" />
    </div>
  );
}
```

`components/pixel/StudioScene.tsx`:
```tsx
"use client";
import { motion } from "framer-motion";

const phones = [
  { color: "bg-sky-500",    delay: 0 },
  { color: "bg-amber-400",  delay: 0.4 },
  { color: "bg-emerald-500",delay: 0.8 },
  { color: "bg-rose-500",   delay: 1.2 },
];

export function StudioScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-emerald-400" />
      {/* Laptop */}
      <div className="absolute left-1/2 bottom-16 size-24 -translate-x-1/2 rounded-md bg-slate-700 ring-2 ring-slate-800 pixelated" />
      {/* Floating phones */}
      <div className="absolute inset-x-0 top-[20%] flex justify-around">
        {phones.map((p, i) => (
          <motion.div
            key={i}
            className={`size-10 rounded-md ring-2 ring-slate-900 pixelated ${p.color}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>
    </div>
  );
}
```

`components/pixel/WorkshopScene.tsx`:
```tsx
export function WorkshopScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-violet-700 to-indigo-800" />
      {/* Code monitor */}
      <div className="absolute inset-x-1/4 top-8 h-20 rounded-sm bg-slate-900 ring-2 ring-slate-700 pixelated">
        <div className="absolute inset-1 bg-slate-800 pixelated" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute h-1 bg-emerald-400/80 pixelated" style={{ top: 6 + i * 4, left: 8, width: 30 + i * 10 }} />
        ))}
      </div>
      {/* Workbench */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-amber-900 pixelated" />
    </div>
  );
}
```

`components/pixel/HorizonScene.tsx`:
```tsx
import { Flag } from "./sprites/Flag";
export function HorizonScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-300 via-amber-200 to-amber-100" />
      {/* Sun */}
      <div className="absolute left-1/2 top-1/3 size-20 -translate-x-1/2 rounded-full bg-amber-300 blur-[1px]" />
      {/* Mountain */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 size-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-slate-600" />
      {/* Flag */}
      <div className="absolute left-1/2 bottom-[120px] -translate-x-1/2"><Flag /></div>
      {/* Road */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-amber-700 pixelated" />
    </div>
  );
}
```

`components/pixel/SunsetScene.tsx`:
```tsx
import { Cloud } from "./sprites/Cloud";
export function SunsetScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-200 to-sky-300" />
      <div className="absolute right-10 top-1/3"><Cloud size={100} /></div>
      <div className="absolute left-8 top-1/2"><Cloud size={80} /></div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-emerald-500" />
      <div className="absolute left-1/2 bottom-16 size-20 -translate-x-1/2 rounded-sm bg-slate-700 ring-2 ring-slate-800 pixelated" />
    </div>
  );
}
```

- [ ] **Step 3: Build**

```bash
pnpm typecheck && pnpm build
```
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: 7 pixel scenes (v1 CSS/SVG-rendered)"
```

---

## Phase 6 — Chapters

### Task 18: Hero chapter

**Files:**
- Create: `components/chapters/Hero.tsx`

- [ ] **Step 1: Create `components/chapters/Hero.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { HeroScene } from "@/components/pixel/HeroScene";
import { TaskCard } from "@/components/ui/TaskCard";
import { CTA } from "@/components/ui/CTA";
import { CHAPTERS, TASK_CARDS_HERO } from "@/content/chapters";
import { staggerChildren, fadeUp } from "@/lib/motion-presets";

export function Hero() {
  const c = CHAPTERS[0];
  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden">
      <HeroScene />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pt-32 pb-20 md:px-10">
        <motion.h1
          className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] text-slate-900 md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {c.title}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl text-base text-slate-700 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {c.body!.join(" ")}
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTA href="#shipping">See what I'm building</CTA>
          <CTA variant="secondary" href="https://linkedin.com/in/victorfornet" target="_blank" rel="noreferrer">LinkedIn ↗</CTA>
          <CTA variant="secondary" href="https://github.com/victorfornet" target="_blank" rel="noreferrer">GitHub ↗</CTA>
        </div>

        <motion.div
          className="pointer-events-none absolute right-6 top-32 flex flex-col gap-2 md:right-16 md:top-40"
          variants={staggerChildren}
          initial="hidden"
          animate="show"
        >
          {TASK_CARDS_HERO.map((t) => (
            <motion.div key={t.label} variants={fadeUp}>
              <TaskCard status={t.status} label={t.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
pnpm build
```
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Hero chapter"
```

---

### Task 19: ChapterFoundation + ChapterCorporateLab

**Files:**
- Create: `components/chapters/ChapterFoundation.tsx`, `components/chapters/ChapterCorporateLab.tsx`

- [ ] **Step 1: Create `components/chapters/ChapterFoundation.tsx`**

```tsx
import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { CampusScene } from "@/components/pixel/CampusScene";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterFoundation() {
  const c = CHAPTERS[1];
  const card = TIMELINE_CARDS.foundation;
  return (
    <section id="foundation" className="relative isolate py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="aspect-[4/3] w-full"><CampusScene /></div>
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-slate-700">
            {c.body!.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}><p>{p}</p></Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-6 inline-block">
            <ChapterCard status={card.status} title={card.title} body={card.body} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/chapters/ChapterCorporateLab.tsx`**

```tsx
import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { OfficeScene } from "@/components/pixel/OfficeScene";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterCorporateLab() {
  const c = CHAPTERS[2];
  const card = TIMELINE_CARDS.corporateLab;
  return (
    <section id="corporate-lab" className="relative isolate bg-slate-100 py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="order-2 md:order-1">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-slate-700">
            {c.body!.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}><p>{p}</p></Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-6 inline-block">
            <ChapterCard status={card.status} title={card.title} body={card.body} />
          </Reveal>
        </div>
        <div className="order-1 aspect-[4/3] w-full md:order-2"><OfficeScene /></div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build**

```bash
pnpm build
```
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Foundation + Corporate Lab chapters"
```

---

### Task 20: ChapterBuilderStudio

**Files:**
- Create: `components/chapters/ChapterBuilderStudio.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { CHAPTERS, WHAT_I_DO } from "@/content/chapters";
import { StudioScene } from "@/components/pixel/StudioScene";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterBuilderStudio() {
  const c = CHAPTERS[3];
  return (
    <section id="builder-studio" className="relative isolate py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-12 aspect-[16/7] max-w-4xl"><StudioScene /></div>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-slate-700">
            {c.body!.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}><p>{p}</p></Reveal>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_I_DO.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <ChapterCard
                title={`${item.icon}  ${item.title}`}
                body={item.body}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
pnpm build && git add -A && git commit -m "feat: Builder Studio chapter"
```

---

### Task 21: ChapterShipping

**Files:**
- Create: `components/chapters/ChapterShipping.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { CHAPTERS } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";
import { WorkshopScene } from "@/components/pixel/WorkshopScene";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterShipping() {
  const c = CHAPTERS[4];
  return (
    <section id="shipping" className="relative isolate bg-indigo-950 py-32 text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-12 aspect-[16/6] max-w-4xl"><WorkshopScene /></div>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-white/60">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{c.title}</h2>
            <p className="mt-6 text-white/80">{c.body![0]}</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={0.06 * i}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
pnpm build && git add -A && git commit -m "feat: Shipping chapter with projects"
```

---

### Task 22: ChapterWhatsNext + ChapterContact

**Files:**
- Create: `components/chapters/ChapterWhatsNext.tsx`, `components/chapters/ChapterContact.tsx`

- [ ] **Step 1: Create `components/chapters/ChapterWhatsNext.tsx`**

```tsx
import { CHAPTERS, WHATS_NEXT_CARDS } from "@/content/chapters";
import { HorizonScene } from "@/components/pixel/HorizonScene";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterWhatsNext() {
  const c = CHAPTERS[5];
  return (
    <section id="whats-next" className="relative isolate py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="mx-auto mb-12 aspect-[16/7] max-w-4xl"><HorizonScene /></div>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-slate-700">
            {c.body!.map((p, i) => (<Reveal key={i} delay={0.1 * i}><p>{p}</p></Reveal>))}
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
          {WHATS_NEXT_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.06 * i}>
              <ChapterCard status={card.status} title={card.title} body={card.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/chapters/ChapterContact.tsx`**

```tsx
import { CHAPTERS } from "@/content/chapters";
import { SunsetScene } from "@/components/pixel/SunsetScene";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterContact() {
  const c = CHAPTERS[6];
  return (
    <section id="contact" className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0"><SunsetScene /></div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-700">{c.label}</p>
          <h2 className="mt-2 text-balance text-4xl font-semibold text-slate-900 md:text-6xl">{c.title}</h2>
          <p className="mt-6 max-w-xl text-slate-700">{c.body![0]}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            <CTA href="mailto:victor@rocapine.com">✉ Email me</CTA>
            <CTA variant="secondary" href="https://linkedin.com/in/victorfornet" target="_blank" rel="noreferrer">in LinkedIn</CTA>
            <CTA variant="secondary" href="https://github.com/victorfornet" target="_blank" rel="noreferrer">⌨ GitHub</CTA>
          </div>
        </Reveal>
        <footer className="absolute bottom-6 inset-x-0 text-center font-mono text-xs text-slate-700/80">
          Made by Victor Fornet · 2026 · pixel-art with care
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build + commit**

```bash
pnpm build && git add -A && git commit -m "feat: What's Next + Contact chapters"
```

---

## Phase 7 — Assembly

### Task 23: Compose all chapters in `app/page.tsx` and root layout chrome

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Hero } from "@/components/chapters/Hero";
import { ChapterFoundation } from "@/components/chapters/ChapterFoundation";
import { ChapterCorporateLab } from "@/components/chapters/ChapterCorporateLab";
import { ChapterBuilderStudio } from "@/components/chapters/ChapterBuilderStudio";
import { ChapterShipping } from "@/components/chapters/ChapterShipping";
import { ChapterWhatsNext } from "@/components/chapters/ChapterWhatsNext";
import { ChapterContact } from "@/components/chapters/ChapterContact";

export default function Page() {
  return (
    <main>
      <Hero />
      <ChapterFoundation />
      <ChapterCorporateLab />
      <ChapterBuilderStudio />
      <ChapterShipping />
      <ChapterWhatsNext />
      <ChapterContact />
    </main>
  );
}
```

- [ ] **Step 2: Update `app/layout.tsx` to include chrome**

Replace `body` content with:
```tsx
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { NavBar } from "@/components/ui/NavBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

// inside default export:
<body className="font-sans antialiased">
  <SmoothScrollProvider>
    <NavBar />
    <CustomCursor />
    {children}
    <ScrollProgress />
  </SmoothScrollProvider>
</body>
```

Full file:
```tsx
import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { NavBar } from "@/components/ui/NavBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans-loaded" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-loaded" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel-loaded" });

export const metadata: Metadata = {
  title: "Victor Fornet — I build consumer apps from idea to growth",
  description:
    "Product & Growth at Rocapine. Building Vibo. HEC Paris gap year. Open to founder collabs and pre-seed product roles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <NavBar />
          <CustomCursor />
          {children}
          <ScrollProgress />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run dev server and manually verify**

```bash
pnpm dev
```
Open http://localhost:3000 — verify all 7 sections render and scroll works. Hit each anchor via the NavBar. Resize to mobile width and check layout. Stop server.

- [ ] **Step 4: Build**

```bash
pnpm build
```
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble portfolio page with all chapters and chrome"
```

---

## Phase 8 — Polish

### Task 24: Open Graph image

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Create `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const alt = "Victor Fornet — I build consumer apps from idea to growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: 60,
          background: "linear-gradient(180deg, #5cb9ff 0%, #bfe4ff 60%, #6fd05a 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#0c1726", opacity: 0.7 }}>Victor Fornet</div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600, color: "#0c1726", marginTop: 8, lineHeight: 1.1 }}>
          I build consumer apps —{"\n"}from idea to growth.
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Build**

```bash
pnpm build
```
Expected: succeeds; `/opengraph-image` route emitted.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: opengraph image"
```

---

### Task 25: Playwright smoke tests

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Init Playwright**

```bash
pnpm dlx playwright install --with-deps chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command: "pnpm build && pnpm start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: "http://localhost:3100" },
});
```

- [ ] **Step 3: Create `tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

const sections = ["hero", "foundation", "corporate-lab", "builder-studio", "shipping", "whats-next", "contact"];

test("all 7 chapters render", async ({ page }) => {
  await page.goto("/");
  for (const id of sections) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("hero copy is correct", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I build consumer apps");
});

test("project card expands on click", async ({ page }) => {
  await page.goto("/");
  await page.locator("#shipping").scrollIntoViewIfNeeded();
  const firstCard = page.locator("#shipping article").first();
  await firstCard.getByRole("button", { name: /read more/i }).click();
  await expect(firstCard.getByText(/Problem\./)).toBeVisible();
});

test("contact CTAs are present", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: /email me/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /linkedin/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /github/i }).first()).toBeVisible();
});
```

- [ ] **Step 4: Run e2e tests**

```bash
pnpm test:e2e
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: Playwright smoke tests for the full page"
```

---

### Task 26: Lighthouse + accessibility sanity pass

**Files:** (no new files; iteration only)

- [ ] **Step 1: Run a production build and Lighthouse manually**

```bash
pnpm build
pnpm start -p 3000 &
SERVER_PID=$!
sleep 4
pnpm dlx @lhci/cli@latest collect --url=http://localhost:3000 --numberOfRuns=1 || true
kill $SERVER_PID
```

- [ ] **Step 2: Inspect the report**

Open `.lighthouseci/lhr-*.html` in a browser. Targets: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.

- [ ] **Step 3: Fix any P0 issues inline**

Common fixes:
- Missing `alt` on a sprite/image → add `aria-hidden` or `alt`
- Color contrast on a section → add a `bg-white/60 backdrop-blur` chip behind the text
- Font preload → add `display: "swap"` to the `next/font` calls if not already
- Image dimensions warning → set explicit `width`/`height`

- [ ] **Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix: Lighthouse + a11y pass"
```

---

### Task 27: Deploy to Vercel

**Files:** (none — uses Vercel CLI)

- [ ] **Step 1: Install Vercel CLI**

```bash
pnpm add -g vercel
```

- [ ] **Step 2: Deploy preview**

```bash
vercel
```
Follow prompts — link project, accept defaults.

- [ ] **Step 3: Verify the preview URL**

Open the URL printed by `vercel`. Manually click through the page and confirm all chapters render in production.

- [ ] **Step 4: Promote to production**

```bash
vercel --prod
```

- [ ] **Step 5: Commit the `.vercel` config if Vercel created any**

```bash
git add -A
git commit -m "chore: deploy to Vercel" || echo "no vercel changes to commit"
```

---

## Done.

Once all tasks above are checked off, the site is shipped at the Vercel URL. Future iterations:

- Replace the v1 CSS/SVG scenes with real pixel-art PNGs (only `components/pixel/*` files change)
- Add real screenshots / live links to project cards (edit `content/projects.ts`)
- Tweak copy without touching components (edit `content/chapters.ts`)
- Add new chapters by appending to `CHAPTERS` + creating a new chapter component
