import { cn } from "@/lib/cn";

export function Cloud({ className, size = 80 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 16 8"
      className={cn("pixelated", className)}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="2" y="3" width="12" height="3" fill="#fff" />
      <rect x="3" y="2" width="3" height="1" fill="#fff" />
      <rect x="8" y="1" width="4" height="2" fill="#fff" />
      <rect x="2" y="6" width="12" height="1" fill="#e6f2ff" />
    </svg>
  );
}
