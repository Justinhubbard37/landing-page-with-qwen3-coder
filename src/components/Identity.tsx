import { SectionHead, Reveal, MaskLines, BrandMark, CornerTicks } from "../lib/atoms";

const PRINCIPLES = [
  {
    n: "01",
    term: "Clarity",
    line: "Every layer answers to a single intent. Nothing ornamental survives the review.",
  },
  {
    n: "02",
    term: "Sovereignty",
    line: "You hold the keys, the vault, and the source. That is not a tier — it is the default.",
  },
  {
    n: "03",
    term: "Permanence",
    line: "Engineered to outlive platforms, vendors, and fashion. Bricks, not tents.",
  },
  {
    n: "04",
    term: "Control",
    line: "Deterministic orchestration over black-box automation. You decide what executes.",
  },
  {
    n: "05",
    term: "Orchestration",
    line: "Raw computational power, disciplined into repeatable execution by elite technique.",
  },
];

/** 02 — doctrine. The worldview, delivered as editorial split + principle ledger. */
export default function Identity() {
  return (
    <section id="doctrine" aria-labelledby="doctrine-title" className="relative z-10 border-t border-graphite-900">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHead index="02" title="Doctrine" note="What we actually build" className="mb-16" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* left — sticky architectural marker */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal dir="left">
                <div className="panel relative p-7 md:p-8">
                  <CornerTicks className="border-cloudy-sky-400/50" />
                  <BrandMark size={40} />
                  <h2 id="doctrine-title" className="mt-6 font-mono text-2xl font-bold leading-snug tracking-tight text-graphite-50 md:text-[1.7rem]">
                    The unseen layer is where leverage is built.
                  </h2>
                  <p className="mono-label mt-5 text-graphite-500">
                    Systems architecture <span className="text-graphite-700">—</span> not tooling
                  </p>
                  <div className="mt-7 space-y-2.5">
                    {[
                      ["Layer", "Infrastructure"],
                      ["Bias", "Precision over noise"],
                      ["Horizon", "Decades, not quarters"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-6 border-t border-graphite-800 pt-2.5">
                        <span className="mono-label text-graphite-500">{k}</span>
                        <span className="font-mono text-[11px] tracking-[0.14em] text-graphite-200 uppercase">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* right — manifesto + principle ledger */}
          <div className="lg:col-span-7">
            <MaskLines
              className="font-sans text-[clamp(1.35rem,2.6vw,2.05rem)] font-medium leading-[1.32] tracking-[-0.01em] text-graphite-200"
              step={130}
              lines={[
                <>OnTheLLow operates at the unseen layer where real leverage is built —</>,
                <>
                  identifying failure points <em className="not-italic text-azure-mist">before</em> they become
                </>,
                <>your bottlenecks.</>,
              ]}
            />

            <Reveal delay={200} className="mt-10 max-w-xl">
              <p className="text-[15.5px] leading-relaxed text-graphite-400">
                We don&rsquo;t just provide tools; we define the architecture that determines whether you{" "}
                <span className="text-graphite-100">scale or stall</span>. Every seam, every interface, every
                deployment path is drawn first, then built — so the system behaves exactly the way it was
                designed to, under load, years from now.
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-12">
              <p className="font-mono text-xl font-bold tracking-tight text-azure-mist md:text-2xl">
                Precision isn&rsquo;t a feature — it&rsquo;s the foundation.
              </p>
            </Reveal>

            {/* principle ledger — rows, not cards */}
            <div className="mt-14 border-t border-graphite-800">
              {PRINCIPLES.map((pr, i) => (
                <Reveal key={pr.n} delay={i * 90} dir="none">
                  <div className="group row-lift grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b border-graphite-800 px-2 py-5 md:grid-cols-[4rem_13rem_1fr]">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-graphite-600 transition-colors duration-500 group-hover:text-cloudy-sky-300">
                      {pr.n}
                    </span>
                    <span className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-graphite-100 md:text-[15px]">
                      {pr.term}
                    </span>
                    <span className="col-span-2 mt-2 text-sm leading-relaxed text-graphite-400 md:col-span-1 md:mt-0">
                      {pr.line}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
