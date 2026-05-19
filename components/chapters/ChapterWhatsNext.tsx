import { CHAPTERS, WHATS_NEXT_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterEditorialScene } from "@/components/motion/ChapterEditorialScene";

export function ChapterWhatsNext() {
  const c = CHAPTERS[6];
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
            <p className="mt-4 text-slate-700">
              Still figuring it out, honestly. What I know: the next few years
              are about building things real people want to use, and being
              around teams who make that look easy.
            </p>
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
            <p>
              What pulls me in: consumer products, growth that compounds,
              software that feels personal. Mostly though, it&apos;s about
              working with people who care a stupid amount about what
              they&apos;re making.
            </p>
            <p>
              The fun part isn&apos;t picking a label. It&apos;s getting in the
              middle of something ambitious and shipping. I&apos;ll figure out
              the rest.
            </p>
            <p className="font-medium text-slate-900">
              Long-term, building my own. Right now, relocating to San
              Francisco and open to conversations.
            </p>
          </div>
        }
      />
    </section>
  );
}
