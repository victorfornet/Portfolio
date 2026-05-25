import { CHAPTERS } from "@/content/chapters";
import { CTA } from "@/components/ui/CTA";
import { EmailCopy } from "@/components/ui/EmailCopy";
import { Magnetic } from "@/components/ui/Magnetic";
import { SceneIllustration } from "@/components/ui/SceneIllustration";
import { Boxes } from "@/components/ui/Boxes";
import { Reveal } from "@/components/motion/Reveal";

export function ChapterContact() {
  const c = CHAPTERS[6];
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-dvh items-center overflow-hidden bg-slate-950 px-5 py-24 text-white md:px-10 md:py-32"
    >
      <Boxes />

      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-5xl">
        <Reveal>
          <SceneIllustration
            src="/pixel/contact.png"
            alt="Pixel-art golden-hour scene with a blond character waving toward the horizon."
            className="mx-auto max-w-[280px] md:max-w-md lg:max-w-3xl"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-2xl text-center md:mt-10">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/60 md:text-xs">
              {c.label}
            </p>
            <h2 className="mt-2 text-balance text-3xl font-semibold md:text-5xl lg:text-6xl">
              {c.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-white/80 md:mt-6 md:text-base">
              Building consumer, AI, or anything ambitious? Reach out.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
              <Magnetic>
                <EmailCopy email="victor.fornet@hec.edu" />
              </Magnetic>
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
      <footer className="pointer-events-none absolute inset-x-0 bottom-4 z-20 px-4 text-center font-mono text-[10px] text-white/50 md:bottom-6 md:text-xs">
        Made by Victor Fornet · 2026 · pixel-art with care
      </footer>
    </section>
  );
}
