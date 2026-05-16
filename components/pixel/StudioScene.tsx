"use client";
import { motion } from "framer-motion";

const phones = [
  { color: "bg-sky-500", delay: 0 },
  { color: "bg-amber-400", delay: 0.4 },
  { color: "bg-emerald-500", delay: 0.8 },
  { color: "bg-rose-500", delay: 1.2 },
];

export function StudioScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-emerald-400" />
      <div className="absolute left-1/2 bottom-16 size-24 -translate-x-1/2 rounded-md bg-slate-700 ring-2 ring-slate-800 pixelated" />
      <div className="absolute inset-x-0 top-[20%] flex justify-around">
        {phones.map((p, i) => (
          <motion.div
            key={i}
            className={`size-10 rounded-md ring-2 ring-slate-900 pixelated ${p.color}`}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
