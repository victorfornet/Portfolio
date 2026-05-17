import { CHAPTERS, WHATS_NEXT_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { Reveal } from "@/components/motion/Reveal";
import { ChapterScrollScene } from "@/components/motion/ChapterScrollScene";
import { renderRichLine } from "@/lib/richText";

export function ChapterWhatsNext() {
  const c = CHAPTERS[5];
  return (
    <section
      id="whats-next"
      className="relative isolate flex min-h-screen items-center bg-sky-50 px-6 py-32 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <ChapterScrollScene
          media={
            <SceneIllustration
              src="/pixel/whats-next.png"
              alt="Pixel-art sunrise with a blond character at the foot of a mountain path."
            />
          }
          content={
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{c.title}</h2>
              <div className="mt-6 space-y-4 text-slate-700">
                {c.body!.map((p, i) => (
                  <p key={i}>{renderRichLine(p)}</p>
                ))}
              </div>
            </div>
          }
        />
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
