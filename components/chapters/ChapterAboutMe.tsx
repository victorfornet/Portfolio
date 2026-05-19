import { CHAPTERS, VALUES } from "@/content/chapters";

export function ChapterAboutMe() {
  const c = CHAPTERS[5];
  return (
    <section
      id="about-me"
      className="relative isolate flex min-h-screen items-center bg-white px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
            {c.label}
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            {c.title}
          </h2>
          <p className="mt-4 text-slate-700">
            A few things about how I work and what I value.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 md:mt-12 md:grid-cols-2 md:gap-y-8">
          {VALUES.map((v, i) => (
            <li
              key={v.title}
              className="group relative border-t border-slate-200 pt-4"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-wider text-slate-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-semibold tracking-tight text-slate-900">
                  {v.title}
                </h3>
              </div>
              <p className="mt-2 pl-8 text-[15px] leading-relaxed text-slate-600">
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
