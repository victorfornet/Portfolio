import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CustomCursor } from "@/components/ui/CustomCursor";

function mockMatchMedia(matches: (query: string) => boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: matches(query),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

describe("CustomCursor", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("has-custom-cursor");
  });

  it("does not render or set has-custom-cursor on touch devices", () => {
    mockMatchMedia((q) => q === "(pointer: coarse)");
    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
    expect(document.documentElement.classList.contains("has-custom-cursor")).toBe(false);
  });

  it("sets has-custom-cursor on fine pointer devices", () => {
    mockMatchMedia((q) => q === "(pointer: fine)");
    render(<CustomCursor />);
    expect(document.documentElement.classList.contains("has-custom-cursor")).toBe(true);
  });
});
