"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function EmailCopy({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }, [email]);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Email copied" : `Copy email ${email}`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xl bg-white/95 px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 shadow-[0_8px_24px_-12px_rgba(15,40,80,0.25)] transition-all hover:ring-slate-300",
        className,
      )}
    >
      <span aria-hidden>✉</span>
      <span className="font-mono text-[13px] tracking-tight">{email}</span>
      <span
        aria-hidden
        className={cn(
          "ml-1 inline-flex items-center justify-center rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
          copied ? "bg-emerald-100 text-emerald-700" : "text-slate-500",
        )}
      >
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
