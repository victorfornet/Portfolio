# Portfolio v2 — Design Spec

**Author:** Victor Fornet
**Date:** 2026-05-16
**Project:** `potfolio2` — personal portfolio website
**Status:** Design approved, ready for implementation planning

---

## 1. Vision

A single-page cinematic scroll experience that tells Victor's founder journey as a 7-chapter narrative, set inside a Cofounder-inspired pixel-art world.

The site positions Victor as a startup-oriented builder (product + growth + technical) rather than a traditional business school student. Visitors should leave with three clear takeaways:

1. Victor builds and ships consumer apps hands-on.
2. He combines product thinking, growth understanding, and technical curiosity.
3. He's open to founder collaborations and pre-seed product roles.

**Primary visual inspiration:** [Cofounder](https://cofounder.com) — bright pixel-art world, blue sky, floating white task cards, soft shadows, modern startup landing page mixed with pixel-art game aesthetic.

**Narrative arc:** chronological journey — HEC Paris → BearingPoint → Rocapine → side projects → what's next → contact.

---

## 2. Decisions Locked In

| Area | Decision |
|---|---|
| Design approach | Hybrid: every chapter has a pixel-art scene as backdrop/companion, but all content UI (cards, typography, buttons) is modern (clean white cards, soft shadows, sans-serif). The hero is the most pixel-art-immersive moment; subsequent chapters balance the pixel scene with more breathing room for modern UI. |
| Language | English only |
| Tech stack | Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lenis (smooth scroll) |
| Structure | Single-page scroll, no separate project pages — projects use expandable cards |
| Narrative | Chronological "The Journey" with 7 chapters |
| Character | No avatar — scenes and cards only |
| Color palette | Direct Cofounder: blue sky, green grass, white floating cards, soft shadows |
| Animations | Full suite: parallax, animated sprites, scroll reveals, chapter transitions, hover micro-interactions, custom cursor + particles |
| Copy voice | Narrative + personal (founder blog tone), first-person, short sentences |
| Contact | Email + LinkedIn + GitHub (no Calendly, no contact form) |
| Sound | None |
| Deployment | Vercel |

---

## 3. Architecture

### 3.1 File structure (target)

```
potfolio2/
├── app/
│   ├── layout.tsx              # Root layout, fonts, cursor, smooth scroll provider
│   ├── page.tsx                # Single-page entry — composes all chapters
│   ├── globals.css             # Tailwind + custom CSS (cursor, scrollbar)
│   └── opengraph-image.tsx     # OG image generator
├── components/
│   ├── chapters/
│   │   ├── Hero.tsx                    # Chapter 0
│   │   ├── ChapterFoundation.tsx       # Chapter I — HEC
│   │   ├── ChapterCorporateLab.tsx     # Chapter II — BearingPoint
│   │   ├── ChapterBuilderStudio.tsx    # Chapter III — Rocapine + What I do
│   │   ├── ChapterShipping.tsx         # Chapter IV — Projects
│   │   ├── ChapterWhatsNext.tsx        # Chapter V — Vision
│   │   └── ChapterContact.tsx          # Chapter VI — Contact
│   ├── pixel/
│   │   ├── HeroScene.tsx               # Pixel-art hero scene (parallax layers)
│   │   ├── CampusScene.tsx
│   │   ├── OfficeScene.tsx
│   │   ├── StudioScene.tsx
│   │   ├── WorkshopScene.tsx
│   │   ├── HorizonScene.tsx
│   │   ├── SunsetScene.tsx
│   │   └── sprites/                    # Reusable animated sprites
│   │       ├── Cloud.tsx
│   │       ├── Ladybug.tsx
│   │       ├── CoffeeSteam.tsx
│   │       └── Flag.tsx
│   ├── ui/
│   │   ├── TaskCard.tsx                # Cofounder-style floating card
│   │   ├── ChapterCard.tsx             # Larger chapter content card
│   │   ├── ProjectCard.tsx             # Expandable project card
│   │   ├── NavBar.tsx                  # Floating top navigation
│   │   ├── ScrollProgress.tsx          # Bottom scroll progress bar
│   │   ├── CustomCursor.tsx            # Pixel-art cursor + particle trail
│   │   └── CTA.tsx                     # Reusable button with hover glow
│   └── motion/
│       ├── Reveal.tsx                  # Scroll-triggered fade-up wrapper
│       ├── Parallax.tsx                # Scroll-driven parallax wrapper
│       └── ChapterTransition.tsx       # Palette + zoom transitions
├── content/
│   ├── chapters.ts                     # All copy, exported as typed constants
│   └── projects.ts                     # Project data (title, status, body, etc.)
├── lib/
│   └── motion-presets.ts               # Reusable Framer Motion variants
├── public/
│   ├── pixel/                          # PNG/SVG pixel-art assets
│   └── fonts/                          # Custom fonts (see §5)
├── docs/
│   └── superpowers/specs/              # This spec
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

### 3.2 Boundaries and responsibilities

- **`chapters/*`** — Layout + composition. Pulls copy from `content/chapters.ts`, places pixel scene + UI components. No animation logic beyond passing props.
- **`pixel/*`** — Pure visual components. Receive `scrollProgress` or animation state via props. No content.
- **`ui/*`** — Reusable visual primitives. Style-only, content via props.
- **`motion/*`** — Animation wrappers. Receive children, apply animation behavior. No business logic.
- **`content/*`** — All text. Typed constants only. Changing copy never requires touching components.

This separation means: editing copy → `content/`, editing visuals → `pixel/`, editing animations → `motion/`. A future Victor (or contributor) can change wording without touching layout.

---

## 4. Chapter-by-chapter spec

> Copy below is the v1 draft, approved during brainstorming. Wording can be iterated post-spec without changing structure.

### Chapter 0 — Hero

**Scene:** Fullscreen pixel-art Cofounder-style. Blue sky with parallax cumulus clouds, pixelated grass foreground, Paris-stylized skyline in mid-ground. Right-of-center: laptop on grass, smartphone, notebook, animated ladybug sprite (4-frame walk loop). 3 floating task cards stagger in above the laptop.

**Copy:**
```
H1: I build consumer apps — from idea to growth.
Subtitle: Product & Growth at Rocapine. Building Vibo on the side.
          Studying at HEC Paris, learning by shipping.
CTAs: [See what I'm building] [LinkedIn ↗] [GitHub ↗]
Task cards:
  ● Currently building — Vibo
  ● Shipping — Growth experiments
  ● Open to — Builder collabs
```

**Animations:**
- Cloud layer: horizontal loop, 30s, parallax depth 0.3
- Ladybug: 4-frame sprite walk, 1s/cycle
- Task cards: stagger reveal (250ms each), fade + slide-up
- Headline: line-by-line type-in on mount (subtle, ~600ms total)
- CTAs hover: lift 4px + soft blue glow
- Scroll indicator: pulsing pixel arrow at bottom

### Chapter I — The Foundation

**Scene:** Sky shifts to dawn (pale blue-violet). Stylized university campus pixel-art (generic columned building, trees, bench, floating open book). Palette softens. Layout: pixel scene 40% left, text + card 60% right.

**Copy:**
```
Chapter label: Chapter I
H2: It started at HEC Paris.
Body: I'm doing a gap year built around one question:
      how do consumer products actually get built, tested,
      and scaled?

      Not the theory version. The real one — the messy
      middle between an idea and a product people use
      every day.

      So I went to find people doing it.
Card: ● Active
      HEC Paris — Gap year
      Focus: startups, product, growth
```

**Animations:**
- Palette transition from Hero: 300ms ease
- Book sprite: sin-wave float loop
- Text: scroll-triggered fade-up (Framer Motion `whileInView`)
- Card: slide-from-right, 400ms delay
- Card hover: 3D tilt, max 5°

### Chapter II — The Corporate Lab

**Scene:** Sky cools to grey-blue. Right-side pixel-art: stylized open-space (cubicles, monitor with simplified Gantt, plant, animated coffee steam). Palette: blue-steel + coral accents. Layout: text left, scene right (alternates with Chapter I for rhythm).

**Copy:**
```
Chapter label: Chapter II
H2: The first stop was consulting.
Body: I joined BearingPoint to work on digital transformation
      projects for the public sector.

      I sat with people who used software they hated.
      I watched information systems get deployed at scale.
      I learned how organizations resist change, and how
      products actually land in users' hands.

      It was slow. It was real. It taught me to care about
      the gap between what a product promises and what
      people actually experience.

      That gap is where I want to spend my career.
Card: ● Completed
      BearingPoint — Consultant
      Digital transformation · Public sector
      User needs · IS deployment · Change management
```

**Animations:**
- Palette transition: bright blue → blue-steel, 600ms
- Coffee steam: 8-frame sprite loop
- Gantt screen: slow horizontal fill loop
- Card: fade-up reveal
- Closing line *"That gap is where I want to spend my career."* — pixel-art underline traces left-to-right on viewport entry

### Chapter III — The Builder's Studio

**Scene:** Sky returns to bright Cofounder blue. Centered pixel-art: open workshop with 4-5 smartphones levitating around an open laptop, each phone showing a different app screen (onboarding, paywall, dashboard, ad creative). Pulsing growth bolts. Palette: bright blue + yellow accent.

**Copy:**
```
Chapter label: Chapter III
H2: Now I build at Rocapine.
Body: Rocapine is a mobile app publisher. We build, test
      and scale consumer apps from scratch.

      My job is hands-on: scout promising studios, analyze
      product opportunities, improve onboarding and monetization,
      test ad concepts, follow growth metrics, and turn data
      into product iterations.

      It's the closest I've found to early-stage building
      with real budgets and real users.

What I do (6-card grid):
  🛠️ Product & Growth — Onboarding, paywalls, retention.
  📱 Consumer Apps — Mobile-first, B2C, fast iteration.
  ⚡ Growth Experiments — UA, creative testing, funnels.
  🤖 AI Tools — LLM-powered products and internal tools.
  🚀 Mobile MVPs — Idea → TestFlight in weeks.
  🧩 Internal Systems — CRMs, dashboards, scouting tools.
```

**Animations:**
- Phones levitating: sin-wave loop, staggered phases
- Growth bolts: 2s pulse cycle
- 6 cards: stagger reveal at viewport entry
- Card hover: 3D tilt + sprite icon plays one anim frame

### Chapter IV — Things I'm Shipping

**Scene:** Builder workshop. Pixel-art workbench with project "cartridges" (game-cartridge style boxes), background monitor with scrolling code. Palette: purple + night blue (coding mood).

**Copy:**
```
Chapter label: Chapter IV
H2: Things I'm shipping.
Body (lead): Side projects are how I learn the stack. Some are
             tools I needed at work. Some are bets on where
             consumer software is going.

Projects (2x2 grid of expandable cards):

  ● Building — Vibo
    A mobile app teaching non-technical people
    to ship with AI coding tools.
    React Native · Expo · TypeScript

  ● Internal tool — Creative Testing Dashboard
    A dashboard to analyze ad creatives and
    growth metrics at Rocapine.

  ● Open-source — Consumer App Starter Kit
    A React Native starter kit for early-stage
    consumer apps: auth, paywall, analytics,
    ready to ship in a weekend.

  ● Internal tool — App Scouting CRM
    A CRM to manage app scouting and studio outreach.
```

**Expanded card content (on click):** problem, approach, screenshots (pixel-art placeholder frames until real ones exist), status, live link if available.

**Animations:**
- Cards: stagger reveal
- Hover: lift + violet glow
- Click: smooth height expand
- Cartridge sprite: slide in/out of card frame

### Chapter V — What's Next

**Scene:** Sunrise. Purple lifts to orange. Pixel-art road leading to a mountain in the distance with a small flag at the summit. Stars fading out. Palette: sunrise orange + dawn pink. Layout: centered text (max-width 600px), 2 cards below. More breathing room.

**Copy:**
```
Chapter label: Chapter V
H2: Where I'm going.
Body: I want to spend the next decade building consumer
      products with founders who move fast — AI-powered
      apps, growth systems, and the messy infrastructure
      underneath.

      Eventually, I'll start my own. For now, I'm getting
      the reps in: shipping, breaking things, learning
      the stack, and finding the people I want to build with.

Cards (2):
  ● Open to — Founder collabs
    Building consumer apps and AI tools.

  ● Curious about — Pre-seed product roles
    Where I can ship, not just advise.
```

**Animations:**
- Sun rises: slow parallax, 3s ease-out, scroll-driven
- Stars: fade out one by one, staggered
- Flag: flutter sprite loop
- Cards: fade-up reveal

### Chapter VI — Let's Build Something

**Scene:** Golden-hour return to the Hero pixel-art world. Open laptop showing a mailto screen. Pixel-art path leading off-screen. Palette: warm sunset + same Cofounder blues. Layout: centered, large headline, 3 large CTA buttons in a row.

**Copy:**
```
Chapter label: Chapter VI
H2 (large): Let's build something.
Body (small): If you're working on consumer apps, AI products,
              or anything ambitious — I'd love to talk.

CTAs (3 large buttons):
  [✉ Email me] [in LinkedIn] [⌨ GitHub]

Footer (tiny, mono):
  Made by Victor Fornet · 2026 · pixel-art with care
```

**Animations:**
- Sunset palette: slow horizontal parallax
- Laptop screen: gentle blink loop
- Buttons hover: lift + brand-colored glow (blue / LinkedIn-blue / dark)
- Click: subtle pixel-art confetti burst

---

## 5. Global UI components

### 5.1 Navigation bar (`NavBar.tsx`)

- Floating top, glass-blur dark pill (matches Cofounder)
- Items: `How I build · Journey · Projects · Contact`
- Scroll-spy: active item highlights based on visible chapter
- On scroll-down: navbar slides up; on scroll-up: slides back in
- Mobile: collapses to a hamburger that opens a fullscreen pixel-art menu

### 5.2 Custom cursor (`CustomCursor.tsx`)

- 8×8px pixel-art reticle (crosshair-style)
- Particle trail: 5–8 particles, opacity 0.3, fade out over 400ms
- Hover state on interactive elements: cursor scales 1.5x, color flips to white
- Disabled on touch devices

### 5.3 Scroll progress (`ScrollProgress.tsx`)

- Thin bar fixed to bottom of viewport (3px)
- Pixel-art fill: chunked 4px squares as it progresses
- Color matches current chapter's palette

### 5.4 Reusable card primitives

- **`TaskCard`** — Cofounder-style small floating card: green status dot, label, content. White bg, soft shadow, 6px radius.
- **`ChapterCard`** — Larger card for chapter body content. Same visual language but more padding.
- **`ProjectCard`** — Expandable card with toggle state, animated height transition.

### 5.5 Typography

- **Headings:** A modern sans-serif (Inter Tight, or General Sans). Tight tracking, semibold.
- **Body:** Same family, regular weight, generous line-height (1.6).
- **Chapter labels + footer + code accents:** A mono font (JetBrains Mono or IBM Plex Mono).
- **Pixel-art labels (in-scene only):** A pixel font (PixelOperator or Press Start 2P), used sparingly — only when rendered inside pixel scenes.

---

## 6. Pixel-art assets

### 6.1 Approach

Each pixel scene composed of multiple PNG/SVG layers, positioned absolutely and animated independently for parallax depth.

### 6.2 Asset list (per chapter)

- **Hero:** sky bg, clouds (3 variants), city skyline, grass foreground, laptop, smartphone, notebook, ladybug (4-frame sprite)
- **Foundation:** dawn sky, campus building, trees, bench, floating book
- **Corporate Lab:** muted sky, open-space backdrop, monitor with Gantt, plant, coffee mug + steam sprite
- **Builder Studio:** bright sky, 4–5 smartphone variants (each showing a different mock app), open laptop, growth bolts
- **Shipping:** workbench, 4 cartridge boxes, code monitor (scrolling text loop), tools (small accents)
- **What's Next:** sunrise sky, road, mountain + flag, stars (fading)
- **Contact:** sunset sky, laptop with mailto screen, path off-screen

### 6.3 Production strategy

Assets produced via one of three paths (decided during implementation, not in this spec):

1. AI-generated pixel-art (Aseprite-style models)
2. Commissioned from a pixel-art illustrator
3. Stock pixel-art libraries with custom tweaks

All assets exported at 2x and 3x for retina + zoom resilience. Use `image-rendering: pixelated` CSS for crisp pixel scaling.

---

## 7. Animation system

### 7.1 Libraries

- **Framer Motion** — for component-level animations (reveals, hover, tilt, stagger, height transitions)
- **Lenis** — for smooth scroll behavior across the whole page
- **CSS animations** — for sprite frame loops (steps() function) and infinite background loops

### 7.2 Performance targets

- 60fps on mid-range MacBook (M1) at 1440p
- 60fps on iPhone 13+ at native resolution
- Graceful degradation on lower-end devices: respect `prefers-reduced-motion` and disable parallax + particles + sprite loops in that case

### 7.3 Animation primitives (in `lib/motion-presets.ts`)

```ts
fadeUp        // Chapter content reveals
slideFromLeft // Cards from the side
slideFromRight
stagger       // Multi-card grids (stagger children)
tilt3D        // Card hover tilt
glow          // Button hover glow
paletteShift  // Inter-chapter background color transition
parallax      // Multi-layer scroll-driven movement
```

---

## 8. Responsive behavior

- **Desktop (≥1280px):** Full experience — all animations, parallax, custom cursor, pixel scenes at full size
- **Tablet (768–1279px):** Pixel scenes scale to ~70%, parallax preserved, cursor reverts to system, layout adapts to single-column where 2-column was used
- **Mobile (<768px):** Pixel scenes simplified (fewer layers, no parallax on small screens for perf), chapter cards stack vertically, custom cursor disabled, animations preserved but lighter, nav collapses to fullscreen pixel menu

The 6-card "What I do" grid becomes 1-column on mobile, 2-column on tablet, 3-column on desktop.
The 4-project 2×2 grid becomes 1-column on mobile, 2-column from tablet up.

---

## 9. SEO and metadata

- `<title>` — "Victor Fornet — I build consumer apps from idea to growth"
- `<meta name="description">` — "Product & Growth at Rocapine. Building Vibo. HEC Paris gap year. Open to founder collabs and pre-seed product roles."
- OG image — Generated via `app/opengraph-image.tsx`, reuses the Hero pixel-art scene with headline overlay
- `robots.txt` — Allow all
- `sitemap.xml` — Single page, auto-generated
- Structured data: `Person` schema with name, jobTitle, affiliations (Rocapine, HEC Paris), sameAs (LinkedIn, GitHub)

---

## 10. Accessibility

- All pixel-art images: descriptive `alt` text (e.g., "Pixel-art workshop with floating smartphones showing app screens")
- Custom cursor never replaces system cursor on `:focus` (keyboard navigation always visible)
- All animations respect `prefers-reduced-motion: reduce` — disabled and fallback to static layouts
- Color contrast: all text on pixel-art backgrounds must pass WCAG AA (4.5:1) — verified per chapter; if a section fails, add a semi-transparent backdrop behind the text
- Keyboard navigation: Tab through nav, CTAs, and expandable project cards in logical order; Enter/Space toggles expand
- Screen reader: chapter labels announce semantic structure ("Chapter 3 of 7")

---

## 11. What's out of scope (YAGNI)

- Multi-language (FR/EN toggle) — English only
- Blog / writing section — not in this version
- CMS — copy lives in `content/*.ts` and is edited in-repo
- Analytics dashboard — Vercel Analytics is enough
- Contact form — direct CTAs only
- Calendly integration — direct CTAs only
- Sound effects / music — none
- Dedicated project pages — expandable cards instead
- Avatar character animation — scenes only
- Server-side anything — fully static site

---

## 12. Open questions for implementation phase

These don't block the design but will need decisions during the writing-plans phase:

1. Pixel-art asset production path (AI / commissioned / stock + tweak)
2. Exact fonts (Inter Tight vs. General Sans vs. other; choice of pixel font)
3. Exact hex values for each chapter's palette
4. Real screenshots for project cards (when available) vs. pixel-art placeholders for v1
5. Domain name (victorfornet.com? fornet.dev? fornet.build?)
6. Vibo / other projects: do they have public links or do the cards stay info-only at launch?

---

## 13. Success criteria

The site is "done" when:

- All 7 chapters render with their final copy and pixel scenes
- Smooth scroll + parallax + chapter transitions work at 60fps on the target devices
- Mobile experience preserves the narrative even with simplified visuals
- Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
- A first-time visitor reaches the contact CTAs within a comfortable 2–4 minute scroll
- Three friends and one founder review it and confirm the positioning lands

---

*End of design spec.*
