"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useActiveChapter } from "@/lib/use-active-chapter";

type Scene = {
  id: string;
  src: string;
  alt: string;
  objectPosition?: string;
};

const SCENES: Scene[] = [
  { id: "hero", src: "/pixel/hero.png", alt: "Pixel-art landscape with a blond character on a path facing a distant city skyline." },
  { id: "foundation", src: "/pixel/foundation.png", alt: "Pixel-art campus at dawn with a blond character walking toward a university building." },
  { id: "corporate-lab", src: "/pixel/corporate-lab.png", alt: "Pixel-art corporate open-space with a blond character at a desk." },
  { id: "builder-studio", src: "/pixel/builder-studio.png", alt: "Pixel-art workshop with floating smartphones around a blond character." },
  { id: "shipping", src: "/pixel/shipping.png", alt: "Pixel-art night workshop with a blond character coding on a laptop." },
  { id: "whats-next", src: "/pixel/whats-next.png", alt: "Pixel-art sunrise with a blond character at the foot of a mountain path." },
  { id: "contact", src: "/pixel/contact.png", alt: "Pixel-art golden-hour scene with a blond character waving toward the horizon." },
];

const CHAPTER_IDS = SCENES.map((s) => s.id);

export function CinematicBackground() {
  const reduced = useReducedMotion();
  const active = useActiveChapter(CHAPTER_IDS) ?? "hero";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {SCENES.map((scene, i) => {
        const isActive = active === scene.id;
        return (
          <motion.div
            key={scene.id}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0, scale: 1 }}
            animate={
              reduced
                ? { opacity: isActive ? 1 : 0, scale: 1 }
                : { opacity: isActive ? 1 : 0, scale: isActive ? 1.08 : 1 }
            }
            transition={
              reduced
                ? { duration: 0.2 }
                : isActive
                  ? {
                      opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                      scale: { duration: 14, ease: "easeOut" },
                    }
                  : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <Image
              src={scene.src}
              alt={scene.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="pixelated object-cover"
              style={{ objectPosition: scene.objectPosition ?? "center" }}
            />
          </motion.div>
        );
      })}
      {/* Subtle scrim to soften the bottom for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
    </div>
  );
}
