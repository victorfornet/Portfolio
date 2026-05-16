import { cn } from "@/lib/cn";

export function ChapterCard({
  status,
  title,
  body,
  className,
}: {
  status?: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/95 p-6 shadow-[0_18px_50px_-20px_rgba(15,40,80,0.35)] ring-1 ring-black/5 backdrop-blur",
        className,
      )}
    >
      {status && (
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          {status}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {body && <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>}
    </div>
  );
}
