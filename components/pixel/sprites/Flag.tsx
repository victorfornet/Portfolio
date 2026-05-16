"use client";
import { motion } from "framer-motion";

export function Flag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 12"
      width={24}
      height={36}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="3" y="0" width="1" height="12" fill="#3a2418" />
      <motion.g
        animate={{ skewX: [0, 6, 0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "3px 1px" }}
      >
        <rect x="4" y="1" width="4" height="3" fill="#d8261c" />
      </motion.g>
    </svg>
  );
}
