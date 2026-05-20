"use client";
import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const SPRING_CONFIG = { damping: 100, stiffness: 400 };

export function Magnetic({
  children,
  distance = 0.4,
  className,
}: {
  children: ReactNode;
  /** 0–1. How strongly the element follows the cursor (0.4 = 40% of offset). */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    let rect: DOMRect | null = null;
    let rafId: number | null = null;
    let pendingEvent: PointerEvent | null = null;

    function handleMove(e: PointerEvent) {
      pendingEvent = e;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!rect || !pendingEvent) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((pendingEvent.clientX - cx) * distance);
        y.set((pendingEvent.clientY - cy) * distance);
      });
    }

    function handleEnter() {
      rect = node!.getBoundingClientRect();
      node!.addEventListener("pointermove", handleMove);
    }

    function handleLeave() {
      node!.removeEventListener("pointermove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      rect = null;
      x.set(0);
      y.set(0);
    }

    node.addEventListener("pointerenter", handleEnter);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointerleave", handleLeave);
      node.removeEventListener("pointermove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [distance, reduced, x, y]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.div>
  );
}
