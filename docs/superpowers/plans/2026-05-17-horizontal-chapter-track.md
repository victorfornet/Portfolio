# Horizontal Chapter Track Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert chapters I–V into a vertically-pinned, horizontally-scrolling sequence on desktop while keeping Hero and Contact vertical, and falling back to a vertical stack on mobile and under reduced motion.

**Architecture:** A new `HorizontalChapterTrack` wraps the five middle chapters. Its outer wrapper is `5 × 100vh` tall and contains a `sticky` inner that holds a `flex` track translated horizontally based on the wrapper's `scrollYProgress`. Each direct child becomes a 100vw slot. A `HorizontalTrackContext` exposes the track's `MotionValue<number>` progress + the slot index of each child so `ChapterScrollScene` can remap its reveal animation to horizontal entry. The `NavBar` click handler and `useActiveChapter` hook learn about the track via a small descriptor so anchors and active state both keep working.

**Tech Stack:** Next.js 16, React 19, framer-motion 12, Lenis (smooth scroll), Tailwind 4, Vitest + React Testing Library.

**Spec reference:** `docs/superpowers/specs/2026-05-17-horizontal-chapter-track-design.md`

---

## File Structure

**Create:**
- `lib/horizontal-track-math.ts` — pure functions: `getSlotLocalProgress`, `getSlotScrollY`
- `tests/horizontal-track-math.test.ts` — unit tests for the helpers
- `components/motion/HorizontalChapterTrack.tsx` — the track component, the context, and the slot wrapper
- `tests/HorizontalChapterTrack.test.tsx` — rendering + context smoke tests

**Modify:**
- `components/motion/ChapterScrollScene.tsx` — consume the new context, derive local progress for slots ≥ 1
- `lib/use-active-chapter.ts` — accept optional horizontal-track descriptor, branch on scroll range
- `tests/use-active-chapter.test.tsx` — add coverage for horizontal mode
- `components/ui/NavBar.tsx` — intercept clicks on chapter anchors that live inside the track, scroll to the computed Y
- `app/page.tsx` — wrap chapters I–V in `HorizontalChapterTrack`

---

### Task 1: Pure math helpers

