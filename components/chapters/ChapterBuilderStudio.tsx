import { CHAPTERS, WHAT_I_DO } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { ContentPanel } from "@/components/ui/ContentPanel";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterBuilderStudio() {
  const c = CHAPTERS[3];
  return (
    <section
      id="builder-studio"
      className="relative isolate flex min-h-screen items-center px-6 py-32 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <ContentPanel className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
            <div className="mt-6 space-y-4 text-slate-700">
              {c.body!.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ContentPanel>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_I_DO.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <ChapterCard title={`${item.icon}  ${item.title}`} body={item.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
