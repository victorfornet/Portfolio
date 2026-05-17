import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterBuilderStudio() {
  const c = CHAPTERS[3];
  const card = TIMELINE_CARDS.rocapine;
  return (
    <section
      id="builder-studio"
      className="relative isolate flex min-h-screen items-center bg-white px-6 py-32 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
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
              {c.body?.[0] && <p>{c.body[0]}</p>}
              {c.metricsLine && (
                <p className="font-semibold text-slate-900">{c.metricsLine}</p>
              )}
              {c.body?.[1] && <p>{c.body[1]}</p>}
              {c.bullets && c.bullets.length > 0 && (
                <ul className="mt-2 list-disc space-y-3 pl-5">
                  {c.bullets.map((b, i) => (
                    <li key={i}>
                      <strong>{b.lead}</strong>
                      {b.rest}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-8">
              <ChapterCard status={card.status} title={card.title} body={card.body} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
