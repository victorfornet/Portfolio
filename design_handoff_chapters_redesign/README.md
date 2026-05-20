# Handoff — Chapters Redesign (I → VI)

## Overview

Redesign of the **6 horizontal-scrolling chapters** of the portfolio
(`https://portfolio-rho-nine-wwqm57e61q.vercel.app/`). The hero and the
final `contact` chapter are **untouched**. Wording is **untouched**. What
changes: layout, hierarchy, and how stats are surfaced.

Direction chosen: **Magazine Asymmetric** — every chapter gets a bespoke
composition. Big italic serif numerals as a watermark, megastat strips for
the data-heavy chapters, side-margin annotations (`i.` `ii.`) instead of
the old `Stood out` boxes, and inline stat-pills so the metrics
(`$5.6M ARR`, `315K MAU`, `#1 worldwide`…) stop being buried in body copy.

## About the design files

`mock/Chapters Redesign.html` is a **design reference** rendered in plain
HTML + React + Babel for fast iteration. It is **not production code**.
Your job is to recreate the same layouts as **TSX components** in the
existing Next.js portfolio under `components/chapters/`, using the
codebase's Tailwind v4 + Framer Motion + `HorizontalChapterTrack` setup.

Concrete TSX templates for every chapter are provided in `tsx/` — use
them as the starting point.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, and component
structure. Implement pixel-perfectly. The only freedom is in animation
fine-tuning (the mock has no scroll-linked reveal — see "Animation" below).

---

## Target codebase

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 (`@theme` directive in `app/globals.css`)
- **Motion:** `framer-motion` via `ChapterEditorialScene` and `Reveal`
- **Horizontal scroll:** `components/motion/HorizontalChapterTrack.tsx`
  (each chapter is one viewport slot ≈ 1280×800 on desktop)
- **Content:** centralized in `content/chapters.ts`, `content/projects.ts`
- **Pixel-art assets:** `public/pixel/*.png` (foundation, corporate-lab,
  builder-studio, shipping, whats-next, contact)

Files to **modify**:

| Path | Why |
|---|---|
| `app/globals.css` | Add Instrument Serif font + new color tokens |
| `app/layout.tsx` | Add Instrument Serif Google Font link |
| `components/chapters/ChapterFoundation.tsx` | New layout (Ch I) |
| `components/chapters/ChapterCorporateLab.tsx` | New layout (Ch II) |
| `components/chapters/ChapterBuilderStudio.tsx` | New layout (Ch III) |
| `components/chapters/ChapterShipping.tsx` | New layout (Ch IV) |
| `components/chapters/ChapterAboutMe.tsx` | New layout (Ch V) |
| `components/chapters/ChapterWhatsNext.tsx` | New layout (Ch VI) |

Files to **add** (small shared UI primitives):

| Path | Component(s) |
|---|---|
| `components/ui/Marker.tsx` | `<Marker num="II" label="Chapter II · Consulting" />` |
| `components/ui/Pill.tsx` | `<Pill>`, `<Chip>` |
| `components/ui/Megastat.tsx` | `<Megastat num="$5.6M" label="ARR" />` |
| `components/ui/Annot.tsx` | `<Annot idx="i." lead="…">body</Annot>` |
| `components/ui/Numeral.tsx` | Big italic backdrop numeral |

Files to **leave alone**:

- `components/chapters/Hero.tsx`
- `components/chapters/ChapterContact.tsx`
- `components/motion/HorizontalChapterTrack.tsx`
- `content/chapters.ts`, `content/projects.ts` (wording is unchanged — but
  the new layouts read **more fields** than before. See "Content" below)

---

## Design tokens

### New / confirmed colors

Add to `app/globals.css` `@theme` block:

