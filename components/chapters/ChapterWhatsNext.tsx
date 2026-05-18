import { CHAPTERS, WHATS_NEXT_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterEditorialScene } from "@/components/motion/ChapterEditorialScene";
import { renderRichLine } from "@/lib/richText";

export function ChapterWhatsNext() {
  const c = CHAPTERS[5];
  return (
    <section
      id="whats-next"
      className="relative isolate flex min-h-screen items-center bg-sky-50 px-6 py-20 md:px-10 md:py-24"
    >
      <ChapterEditorialScene
        className="mx-auto max-w-6xl"
        media={
          <SceneIllustration
            fill
            src="/pixel/whats-next.png"
            alt="Pixel-art sunrise with a blond character at the foot of a mountain path."
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
          <div className="flex flex-col gap-3">
            {WHATS_NEXT_CARDS.map((card) => (
              <ChapterCard
                key={card.title}
                status={card.status}
                title={card.title}
                body={card.body}
              />
            ))}
          </div>
        }
        details={
          <div className="space-y-3 text-[15px] text-slate-700">
            {c.body?.[1] && <p>{renderRichLine(c.body[1])}</p>}
            {c.body?.[2] && <p>{renderRichLine(c.body[2])}</p>}
            {c.body?.[3] && (
              <p className="font-medium text-slate-900">{c.body[3]}</p>
            )}
          </div>
        }
      />
    </section>
  );
}
