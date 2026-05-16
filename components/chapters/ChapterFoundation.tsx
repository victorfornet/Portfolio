import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { CampusScene } from "@/components/pixel/CampusScene";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterFoundation() {
  const c = CHAPTERS[1];
  const card = TIMELINE_CARDS.foundation;
  return (
    <section id="foundation" className="relative isolate py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="aspect-[4/3] w-full">
          <CampusScene />
        </div>
        <div>
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
          <Reveal delay={0.4} className="mt-6 inline-block">
            <ChapterCard status={card.status} title={card.title} body={card.body} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
