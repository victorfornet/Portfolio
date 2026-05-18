import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterEditorialScene } from "@/components/motion/ChapterEditorialScene";

export function ChapterCorporateLab() {
  const c = CHAPTERS[2];
  const card = TIMELINE_CARDS.corporateLab;
  return (
    <section
      id="corporate-lab"
      className="relative isolate flex min-h-screen items-center bg-sky-50 px-6 py-20 md:px-10 md:py-24"
    >
      <ChapterEditorialScene
        reverse
        className="mx-auto max-w-6xl"
        media={
          <SceneIllustration
            fill
            src="/pixel/corporate-lab.png"
            alt="Pixel-art corporate open-space with a blond character at a desk."
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
          <ChapterCard
            status={card.status}
            title={card.title}
            body={card.body}
          />
        }
        details={
          <div className="space-y-3 text-[15px] text-slate-700">
            {c.body?.[1] && <p>{c.body[1]}</p>}
            {c.body?.[2] && <p>{c.body[2]}</p>}
            {c.body?.[3] && (
              <p className="font-medium text-slate-900">{c.body[3]}</p>
            )}
          </div>
        }
      />
    </section>
  );
}
