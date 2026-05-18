import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterEditorialScene } from "@/components/motion/ChapterEditorialScene";

export function ChapterBuilderStudio() {
  const c = CHAPTERS[3];
  const card = TIMELINE_CARDS.rocapine;
  return (
    <section
      id="builder-studio"
      className="relative isolate flex min-h-screen items-center bg-white px-6 py-20 md:px-10 md:py-24"
    >
      <ChapterEditorialScene
        className="mx-auto max-w-6xl"
        media={
          <SceneIllustration
            fill
            src="/pixel/builder-studio.png"
            alt="Pixel-art workshop with floating smartphones around a blond character."
          />
        }
        header={
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
              {c.label}
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              {c.title}
            </h2>
            {c.body?.[0] && (
              <p className="mt-4 text-slate-700">{c.body[0]}</p>
            )}
          </div>
        }
        accent={
          <div className="flex flex-col gap-4">
            {c.metricsLine && (
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  Track record
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {c.metricsLine}
                </p>
              </div>
            )}
            <ChapterCard
              status={card.status}
              title={card.title}
              body={card.body}
            />
          </div>
        }
        details={
          <div>
            {c.body?.[1] && (
              <p className="text-sm font-mono uppercase tracking-wider text-slate-500">
                {c.body[1]}
              </p>
            )}
            {c.bullets && c.bullets.length > 0 && (
              <ul className="mt-3 space-y-2.5 text-[15px] text-slate-700">
                {c.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-400"
                    />
                    <span>
                      <strong className="font-semibold text-slate-900">
                        {b.lead}
                      </strong>
                      {b.rest}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        }
      />
    </section>
  );
}
