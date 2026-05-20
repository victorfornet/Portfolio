"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Marker } from "@/components/ui/Marker";
import { Pill } from "@/components/ui/Pill";
import { Numeral } from "@/components/ui/Numeral";
import { useChapterProgress } from "@/lib/use-chapter-progress";

export function ChapterWhatsNext() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useChapterProgress(ref);

  const headOpacity = useTransform(progress, [0.05, 0.4], [0, 1]);
  const headY = useTransform(progress, [0.05, 0.4], [-20, 0]);
  const bodyOpacity = useTransform(progress, [0.2, 0.6], [0, 1]);
  const bodyY = useTransform(progress, [0.2, 0.6], [20, 0]);
  const sceneOpacity = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <section
      ref={ref}
      id="whats-next"
      className="relative isolate flex min-h-screen items-stretch overflow-hidden bg-sky-50 lg:h-screen"
    >
      <Numeral
        position={{ bottom: -150, right: -50 }}
        className="text-[rgba(19,102,176,0.08)]"
      >
        VI
      </Numeral>

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-20 py-14">
        <motion.div
          style={reduced ? undefined : { opacity: headOpacity, y: headY }}
          className="flex items-start justify-between gap-10"
        >
          <Marker num="VI" label="Chapter VI · What's next" />
          <div className="flex flex-wrap gap-2">
            <Pill dot>
              <b className="font-semibold text-slate-900">Open to</b>
              &nbsp;good conversations
            </Pill>
            <Pill ghost>San Francisco · relocating</Pill>
          </div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: bodyOpacity, y: bodyY }}
          className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1fr_320px]"
        >
          <div className="flex flex-col gap-5">
            <h2 className="max-w-[18ch] text-[64px] font-semibold leading-[1.04] tracking-[-0.03em] text-slate-900">
              Still{" "}
              <em className="font-serif font-normal italic text-sky-700">
                figuring it out,
              </em>{" "}
              honestly.
            </h2>
            <p className="max-w-[56ch] text-[19px] leading-relaxed text-slate-700">
              What I know: the next few years are about{" "}
              <em className="font-serif font-normal italic text-sky-700">
                building things real people want to use
              </em>
              , and being around teams who make that look easy.
            </p>
            <p className="max-w-[56ch] text-[15px] leading-relaxed text-slate-600">
              What pulls me in: consumer products, growth that compounds,
              software that feels personal. Mostly though, it&apos;s about
              working with people who care a stupid amount about what
              they&apos;re making. The fun part isn&apos;t picking a label —
              it&apos;s getting in the middle of something ambitious and
              shipping. I&apos;ll figure out the rest.
            </p>
          </div>

          <motion.div
            style={reduced ? undefined : { opacity: sceneOpacity }}
            className="flex flex-col gap-3.5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] ring-1 ring-black/5">
              <Image
                src="/pixel/whats-next.png"
                alt="Pixel-art sunrise with a blond character at the foot of a mountain path."
                fill
                sizes="320px"
                className="pixelated object-cover"
              />
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_4px_18px_-10px_rgba(15,30,50,0.1)]">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
                long-term
              </div>
              <p className="m-0 font-serif text-[22px] italic leading-tight -tracking-[0.01em] text-slate-900">
                Building my own.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
          end of the deck · next: let&apos;s talk →
        </p>
      </div>
    </section>
  );
}
