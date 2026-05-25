import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Annot({
  idx,
  lead,
  children,
  dark,
  className,
}: {
  idx: string;
  lead: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[44px_1fr] gap-3 border-t pt-3.5 md:grid-cols-[60px_1fr] md:gap-4",
        dark ? "border-white/15" : "border-slate-300/60",
        className,
      )}
    >
      <div
        className={cn(
          "font-serif text-[24px] italic leading-none -tracking-[0.02em] md:text-[28px] lg:text-[30px]",
          dark ? "text-sky-300" : "text-sky-700",
        )}
      >
        {idx}
      </div>
      <div>
        <p
          className={cn(
            "text-base font-semibold -tracking-[0.01em] leading-snug",
            dark ? "text-white" : "text-slate-900",
          )}
        >
          {lead}
        </p>
        <p
          className={cn(
            "mt-2 text-[13.5px] leading-relaxed",
            dark ? "text-white/70" : "text-slate-600",
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
