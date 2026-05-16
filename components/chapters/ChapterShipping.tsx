import { CHAPTERS } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ContentPanel } from "@/components/ui/ContentPanel";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterShipping() {
  const c = CHAPTERS[4];
  return (
    <section
      id="shipping"
      className="relative isolate flex min-h-screen items-center px-6 py-32 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <ContentPanel tone="dark" className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-white/60">{c.label}</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{c.title}</h2>
            <p className="mt-6 text-white/80">{c.body![0]}</p>
          </ContentPanel>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
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
