import { CHAPTERS, TIMELINE_CARDS } from "@/content/chapters";
import { ChapterCard } from "@/components/ui/ChapterCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterEditorialScene } from "@/components/motion/ChapterEditorialScene";

const LINK = "underline decoration-slate-300 decoration-1 underline-offset-4 transition-colors hover:text-slate-900 hover:decoration-slate-500";

function StoodOut({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-slate-200 pl-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
        Stood out
      </p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">
        <strong className="font-semibold text-slate-900">{lead}</strong>{" "}
        {children}
      </p>
    </div>
  );
}

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
            <p className="mt-4 text-slate-700">
              I spent six months at{" "}
              <a
                href="https://www.bearingpoint.com"
                target="_blank"
                rel="noreferrer"
                className={LINK}
              >
                BearingPoint
              </a>{" "}
              on digital transformation projects for public-sector clients: a
              major French public health organization and a top-tier French
              university. The job was to help large institutions modernize the
              way their information systems serve thousands of people.
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
          <div className="space-y-4">
            <StoodOut lead="Co-authored a 3-year digital master plan presented to C-level.">
              Diagnostic of the existing IT landscape, target architecture, and
              prioritization of 12+ initiatives. The plan moved exec
              stakeholders from a fragmented view to a shared roadmap with
              clearer investment calls. Takeaway: how to turn complex technical
              topics into something readable and actionable for senior
              decision-makers.
            </StoodOut>
            <StoodOut lead="Deployed an IS used by 5,000+ internal users.">
              Defined business needs, user journeys, and functional
              requirements; ran 15+ user workshops. Takeaway: a digital project
              doesn&apos;t win because the tool is well designed — it wins
              because the process is clear, the UX is intuitive, and change is
              managed properly.
            </StoodOut>
          </div>
        }
      />
    </section>
  );
}
