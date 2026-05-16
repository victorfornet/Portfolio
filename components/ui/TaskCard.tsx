import { cn } from "@/lib/cn";

export function TaskCard({
  status,
  label,
  body,
  className,
}: {
  status: string;
  label: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-col gap-1 rounded-lg bg-white/95 px-4 py-3 shadow-[0_6px_24px_-8px_rgba(15,40,80,0.25)] ring-1 ring-black/5 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
        <span>{status}</span>
        <span className="font-semibold text-slate-900">{label}</span>
      </div>
      {body && <p className="text-sm text-slate-600">{body}</p>}
    </div>
  );
}
