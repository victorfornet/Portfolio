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