```css
@theme {
  /* existing tokens stay */

  /* paper surface — between cream and sky for Ch III & Ch V */
  --color-paper: #fbfaf6;

  /* ink scale (re-stated for clarity) */
  --color-ink: #0c1726;
  --color-ink-80: #1b2a3e;
  --color-ink-60: #46556b;
  --color-ink-40: #7c8aa1;
  --color-ink-20: #c5cedb;
  --color-ink-10: #e3e9f1;

  /* fonts */
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
}
```

### Existing tokens still in play

- `--color-sky-50` `#eaf6ff` — Ch I background variant, Ch II
- `--color-sky-300` `#90cdf7` — dark-card serif accents
- `--color-sky-700` `#1366b0` — italic emphasis in titles (light backgrounds)
- `--color-grass-600` `#2f9d33` — "Active" status dot
- `slate-950` `#0b1424` — Ch IV dark background

### Typography

- **Display / titles:** `Inter Tight`, weight 600, letter-spacing `-0.025em`
  → `-0.03em` at larger sizes. Sizes range from 64px (Ch VI lede) up to
  **96px** for Ch I & Ch V titles.
- **Italic emphasis word:** `Instrument Serif`, italic, weight 400. Used
  inside titles (`<em>` tags) and as the big watermark numerals.
- **Body:** `Inter Tight` 400, sizes 15–19px depending on chapter.
- **UI / meta:** `JetBrains Mono`, 10.5–11px, uppercase, letter-spacing
  `0.12–0.16em`.

### Spacing

- Each chapter sits in a fixed slot **1280×800** (desktop). On mobile fall
  back to natural stacking.
- Outer padding per chapter: `56px 64px` (Ch III / Ch IV / Ch VI use
  `56px 80px` for the airier compositions).
- Gap between section blocks: 20–24px.
- Gap inside content rows: 14–18px.

### Radii

- Cards (project cards, scene): **18px**
- Inset cards / annotations: **16px**
- Pills / chips: full pill (`9999px`)

### Shadows

- Cards on light surfaces:
  `box-shadow: 0 4px 18px -10px rgba(15,30,50,0.12);`
- Scene illustration:
  `box-shadow: 0 24px 60px -28px rgba(12,30,55,0.45),
               0 0 0 1px rgba(0,0,0,0.06);`

---

## Shared UI primitives — exact specs

Drop these into `components/ui/`. Tailwind classes work; the mock uses
inline CSS for speed.

### `Marker` — chapter label

```
┌─[II.]──● ─ CHAPTER II · CONSULTING
```

- Italic serif numeral (28–42px, depending on chapter), color `--color-ink`
  on light backgrounds / `#fff` on dark.
- 6×6 ink-40 dot.
- Mono label, 11px, uppercase, letter-spacing 0.18em, `--color-ink-60`.

### `Pill` — inline stat pill

```
( ● 5.6M ARR )
```

- White background (`#fff`), 1px `--color-ink-10` border, 7×12 padding,
  full pill radius.
- Number bolded (weight 600), `--color-ink`. Label `--color-ink-80`.
- 12.5px Inter Tight.
- Optional green `dot` prop (6×6 `--color-grass-600`).
- `ghost` variant: transparent background, `--color-ink-20` border.
- On dark surfaces: `rgba(255,255,255,0.06)` bg, `rgba(255,255,255,0.12)`
  border, white text.

### `Chip` — status chip

```
[ ● ACTIVE · SINCE 2023 ]
```

- Same shape as Pill. Mono 10.5px, uppercase, letter-spacing 0.06em.
- Dot: 7×7 `--color-grass-600` with 3px outer halo
  `box-shadow: 0 0 0 3px rgba(111,208,90,0.18)`.
- `done` variant: ink-40 dot + ink-10 halo. Used for completed roles /
  internal tools.

### `Megastat` — giant serif metric

```
$5.6M
ANNUALIZED REVENUE
```

- Number: Instrument Serif italic 400, **64px**, letter-spacing -0.02em.
- Label: mono 10.5px, uppercase, letter-spacing 0.12em, `--color-ink-60`.

