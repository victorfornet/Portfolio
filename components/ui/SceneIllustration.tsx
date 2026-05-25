import Image from "next/image";
import { cn } from "@/lib/cn";

const DIMENSIONS: Record<string, { w: number; h: number }> = {
  "/pixel/hero.png": { w: 1916, h: 821 },
  "/pixel/foundation.png": { w: 1448, h: 1086 },
  "/pixel/corporate-lab.png": { w: 1448, h: 1086 },
  "/pixel/builder-studio.png": { w: 1896, h: 829 },
  "/pixel/shipping.png": { w: 2048, h: 768 },
  "/pixel/whats-next.png": { w: 1896, h: 829 },
  "/pixel/contact.png": { w: 1672, h: 941 },
};

export function SceneIllustration({
  src,
  alt,
  className,
  priority,
  fill,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const d = DIMENSIONS[src] ?? { w: 1600, h: 900 };
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(15,40,80,0.45)] ring-1 ring-black/5",
        fill && "relative h-full w-full",
        className,
      )}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 90vw"
          priority={priority}
          className="pixelated object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={d.w}
          height={d.h}
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 90vw"
          priority={priority}
          className="pixelated h-auto w-full"
        />
      )}
    </div>
  );
}
