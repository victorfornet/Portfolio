import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { ContentPanel } from "@/components/ui/ContentPanel";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterFoundation() {
  const c = CHAPTERS[1];
  const card = TIMELINE_CARDS.foundation;
  return (
    <section
      id="foundation"
      className="relative isolate flex min-h-screen items-center px-6 py-32 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl md:max-w-5xl">
        <Reveal>
          <ContentPanel className="max-w-2xl md:ml-auto">
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
          </ContentPanel>
        </Reveal>
      </div>
    </section>
  );
}