### `Annot` — side-margin annotation (replaces "Stood out")

```
─────────────────────────────
i.    Bold lead sentence.
      Supporting body in ink-60.
```

- 60px gutter on the left for the italic serif index (`i.` `ii.`),
  30px, `--color-sky-700` (or `--color-sky-300` on dark).
- 1px top rule (`--color-ink-20`), 14px top padding.
- Lead: Inter Tight 600 16px, `--color-ink`, letter-spacing -0.01em.
- Body: Inter Tight 400 13.5px, line-height 1.55, `--color-ink-60`.

### `Numeral` — backdrop watermark

```
.numeral {
  position: absolute;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 540px;       /* 380px for Ch V */
  line-height: 0.8;
  letter-spacing: -0.05em;
  color: rgba(12,23,38,0.05);  /* rgba(255,255,255,0.04) on dark */
  pointer-events: none;
  user-select: none;
}
```

Each chapter places it in a bottom corner — see per-chapter notes below.

### `ProjectCard` (update existing `components/ui/ProjectCard.tsx`)

The existing dark card style is **kept** (green dot icon top-left, status
chip top-right, name, summary, stack pills, "Read more ↓" footer). The
user explicitly approved this look. Two visual tweaks:

- Bring the green dot icon's halo treatment in line with the new `Chip`
  (4px halo at `rgba(130,226,107,0.18)`).
- When the project is an internal tool (`Scouty`), recolor the dot to
  `#9aa6b8` with a matching halo.

---

## Per-chapter spec

Each chapter is a 12-column grid inside the 1280×800 slot. Backgrounds
alternate to give the deck rhythm — `paper` → `sky-50` → `paper` → `dark`
→ `paper` → `sky-50`.

### Chapter I — `hec paris.` (`ChapterFoundation`)

- **Background:** `paper` (`#fbfaf6`)
- **Layout:** Split 1fr / 560px. Editorial column **left**, full-bleed
  pixel scene **right** (`foundation.png`).
- **Numeral:** big italic `I`, bottom-left, ink 5% opacity.
- **Right rail of scene:** mono label `HEC Paris · Jouy-en-Josas` + serif
  italic line `Where the story starts.` (white, bottom-right).
- **Title:** `hec <em>paris.</em>` — 96px.
- **Chip:** `Active · since 2023` (top-right of left column).
- **Pills:** `#1 worldwide · FT 2025`, `top 100 / 9,000 candidates`,
  `3 years CPGE ECS`, ghost `Thammasat · Bangkok`.
- **Annotations:**
  - `i.` `Master in Management — and a gap year to ship.`
  - `ii.` `Vice-President of the Ski Club at HEC.` (mentions €75K budget,
    300+ students, team of 11)

### Chapter II — `bearingpoint.` (`ChapterCorporateLab`)

- **Background:** `sky-50`
- **Layout:** Split 560px / 1fr. Full-bleed scene **left**
  (`corporate-lab.png`), editorial column **right**.
- **Numeral:** big italic `II`, bottom-right, sky-700 7% opacity.
- **Scene rail (left, bottom):** mono `BearingPoint · Paris` + serif
  italic `Six months in the public sector.`
- **Title:** `bearing<br/><em>point.</em>` — 88px.
- **Chip:** `Completed · jul–dec 2025 · paris` (done variant)
- **Pills:** `3-year master plan`, `5,000+ users`, `12+ initiatives`,
  `15+ workshops`.
- **Annotations:**
  - `i.` `Co-authored a 3-year digital master plan, presented to C-level.`
  - `ii.` `Deployed an IS used by 5,000+ internal users.`

### Chapter III — `rocapine.` (`ChapterBuilderStudio`)

- **Background:** `paper`
- **Layout:** Header row → **megastat strip** → 1fr / 480px content row.
  Editorial left, scene right.
