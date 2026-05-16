"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion-presets";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  amount = 0.3,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
