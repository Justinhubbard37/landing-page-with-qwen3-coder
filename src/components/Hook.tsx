import { SectionHead, MaskLines, Reveal } from "../lib/atoms";

/** 01 — the thesis. First solid ground after the threshold. */
export default function Hook() {
  return (
    <section aria-labelledby="thesis-title" className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-20 md:pt-28">
      {/* threshold seam — the grid takes over */}
      <Reveal dir="none" className="mb-16">
        <div className="seam-h in w-full bg-gradient-to-r from-cloudy-sky-500/70 via-graphite-700 to-transparent" />
      </Reveal>

      <SectionHead index="01" title="Thesis" note="Operating doctrine — 2026" className="mb-14" />

      <h2 id="thesis-title" className="font-mono font-bold leading-[1.06] tracking-tight text-graphite-50">
        <MaskLines
          className="text-[clamp(2rem,6.2vw,4.9rem)]"
          step={120}
          lines={[
            <>Most systems</>,
            <>just add noise;</>,
            <>
              we engineer{" "}
              <span className="relative inline-block text-azure-mist">
                clarity.
                <span aria-hidden className="absolute -bottom-2 left-0 h-px w-full bg-cloudy-sky-400/70" />
              </span>
            </>,
          ]}
        />
      </h2>

      <div className="mt-14 grid gap-8 md:grid-cols-12">
        <Reveal delay={280} className="md:col-span-5 md:col-start-8">
          <p className="border-l border-graphite-700 pl-6 text-[15px] leading-relaxed text-graphite-300">
            The threshold is behind you. What follows is the doctrine — the unseen layer where
            OnTheLLow builds leverage: <span className="text-graphite-100">infrastructure, sovereignty, and
            orchestration</span> for operators who intend to keep what they build.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
