"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    function onMove(e: MouseEvent) {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (active) {
        x.set((e.clientX - cx) * distance);
        y.set((e.clientY - cy) * distance);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [active, distance, reduced, x, y]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
