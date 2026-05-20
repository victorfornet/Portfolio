"use client";
import { useContext, type RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { HorizontalTrackContext } from "@/components/motion/HorizontalChapterTrack";
import { getSlotLocalProgress } from "@/lib/horizontal-track-math";

export function useChapterProgress(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const track = useContext(HorizontalTrackContext);
  const { scrollYProgress: ownProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return useTransform(() => {
    if (!track || track.slotIndex === 0) return ownProgress.get();
    return getSlotLocalProgress(
      track.trackProgress.get(),
      track.slotIndex,
      track.slotCount,
    );
  });
}
