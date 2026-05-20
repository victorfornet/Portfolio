"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { PROJECTS } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Marker } from "@/components/ui/Marker";
import { Pill } from "@/components/ui/Pill";
import { Numeral } from "@/components/ui/Numeral";
import { useChapterProgress } from "@/lib/use-chapter-progress";

export function ChapterShipping() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useChapterProgress(ref);

  const headOpacity = useTransform(progress, [0.05, 0.4], [0, 1]);
  const headY = useTransform(progress, [0.05, 0.4], [-20, 0]);
  const cardOpacity = useTransform(progress, [0.2, 0.55], [0, 1]);
  const cardY = useTransform(progress, [0.2, 0.55], [20, 0]);
  const sceneOpacity = useTransform(progress, [0, 0.35], [0, 1]);
  const sceneClip = useTransform(
    progress,
    [0, 0.35],
    ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
  );

  return (
    <section
      ref={ref}
      id="shipping"
      className="relative isolate flex min-h-screen items-stretch overflow-hidden bg-slate-950 text-white"
    >
      <Numeral dark position={{ bottom: -150, left: -50 }}>
        IV
      </Numeral>

      <div className="relative z-10 grid h-full w-full grid-cols-1 gap-10 px-16 py-14 md:grid-cols-[1fr_1.4fr]">
        <motion.div
          style={reduced ? undefined : { opacity: headOpacity, y: headY }}
          className="flex min-h-0 flex-col gap-4"
        >
          <Marker dark num="IV" label="Chapter IV · Side projects" />
          <h2 className="text-[84px] font-semibold leading-[0.98] tracking-[-0.03em]">
            side
            <br />
            <em className="font-serif font-normal italic text-sky-300">
              projects.
            </em>
          </h2>
          <p className="text-[15.5px] leading-relaxed text-white/80">
            Where I learn the stack outside of work: solo, evenings and
            weekends, no excuses. Cursor + Claude Code, ship to TestFlight,
            put it in front of real users.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill dark dot>
              <b className="font-semibold tabular-nums text-white">2</b>
              &nbsp;active builds
            </Pill>
            <Pill dark ghost>
              solo
            </Pill>
          </div>
          <motion.div
            style={
              reduced
                ? undefined
                : { opacity: sceneOpacity, clipPath: sceneClip }
            }
            className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-[18px] ring-1 ring-white/10"
          >
            <Image
              src="/pixel/shipping.png"
              alt="Pixel-art night workshop with a blond character coding on a laptop."
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="pixelated object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: cardOpacity, y: cardY }}
          className="grid grid-rows-2 gap-4"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
