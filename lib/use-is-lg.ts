"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is at the `lg` Tailwind breakpoint or wider
 * (>= 1024px). Used to gate desktop-only scroll-linked animations.
 */
export function useIsLg(): boolean {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return lg;
}
