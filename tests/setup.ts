import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't include IntersectionObserver — framer-motion's whileInView needs it.
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class IntersectionObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
    root: Element | Document | null = null;
    rootMargin = "";
    thresholds: ReadonlyArray<number> = [];
    constructor(_cb: IntersectionObserverCallback) {
      void _cb;
    }
  }
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IntersectionObserverMock;
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IntersectionObserverMock;
}

// Same for ResizeObserver — used by framer-motion in some paths.
if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  (window as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverMock;
  (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverMock;
}
