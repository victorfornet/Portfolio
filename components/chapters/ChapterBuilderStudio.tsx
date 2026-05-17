import { CHAPTERS, WHAT_I_DO } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterBuilderStudio() {
  const c = CHAPTERS[3];
  return (
    <section
      id="builder-studio"
      className="relative isolate flex min-h-screen items-center bg-white px-6 py-32 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SceneIllustration
              src="/pixel/builder-studio.png"
              alt="Pixel-art workshop with floating smartphones around a blond character."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
              <div className="mt-6 space-y-4 text-slate-700">
                {c.body!.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_I_DO.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <ChapterCard
                icon={<span aria-hidden>{item.icon}</span>}
                title={item.title}
                body={item.body}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
