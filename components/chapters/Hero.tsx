"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CTA } from "@/components/ui/CTA";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["consumer", "growth", "AI", "mobile", "shipped"],
    [],
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 2000);
    return () => clearTimeout(id);
  }, [titleNumber, titles]);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center justify-center px-6 py-32 md:px-10"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 rounded-3xl bg-white/55 px-8 py-12 text-center backdrop-blur-md ring-1 ring-black/5 shadow-[0_30px_80px_-30px_rgba(15,40,80,0.45)] md:px-16 md:py-16">
        <h1 className="w-full text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-7xl">
          <span className="block">I build</span>
          <span className="relative flex w-full justify-center overflow-y-hidden md:pb-4 md:pt-1">
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-semibold text-sky-700"
                initial={{ opacity: 0, y: -100 }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
          <span className="block">products.</span>
        </h1>

        <p className="max-w-xl text-base text-slate-800 md:text-lg">
          Product &amp; Growth at Rocapine. Building Vibo on the side. Studying at
          HEC Paris, learning by shipping.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <CTA href="#shipping">See what I&apos;m building</CTA>
        </div>
      </div>
    </section>
  );
}
