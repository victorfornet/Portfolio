"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const COLORS = [
  "rgb(125 211 252)",
  "rgb(249 168 212)",
  "rgb(134 239 172)",
  "rgb(253 224 71)",
  "rgb(252 165 165)",
  "rgb(216 180 254)",
  "rgb(147 197 253)",
  "rgb(165 180 252)",
  "rgb(196 181 253)",
];

function pickColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function BoxesCore({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const rows = new Array(120).fill(1);
  const cols = new Array(60).fill(1);

  return (
    <div
      style={{
        transform: "translate(-55%, -45%) skewX(-48deg) skewY(14deg) scale(0.75)",
      }}
      className={cn(
        "absolute top-1/2 left-1/2 z-0 flex h-[300%] w-[300%] p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="relative h-8 w-16 border-l border-slate-600"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: pickColor(),
                transition: { duration: 0 },
              }}
              animate={{ transition: { duration: 2 } }}
              key={`col-${j}`}
              className="relative h-8 w-16 border-t border-r border-slate-600"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700/70"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export const Boxes = React.memo(BoxesCore);
