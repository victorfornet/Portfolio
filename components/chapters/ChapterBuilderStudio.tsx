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

export function ChapterBuilderStudio() {
  const c = CHAPTERS[3];
  const card = TIMELINE_CARDS.rocapine;
  return (
    <section
      id="builder-studio"
      className="relative isolate flex min-h-screen items-center bg-white px-6 py-20 md:px-10 md:py-24"
    >
      <ChapterEditorialScene
        className="mx-auto max-w-6xl"
        media={
          <SceneIllustration
            fill
            src="/pixel/builder-studio.png"
            alt="Pixel-art workshop with floating smartphones around a blond character."
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
              I&apos;m a Product Manager at{" "}
              <a
                href="https://rocapine.com"
                target="_blank"
                rel="noreferrer"
                className={LINK}
              >
                Rocapine
              </a>
              , a mobile app publisher in wellness. We ship low-cost app demos,
              test distribution, and scale what performs with GenAI-powered
              personalization across mental health, fitness, nutrition, and
              sleep.
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
            <p className="text-[15px] leading-relaxed text-slate-700">
              The portfolio runs at{" "}
              <strong className="font-semibold text-slate-900">
                $5.6M annualized revenue · 315K monthly active users · 14
                active studios
              </strong>
              . I own end-to-end product on 6 consumer iOS apps: concept, MVP
              specs, App Store launch, growth experiments, cohort analyses on
              CAC, D1/D7/D30 retention, and LTV to call what to scale vs. kill.
              20+ studios onboarded, 100+ A/B tests run.
            </p>
            <StoodOut lead="Built Scouty, our internal CRM, from scratch.">
              Sourcing was scattered across spreadsheets and qualification was
              painfully manual. I designed and coded Scouty in ~4 weeks:
              structured sourcing, outreach, qualification, follow-up. Result:
              ~3x partner sourcing throughput, now used daily by the whole
              publishing team. When I see a recurring problem, I&apos;d rather
              build the fix than document it.
            </StoodOut>
            <StoodOut lead="Shipped 6 apps and prototypes alongside the strategy work.">
              Not to replace dev studios, but to actually understand what it takes
              to build, test, and iterate. Sharper product taste, better grasp
              of technical constraints, and much more concrete conversations
              with founders, devs, and designers. The best PMs in consumer are
              the ones who could ship the v1 themselves.
            </StoodOut>
          </div>
        }
      />
    </section>
  );
}
