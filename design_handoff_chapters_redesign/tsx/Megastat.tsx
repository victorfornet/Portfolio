// components/ui/Megastat.tsx
import { cn } from "@/lib/cn";

export function Megastat({
  num,
  label,
  dark,
  className,
}: {
  num: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        className={cn(
          "font-serif text-[64px] italic font-normal leading-none -tracking-[0.02em]",
          dark ? "text-white" : "text-slate-900",
        )}
      >
        {num}
      </div>
      <div
        className={cn(
          "font-mono text-[10.5px] uppercase tracking-[0.12em]",
          dark ? "text-white/60" : "text-slate-500",
        )}
      >
        {label}
      </div>
    </div>
  );
}
