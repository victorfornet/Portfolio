"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

export function CTA({
  variant = "primary",
  className,
  children,
  ...props
}: { variant?: Variant } & ComponentProps<"a">) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-shadow";
  const styles = {
    primary:
      "bg-slate-900 text-white shadow-[0_8px_24px_-8px_rgba(15,40,80,0.5)] hover:shadow-[0_12px_30px_-8px_rgba(46,161,255,0.6)]",
    secondary:
      "bg-white/95 text-slate-900 ring-1 ring-slate-200 shadow-[0_8px_24px_-12px_rgba(15,40,80,0.25)] hover:ring-slate-300",
  } as const;
  return (
    <motion.a
      className={cn(base, styles[variant], className)}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      {...(props as ComponentProps<typeof motion.a>)}
    >
      {children}
    </motion.a>
  );
}
