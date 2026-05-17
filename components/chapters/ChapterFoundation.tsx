import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterScrollScene } from "@/components/motion/ChapterScrollScene";

export function ChapterFoundation() {
  const c = CHAPTERS[1];
  const card = TIMELINE_CARDS.foundation;
  return (
    <section
      id="foundation"
      className="relative isolate flex min-h-screen items-center bg-white px-6 py-32 md:px-10"
    >
      <ChapterScrollScene
        className="mx-auto w-full max-w-6xl"
        media={
          <SceneIllustration
            src="/pixel/foundation.png"
            alt="Pixel-art campus at dawn with a blond character walking toward a university building."
          />
        }
        content={
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
        }
      />
    </section>
  );
}
