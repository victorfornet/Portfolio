import { CHAPTERS } from "@/content/chapters";
import { CTA } from "@/components/ui/CTA";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { Boxes } from "@/components/ui/Boxes";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterContact() {
  const c = CHAPTERS[6];
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 px-6 py-32 text-white md:px-10"
    >
      <Boxes />

      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-5xl">
        <Reveal>
          <SceneIllustration
            src="/pixel/contact.png"
            alt="Pixel-art golden-hour scene with a blond character waving toward the horizon."
            className="mx-auto max-w-3xl"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-white/60">
              {c.label}
            </p>
            <h2 className="mt-2 text-balance text-4xl font-semibold md:text-6xl">
              {c.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/80">{c.body![0]}</p>
            <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
              <CTA href="mailto:victor.fornet@hec.edu">✉ Email me</CTA>
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
          </div>
        </Reveal>
      </div>
      <footer className="pointer-events-none absolute inset-x-0 bottom-6 z-20 text-center font-mono text-xs text-white/50">
        Made by Victor Fornet · 2026 · pixel-art with care
      </footer>
    </section>
  );
}
