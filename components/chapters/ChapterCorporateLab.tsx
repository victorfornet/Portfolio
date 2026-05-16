import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { OfficeScene } from "@/components/pixel/OfficeScene";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterCorporateLab() {
  const c = CHAPTERS[2];
  const card = TIMELINE_CARDS.corporateLab;
  return (
    <section id="corporate-lab" className="relative isolate bg-slate-100 py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="order-2 md:order-1">
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
        <div className="order-1 aspect-[4/3] w-full md:order-2">
          <OfficeScene />
        </div>
      </div>
    </section>
  );
}
