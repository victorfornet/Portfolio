"use client";
import { motion } from "framer-motion";
import { HeroScene } from "@/components/pixel/HeroScene";
import { TaskCard } from "@/components/ui/TaskCard";
import { CTA } from "@/components/ui/CTA";
import { CHAPTERS, TASK_CARDS_HERO } from "@/content/chapters";
import { staggerChildren, fadeUp } from "@/lib/motion-presets";

export function Hero() {
  const c = CHAPTERS[0];
  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden">
      <HeroScene />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pt-32 pb-20 md:px-10">
        <motion.h1
          className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] text-slate-900 md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {c.title}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl text-base text-slate-700 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {c.body!.join(" ")}
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTA href="#shipping">See what I&apos;m building</CTA>
          <CTA
            variant="secondary"
            href="https://linkedin.com/in/victorfornet"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </CTA>
          <CTA
            variant="secondary"
            href="https://github.com/victorfornet"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </CTA>
        </div>

        <motion.div
          className="pointer-events-none absolute right-6 top-32 flex flex-col gap-2 md:right-16 md:top-40"
          variants={staggerChildren}
          initial="hidden"
          animate="show"
        >
          {TASK_CARDS_HERO.map((t) => (
            <motion.div key={t.label} variants={fadeUp}>
              <TaskCard status={t.status} label={t.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
