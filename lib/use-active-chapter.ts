"use client";
import { useEffect, useState } from "react";

export type HorizontalTrackDescriptor = {
  horizontalIds: string[];
  horizontalSelector: string;
};

export function useActiveChapter(
  ids: string[],
  descriptor?: HorizontalTrackDescriptor,
) {
  const [active, setActive] = useState<string | null>(null);
  const horizontalIds = descriptor?.horizontalIds;
  const horizontalSelector = descriptor?.horizontalSelector;

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    function isInsideHorizontalTrack(): boolean {
      if (!horizontalSelector) return false;
      const wrapper = document.querySelector(horizontalSelector);
      if (!wrapper) return false;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      return rect.top <= 0 && rect.bottom > vh;
    }

    function computeHorizontalActive(): string | null {
      if (!horizontalSelector || !horizontalIds) return null;
      const wrapper = document.querySelector(horizontalSelector);
      if (!wrapper) return null;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) return null;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const slotCount = horizontalIds.length;
      if (slotCount === 0) return null;
      const slot = Math.round(progress * (slotCount - 1));
      return horizontalIds[slot] ?? null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isInsideHorizontalTrack()) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b,
        );
        setActive(top.target.id);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    elements.forEach((el) => observer.observe(el));

    function onScroll() {
      if (!horizontalSelector) return;
      if (!isInsideHorizontalTrack()) return;
      const next = computeHorizontalActive();
      if (next) setActive(next);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, horizontalIds, horizontalSelector]);

  return active;
}
