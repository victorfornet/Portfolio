"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useActiveChapter } from "@/lib/use-active-chapter";

const CHAPTER_IDS = [
  "hero",
  "foundation",
  "corporate-lab",
  "builder-studio",
  "shipping",
  "whats-next",
  "contact",
];

export function CinematicBackground() {
  const reduced = useReducedMotion();
  const active = useActiveChapter(CHAPTER_IDS) ?? "hero";
  const isHero = active === "hero";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1, scale: 1 }}
        animate={
          reduced
            ? { opacity: isHero ? 1 : 0, scale: 1 }
            : { opacity: isHero ? 1 : 0, scale: isHero ? 1.04 : 1 }
        }
        transition={
          reduced
            ? { duration: 0.2 }
            : {
                opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 14, ease: "easeOut" },
              }
        }
      >
        <Image
          src="/pixel/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pixelated object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
    </div>
  );
}
