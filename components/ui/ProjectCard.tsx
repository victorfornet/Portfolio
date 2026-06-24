"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/use-fine-pointer";
import type { Project } from "@/content/projects";

const SPRING = { stiffness: 220, damping: 18 };

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const tilt = !reduced && fine;
  const ref = useRef<HTMLElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-6deg", "6deg"]);

  useEffect(() => {
    if (!tilt) return;
    const node = ref.current;
    if (!node) return;

    let rect: DOMRect | null = null;
    let rafId: number | null = null;
    let pendingEvent: PointerEvent | null = null;

    function handleMove(e: PointerEvent) {
      pendingEvent = e;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!rect || !pendingEvent) return;
        mx.set((pendingEvent.clientX - rect.left) / rect.width - 0.5);
        my.set((pendingEvent.clientY - rect.top) / rect.height - 0.5);
      });
    }

    function handleEnter() {
      rect = node!.getBoundingClientRect();
      node!.addEventListener("pointermove", handleMove);
    }

    function handleLeave() {
      node!.removeEventListener("pointermove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      rect = null;
      mx.set(0);
      my.set(0);
    }

    node.addEventListener("pointerenter", handleEnter);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointerleave", handleLeave);
      node.removeEventListener("pointermove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [tilt, mx, my]);

  const hasDetails = Boolean(project.problem || project.approach);

  return (
    <motion.article
      ref={ref}
      style={
        tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined
      }
      whileHover={tilt ? { scale: 1.015 } : undefined}
      whileTap={fine ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-shadow duration-300 will-change-transform [@media(hover:hover)]:hover:shadow-[0_24px_60px_-28px_rgba(140,180,255,0.35)]",
        className,
      )}
    >
      <div
        className="relative flex flex-col gap-3"
        style={tilt ? { transform: "translateZ(20px)" } : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
            <span
              className={cn(
                "size-2 rounded-full",
                project.status === "Internal tool"
                  ? "bg-[#9aa6b8] shadow-[0_0_0_4px_rgba(154,166,184,0.18)]"
                  : "bg-emerald-400 shadow-[0_0_0_4px_rgba(130,226,107,0.18)]",
              )}
              aria-hidden
            />
          </div>
          <span className="rounded-lg bg-white/10 px-2 py-1 text-xs font-medium text-white/70 transition-colors duration-300 group-hover:bg-white/20">
            {project.status}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3 className="text-[15px] font-medium tracking-tight text-white">
              {project.name}
            </h3>
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-xs font-semibold text-sky-400 underline-offset-4 hover:underline"
              >
                {project.link.label} ↗
              </a>
            )}
          </div>
          <p className="text-sm font-[425] leading-snug text-white/70">
            {project.summary}
          </p>
        </div>

        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md bg-white/10 px-2 py-1 font-mono transition-colors hover:bg-white/20"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {hasDetails && (
          <div className="space-y-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-white/80">
            {project.problem && (
              <p>
                <strong>Problem.</strong> {project.problem}
              </p>
            )}
            {project.approach && (
              <p>
                <strong>Approach.</strong> {project.approach}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
