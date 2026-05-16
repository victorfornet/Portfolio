"use client";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-driven Y parallax. `depth` 0 = static, 1 = full scroll speed.
 */
export function Parallax({
  children,
  depth = 0.3,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    [`${depth * 60}px`, `${-depth * 60}px`],
  );
  if (reduced) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