- **Numeral:** big italic `III`, bottom-right, ink 5% opacity.
- **Megastat strip** (4 columns, separated by ink-20 1px top + bottom
  rules):
  - `$5.6M` · annualized revenue
  - `315K` · monthly active users
  - `14` · active studios
  - `6` · apps shipped
- **Title:** `<em>rocapine.</em>` — 84px.
- **Chip:** `Active · publishing PM · since jan 2026` (top-right of header)
- **Annotations:**
  - `i.` `Built Scouty, our internal CRM, from scratch.` (mentions ~3×
    throughput)
  - `ii.` `Shipped 6 apps alongside the strategy work.`
- **Scene:** `builder-studio.png`, tag `ship · test · scale`.

### Chapter IV — `side projects.` (`ChapterShipping`)

- **Background:** **dark** `#0b1424` (kept)
- **Layout:** 1fr / 1.4fr. Left column: header + title + lede + pills +
  scene (`shipping.png`). Right column: **two project cards** (Vibo,
  Scouty) stacked, using the existing `ProjectCard`.
- **Numeral:** big italic `IV`, bottom-left, white 4% opacity.
- **Title:** `side<br/><em>projects.</em>` — 84px.
- **Pills:** `2 active builds` (dot), ghost `solo`.
- **ProjectCard data:** from `content/projects.ts` (already correct).
  Vibo `Building` (green dot) — Scouty `Internal tool` (gray dot, done).

### Chapter V — `how I work, what I value.` (`ChapterAboutMe`)

- **Background:** `#fff`
- **Layout:** Editorial header (title left, vertical mono label right) +
  **8-value typographic grid** in 2 columns. Each value row is
  `140px / 1fr` (title block / body), 1px top rule, 16px vertical padding.
- **Numeral:** smaller italic `V` (380px), bottom-right.
- **Title:** `how I <em>work,</em><br/>what I <em>value.</em>` — 96px.
- **Vertical mono label:** `eight values · three lenses` rotated 180°
  (writing-mode vertical-rl).
- **Value rows:**
  - Index/category column: mono `01 · drive` + Inter 24px 600 title
  - Body column: 13.5px Inter, ink-60
- **Categories** (used as suffix on the index line):
  - `drive` — Ambition, Hard work, Momentum, High standards
  - `craft` — Curiosity, Product taste
  - `people` — Great minds, Sociability

### Chapter VI — `what's next.` (`ChapterWhatsNext`)

- **Background:** `sky-50`
- **Layout:** Header bar (Marker + 2 pills right-aligned) → 1fr / 320px
  hero row → mono footer line.
- **Numeral:** big italic `VI`, bottom-right, sky-700 8% opacity.
- **Hero title:** `Still <em>figuring it out,</em> honestly.` — 64px,
  serif italic on emphasis word.
- **Secondary paragraph (19px):** picks up the existing copy verbatim,
  with `building things real people want to use` italicized in serif.
- **Tertiary paragraph (15px ink-60):** rest of the existing copy.
- **Right column:** 4:3 scene (`whats-next.png`) + small white card
  with mono `LONG-TERM` label and `Building my own.` in italic serif 22px.
- **Pills (top-right of header):** `Open to good conversations` (dot),
  ghost `San Francisco · relocating`.
- **Footer:** mono `END OF THE DECK · NEXT: LET'S TALK →`

---

## Animation strategy

Each existing chapter uses `ChapterEditorialScene` for scroll-linked
reveals. That component is rigid (fixed 4-zone grid: media, header,
accent, details), and the new layouts don't fit that mould. Two options:

1. **Recommended — extract a `useChapterProgress()` hook** from
   `ChapterEditorialScene`. Each new Chapter component reads the
   `HorizontalTrackContext`, computes its local progress via the existing
   `getSlotLocalProgress`, and uses `framer-motion`'s `useTransform` to
   drive its own custom reveal of media / header / annotations / stats.

