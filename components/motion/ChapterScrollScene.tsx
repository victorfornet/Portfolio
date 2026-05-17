"use client";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

export function ChapterScrollScene({
  media,
  content,
  reverse = false,
  className,
}: {
  media: ReactNode;
  content: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const y = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);

  if (reduced) {
    return (
      <div
        ref={ref}
        className={cn(
          "grid items-center gap-10 md:grid-cols-2 md:gap-16",
          className,
        )}
      >
        <div className={cn(reverse && "md:order-2")}>{content}</div>
        <div className={cn(reverse && "md:order-1")}>{media}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-10 md:grid-cols-2 md:gap-16",
        className,
      )}
    >
      <motion.div style={{ y }} className={cn(reverse && "md:order-2")}>
        {content}
      </motion.div>
      <motion.div
        style={{ opacity, clipPath }}
        className={cn(reverse && "md:order-1")}
      >
        {media}
      </motion.div>
    </div>
  );
}
