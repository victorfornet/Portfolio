"use client";
import {
  Children,
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type HorizontalTrackContextValue = {
  trackProgress: MotionValue<number>;
  slotIndex: number;
  slotCount: number;
};

export const HorizontalTrackContext =
  createContext<HorizontalTrackContextValue | null>(null);

function useHorizontalEnabled(): boolean {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lg = window.matchMedia("(min-width: 1024px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(lg.matches && !rm.matches);
    update();
    lg.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);
  return enabled ?? false;
}

export function HorizontalChapterTrack({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const slotCount = items.length;
  const enabled = useHorizontalEnabled();

  if (!enabled) {
    return <>{items}</>;
  }

  return (
    <HorizontalChapterTrackPinned slotCount={slotCount}>
      {items}
    </HorizontalChapterTrackPinned>
  );
}

function HorizontalChapterTrackPinned({
  children,
  slotCount,
}: {
  children: ReactNode[];
  slotCount: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `-${(slotCount - 1) * 100}vw`],
  );

  return (
    <div
      ref={wrapperRef}
      data-horizontal-track
      data-slot-count={slotCount}
      style={{ height: `${slotCount * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x: trackX, width: `${slotCount * 100}vw` }}
          className="flex h-full"
        >
          {children.map((child, i) => (
            <HorizontalTrackContext.Provider
              key={i}
              value={{ trackProgress: scrollYProgress, slotIndex: i, slotCount }}
            >
              <div className="h-full w-screen shrink-0">{child}</div>
            </HorizontalTrackContext.Provider>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
