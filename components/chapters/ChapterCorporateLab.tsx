import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterCorporateLab() {
  const c = CHAPTERS[2];
  const card = TIMELINE_CARDS.corporateLab;
  return (
    <section
      id="corporate-lab"
      className="relative isolate flex min-h-screen items-center bg-sky-50 px-6 py-32 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="md:order-2">
          <SceneIllustration
            src="/pixel/corporate-lab.png"
            alt="Pixel-art corporate open-space with a blond character at a desk."
          />
        </Reveal>
        <Reveal delay={0.08} className="md:order-1">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
            <div className="mt-6 space-y-4 text-slate-700">
              {c.body!.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
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
