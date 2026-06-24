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
import { useIsLg } from "@/lib/use-is-lg";

export function ChapterShipping() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isLg = useIsLg();
  const staticView = reduced || !isLg;
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
      className="relative isolate flex min-h-dvh items-stretch overflow-hidden bg-slate-950 text-white lg:h-dvh"
    >
      <Numeral dark position={{ bottom: -150, left: -50 }}>
        IV
      </Numeral>

      <div className="relative z-10 grid h-full w-full grid-cols-1 gap-8 px-5 py-12 md:gap-10 md:px-10 md:py-14 lg:grid-cols-[1fr_1.4fr] lg:px-16">
        <motion.div
          style={staticView ? undefined : { opacity: headOpacity, y: headY }}
          className="flex flex-col gap-4 lg:h-full lg:min-h-0 lg:grid lg:grid-rows-[auto_auto_auto_auto_minmax(0,1fr)]"
        >
          <Marker dark num="IV" label="Chapter IV · Side projects" />
          <h2 className="text-[40px] font-semibold leading-[0.98] tracking-[-0.03em] md:text-[64px] lg:text-[84px]">
            side
            <br />
            <em className="font-serif font-normal italic text-sky-300">
              projects.
            </em>
          </h2>
          <p className="text-[15px] leading-relaxed text-white/80 md:text-[15.5px]">
            Where I learn the stack outside of work: solo, evenings and
            weekends, no excuses. Cursor + Claude Code, ship to TestFlight,
            put it in front of real users.
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill dark dot>
              <b className="font-semibold tabular-nums text-white">3</b>
              &nbsp;projects
            </Pill>
            <Pill dark ghost>
              solo
            </Pill>
          </div>
          <motion.div
            style={
              staticView
                ? undefined
                : { opacity: sceneOpacity, clipPath: sceneClip }
            }
            className="relative aspect-[4/3] overflow-hidden rounded-[18px] ring-1 ring-white/10 lg:aspect-auto lg:min-h-0"
          >
            <Image
              src="/pixel/shipping.png"
              alt="Pixel-art night workshop with a blond character coding on a laptop."
              fill
              quality={55}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="pixelated object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={staticView ? undefined : { opacity: cardOpacity, y: cardY }}
          className="flex flex-col gap-4 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:pr-1"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
