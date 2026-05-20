// components/ui/Annot.tsx
// Side-margin annotation card. Replaces the old `Stood out` boxes.
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Annot({
  idx,
  lead,
  children,
  dark,
  className,
}: {
  idx: string; // "i." "ii."
  lead: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[60px_1fr] gap-4 border-t pt-3.5",
        dark ? "border-white/15" : "border-slate-300/60",
        className,
      )}
    >
      <div
        className={cn(
          "font-serif text-[30px] italic leading-none -tracking-[0.02em]",
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
