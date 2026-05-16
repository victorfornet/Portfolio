import { CHAPTERS, WHATS_NEXT_CARDS } from "@/content/chapters";
import { HorizonScene } from "@/components/pixel/HorizonScene";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterWhatsNext() {
  const c = CHAPTERS[5];
  return (
    <section id="whats-next" className="relative isolate py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="mx-auto mb-12 aspect-[16/7] max-w-4xl">
          <HorizonScene />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-slate-700">
            {c.body!.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
          {WHATS_NEXT_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.06 * i}>
              <ChapterCard status={card.status} title={card.title} body={card.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
