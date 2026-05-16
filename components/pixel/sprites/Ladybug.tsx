"use client";
import { motion, useReducedMotion } from "framer-motion";

export function Ladybug({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 8 6"
      className={className}
      width={24}
      height={18}
      animate={reduced ? {} : { x: [0, 4, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="1" y="1" width="6" height="4" fill="#d8261c" />
      <rect x="3" y="1" width="1" height="4" fill="#0c1726" />
      <rect x="2" y="2" width="1" height="1" fill="#0c1726" />
      <rect x="5" y="2" width="1" height="1" fill="#0c1726" />
      <rect x="2" y="3" width="1" height="1" fill="#0c1726" />
      <rect x="5" y="3" width="1" height="1" fill="#0c1726" />
      <rect x="0" y="2" width="1" height="1" fill="#0c1726" />
      <rect x="7" y="2" width="1" height="1" fill="#0c1726" />
    </motion.svg>
  );
}
