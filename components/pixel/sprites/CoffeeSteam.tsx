"use client";
import { motion } from "framer-motion";

export function CoffeeSteam({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 12"
      width={20}
      height={30}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={2 + i}
          y={10}
          width={1}
          height={1}
          fill="#cfd8e3"
          animate={{ y: [10, 0], opacity: [0.8, 0] }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </svg>
  );
}
