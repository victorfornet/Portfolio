"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      className={cn(
        "group flex flex-col gap-3 rounded-2xl bg-white/95 p-6 shadow-[0_18px_50px_-20px_rgba(45,15,80,0.35)] ring-1 ring-black/5 backdrop-blur",
        className,
      )}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
        {project.status}
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{project.summary}</p>
      {project.stack && (
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-700"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-700">
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
              {project.link && (
                <a
                  href={project.link.href}
                  className="font-semibold text-sky-700 underline-offset-4 hover:underline"
                >
                  {project.link.label} ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="self-start font-mono text-xs text-slate-500 hover:text-slate-800"
        aria-expanded={open}
      >
        {open ? "Collapse ↑" : "Read more ↓"}
      </button>
    </motion.article>
  );
}
