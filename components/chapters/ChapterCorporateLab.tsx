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

export function ChapterCorporateLab() {
  const stats = CHAPTER_STATS.corporateLab;
  const annots = ANNOTATIONS.corporateLab;
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
    ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
  );

  return (
    <section
      ref={ref}
      id="corporate-lab"
      className="relative isolate flex min-h-screen items-stretch overflow-hidden bg-sky-50 lg:h-screen"
    >
      <Numeral
        position={{ bottom: -160, right: -60 }}
        className="text-[rgba(19,102,176,0.07)]"
      >
        II
      </Numeral>

      <div className="grid h-full w-full grid-cols-1 md:grid-cols-[560px_1fr]">
        <motion.div
          style={
            reduced ? undefined : { opacity: sceneOpacity, clipPath: sceneClip }
          }
          className="relative overflow-hidden bg-[#0e2440]"
        >
          <Image
            src="/pixel/corporate-lab.png"
            alt="Pixel-art corporate open-space with a blond character at a desk."
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="pixelated object-cover"
          />
          <div className="absolute bottom-6 left-6 flex flex-col gap-1.5 text-white">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] opacity-70">
              BearingPoint · Paris
            </span>
            <span className="font-serif text-[22px] italic leading-tight -tracking-[0.01em]">
              Six months in the public sector.
            </span>
          </div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: headOpacity, y: headY }}
          className="relative z-10 flex flex-col gap-5 px-14 py-14"
        >
          <div className="flex items-center justify-between">
            <Marker num="II" label="Chapter II · Consulting" />
            <Chip done>Completed · jul–dec 2025 · paris</Chip>
          </div>
          <h2 className="text-[88px] font-semibold leading-[0.98] tracking-[-0.03em] text-slate-900">
            bearing
            <br />
            <em className="font-serif font-normal italic text-sky-700">
              point.
            </em>
          </h2>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-slate-700">
            At{" "}
            <a
              href="https://www.bearingpoint.com"
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              BearingPoint
            </a>
            , digital transformation for public-sector clients: a major French
            public health organization and a top-tier university. Helping large
            institutions modernize how their IS serves thousands of people.
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
          </motion.div>

          <motion.div
            style={reduced ? undefined : { opacity: annotOpacity, y: annotY }}
            className="mt-auto flex flex-col gap-4"
          >
            {annots.map((a, i) => (
              <Annot key={a.lead} idx={["i.", "ii."][i]} lead={a.lead}>
                {a.body}
              </Annot>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
