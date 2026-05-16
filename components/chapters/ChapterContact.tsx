import { CHAPTERS } from "@/content/chapters";
import { SunsetScene } from "@/components/pixel/SunsetScene";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterContact() {
  const c = CHAPTERS[6];
  return (
    <section id="contact" className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <SunsetScene />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-700">{c.label}</p>
          <h2 className="mt-2 text-balance text-4xl font-semibold text-slate-900 md:text-6xl">
            {c.title}
          </h2>
          <p className="mt-6 max-w-xl text-slate-700">{c.body![0]}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            <CTA href="mailto:victor@rocapine.com">✉ Email me</CTA>
            <CTA
              variant="secondary"
              href="https://linkedin.com/in/victorfornet"
              target="_blank"
              rel="noreferrer"
            >
              in LinkedIn
            </CTA>
            <CTA
              variant="secondary"
              href="https://github.com/victorfornet"
              target="_blank"
              rel="noreferrer"
            >
              ⌨ GitHub
            </CTA>
          </div>
        </Reveal>
        <footer className="absolute bottom-6 inset-x-0 text-center font-mono text-xs text-slate-700/80">
          Made by Victor Fornet · 2026 · pixel-art with care
        </footer>
      </div>
    </section>
  );
}
