import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterEditorialScene } from "@/components/motion/ChapterEditorialScene";

const LINK = "underline decoration-slate-300 decoration-1 underline-offset-4 transition-colors hover:text-slate-900 hover:decoration-slate-500";

export function ChapterFoundation() {
  const c = CHAPTERS[1];
  const card = TIMELINE_CARDS.foundation;
  return (
    <section
      id="foundation"
      className="relative isolate flex min-h-screen items-center bg-white px-6 py-20 md:px-10 md:py-24"
    >
      <ChapterEditorialScene
        className="mx-auto max-w-6xl"
        media={
          <SceneIllustration
            fill
            src="/pixel/foundation.png"
            alt="Pixel-art campus at dawn with a blond character walking toward a university building."
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
            <p className="mt-4 text-slate-700">
              I&apos;m doing my Master in Management at{" "}
              <a
                href="https://www.hec.edu/en"
                target="_blank"
                rel="noreferrer"
                className={LINK}
              >
                HEC Paris
              </a>{" "}
              — ranked #1 worldwide by the Financial Times in 2025. Before that,
              three years in a French preparatory class (CPGE ECS), top 100 out
              of 9,000 candidates at the national entrance exam. One semester
              at Thammasat in Bangkok. Currently on a gap year to ship.
            </p>
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
            <p>
              Beyond academics, I&apos;m Vice-President of the Ski Club at HEC
              — leading a team of 11, managing a €75K annual budget, and
              organizing trips for 300+ students each year.
            </p>
          </div>
        }
      />
    </section>
  );
}
