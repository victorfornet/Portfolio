import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Megastat({
  num,
  label,
  dark,
  className,
}: {
  num: ReactNode;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        className={cn(
          "font-serif text-[40px] italic font-normal leading-none -tracking-[0.02em] tabular-nums md:text-[52px] lg:text-[64px]",
          dark ? "text-white" : "text-slate-900",
        )}
      >
        {num}
      </div>
      <div
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.12em] md:text-[10.5px]",
          dark ? "text-white/60" : "text-slate-500",
        )}
      >
        {label}
      </div>
    </div>
  );
}
