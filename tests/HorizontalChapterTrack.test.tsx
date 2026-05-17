import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useContext } from "react";
import {
  HorizontalChapterTrack,
  HorizontalTrackContext,
} from "@/components/motion/HorizontalChapterTrack";

function mockMatchMedia(opts: { desktop: boolean; reduced?: boolean }) {
  (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia =
    ((q: string) => ({
      matches: q.includes("prefers-reduced-motion")
        ? (opts.reduced ?? false)
        : opts.desktop,
      media: q,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as (q: string) => MediaQueryList;
}

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
    mockMatchMedia({ desktop: true });
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
    mockMatchMedia({ desktop: true });
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

  it("renders children without context in mobile fallback (lg=false)", () => {
    mockMatchMedia({ desktop: false });
    render(
      <HorizontalChapterTrack>
        <SlotProbe id="a" />
        <SlotProbe id="b" />
      </HorizontalChapterTrack>,
    );
    expect(screen.getByTestId("a")).toHaveAttribute("data-slot-index", "none");
    expect(screen.getByTestId("b")).toHaveAttribute("data-slot-index", "none");
  });

  it("renders children without context in reduced-motion fallback", () => {
    mockMatchMedia({ desktop: true, reduced: true });
    render(
      <HorizontalChapterTrack>
        <SlotProbe id="a" />
        <SlotProbe id="b" />
      </HorizontalChapterTrack>,
    );
    expect(screen.getByTestId("a")).toHaveAttribute("data-slot-index", "none");
    expect(screen.getByTestId("b")).toHaveAttribute("data-slot-index", "none");
  });
});
