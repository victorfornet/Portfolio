import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useActiveChapter } from "@/lib/use-active-chapter";

function Probe({ ids }: { ids: string[] }) {
  const active = useActiveChapter(ids);
  return <div data-testid="active">{active ?? "none"}</div>;
}

describe("useActiveChapter", () => {
  let observers: Array<{ cb: IntersectionObserverCallback; targets: Element[] }> = [];

  beforeEach(() => {
    observers = [];
    class MockObserver {
      cb: IntersectionObserverCallback;
      targets: Element[] = [];
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
        observers.push({ cb, targets: this.targets });
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

  it("returns the most-visible section id", () => {
    document.body.innerHTML = `<section id="a"></section><section id="b"></section>`;
    render(<Probe ids={["a", "b"]} />);
    expect(screen.getByTestId("active").textContent).toBe("none");
    act(() => {
      observers[0].cb(
        [
          {
            isIntersecting: true,
            target: document.getElementById("b")!,
            intersectionRatio: 0.8,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });
    expect(screen.getByTestId("active").textContent).toBe("b");
  });
});

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
    track.getBoundingClientRect = () =>
      ({ top: -500, bottom: 2500, height: 3000, left: 0, right: 0, width: 0, x: 0, y: -500, toJSON: () => ({}) }) as DOMRect;
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });

    render(
      <HorizProbe
        ids={["hero", "a", "b", "c", "contact"]}
        horizontalIds={["a", "b", "c"]}
      />,
    );

    fireEvent.scroll(window);
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
