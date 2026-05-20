import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const hasDetails = Boolean(
    project.problem || project.approach || project.link,
  );
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:4px_4px]" />
      </div>

      <div className="relative flex flex-col gap-3">
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
          <span className="rounded-lg bg-white/10 px-2 py-1 text-xs font-medium text-white/70 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/20">
            {project.status}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-[15px] font-medium tracking-tight text-white">
            {project.name}
          </h3>
          <p className="text-sm font-[425] leading-snug text-white/70">
            {project.summary}
          </p>
        </div>

        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md bg-white/10 px-2 py-1 font-mono backdrop-blur-sm transition-colors hover:bg-white/20"
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
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noreferrer"
                className="self-start font-semibold text-sky-400 underline-offset-4 hover:underline"
              >
                {project.link.label} ↗
              </a>
            )}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-transparent via-white/10 to-transparent p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
