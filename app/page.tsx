import { Hero } from "@/components/chapters/Hero";
import { ChapterFoundation } from "@/components/chapters/ChapterFoundation";
import { ChapterCorporateLab } from "@/components/chapters/ChapterCorporateLab";
import { ChapterBuilderStudio } from "@/components/chapters/ChapterBuilderStudio";
import { ChapterShipping } from "@/components/chapters/ChapterShipping";
import { ChapterAboutMe } from "@/components/chapters/ChapterAboutMe";
import { ChapterWhatsNext } from "@/components/chapters/ChapterWhatsNext";
import { ChapterContact } from "@/components/chapters/ChapterContact";
import { HorizontalChapterTrack } from "@/components/motion/HorizontalChapterTrack";

export default function Page() {
  return (
    <main>
      <Hero />
      <HorizontalChapterTrack>
        <ChapterFoundation />
        <ChapterCorporateLab />
        <ChapterBuilderStudio />
        <ChapterShipping />
        <ChapterAboutMe />
        <ChapterWhatsNext />
      </HorizontalChapterTrack>
      <ChapterContact />
    </main>
  );
}
