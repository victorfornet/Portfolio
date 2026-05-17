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
    // slot 2 with N=5: window is [0.25, 0.5]
    expect(getSlotLocalProgress(0.1, 2, 5)).toBe(0); // below window
    expect(getSlotLocalProgress(0.375, 2, 5)).toBeCloseTo(0.5); // mid window
    expect(getSlotLocalProgress(0.6, 2, 5)).toBe(1); // above window
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
    ).toBe(5000);
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
    ).toBe(3000);
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
