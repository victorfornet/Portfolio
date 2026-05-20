"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { CHAPTER_STATS, ANNOTATIONS } from "@/content/chapters";
import { Marker } from "@/components/ui/Marker";
import { Pill, Chip } from "@/components/ui/Pill";
import { Annot } from "@/components/ui/Annot";
import { Numeral } from "@/components/ui/Numeral";
import { useChapterProgress } from "@/lib/use-chapter-progress";

const LINK =
  "text-sky-700 underline decoration-sky-700/40 decoration-1 underline-offset-4 transition-colors hover:text-sky-500 hover:decoration-sky-700";

export function ChapterFoundation() {
  const stats = CHAPTER_STATS.foundation;
  const annots = ANNOTATIONS.foundation;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useChapterProgress(ref);

  const headOpacity = useTransform(progress, [0.05, 0.4], [0, 1]);
  const headY = useTransform(progress, [0.05, 0.4], [-20, 0]);
  const statsOpacity = useTransform(progress, [0.2, 0.55], [0, 1]);
  const annotOpacity = useTransform(progress, [0.3, 0.65], [0, 1]);
  const annotY = useTransform(progress, [0.3, 0.65], [20, 0]);
  const sceneOpacity = useTransform(progress, [0, 0.35], [0, 1]);
  const sceneClip = useTransform(
    progress,
    [0, 0.35],
    ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
  );

  return (
    <section
      ref={ref}
      id="foundation"
      className="relative isolate flex min-h-screen items-stretch overflow-hidden bg-paper lg:h-screen"
    >
      <Numeral position={{ bottom: -160, left: -40 }}>I</Numeral>

      <div className="grid h-full w-full grid-cols-1 md:grid-cols-[1fr_560px]">
        <motion.div
          style={reduced ? undefined : { opacity: headOpacity, y: headY }}
          className="relative z-10 flex flex-col gap-5 px-14 py-14"
        >
          <div className="flex items-center justify-between">
            <Marker num="I" label="Chapter I · Foundation" />
            <Chip>Active · since 2023</Chip>
          </div>
          <h2 className="text-[96px] font-semibold leading-[0.98] tracking-[-0.03em] text-slate-900">
            hec{" "}
            <em className="font-serif font-normal italic text-sky-700">
              paris.
            </em>
          </h2>
          <p className="max-w-[50ch] text-[15.5px] leading-relaxed text-slate-700">
            Master in Management at{" "}
            <a
              href="https://www.hec.edu/en"
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              HEC Paris
            </a>
            , ranked #1 worldwide by the Financial Times in 2025. Before that,
            three years in a French preparatory class (CPGE ECS), top 100 out
            of 9,000 candidates at the national entrance exam. One semester at
            Thammasat in Bangkok. Currently on a gap year to ship.
          </p>
          <motion.div
            style={reduced ? undefined : { opacity: statsOpacity }}
            className="flex flex-wrap gap-2"
          >
            {stats.map((s) => (
              <Pill key={s.value}>
                <b className="font-semibold tabular-nums text-slate-900">
                  {s.value}
                </b>
                &nbsp;{s.label}
              </Pill>
            ))}
            <Pill ghost>Thammasat · Bangkok</Pill>
          </motion.div>

          <motion.div
            style={reduced ? undefined : { opacity: annotOpacity, y: annotY }}
            className="mt-auto flex flex-col gap-3.5"
          >
            {annots.map((a, i) => (
              <Annot key={a.lead} idx={["i.", "ii."][i]} lead={a.lead}>
                {a.body}
              </Annot>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={
            reduced ? undefined : { opacity: sceneOpacity, clipPath: sceneClip }
          }
          className="relative overflow-hidden bg-[#0e2440]"
        >
          <Image
            src="/pixel/foundation.png"
            alt="Pixel-art campus at dawn with a blond character walking toward a university building."
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="pixelated object-cover"
          />
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1.5 text-white">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] opacity-70">
              HEC Paris · Jouy-en-Josas
            </span>
            <span className="font-serif text-[22px] italic leading-tight -tracking-[0.01em]">
              Where the story starts.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
