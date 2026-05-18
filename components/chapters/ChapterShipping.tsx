import { CHAPTERS } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { ChapterEditorialScene } from "@/components/motion/ChapterEditorialScene";

export function ChapterShipping() {
  const c = CHAPTERS[4];
  return (
    <section
      id="shipping"
      className="relative isolate flex min-h-screen items-center bg-slate-950 px-6 py-20 text-white md:px-10 md:py-24"
    >
      <ChapterEditorialScene
        reverse
        className="mx-auto max-w-6xl"
        media={
          <SceneIllustration
            fill
            src="/pixel/shipping.png"
            alt="Pixel-art night workshop with a blond character coding on a laptop."
          />
        }
        header={
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/60">
              {c.label}
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
              {c.title}
            </h2>
            {c.body?.[0] && (
              <p className="mt-4 text-white/80">{c.body[0]}</p>
            )}
          </div>
        }
        details={
          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        }
      />
    </section>
  );
}
