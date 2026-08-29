import { SectionHead, Reveal, MaskLines } from "../lib/atoms";

const OWNERSHIP = [
  {
    id: "A",
    label: "Data vault",
    line: "Total control over your data vault — encrypted at rest, sealed by owner-key, portable by default. What you generate, you govern.",
  },
  {
    id: "B",
    label: "Source code",
    line: "Your source stays yours. Readable, auditable, exportable — no escrow theater, no fine-print captivity.",
  },
  {
    id: "C",
    label: "Zero overhead",
    line: "You shouldn't have to be a systems admin to own your empire. We carry the technical overhead; you carry the direction.",
  },
];

/** 05 — the AI Architect positioning. Deliberately the quietest section: reading focus first. */
export default function Architect() {
  return (
    <section id="architect" aria-labelledby="architect-title" className="relative z-10 border-t border-graphite-900">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHead index="05" title="Architect" note="Invisible sovereignty" className="mb-16" />

        <h2 id="architect-title" className="font-mono font-bold leading-[1.1] tracking-tight text-graphite-50">
          <MaskLines
            className="text-[clamp(1.8rem,4.6vw,3.5rem)]"
            step={150}
            lines={[
              <>The era of the &ldquo;user&rdquo; is over;</>,
              <>
                the era of the <span className="text-azure-mist">AI Architect</span>
              </>,
              <>has begun.</>,
            ]}
          />
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal delay={200} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[15.5px] leading-relaxed text-graphite-400">
              We deliver <span className="text-graphite-100">invisible sovereignty</span> — total control over your
              data vault and source code without the traditional technical overhead. The machinery stays below the
              visible layer, exactly where it should be. You make the decisions an owner makes; the system behaves
              like an owner&rsquo;s system should.
            </p>
          </Reveal>
        </div>

        {/* ownership ledger */}
        <div className="mt-20 border-t border-graphite-800">
          {OWNERSHIP.map((o, i) => (
            <Reveal key={o.id} delay={i * 110} dir="none">
              <div className="group grid gap-4 border-b border-graphite-800 py-9 md:grid-cols-12 md:gap-8">
                <div className="flex items-baseline gap-5 md:col-span-4">
                  <span className="font-mono text-[11px] tracking-[0.24em] text-graphite-600 transition-colors duration-500 group-hover:text-cloudy-sky-300">
                    {o.id} /
                  </span>
                  <h3 className="font-mono text-lg font-bold uppercase tracking-[0.16em] text-graphite-100 md:text-xl">
                    {o.label}
                  </h3>
                </div>
                <p className="max-w-2xl text-[15.5px] leading-relaxed text-graphite-400 md:col-span-8 md:pt-0.5">
                  {o.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
