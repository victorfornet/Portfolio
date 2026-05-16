"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useActiveChapter } from "@/lib/use-active-chapter";
import { CHAPTERS } from "@/content/chapters";
import { cn } from "@/lib/cn";

const NAV_IDS = [
  "hero",
  "foundation",
  "corporate-lab",
  "builder-studio",
  "shipping",
  "whats-next",
  "contact",
];

export function NavBar() {
  const active = useActiveChapter(NAV_IDS);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120);
  });

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
