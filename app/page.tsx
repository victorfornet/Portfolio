import { Hero } from "@/components/chapters/Hero";
import { ChapterFoundation } from "@/components/chapters/ChapterFoundation";
import { ChapterCorporateLab } from "@/components/chapters/ChapterCorporateLab";
import { ChapterBuilderStudio } from "@/components/chapters/ChapterBuilderStudio";
import { ChapterShipping } from "@/components/chapters/ChapterShipping";
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
        <ChapterWhatsNext />
      </HorizontalChapterTrack>
      <ChapterContact />
    </main>
  );
}
