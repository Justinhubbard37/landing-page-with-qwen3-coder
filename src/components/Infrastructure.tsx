import { SectionHead, Reveal, MaskLines, CornerTicks } from "../lib/atoms";

/* custom inline glyphs — engineered line work, no icon library */
function Glyph({ kind }: { kind: "port" | "chip" | "brick" | "key" }) {
  const stroke = "rgba(132,175,225,0.9)";
  const common = { fill: "none", stroke, strokeWidth: 1.6 } as const;
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      {kind === "port" && (
        <g {...common}>
          <rect x="7" y="12" width="18" height="16" />
          <path d="M25 17h8M29 13l4 4-4 4" strokeLinecap="square" />
          <path d="M11 8h10" opacity="0.55" />
        </g>
      )}
      {kind === "chip" && (
        <g {...common}>
          <rect x="11" y="11" width="18" height="18" />
          <rect x="17" y="17" width="6" height="6" opacity="0.7" />
          <path d="M15 11V5M20 11V5M25 11V5M15 35v-6M20 35v-6M25 35v-6M11 15H5M11 20H5M11 25H5M35 15h-6M35 20h-6M35 25h-6" opacity="0.6" />
        </g>
      )}
      {kind === "brick" && (
        <g {...common}>
          <path d="M6 14h28M6 21h28M6 28h28M6 14v14M34 14v14M6 21h28M15 14v7M25 14v7M10 21v7M20 21v7M30 21v7" strokeLinecap="square" />
        </g>
      )}
      {kind === "key" && (
        <g {...common}>
          <circle cx="14" cy="20" r="6" />
          <path d="M20 20h14M29 20v6M34 20v4" strokeLinecap="square" />
        </g>
      )}
    </svg>
  );
}

const PANELS = [
  {
    n: "3.1",
    kind: "port" as const,
    title: "Portable framework",
    line: "One blueprint, any ground. Your entire operation is housed in a portable, environment-agnostic framework — it carries its own structure wherever it lands.",
  },
  {
    n: "3.2",
    kind: "chip" as const,
    title: "Any hardware you own",
    line: "Deploys to any hardware you decide to own. Bare metal, private cloud, or the edge — the framework doesn't ask a platform for permission.",
  },
  {
    n: "3.3",
    kind: "brick" as const,
    title: "Zero landlords",
    line: "Digital platforms are just fancy landlords. We build for permanence, so the equity you pour into your system never accrues to someone else's stack.",
  },
  {
    n: "3.4",
    kind: "key" as const,
    title: "Sovereign transit",
    line: "Sovereignty means moving your office without losing a single brick. Keys, vault, and source travel with you — intact, verified, yours.",
  },
];

const STRIP = [
  "Portable",
  "Environment-agnostic",
  "Sovereign",
  "Permanent",
  "Hardware-owned",
  "Lock-in-free",
  "Self-determined",
];

/** 03 — infrastructure. Pinned doctrine column, scrolling structural panels. */
export default function Infrastructure() {
  return (
    <section id="infrastructure" aria-labelledby="infra-title" className="relative z-10 border-t border-graphite-900">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHead index="03" title="Infrastructure" note="Permanence protocol" className="mb-16" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* pinned left column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 id="infra-title" className="font-mono font-bold leading-[1.08] tracking-tight text-graphite-50">
                <MaskLines
                  className="text-[clamp(1.9rem,4vw,3.1rem)]"
                  step={130}
                  lines={[<>We build for</>, <><span className="text-azure-mist">permanence.</span></>]}
                />
              </h2>

              <Reveal delay={220} className="mt-8 max-w-md">
                <p className="text-[15.5px] leading-relaxed text-graphite-400">
                  Your entire operation is housed in a portable, environment-agnostic framework that deploys to
                  any hardware you decide to own. No rental ground. No hostage equity. No exit fees dressed up
                  as features.
                </p>
              </Reveal>

              <Reveal delay={340} className="mt-10">
                <div className="panel relative inline-block px-6 py-5">
                  <CornerTicks className="border-cloudy-sky-400/50" />
                  <p className="mono-label leading-relaxed text-graphite-300">
                    Sovereignty = moving your office
                    <br />
                    <span className="text-cloudy-sky-300">without losing a single brick</span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* scrolling right panels */}
          <div className="space-y-5 lg:col-span-7">
            {PANELS.map((pn, i) => (
              <Reveal key={pn.n} delay={i * 80}>
                <article className="panel group row-lift relative overflow-hidden p-7 md:p-8">
                  <CornerTicks className="border-graphite-600 group-hover:border-cloudy-sky-300" />
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] tracking-[0.24em] text-graphite-600">{pn.n}</span>
                        <h3 className="font-mono text-base font-bold uppercase tracking-[0.16em] text-graphite-100 md:text-lg">
                          {pn.title}
                        </h3>
                      </div>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-graphite-400">{pn.line}</p>
                    </div>
                    <div className="shrink-0 border border-graphite-800 bg-graphite-950 p-3 transition-colors duration-500 group-hover:border-cloudy-sky-700/70">
                      <Glyph kind={pn.kind} />
                    </div>
                  </div>
                  {/* base seam activates on hover */}
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cloudy-sky-500/80 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-hydraulic)] group-hover:scale-x-100" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* permanence strip — engineered marquee */}
      <div className="relative border-y border-graphite-800 bg-graphite-950/70 py-4" aria-hidden="true">
        <div className="marquee-track items-center gap-10">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-10">
              {STRIP.map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center gap-10">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.4em] text-graphite-400">
                    {w}
                  </span>
                  <span className="block h-1.5 w-1.5 rotate-45 bg-cloudy-sky-600/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
