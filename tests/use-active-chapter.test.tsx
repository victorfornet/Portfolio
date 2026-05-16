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
