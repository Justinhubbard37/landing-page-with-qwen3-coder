import React from "react";
import { useInView } from "./hooks";

/* ————— Reveal wrapper — scroll-triggered, staggered — */

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  dir?: "up" | "left" | "right" | "scale" | "none";
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  dir = "up",
  as = "div",
  id,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const dirClass =
    dir === "left" ? "r-left" : dir === "right" ? "r-right" : dir === "scale" ? "r-scale" : dir === "none" ? "r-none" : "";
  return React.createElement(
    as,
    {
      ref: ref as React.Ref<never>,
      id,
      className: `reveal ${dirClass} ${inView ? "in" : ""} ${className}`,
      style: { "--rd": `${delay}ms` } as React.CSSProperties,
    },
    children
  );
}

/* ————— Masked line reveal (for editorial statements) — */

export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  step = 110,
  base = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  step?: number;
  base?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`${inView ? "in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${lineClassName}`}>
          <span style={{ "--rd": `${base + i * step}ms` } as React.CSSProperties}>{line}</span>
        </span>
      ))}
    </div>
  );
}

/* ————— Section index head:  02 / DOCTRINE ———— rule — note — */

export function SectionHead({
  index,
  title,
  note,
  className = "",
}: {
  index: string;
  title: string;
  note?: string;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`flex items-center gap-5 ${inView ? "is-in" : ""} ${className}`}
    >
      <span className="font-mono text-[11px] tracking-[0.3em] text-cloudy-sky-300">{index}</span>
      <span className="font-mono text-[11px] tracking-[0.34em] uppercase text-graphite-200">{title}</span>
      <span className="seam-h flex-1 min-w-8" />
      {note && (
        <span className="hidden md:block font-mono text-[10px] tracking-[0.26em] uppercase text-graphite-500">
          {note}
        </span>
      )}
    </div>
  );
}

/* ————— Corner ticks for graphite panels — */

export function CornerTicks({ className = "border-cloudy-sky-400/60" }: { className?: string }) {
  const base = `absolute h-2.5 w-2.5 border-0 ${className} pointer-events-none transition-colors duration-500`;
  return (
    <>
      <i aria-hidden className={`${base} left-0 top-0 border-l border-t`} />
      <i aria-hidden className={`${base} right-0 top-0 border-r border-t`} />
      <i aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} />
      <i aria-hidden className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/* ————— Brand mark: gate brackets + keyhole core — */

export function BrandMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* gate brackets */}
      <path d="M22 12 H14 V52 H22" stroke="#5b95d7" strokeWidth="2.6" strokeLinecap="square" />
      <path d="M42 12 H50 V52 H42" stroke="#5b95d7" strokeWidth="2.6" strokeLinecap="square" />
      {/* keyhole core */}
      <circle cx="32" cy="26" r="6.4" stroke="#e1f5f9" strokeWidth="2.4" />
      <path d="M32 32.5 V47" stroke="#e1f5f9" strokeWidth="2.4" strokeLinecap="square" />
      {/* threshold seam */}
      <path d="M25 52 H39" stroke="#72708f" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono font-bold tracking-[0.18em] uppercase ${className}`}>
      OnThe<span className="text-cloudy-sky-300">LL</span>ow
    </span>
  );
}

/* ————— Status dot — */

export function StatusDot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full bg-mint-leaf pulse-dot ${className}`} />;
}
