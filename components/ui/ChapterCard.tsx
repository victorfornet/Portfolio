import { cn } from "@/lib/cn";

export function ChapterCard({
  status,
  title,
  body,
  meta,
  tags,
  icon,
  className,
}: {
  status?: string;
  title: string;
  body?: string;
  meta?: string;
  tags?: readonly string[];
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:4px_4px]" />
      </div>

      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex size-8 items-center justify-center rounded-lg bg-black/5 text-base transition-colors duration-300 group-hover:bg-black/10">
            {icon ?? <span className="size-2 rounded-full bg-emerald-500" aria-hidden />}
          </div>
          {status && (
            <span className="rounded-lg bg-black/5 px-2 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/10">
              {status}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-[15px] font-medium tracking-tight text-slate-900">
            {title}
            {meta && (
              <span className="ml-2 text-xs font-normal text-slate-500">{meta}</span>
            )}
          </h3>
          {body && (
            <p className="text-sm font-[425] leading-snug text-slate-600">{body}</p>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-black/5 px-2 py-1 backdrop-blur-sm transition-colors duration-200 hover:bg-black/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-transparent via-slate-100/50 to-transparent p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
