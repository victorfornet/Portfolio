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
    constructor(_cb: IntersectionObserverCallback) {}
  }
  // @ts-expect-error mock
  window.IntersectionObserver = IntersectionObserverMock;
  // @ts-expect-error mock
  global.IntersectionObserver = IntersectionObserverMock;
}

// Same for ResizeObserver — used by framer-motion in some paths.
if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
  class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  // @ts-expect-error mock
  window.ResizeObserver = ResizeObserverMock;
  // @ts-expect-error mock
  global.ResizeObserver = ResizeObserverMock;
}