2. **Cheaper fallback** — wrap each block in `<Reveal>` (already exists
   in `components/motion/Reveal.tsx`) for a simple opacity+y entrance
   tied to viewport, ignoring the horizontal track. Slightly less
   delightful but works on both vertical-mobile and horizontal-desktop.

Recommended reveal **per chapter**:

- `0.00–0.35` — scene fades + clips in (matches existing media reveal)
- `0.05–0.40` — marker + title + chip slide up
- `0.20–0.55` — pills / megastats fade in
- `0.30–0.65` — annotations stagger up

Respect `useReducedMotion()` (already pattern in the codebase) — when
reduced, render everything statically with no transforms.

---

## Content

All copy lives in `content/chapters.ts` and `content/projects.ts`. The
new layouts read **the same fields** plus a few new ones. **No wording
changes.** Suggested additions to `content/chapters.ts`:

```ts
export type ChapterStats = readonly { value: string; label: string }[];

export const CHAPTER_STATS: Record<string, ChapterStats> = {
  foundation: [
    { value: "#1", label: "worldwide · FT 2025" },
    { value: "top 100", label: "/ 9,000 candidates" },
    { value: "3 years", label: "CPGE ECS" },
  ],
  corporateLab: [
    { value: "3-year", label: "master plan" },
    { value: "5,000+", label: "users" },
    { value: "12+", label: "initiatives" },
    { value: "15+", label: "workshops" },
  ],
  rocapine: [
    { value: "$5.6M", label: "annualized revenue" },
    { value: "315K", label: "monthly active users" },
    { value: "14", label: "active studios" },
    { value: "6", label: "apps shipped" },
  ],
};

export const ANNOTATIONS = {
  foundation: [
    { lead: "Master in Management — and a gap year to ship.",
      body: "Three years of CPGE before HEC, one semester abroad at Thammasat, and right now a deliberate break from the classroom to build real products. The credentials are nice; the gap year is the part I actually wanted." },
    { lead: "Vice-President of the Ski Club at HEC.",
      body: "Leading a team of 11, managing a €75K annual budget, organizing trips for 300+ students each year. The closest thing to running a small operation while still in school." },
  ],
  // … see tsx/ for the full set
};
```

(Full content additions in `tsx/content-additions.ts`.)

---

## Assets

All pixel-art images already exist at `public/pixel/*.png` and stay there
unchanged:

- `foundation.png` (1448×1086) — Ch I
- `corporate-lab.png` (1448×1086) — Ch II
- `builder-studio.png` (1896×829) — Ch III
- `shipping.png` (2048×768) — Ch IV
- `whats-next.png` (1896×829) — Ch VI
- `contact.png` (1672×941) — Ch VII (unchanged)
- `hero.png` (1916×821) — Hero (unchanged)

The `SceneIllustration` component is reused as-is. Always use
`object-fit: cover` and `image-rendering: pixelated`.

---

## Acceptance checklist

- [ ] Instrument Serif loaded, applied to titles' `<em>` and Annot indices
- [ ] Each chapter renders inside its 1280×800 slot without overflow
- [ ] Stats live in `Pill`s / `Megastat`s, not in body copy
- [ ] No "Stood out" card anywhere — replaced by `Annot`
- [ ] Project cards on Ch IV match the user-approved style (green dot
      icon top-left, status chip top-right, mono stack pills, Read more ↓)
- [ ] Reveal animations driven by `useChapterProgress()` (or `<Reveal>`),
      respecting `useReducedMotion()`
- [ ] Hero and Contact chapters are unchanged
- [ ] Wording matches `content/chapters.ts` 1:1

---

## Files

- `README.md` — this file
- `tsx/` — drop-in TSX for all 6 chapters + new UI primitives + content
  additions
- `mock/` — original HTML mock (open `Chapters Redesign.html` for
  reference; the design-canvas overlay is dev-only and not shipped)
- `mock/assets/` — pixel-art images used by the mock (mirrors of files
  already in the user's `public/pixel/`)
