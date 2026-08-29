import { MaskLines, Reveal, CornerTicks } from "../lib/atoms";

/** 06 — the closing point. Architectural, not pleading. */
export default function Cta() {
  return (
    <section id="access" aria-labelledby="access-title" className="relative z-10 border-t border-graphite-800">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <Reveal dir="scale">
          <div className="panel relative overflow-hidden px-7 py-14 md:px-14 md:py-20">
            <CornerTicks className="border-cloudy-sky-400/60" />
            {/* restrained structural glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(70% 90% at 18% 50%, rgba(89,148,215,0.09), transparent 60%)" }}
            />

            <div className="relative grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="mono-label mb-7 text-graphite-500">
                  <span className="text-cloudy-sky-300">06</span> — Access
                </p>
                <h2 id="access-title" className="font-mono font-bold leading-[1.1] tracking-tight text-graphite-50">
                  <MaskLines
                    className="text-[clamp(1.8rem,4.4vw,3.3rem)]"
                    step={140}
                    lines={[
                      <>We build the system;</>,
                      <>
                        you own the <span className="text-azure-mist">scale.</span>
                      </>,
                    ]}
                  />
                </h2>
                <Reveal delay={260} className="mt-7 max-w-lg">
                  <p className="text-[15px] leading-relaxed text-graphite-400">
                    OnTheLLow onboards a limited founding cohort — operators who want the architecture drawn,
                    built, and handed over with the keys inside.
                  </p>
                </Reveal>
              </div>

              <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
                <a href="mailto:protocol@onthellow.systems?subject=Access%20Request%20—%20OnTheLLow" className="btn-primary inline-flex items-center gap-4">
                  Request Access
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                  </svg>
                </a>
                <p className="mono-label text-graphite-500">Founding cohort — Q3 2026</p>
                <a href="#gate" className="btn-ghost">Re-enter the gateway ↑</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
