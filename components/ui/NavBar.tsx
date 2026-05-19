"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { useActiveChapter } from "@/lib/use-active-chapter";
import { CHAPTERS } from "@/content/chapters";
import { cn } from "@/lib/cn";
import { getSlotScrollY } from "@/lib/horizontal-track-math";

const NAV_IDS = [
  "hero",
  "foundation",
  "corporate-lab",
  "builder-studio",
  "shipping",
  "about-me",
  "whats-next",
  "contact",
];

const HORIZONTAL_IDS = [
  "foundation",
  "corporate-lab",
  "builder-studio",
  "shipping",
  "about-me",
  "whats-next",
];

export function NavBar() {
  const active = useActiveChapter(NAV_IDS, {
    horizontalIds: HORIZONTAL_IDS,
    horizontalSelector: "[data-horizontal-track]",
  });
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120);
  });

  function scrollToSlot(slotIndex: number, behavior: ScrollBehavior) {
    const wrapper = document.querySelector<HTMLElement>(
      "[data-horizontal-track]",
    );
    if (!wrapper) return false;
    const rect = wrapper.getBoundingClientRect();
    const wrapperTop = rect.top + window.scrollY;
    const top = getSlotScrollY({
      wrapperTop,
      wrapperHeight: rect.height,
      viewportHeight: window.innerHeight,
      slotIndex,
      slotCount: HORIZONTAL_IDS.length,
    });
    window.scrollTo({ top, behavior });
    return true;
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const slotIndex = HORIZONTAL_IDS.indexOf(id);
    if (slotIndex === -1) return;
    if (!document.querySelector("[data-horizontal-track]")) return;
    e.preventDefault();
    scrollToSlot(slotIndex, "smooth");
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const slotIndex = HORIZONTAL_IDS.indexOf(hash);
    if (slotIndex === -1) return;
    requestAnimationFrame(() => scrollToSlot(slotIndex, "auto"));
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 top-4 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2"
    >
      <ul className="flex items-center gap-1 overflow-x-auto rounded-full bg-slate-900/80 px-2 py-1.5 ring-1 ring-white/10 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CHAPTERS.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={(e) => handleClick(e, c.id)}
                className={cn(
                  "block rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                  isActive ? "bg-white text-slate-900" : "text-white/80 hover:text-white",
                )}
              >
                {c.navLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