**Files:**
- Create: `lib/horizontal-track-math.ts`
- Test: `tests/horizontal-track-math.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// tests/horizontal-track-math.test.ts
import { describe, it, expect } from "vitest";
import {
  getSlotLocalProgress,
  getSlotScrollY,
} from "@/lib/horizontal-track-math";

describe("getSlotLocalProgress", () => {
  it("returns 1 for slot 0 regardless of progress (slot 0 uses vertical entry)", () => {
    expect(getSlotLocalProgress(0, 0, 5)).toBe(1);
    expect(getSlotLocalProgress(0.5, 0, 5)).toBe(1);
    expect(getSlotLocalProgress(1, 0, 5)).toBe(1);
  });

  it("maps slot 1's entry window [0, 0.25] to [0, 1] with N=5", () => {
    expect(getSlotLocalProgress(0, 1, 5)).toBe(0);
    expect(getSlotLocalProgress(0.125, 1, 5)).toBeCloseTo(0.5);
    expect(getSlotLocalProgress(0.25, 1, 5)).toBe(1);
  });

  it("clamps below the entry window to 0 and above to 1", () => {
    expect(getSlotLocalProgress(0.3, 2, 5)).toBe(0); // window is [0.25, 0.5]
    expect(getSlotLocalProgress(0.6, 2, 5)).toBe(1);
  });

  it("maps the last slot's window to [0.75, 1] with N=5", () => {
    expect(getSlotLocalProgress(0.75, 4, 5)).toBe(0);
    expect(getSlotLocalProgress(1, 4, 5)).toBe(1);
  });

  it("returns 1 when slotCount is 1", () => {
    expect(getSlotLocalProgress(0.5, 0, 1)).toBe(1);
  });
});

describe("getSlotScrollY", () => {
  it("returns wrapperTop for slot 0", () => {
    expect(
      getSlotScrollY({
        wrapperTop: 1000,
        wrapperHeight: 5000,
        viewportHeight: 1000,
        slotIndex: 0,
        slotCount: 5,
      }),
    ).toBe(1000);
  });

  it("returns wrapperTop + full scrollable distance for the last slot", () => {
    expect(
      getSlotScrollY({
        wrapperTop: 1000,
        wrapperHeight: 5000,
        viewportHeight: 1000,
        slotIndex: 4,
        slotCount: 5,
      }),
    ).toBe(5000); // 1000 + (5000 - 1000)
  });

  it("interpolates linearly for middle slots", () => {
    expect(
      getSlotScrollY({
        wrapperTop: 1000,
        wrapperHeight: 5000,
        viewportHeight: 1000,
        slotIndex: 2,
        slotCount: 5,
      }),
    ).toBe(3000); // 1000 + 0.5 × 4000
  });

  it("returns wrapperTop when slotCount is 1", () => {
    expect(
      getSlotScrollY({
        wrapperTop: 500,
        wrapperHeight: 1000,
        viewportHeight: 1000,
        slotIndex: 0,
        slotCount: 1,
      }),
    ).toBe(500);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test tests/horizontal-track-math.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
// lib/horizontal-track-math.ts
export function getSlotLocalProgress(
  trackProgress: number,
  slotIndex: number,
  slotCount: number,
): number {
  if (slotCount <= 1 || slotIndex <= 0) return 1;
  const step = 1 / (slotCount - 1);
  const windowStart = (slotIndex - 1) * step;
  const local = (trackProgress - windowStart) / step;
  if (local <= 0) return 0;
  if (local >= 1) return 1;
  return local;
}

export type SlotScrollYArgs = {
  wrapperTop: number;
  wrapperHeight: number;
  viewportHeight: number;
  slotIndex: number;
  slotCount: number;
};

export function getSlotScrollY({
  wrapperTop,
  wrapperHeight,
  viewportHeight,
  slotIndex,
  slotCount,
}: SlotScrollYArgs): number {
  if (slotCount <= 1) return wrapperTop;
  const scrollableDistance = wrapperHeight - viewportHeight;
  const t = slotIndex / (slotCount - 1);
  return wrapperTop + t * scrollableDistance;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test tests/horizontal-track-math.test.ts`
Expected: PASS — 9 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/horizontal-track-math.ts tests/horizontal-track-math.test.ts
git commit -m "feat(motion): pure math helpers for horizontal chapter track"
```

---

### Task 2: HorizontalChapterTrack — context module + slot wrapping (no animation yet)

**Files:**
- Create: `components/motion/HorizontalChapterTrack.tsx`
- Test: `tests/HorizontalChapterTrack.test.tsx`

This task lands the component skeleton — context, slot enumeration, and basic rendering. Pinning and translation are added in Task 3. This split keeps each commit reviewable.

- [ ] **Step 1: Write the failing test**

```tsx
// tests/HorizontalChapterTrack.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useContext } from "react";
import {
  HorizontalChapterTrack,
  HorizontalTrackContext,
} from "@/components/motion/HorizontalChapterTrack";

function SlotProbe({ id }: { id: string }) {
  const ctx = useContext(HorizontalTrackContext);
  return (
    <div data-testid={id} data-slot-index={ctx?.slotIndex ?? "none"}>
      {id}
    </div>
  );
}

