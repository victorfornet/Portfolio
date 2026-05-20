"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ScrambleText({
  text,
  durationMs = 320,
  className,
}: {
  text: string;
  durationMs?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function scramble() {
    if (reduced) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const chars = text.split("");
    const ticks = Math.max(8, Math.round(durationMs / 30));
    const tickStep = chars.length / ticks;
    let tick = 0;

    intervalRef.current = setInterval(() => {
      tick += 1;
      const locked = Math.floor(tick * tickStep);
      const next = chars
        .map((ch, i) => {
          if (i < locked || /\s/.test(ch)) return ch;
          return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        })
        .join("");
      setDisplay(next);
      if (tick >= ticks) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(text);
      }
    }, 30);
  }

  return (
    <span
      onMouseEnter={scramble}
      onFocus={scramble}
      className={className}
    >
      {display}
    </span>
  );
}
