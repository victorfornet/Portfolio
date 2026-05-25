import { cn } from "@/lib/cn";

export function Marker({
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
    <div
      className={cn(
        "flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.18em]",
        dark ? "text-white/55" : "text-slate-500",
        className,
      )}
    >
      <span
        className={cn(
          "font-serif text-[32px] italic leading-none -tracking-[0.02em] md:text-[36px] lg:text-[42px]",
          dark ? "text-white" : "text-slate-900",
        )}
      >
        {num}
      </span>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          dark ? "bg-white/40" : "bg-slate-400/70",
        )}
        aria-hidden
      />
      <span>{label}</span>
    </div>
  );
}
