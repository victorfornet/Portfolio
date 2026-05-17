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
