"use client";
import { Parallax } from "@/components/motion/Parallax";
import { Cloud } from "./sprites/Cloud";
import { Ladybug } from "./sprites/Ladybug";

export function HeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-50" />
      <Parallax
        depth={0.15}
        className="absolute inset-x-0 top-[10%] flex justify-between px-10 opacity-90"
      >
        <Cloud size={120} />
        <Cloud size={90} />
        <Cloud size={140} />
      </Parallax>
      <Parallax
        depth={0.35}
        className="absolute inset-x-0 top-[28%] flex justify-around opacity-80"
      >
        <Cloud size={70} />
        <Cloud size={110} />
      </Parallax>
      <div className="absolute inset-x-0 bottom-[28%] h-24 bg-[linear-gradient(to_top,#7da7d9_0%,#7da7d9_60%,transparent_60%)] mix-blend-multiply opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(to_top,#3aa84a_0%,#56c067_40%,#7ad07d_100%)]" />
      <div className="absolute right-[14%] bottom-[22%] flex items-end gap-2">
        <div
          className="size-16 rounded-sm bg-slate-700 ring-1 ring-slate-800 pixelated"
          aria-label="laptop"
        />
        <div className="size-8 rounded-sm bg-slate-800 pixelated" aria-label="phone" />
        <Ladybug />
      </div>
    </div>
  );
}
