import { cn } from "@/lib/cn";

export function Numeral({
  children,
  position,
  size = 540,
  dark,
  className,
}: {
  children: string;
  position?: { bottom?: number; top?: number; left?: number; right?: number };
  size?: number;
  dark?: boolean;
  className?: string;
}) {
  const pos = position ?? { bottom: -110, right: -30 };
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none font-serif italic",
        dark ? "text-white/[0.04]" : "text-slate-900/[0.05]",
        className,
      )}
      style={{
        fontSize: size,
        lineHeight: 0.8,
        letterSpacing: "-0.05em",
        ...pos,
      }}
    >
      {children}
    </span>
  );
}
