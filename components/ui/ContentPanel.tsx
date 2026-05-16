import { cn } from "@/lib/cn";

/**
 * A floating content panel that overlays the cinematic background.
 * Uses a soft backdrop so text stays readable on top of any pixel-art scene.
 */
export function ContentPanel({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const styles =
    tone === "dark"
      ? "bg-slate-900/70 text-white ring-1 ring-white/10"
      : "bg-white/80 text-slate-900 ring-1 ring-black/5";
  return (
    <div
      className={cn(
        "rounded-3xl p-6 shadow-[0_30px_80px_-30px_rgba(15,40,80,0.45)] backdrop-blur-md md:p-8",
        styles,
        className,
      )}
    >
      {children}
    </div>
  );
}
