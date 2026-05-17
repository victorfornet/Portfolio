# Horizontal Chapter Track — Design Spec

**Date:** 2026-05-17
**Status:** Approved, ready for implementation plan
**Scope:** Convert chapters I–V (Foundation, Corporate Lab, Builder Studio, Shipping, What's Next) into a horizontally-scrolling, vertically-pinned sequence on desktop. Hero and Contact keep their current vertical flow.

## Goal

When the user scrolls down past Hero, the chapters I–V section pins to the viewport and the user's vertical scroll input drives a horizontal pan through the five chapters. Once the last chapter passes, vertical scroll resumes and the Contact section appears normally.

## User-facing behavior

### Desktop (`lg` and up, ≥ 1024px)

1. Hero scrolls normally (vertical).
2. As the track enters the viewport, it pins (`position: sticky; top: 0`) at full viewport height.
3. The five chapters live in a horizontal flex track. Continued vertical scroll translates the track leftward.
4. Each chapter occupies a 100vw × 100vh slot. The existing two-column media + content layout is preserved inside each slot.
5. The image reveal animation that currently fires on vertical entry (clip-path left-to-right + parallax) is re-mapped so it fires as the chapter enters horizontally from the right edge.
6. Once the last chapter (What's Next) is centered, the pin releases and Contact scrolls into view vertically.

### Mobile and reduced motion (< `lg` or `prefers-reduced-motion`)

The five chapters render as a vertical stack with the current behavior. The pin and the horizontal translation are skipped entirely. This matches the current production behavior on those breakpoints.

### Navigation

- Nav bar pills remain functional. The active pill while inside the horizontal track is derived from the horizontal progress (slot index), not from `IntersectionObserver`.
- Clicking a nav anchor (e.g. `#builder-studio`) scrolls the page to the vertical scroll position that centers that chapter's slot inside the pinned viewport.

## Architecture

### New component: `HorizontalChapterTrack`

Location: `components/motion/HorizontalChapterTrack.tsx`

Responsibilities:

- Render an outer wrapper whose height is `N × 100vh` where N is the number of slides (5). This is what creates the scroll distance.
- Render an inner sticky container at `top: 0; height: 100vh; overflow: hidden`.
- Render a horizontal flex track of width `N × 100vw`, translated on the X axis based on the outer wrapper's `scrollYProgress`.
- Wrap children in a `HorizontalTrackContext.Provider` so each child (and any nested `ChapterScrollScene`) can read the track's progress and its own slot index.
- Detect viewport width and `prefers-reduced-motion`. Below `lg` or when reduced motion is set, render children in document order without pinning, translation, or context.

Translation math:

- `x = -progress × (N - 1) × 100vw` where `progress` is the outer wrapper's `scrollYProgress` clamped to `[0, 1]`.

Children:

- Each direct child is wrapped in a slot container of `width: 100vw; height: 100vh; flex-shrink: 0`. The slot is also where the slot index gets injected into context.

### Modified component: `ChapterScrollScene`

Location: `components/motion/ChapterScrollScene.tsx` (already exists)

Changes:

- Read `HorizontalTrackContext` via `useContext`.
- If the context is `null` (Hero, Contact, or mobile/reduced-motion path), behavior is unchanged from today.
- If the context is present, the local `scrollYProgress` driving `opacity`, `clipPath`, and parallax `y` is derived from the track's overall progress, focused on the slot's horizontal entry window. With N slots, slot `i` is centered when `trackProgress = i / (N - 1)` and its entry window from the right edge spans `[(i - 1) / (N - 1), i / (N - 1)]`. The local progress is therefore:

  ```
  localProgress = clamp((trackProgress - (i - 1) / (N - 1)) × (N - 1), 0, 1)
  ```

  For slot 0 there is no horizontal entry (it is already centered at `trackProgress = 0`). Slot 0 instead derives its local progress from the outer wrapper's vertical entry into the viewport (the same `["start end", "center start"]` offset used today), so the first chapter's reveal plays during the vertical scroll into the pinned track — preserving the current first-chapter feel.

- The same `useTransform` mappings (`[0, 0.35]` for the reveal, `[0, 0.5]` for parallax) keep working unchanged on top of that local progress.

This keeps every chapter file (`ChapterFoundation`, `ChapterCorporateLab`, …) untouched.

### New context: `HorizontalTrackContext`

Co-located with `HorizontalChapterTrack`. Shape:

```ts
type HorizontalTrackContextValue = {
  trackProgress: MotionValue<number>;  // 0..1 across the whole track
  slotCount: number;
  slotIndex: number;                   // injected per slot
};
```

The provider wraps each slot with its own `slotIndex`. `ChapterScrollScene` uses `slotIndex` + `slotCount` to compute the local window.

### Modified hook: `useActiveChapter`

Location: `lib/use-active-chapter.ts`

Changes:

- Accept an optional descriptor of the horizontal track: the ordered IDs inside it, the DOM ref of the outer wrapper, and the slot count.
- When the page's `scrollY` is within the outer wrapper's vertical range, return the chapter whose slot is closest to centered based on horizontal progress, instead of the IntersectionObserver result.
- Outside the track range, fall back to today's IntersectionObserver behavior for Hero, Contact, and the wrapper itself.

### Modified component: `NavBar`

Location: `components/ui/NavBar.tsx`

Changes:

- Pass the horizontal track descriptor into `useActiveChapter` (the IDs of the five wrapped chapters and a ref to the outer wrapper exposed via context or a small global).
- Intercept clicks on the five wrapped chapter anchors. Instead of relying on `:target` / native hash scroll (which would scroll to a translated element with stale layout), compute the absolute Y position to scroll to: `wrapperTop + (slotIndex / (slotCount - 1)) × (wrapperHeight - viewportHeight)`. Use `scrollTo({ top, behavior: 'smooth' })` so Lenis picks it up.
- Anchors for Hero and Contact keep native behavior.

### Modified file: `app/page.tsx`

Wrap the five middle chapters in `HorizontalChapterTrack`:

```tsx
<main>
  <Hero />
  <HorizontalChapterTrack>
    <ChapterFoundation />
    <ChapterCorporateLab />
    <ChapterBuilderStudio />
    <ChapterShipping />
    <ChapterWhatsNext />
  </HorizontalChapterTrack>
  <ChapterContact />
</main>
```

## Data flow

```
window scroll (Lenis-smoothed)
        │
        ▼
HorizontalChapterTrack outer wrapper
  useScroll({ target: wrapperRef })
        │  scrollYProgress: 0..1
        ▼
HorizontalTrackContext.Provider
   ├─→ horizontal track translate X
   └─→ each ChapterScrollScene reads trackProgress + slotIndex
            │
            ▼
       local progress = clamp((trackProgress - (i-1)/(N-1)) × (N-1), 0, 1)
                        (slot 0 uses wrapper's vertical entry instead)
            │
            ▼
       feeds opacity / clipPath / y transforms (unchanged math)
```

## Edge cases

- **Resize across the `lg` breakpoint.** The track re-mounts on layout change (or watches `matchMedia` and swaps render branch). Treat this as a full re-render rather than trying to preserve scroll position across modes.
- **Anchor click while pin is engaged.** Handled by the custom click handler above — we always scroll to the absolute Y of the target slot, never rely on the DOM position of the translated child.
- **Deep link / page load with hash `#builder-studio`.** On mount, if the hash matches a chapter inside the track and we're in horizontal mode, run the same custom scroll math. Hero and Contact hashes keep native behavior.
- **Browser scroll restoration.** Standard Next.js behavior; nothing extra needed.
- **`ScrollProgress` indicator (vertical).** Unchanged. It already reflects whole-page progress, which naturally advances while the user scrolls through the pinned section.

## Out of scope

- Horizontal progress indicator (dots, slide numbers, arrows). Not added in this iteration.
- Per-slide snap. Progression is continuous and proportional to scroll, no snap.
- Touch-based horizontal swipe on mobile. Mobile keeps the vertical stack.
- Changing the layout inside each chapter (media + text two-column structure stays).
- Any modification to `Hero`, `ChapterContact`, `CinematicBackground`, or `SmoothScrollProvider`.

## Acceptance criteria

1. Scrolling from the top of the page passes Hero, pins the chapter track, advances horizontally through chapters I → V, releases, and reveals Contact — all with one continuous vertical scroll gesture.
2. The image reveal animation in each chapter still plays as that chapter becomes visible (now from the right edge, horizontally), with the same clip-path + parallax feel as today.
3. The nav bar pill highlights the chapter currently centered in the pinned viewport.
4. Clicking any nav pill scrolls the page so the corresponding chapter is centered (or for Hero/Contact, the section reaches the viewport normally).
5. Below `lg` or under `prefers-reduced-motion`, the page renders exactly as today — vertical stack, no pinning.
6. No regression in `SmoothScrollProvider`, `ScrollProgress`, `CustomCursor`, or `CinematicBackground` behavior.
