"use client";
import { useContext, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { HorizontalTrackContext } from "@/components/motion/HorizontalChapterTrack";
import { getSlotLocalProgress } from "@/lib/horizontal-track-math";

export function ChapterEditorialScene({
  media,
  header,
  accent,
  details,
  reverse = false,
  className,
}: {
  media: ReactNode;
  header: ReactNode;
  accent?: ReactNode;
  details: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const track = useContext(HorizontalTrackContext);

  const { scrollYProgress: ownProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const progress: MotionValue<number> = useTransform(() => {
    if (!track || track.slotIndex === 0) return ownProgress.get();
    return getSlotLocalProgress(
      track.trackProgress.get(),
      track.slotIndex,
      track.slotCount,
    );
  });

  const mediaOpacity = useTransform(progress, [0, 0.35], [0, 1]);
  const mediaClip = useTransform(
    progress,
    [0, 0.35],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const headerOpacity = useTransform(progress, [0.05, 0.4], [0, 1]);
  const headerY = useTransform(progress, [0.05, 0.4], [-30, 0]);
  const accentOpacity = useTransform(progress, [0.2, 0.55], [0, 1]);
  const accentY = useTransform(progress, [0.2, 0.55], [20, 0]);
  const detailsOpacity = useTransform(progress, [0.25, 0.6], [0, 1]);
  const detailsY = useTransform(progress, [0.25, 0.6], [20, 0]);

  if (reduced) {
    return (
      <div ref={ref} className={cn("flex flex-col gap-6", className)}>
        <div>{media}</div>
        <div>{header}</div>
        {accent && <div>{accent}</div>}
        <div>{details}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid w-full gap-4 md:gap-5",
        "grid-cols-12",
        "md:[grid-template-rows:minmax(0,1.35fr)_minmax(0,1fr)]",
        "md:h-[calc(100vh-10rem)] md:max-h-[760px]",
        className,
      )}
    >
      <motion.div
        style={{ opacity: mediaOpacity, clipPath: mediaClip }}
        className={cn(
          "col-span-12 min-h-[220px] md:row-span-1 md:min-h-0",
          reverse ? "md:col-span-7 md:col-start-6" : "md:col-span-7",
        )}
      >
        {media}
      </motion.div>
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className={cn(
          "col-span-12 flex flex-col justify-center md:row-span-1",
          reverse
            ? "md:col-span-5 md:col-start-1 md:row-start-1"
            : "md:col-span-5",
        )}
      >
        {header}
      </motion.div>
      {accent ? (
        <>
          <motion.div
            style={{ opacity: accentOpacity, y: accentY }}
            className={cn(
              "col-span-12 md:row-span-1 md:flex md:flex-col md:justify-center",
              reverse
                ? "md:col-span-4 md:col-start-9 md:row-start-2"
                : "md:col-span-4",
            )}
          >
            {accent}
          </motion.div>
          <motion.div
            style={{ opacity: detailsOpacity, y: detailsY }}
            className={cn(
              "col-span-12 md:row-span-1 md:flex md:flex-col md:justify-center",
              reverse
                ? "md:col-span-8 md:col-start-1 md:row-start-2"
                : "md:col-span-8",
            )}
          >
            {details}
          </motion.div>
        </>
      ) : (
        <motion.div
          style={{ opacity: detailsOpacity, y: detailsY }}
          className="col-span-12 md:col-span-12 md:row-span-1 md:flex md:flex-col md:justify-center"
        >
          {details}
        </motion.div>
      )}
    </div>
  );
}
