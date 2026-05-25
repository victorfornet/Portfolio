"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { VALUES_GROUPED } from "@/content/chapters";
import { Marker } from "@/components/ui/Marker";
import { Numeral } from "@/components/ui/Numeral";
import { useChapterProgress } from "@/lib/use-chapter-progress";
import { useIsLg } from "@/lib/use-is-lg";

export function ChapterAboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isLg = useIsLg();
  const staticView = reduced || !isLg;
  const progress = useChapterProgress(ref);

  const headOpacity = useTransform(progress, [0.05, 0.4], [0, 1]);
  const headY = useTransform(progress, [0.05, 0.4], [-20, 0]);
  const valuesOpacity = useTransform(progress, [0.2, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      id="about-me"
      className="relative isolate flex min-h-dvh items-stretch overflow-hidden bg-white lg:h-dvh"
    >
      <Numeral size={380} position={{ bottom: -100, right: -30 }}>
        V
      </Numeral>

      <div className="relative z-10 flex h-full w-full flex-col gap-5 px-5 py-12 md:px-10 md:py-12 lg:px-16">
        <div className="flex items-end justify-between gap-4">
          <motion.div
            style={staticView ? undefined : { opacity: headOpacity, y: headY }}
            className="flex max-w-3xl flex-col gap-4"
          >
            <Marker num="V" label="Chapter V · About me" />
            <h2 className="text-[40px] font-semibold leading-[0.98] tracking-[-0.03em] text-slate-900 md:text-[72px] lg:text-[96px]">
              how I{" "}
              <em className="font-serif font-normal italic text-sky-700">
                work,
              </em>
              <br />
              what I{" "}
              <em className="font-serif font-normal italic text-sky-700">
                value.
              </em>
            </h2>
          </motion.div>
          <span
            className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 md:inline"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            eight values · three lenses
          </span>
        </div>

        <motion.div
          style={staticView ? undefined : { opacity: valuesOpacity }}
          className="mt-2 grid grid-cols-1 gap-x-12 md:grid-cols-2"
        >
          {VALUES_GROUPED.map((v, i) => (
            <div
              key={v.title}
              className="grid grid-cols-1 gap-2 border-t border-slate-300/60 py-4 md:grid-cols-[140px_1fr] md:items-baseline md:gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400 md:text-[10.5px]">
                  {String(i + 1).padStart(2, "0")} · {v.category}
                </span>
                <h3 className="text-[20px] font-semibold -tracking-[0.015em] text-slate-900 md:text-[22px] lg:text-[24px]">
                  {v.title}
                </h3>
              </div>
              <p className="text-[13.5px] leading-relaxed text-slate-600">
                {v.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
