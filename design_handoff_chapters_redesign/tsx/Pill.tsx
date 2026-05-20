// components/ui/Pill.tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Pill({
  children,
  ghost,
  dot,
  dark,
  className,
}: {
  children: ReactNode;
  ghost?: boolean;
  dot?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-[7px] text-[12.5px] leading-none",
        dark
          ? ghost
            ? "border border-white/15 bg-transparent text-white/85"
            : "border border-white/12 bg-white/[0.06] text-white/85"
          : ghost
            ? "border border-slate-300/70 bg-transparent text-slate-700"
            : "border border-slate-200/80 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,30,50,0.02)]",
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dark ? "bg-emerald-300" : "bg-grass-600",
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}

export function Chip({
  children,
  done,
  dark,
  className,
}: {
  children: ReactNode;
  done?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-[10px] py-[6px] font-mono text-[10.5px] uppercase tracking-[0.06em]",
        dark
          ? "border border-white/12 bg-white/[0.08] text-white/70"
          : "border border-slate-200/80 bg-white text-slate-500",
        className,
      )}
    >
      <span
        className={cn(
          "h-[7px] w-[7px] rounded-full",
          done
            ? "bg-slate-400 shadow-[0_0_0_3px_rgba(124,138,161,0.18)]"
            : "bg-grass-600 shadow-[0_0_0_3px_rgba(111,208,90,0.18)]",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}
