import { CHAPTERS } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterShipping() {
  const c = CHAPTERS[4];
  return (
    <section
      id="shipping"
      className="relative isolate flex min-h-screen items-center bg-slate-950 px-6 py-32 text-white md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="md:order-2">
            <SceneIllustration
              src="/pixel/shipping.png"
              alt="Pixel-art night workshop with a blond character coding on a laptop."
            />
          </Reveal>
          <Reveal delay={0.08} className="md:order-1">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-white/60">{c.label}</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{c.title}</h2>
              <p className="mt-6 text-white/80">{c.body![0]}</p>
            </div>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={0.06 * i}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
