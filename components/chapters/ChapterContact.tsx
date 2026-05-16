import { CHAPTERS } from "@/content/chapters";
import { CTA } from "@/components/ui/CTA";
import { ContentPanel } from "@/components/ui/ContentPanel";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterContact() {
  const c = CHAPTERS[6];
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-screen items-center justify-center px-6 py-32 md:px-10"
    >
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <ContentPanel className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-700">{c.label}</p>
            <h2 className="mt-2 text-balance text-4xl font-semibold text-slate-900 md:text-6xl">
              {c.title}
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-slate-700">{c.body![0]}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
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
          </ContentPanel>
        </Reveal>
      </div>
      <footer className="pointer-events-none absolute bottom-6 inset-x-0 text-center font-mono text-xs text-slate-700/80">
        Made by Victor Fornet · 2026 · pixel-art with care
      </footer>
    </section>
  );
}