describe("HorizontalChapterTrack", () => {
  it("renders every child", () => {
    render(
      <HorizontalChapterTrack>
        <SlotProbe id="a" />
        <SlotProbe id="b" />
        <SlotProbe id="c" />
      </HorizontalChapterTrack>,
    );
    expect(screen.getByTestId("a")).toBeInTheDocument();
    expect(screen.getByTestId("b")).toBeInTheDocument();
    expect(screen.getByTestId("c")).toBeInTheDocument();
  });

  it("exposes slotIndex via context for each child", () => {
    render(
      <HorizontalChapterTrack>
        <SlotProbe id="a" />
        <SlotProbe id="b" />
        <SlotProbe id="c" />
      </HorizontalChapterTrack>,
    );
    expect(screen.getByTestId("a")).toHaveAttribute("data-slot-index", "0");
    expect(screen.getByTestId("b")).toHaveAttribute("data-slot-index", "1");
    expect(screen.getByTestId("c")).toHaveAttribute("data-slot-index", "2");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/HorizontalChapterTrack.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the minimal implementation**

```tsx
// components/motion/HorizontalChapterTrack.tsx
"use client";
import { Children, createContext, type ReactNode } from "react";
import { type MotionValue, useMotionValue } from "framer-motion";

export type HorizontalTrackContextValue = {
  trackProgress: MotionValue<number>;
  slotIndex: number;
  slotCount: number;
};

export const HorizontalTrackContext =
  createContext<HorizontalTrackContextValue | null>(null);

export function HorizontalChapterTrack({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const slotCount = items.length;
  const trackProgress = useMotionValue(0);

  return (
    <div data-horizontal-track data-slot-count={slotCount}>
      {items.map((child, i) => (
        <HorizontalTrackContext.Provider
          key={i}
          value={{ trackProgress, slotIndex: i, slotCount }}
        >
          {child}
        </HorizontalTrackContext.Provider>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test tests/HorizontalChapterTrack.test.tsx`
Expected: PASS — both tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/motion/HorizontalChapterTrack.tsx tests/HorizontalChapterTrack.test.tsx
git commit -m "feat(motion): HorizontalChapterTrack scaffold + context"
```

---

### Task 3: HorizontalChapterTrack — desktop pin + horizontal translation

**Files:**
- Modify: `components/motion/HorizontalChapterTrack.tsx` (full file rewrite below)

Add the sticky outer/inner structure and the horizontal translate driven by `useScroll`. The mobile / reduced-motion fallback lands in Task 4.

- [ ] **Step 1: Replace the file with the animated version**

```tsx
// components/motion/HorizontalChapterTrack.tsx
"use client";
import { Children, createContext, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type HorizontalTrackContextValue = {
  trackProgress: MotionValue<number>;
  slotIndex: number;
  slotCount: number;
};

export const HorizontalTrackContext =
  createContext<HorizontalTrackContextValue | null>(null);

export function HorizontalChapterTrack({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const slotCount = items.length;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `-${(slotCount - 1) * 100}vw`],
  );

  return (
    <div
      ref={wrapperRef}
      data-horizontal-track
      data-slot-count={slotCount}
      style={{ height: `${slotCount * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{
            x: trackX,
            width: `${slotCount * 100}vw`,
          }}
          className="flex h-full"
        >
          {items.map((child, i) => (
            <HorizontalTrackContext.Provider
              key={i}
              value={{ trackProgress: scrollYProgress, slotIndex: i, slotCount }}
            >
              <div className="h-full w-screen shrink-0">{child}</div>
            </HorizontalTrackContext.Provider>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run the existing tests to verify nothing broke**

Run: `pnpm test tests/HorizontalChapterTrack.test.tsx`
Expected: PASS — both tests from Task 2 still pass. (jsdom doesn't render the transform; the test just verifies children + context.)

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/motion/HorizontalChapterTrack.tsx
git commit -m "feat(motion): pin + horizontal translate in HorizontalChapterTrack"
```

---

### Task 4: HorizontalChapterTrack — responsive + reduced-motion fallback

**Files:**
- Modify: `components/motion/HorizontalChapterTrack.tsx`
- Modify: `tests/HorizontalChapterTrack.test.tsx`

Below `lg` (1024px) or when `prefers-reduced-motion: reduce`, render children as a simple vertical stack with no context provided (so `ChapterScrollScene` falls back to its current vertical behavior).

- [ ] **Step 1: Add a failing test for the fallback path**

Add this test to `tests/HorizontalChapterTrack.test.tsx`:

```tsx
// inside describe("HorizontalChapterTrack", ...) — add the import too
import { vi } from "vitest";
// at module scope, above the describe:
function setMatchMedia(matches: boolean) {
  const mql = (q: string) => ({
    matches,
    media: q,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
  (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia =
    mql as unknown as (q: string) => MediaQueryList;
}

// new test inside the describe block:
it("renders children without horizontal-track context in fallback mode", () => {
  setMatchMedia(false); // both (min-width: 1024px) and (prefers-reduced-motion: ...) return false
  // Force fallback by mocking matchMedia so isDesktop=false:
  // The component reads two queries; we want lg=false to trigger stack.
  // Use a query-aware mock:
  (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia =
    ((q: string) => ({
      matches: q.includes("prefers-reduced-motion") ? false : false, // lg=false
      media: q,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as (q: string) => MediaQueryList;

  render(
    <HorizontalChapterTrack>
      <SlotProbe id="a" />
      <SlotProbe id="b" />
    </HorizontalChapterTrack>,
  );
  // In fallback we don't provide context — slotIndex attr is "none"
  expect(screen.getByTestId("a")).toHaveAttribute("data-slot-index", "none");
  expect(screen.getByTestId("b")).toHaveAttribute("data-slot-index", "none");
});

it("provides context when desktop matchMedia returns true", () => {
  (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia =
    ((q: string) => ({
      matches: q.includes("prefers-reduced-motion") ? false : true,
      media: q,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as (q: string) => MediaQueryList;

  render(
    <HorizontalChapterTrack>
      <SlotProbe id="a" />
      <SlotProbe id="b" />
    </HorizontalChapterTrack>,
  );
  expect(screen.getByTestId("a")).toHaveAttribute("data-slot-index", "0");
  expect(screen.getByTestId("b")).toHaveAttribute("data-slot-index", "1");
});
```

- [ ] **Step 2: Run test to verify the fallback test fails**

Run: `pnpm test tests/HorizontalChapterTrack.test.tsx`
Expected: The new fallback test FAILS (context is provided unconditionally today). The existing tests + the "desktop matchMedia true" test may still pass since jsdom's default `matchMedia` is undefined or always-false — either way at least one new test fails.

- [ ] **Step 3: Update the component to branch on matchMedia**

Replace `components/motion/HorizontalChapterTrack.tsx` with:

```tsx
"use client";
import {
  Children,
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type HorizontalTrackContextValue = {
  trackProgress: MotionValue<number>;
  slotIndex: number;
  slotCount: number;
};

export const HorizontalTrackContext =
  createContext<HorizontalTrackContextValue | null>(null);

function useHorizontalEnabled(): boolean {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lg = window.matchMedia("(min-width: 1024px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(lg.matches && !rm.matches);
    update();
    lg.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);
  // null on first render → assume disabled to keep SSR + first-paint stable
  return enabled ?? false;
}

export function HorizontalChapterTrack({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const slotCount = items.length;
  const enabled = useHorizontalEnabled();

  if (!enabled) {
    return <>{items}</>;
  }

  return (
    <HorizontalChapterTrackPinned slotCount={slotCount}>
      {items}
    </HorizontalChapterTrackPinned>
  );
}

function HorizontalChapterTrackPinned({
  children,
  slotCount,
}: {
  children: ReactNode[];
  slotCount: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `-${(slotCount - 1) * 100}vw`],
  );

  return (
    <div
      ref={wrapperRef}
      data-horizontal-track
      data-slot-count={slotCount}
      style={{ height: `${slotCount * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x: trackX, width: `${slotCount * 100}vw` }}
          className="flex h-full"
        >
          {children.map((child, i) => (
            <HorizontalTrackContext.Provider
              key={i}
              value={{ trackProgress: scrollYProgress, slotIndex: i, slotCount }}
            >
              <div className="h-full w-screen shrink-0">{child}</div>
            </HorizontalTrackContext.Provider>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test tests/HorizontalChapterTrack.test.tsx`
Expected: PASS — all four tests pass. (Note: `useEffect` runs synchronously in jsdom under React Testing Library, so the matchMedia branch resolves before assertion.)

- [ ] **Step 5: Commit**

```bash
git add components/motion/HorizontalChapterTrack.tsx tests/HorizontalChapterTrack.test.tsx
git commit -m "feat(motion): vertical-stack fallback for mobile and reduced motion"
```

---

### Task 5: ChapterScrollScene — consume horizontal-track context

**Files:**
- Modify: `components/motion/ChapterScrollScene.tsx`

When the scene is inside a `HorizontalChapterTrack` AND its `slotIndex > 0`, derive `opacity`, `clipPath`, and `y` from the track's progress focused on the slot's entry window. When `slotIndex === 0` or no context, keep today's behavior.

- [ ] **Step 1: Replace the file with the context-aware version**

```tsx
// components/motion/ChapterScrollScene.tsx
"use client";
import { useContext, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { HorizontalTrackContext } from "@/components/motion/HorizontalChapterTrack";
import { getSlotLocalProgress } from "@/lib/horizontal-track-math";

export function ChapterScrollScene({
  media,
  content,
  reverse = false,
  className,
}: {
  media: ReactNode;
  content: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const track = useContext(HorizontalTrackContext);

  const { scrollYProgress: ownProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  // Choose the progress source:
  // - In horizontal track AND slot > 0: derive from track progress around this slot's entry window.
  // - Otherwise (no context, or slot 0): use own vertical scroll progress (today's behavior).
  const progress: MotionValue<number> = useTransform(() => {
    if (!track || track.slotIndex === 0) {
      return ownProgress.get();
    }
    return getSlotLocalProgress(
      track.trackProgress.get(),
      track.slotIndex,
      track.slotCount,
    );
  });

  const opacity = useTransform(progress, [0, 0.35], [0, 1]);
  const clipPath = useTransform(
    progress,
    [0, 0.35],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const y = useTransform(progress, [0, 0.5], [-50, 0]);

  if (reduced) {
    return (
      <div
        ref={ref}
        className={cn(
          "grid items-center gap-10 md:grid-cols-2 md:gap-16",
          className,
        )}
      >
        <div className={cn(reverse && "md:order-2")}>{content}</div>
        <div className={cn(reverse && "md:order-1")}>{media}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-10 md:grid-cols-2 md:gap-16",
        className,
      )}
    >
      <motion.div style={{ y }} className={cn(reverse && "md:order-2")}>
        {content}
      </motion.div>
      <motion.div
        style={{ opacity, clipPath }}
        className={cn(reverse && "md:order-1")}
      >
        {media}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Run all tests**

Run: `pnpm test`
Expected: all existing tests pass, including the Reveal/HorizontalChapterTrack/use-active-chapter suites.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/motion/ChapterScrollScene.tsx
git commit -m "feat(motion): ChapterScrollScene reads HorizontalTrackContext"
```

---

### Task 6: Extend useActiveChapter for horizontal mode

**Files:**
- Modify: `lib/use-active-chapter.ts`
- Modify: `tests/use-active-chapter.test.tsx`

The hook accepts an optional descriptor `{ horizontalIds, horizontalSelector }`. When the page's `scrollY` falls inside the element matched by `horizontalSelector` (the `[data-horizontal-track]` wrapper), the hook returns the chapter id at the current slot computed from horizontal progress; otherwise it falls back to today's IntersectionObserver behavior.

- [ ] **Step 1: Add the failing test**

Append to `tests/use-active-chapter.test.tsx`:

```tsx
import { fireEvent } from "@testing-library/react";

function HorizProbe({
  ids,
  horizontalIds,
}: {
  ids: string[];
  horizontalIds: string[];
}) {
  const active = useActiveChapter(ids, {
    horizontalIds,
    horizontalSelector: "[data-horizontal-track]",
  });
  return <div data-testid="active">{active ?? "none"}</div>;
}

describe("useActiveChapter horizontal mode", () => {
  let horizObservers: Array<{ cb: IntersectionObserverCallback; targets: Element[] }> = [];

  beforeEach(() => {
    horizObservers = [];
    class MockObserver {
      cb: IntersectionObserverCallback;
      targets: Element[] = [];
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
        horizObservers.push({ cb, targets: this.targets });
      }
      observe(t: Element) {
        this.targets.push(t);
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
      root = null;
      rootMargin = "";
      thresholds: ReadonlyArray<number> = [];
    }
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = MockObserver;
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = MockObserver;
  });

  it("returns the slot id when scroll is inside the horizontal wrapper", () => {
    document.body.innerHTML = `
      <section id="hero" style="height:1000px"></section>
      <div data-horizontal-track data-slot-count="3" id="track" style="position:relative;height:3000px"></div>
      <section id="contact" style="height:1000px"></section>
    `;
    const track = document.getElementById("track")!;
    // Stub getBoundingClientRect: wrapper top = -500 (scrolled 1500 below page-top means top is -500 if wrapperTop=1000 and scrollY=1500)
    track.getBoundingClientRect = () =>
      ({ top: -500, bottom: 2500, height: 3000, left: 0, right: 0, width: 0, x: 0, y: -500, toJSON: () => ({}) }) as DOMRect;
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });

    render(
      <HorizProbe
        ids={["hero", "a", "b", "c", "contact"]}
        horizontalIds={["a", "b", "c"]}
      />,
    );

    // Fire a scroll event so the hook recomputes
    fireEvent.scroll(window);
    // Progress inside wrapper = 500 / (3000 - 1000) = 0.25 → slot index = round(0.25 × 2) = 1 → "b"
    expect(screen.getByTestId("active").textContent).toBe("b");
  });

  it("falls back to IntersectionObserver when scroll is outside the wrapper", () => {
    document.body.innerHTML = `
      <section id="hero"></section>
      <div data-horizontal-track data-slot-count="3" id="track" style="height:3000px"></div>
    `;
    const track = document.getElementById("track")!;
    track.getBoundingClientRect = () =>
      ({ top: 2000, bottom: 5000, height: 3000, left: 0, right: 0, width: 0, x: 0, y: 2000, toJSON: () => ({}) }) as DOMRect;
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });

    render(
      <HorizProbe
        ids={["hero", "a", "b", "c"]}
        horizontalIds={["a", "b", "c"]}
      />,
    );

    fireEvent.scroll(window);
    act(() => {
      horizObservers[0].cb(
        [
          {
            isIntersecting: true,
            target: document.getElementById("hero")!,
            intersectionRatio: 0.9,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });
    expect(screen.getByTestId("active").textContent).toBe("hero");
  });
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `pnpm test tests/use-active-chapter.test.tsx`
Expected: the two new tests FAIL because `useActiveChapter` does not accept the second argument yet.

- [ ] **Step 3: Update `lib/use-active-chapter.ts`**

```ts
"use client";
import { useEffect, useState } from "react";

export type HorizontalTrackDescriptor = {
  horizontalIds: string[];
  horizontalSelector: string;
};

export function useActiveChapter(
  ids: string[],
  descriptor?: HorizontalTrackDescriptor,
) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isInsideHorizontalTrack()) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b,
        );
        setActive(top.target.id);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    elements.forEach((el) => observer.observe(el));

    function isInsideHorizontalTrack(): boolean {
      if (!descriptor) return false;
      const wrapper = document.querySelector(descriptor.horizontalSelector);
      if (!wrapper) return false;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      // Pin engaged when wrapper top ≤ 0 AND wrapper bottom > viewport height
      return rect.top <= 0 && rect.bottom > vh;
    }

    function computeHorizontalActive(): string | null {
      if (!descriptor) return null;
      const wrapper = document.querySelector(descriptor.horizontalSelector);
      if (!wrapper) return null;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) return null;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const slotCount = descriptor.horizontalIds.length;
      if (slotCount === 0) return null;
      const slot = Math.round(progress * (slotCount - 1));
      return descriptor.horizontalIds[slot] ?? null;
    }

    function onScroll() {
      if (!descriptor) return;
      if (!isInsideHorizontalTrack()) return;
      const next = computeHorizontalActive();
      if (next) setActive(next);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, descriptor?.horizontalIds, descriptor?.horizontalSelector]);

  return active;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test tests/use-active-chapter.test.tsx`
Expected: all tests pass — the original one plus the two new horizontal-mode tests.

- [ ] **Step 5: Commit**

```bash
git add lib/use-active-chapter.ts tests/use-active-chapter.test.tsx
git commit -m "feat(nav): active-chapter detection inside horizontal track"
```

---

### Task 7: NavBar — anchor clicks for chapters inside the track

**Files:**
- Modify: `components/ui/NavBar.tsx`

The nav still renders `<a href="#id">`. We add an `onClick` handler that, when the clicked id belongs to the horizontal track, calls `e.preventDefault()` and runs `window.scrollTo({ top: getSlotScrollY(...), behavior: 'smooth' })`. Lenis picks up the smooth-scroll programmatic call. Hero/Contact keep native anchor behavior.

- [ ] **Step 1: Replace the file**

```tsx
// components/ui/NavBar.tsx
"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { useActiveChapter } from "@/lib/use-active-chapter";
import { CHAPTERS } from "@/content/chapters";
import { cn } from "@/lib/cn";
import { getSlotScrollY } from "@/lib/horizontal-track-math";

const NAV_IDS = [
  "hero",
  "foundation",
  "corporate-lab",
  "builder-studio",
  "shipping",
  "whats-next",
  "contact",
];

const HORIZONTAL_IDS = [
  "foundation",
  "corporate-lab",
  "builder-studio",
  "shipping",
  "whats-next",
];

export function NavBar() {
  const active = useActiveChapter(NAV_IDS, {
    horizontalIds: HORIZONTAL_IDS,
    horizontalSelector: "[data-horizontal-track]",
  });
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120);
  });

  function scrollToSlot(slotIndex: number, behavior: ScrollBehavior) {
    const wrapper = document.querySelector<HTMLElement>(
      "[data-horizontal-track]",
    );
    if (!wrapper) return false;
    const rect = wrapper.getBoundingClientRect();
    const wrapperTop = rect.top + window.scrollY;
    const top = getSlotScrollY({
      wrapperTop,
      wrapperHeight: rect.height,
      viewportHeight: window.innerHeight,
      slotIndex,
      slotCount: HORIZONTAL_IDS.length,
    });
    window.scrollTo({ top, behavior });
    return true;
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const slotIndex = HORIZONTAL_IDS.indexOf(id);
    if (slotIndex === -1) return; // not in track → native behavior
    if (!document.querySelector("[data-horizontal-track]")) return; // mobile/reduced-motion fallback → native behavior
    e.preventDefault();
    scrollToSlot(slotIndex, "smooth");
  }

  // Deep-link / initial hash on mount: if the page loads with #foundation etc.,
  // jump to the right slot Y once the track is mounted.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const slotIndex = HORIZONTAL_IDS.indexOf(hash);
    if (slotIndex === -1) return; // native browser already scrolled to Hero/Contact
    // Wait one frame so the track has measured its layout.
    requestAnimationFrame(() => scrollToSlot(slotIndex, "auto"));
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 top-4 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2"
    >
      <ul className="flex items-center gap-1 overflow-x-auto rounded-full bg-slate-900/80 px-2 py-1.5 ring-1 ring-white/10 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CHAPTERS.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={(e) => handleClick(e, c.id)}
                className={cn(
                  "block rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
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

- [ ] **Step 2: Run tests**

Run: `pnpm test`
Expected: all tests pass — no NavBar test exists, but no other test should regress.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/NavBar.tsx
git commit -m "feat(nav): scroll to slot Y when clicking anchors inside horizontal track"
```

---

### Task 8: Wire up `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Wrap chapters I–V in the track**

```tsx
// app/page.tsx
import { Hero } from "@/components/chapters/Hero";
import { ChapterFoundation } from "@/components/chapters/ChapterFoundation";
import { ChapterCorporateLab } from "@/components/chapters/ChapterCorporateLab";
import { ChapterBuilderStudio } from "@/components/chapters/ChapterBuilderStudio";
import { ChapterShipping } from "@/components/chapters/ChapterShipping";
import { ChapterWhatsNext } from "@/components/chapters/ChapterWhatsNext";
import { ChapterContact } from "@/components/chapters/ChapterContact";
import { HorizontalChapterTrack } from "@/components/motion/HorizontalChapterTrack";

export default function Page() {
  return (
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
  );
}
```

- [ ] **Step 2: Run tests + typecheck**

Run: `pnpm test && pnpm typecheck`
Expected: green.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(page): wrap chapters I-V in HorizontalChapterTrack"
```

---

### Task 9: Manual verification + polish

**Files:**
- Possibly: `components/chapters/ChapterFoundation.tsx`, `ChapterCorporateLab.tsx`, `ChapterBuilderStudio.tsx`, `ChapterShipping.tsx`, `ChapterWhatsNext.tsx` — only if content overflows 100vh inside a slot.

Each chapter section currently uses `min-h-screen` and `py-32`. Inside a 100vh slot, `py-32` may push content out of view, and Builder Studio's bullet list may overflow vertically. Verify in a browser and trim padding only if needed.

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`
Expected: dev server listening at http://localhost:3000.

- [ ] **Step 2: Verify desktop behavior in a browser**

Open http://localhost:3000 at viewport ≥ 1024px wide. Verify:

  1. Scrolling past Hero pins the chapter track to the viewport.
  2. Continued vertical scroll pans the five chapters horizontally.
  3. Each chapter's image reveal animation plays as it enters from the right (except chapter I, whose reveal plays during the wrapper's vertical entry into the viewport).
  4. After the last chapter (What's next), pin releases and Contact appears.
  5. Nav pills highlight the chapter currently centered.
  6. Clicking a nav pill (e.g. "Builder") smoothly scrolls so the corresponding chapter is centered. "Home" goes to Hero; "Contact" goes to Contact.
  7. No vertical overflow inside any pinned slot.

  If a chapter's content overflows vertically inside the slot, edit that chapter's section className: replace `py-32` with `py-12` and remove `min-h-screen` (the slot is already 100vh). Commit each padding tweak separately with `style: tighten padding for <chapter> in horizontal slot`.

- [ ] **Step 3: Verify the mobile/reduced-motion fallback**

  In Chrome DevTools, switch to a viewport < 1024px wide. Verify:

  1. The five chapters render as a vertical stack with their current behavior.
  2. The page scrolls vertically end-to-end with no pin.
  3. Nav anchors work natively.

  Then in DevTools Rendering panel, toggle "Emulate CSS prefers-reduced-motion: reduce" at a desktop viewport. Verify the same vertical-stack fallback.

- [ ] **Step 4: Final checks**

Run: `pnpm test && pnpm typecheck && pnpm lint`
Expected: all green.

- [ ] **Step 5: Final commit if anything changed during verification**

If you tweaked padding in Step 2, those commits are already in. Otherwise nothing to commit here.

---

## Notes for the implementer

- **Lenis interplay.** `SmoothScrollProvider` initializes Lenis with `anchors: true`. We bypass that path by calling `e.preventDefault()` in the NavBar click handler and using `window.scrollTo({ behavior: 'smooth' })`. Lenis picks up programmatic `scrollTo` automatically.
- **`useTransform(() => ...)` callback form.** This is framer-motion 12's callback-style transform that re-evaluates whenever any read motion value changes. We use it in `ChapterScrollScene` to merge two potential progress sources cleanly.
- **No GSAP added.** The whole effect is built with framer-motion + Tailwind. Do not add new dependencies.
- **Do not modify the individual `ChapterX` component files** unless Task 9 Step 2 reveals overflow. The whole point of the context-based remap is that those files stay untouched.
