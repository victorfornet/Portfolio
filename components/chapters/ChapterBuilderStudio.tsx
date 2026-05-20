"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { ANNOTATIONS } from "@/content/chapters";
import { Marker } from "@/components/ui/Marker";
import { Chip } from "@/components/ui/Pill";
import { Megastat } from "@/components/ui/Megastat";
import { Annot } from "@/components/ui/Annot";
import { Numeral } from "@/components/ui/Numeral";
import { useChapterProgress } from "@/lib/use-chapter-progress";

const LINK =
  "text-sky-700 underline decoration-sky-700/40 decoration-1 underline-offset-4 transition-colors hover:text-sky-500 hover:decoration-sky-700";

const COUNT_RANGE: [number, number] = [0.2, 0.55];

export function ChapterBuilderStudio() {
  const annots = ANNOTATIONS.rocapine;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useChapterProgress(ref);

  const headOpacity = useTransform(progress, [0.05, 0.4], [0, 1]);
  const headY = useTransform(progress, [0.05, 0.4], [-20, 0]);
  const statsOpacity = useTransform(progress, [0.2, 0.55], [0, 1]);
  const statsY = useTransform(progress, [0.2, 0.55], [12, 0]);
  const annotOpacity = useTransform(progress, [0.3, 0.65], [0, 1]);
  const annotY = useTransform(progress, [0.3, 0.65], [20, 0]);
  const sceneOpacity = useTransform(progress, [0, 0.35], [0, 1]);
  const sceneClip = useTransform(
    progress,
    [0, 0.35],
    ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
  );

  // Animated megastat numbers — scroll-linked count-up.
  const arrNum = useTransform(progress, COUNT_RANGE, [0, 5.6]);
  const arrText = useTransform(arrNum, (n) => `$${n.toFixed(1)}M`);
  const mauNum = useTransform(progress, COUNT_RANGE, [0, 315]);
  const mauText = useTransform(mauNum, (n) => `${Math.round(n)}K`);
  const studiosNum = useTransform(progress, COUNT_RANGE, [0, 14]);
  const studiosText = useTransform(studiosNum, (n) =>
    Math.round(n).toString(),
  );
  const appsNum = useTransform(progress, COUNT_RANGE, [0, 6]);
  const appsText = useTransform(appsNum, (n) => Math.round(n).toString());

  return (
    <section
      ref={ref}
      id="builder-studio"
      className="relative isolate flex min-h-screen items-stretch overflow-hidden bg-paper lg:h-screen"
    >
      <Numeral position={{ bottom: -180, right: -40 }}>III</Numeral>

      <div className="relative z-10 flex h-full w-full flex-col gap-5 px-14 py-12">
        <div className="flex items-start justify-between">
          <Marker num="III" label="Chapter III · Product · Rocapine" />
          <Chip>Active · publishing PM · since jan 2026</Chip>
        </div>

        <motion.div
          style={reduced ? undefined : { opacity: statsOpacity, y: statsY }}
          className="grid grid-cols-4 gap-8 border-y border-slate-300/60 py-3.5"
        >
          <Megastat
            num={
              reduced ? (
                "$5.6M"
              ) : (
                <motion.span>{arrText}</motion.span>
              )
            }
            label="annualized revenue"
          />
          <Megastat
            num={
              reduced ? (
                "315K"
              ) : (
                <motion.span>{mauText}</motion.span>
              )
            }
            label="monthly active users"
          />
          <Megastat
            num={
              reduced ? "14" : <motion.span>{studiosText}</motion.span>
            }
            label="active studios"
          />
          <Megastat
            num={reduced ? "6" : <motion.span>{appsText}</motion.span>}
            label="apps shipped"
          />
        </motion.div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-9 md:grid-cols-[1fr_480px]">
          <motion.div
            style={reduced ? undefined : { opacity: headOpacity, y: headY }}
            className="flex flex-col gap-4"
          >
            <h2 className="font-serif text-[84px] font-normal italic leading-[0.98] tracking-[-0.03em] text-sky-700">
              rocapine.
            </h2>
            <p className="max-w-[50ch] text-[15.5px] leading-relaxed text-slate-700">
              Product Manager at{" "}
              <a
                href="https://rocapine.com"
                target="_blank"
                rel="noreferrer"
                className={LINK}
              >
                Rocapine
              </a>
              , a mobile app publisher in wellness. We ship low-cost demos,
              test distribution, and scale what performs: GenAI-powered
              personalization across mental health, fitness, nutrition, sleep.
              I own end-to-end product on 6 consumer iOS apps: concept, MVP
              specs, App Store launch, growth experiments, cohort analyses,
              and the LTV calls to scale vs. kill.
            </p>
            <motion.div
              style={
                reduced ? undefined : { opacity: annotOpacity, y: annotY }
              }
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
              reduced
                ? undefined
                : { opacity: sceneOpacity, clipPath: sceneClip }
            }
            className="relative overflow-hidden rounded-[18px] shadow-[0_24px_60px_-28px_rgba(12,30,55,0.45)] ring-1 ring-black/5"
          >
            <Image
              src="/pixel/builder-studio.png"
              alt="Pixel-art workshop with floating smartphones around a blond character."
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="pixelated object-cover"
            />
            <span className="absolute bottom-4 left-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/85">
              ship · test · scale
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
