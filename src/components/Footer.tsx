import { BrandMark, Wordmark, StatusDot } from "../lib/atoms";

const INDEX = [
  { href: "#doctrine", label: "Doctrine" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#harness", label: "HarneSSHost" },
  { href: "#architect", label: "Architect" },
  { href: "#access", label: "Access" },
];

const SYSTEM: [string, React.ReactNode][] = [
  ["Status", <span key="s" className="flex items-center gap-2 text-mint-leaf-300"><StatusDot />Operational</span>],
  ["Build", "v2.6.1"],
  ["Region", "US-EAST-1"],
  ["Layer", "Infra / 01"],
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-graphite-800 bg-graphite-950/60">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-4">
            <a href="#gate" className="flex items-center gap-3">
              <BrandMark size={30} />
              <Wordmark className="text-sm text-graphite-100" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-graphite-500">
              Engineered below the visible layer — AI infrastructure, sovereignty, and orchestration for operators
              who intend to keep what they build.
            </p>
          </div>

          {/* index */}
          <nav className="md:col-span-2" aria-label="Footer">
            <p className="mono-label mb-5 text-graphite-500">Index</p>
            <ul className="space-y-3">
              {INDEX.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-400 transition-colors duration-300 hover:text-azure-mist">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* system state */}
          <div className="md:col-span-3">
            <p className="mono-label mb-5 text-graphite-500">System</p>
            <dl className="space-y-3">
              {SYSTEM.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-graphite-900 pb-2">
                  <dt className="mono-label text-graphite-600">{k}</dt>
                  <dd className="font-mono text-[11px] uppercase tracking-[0.18em] text-graphite-300">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* transmission */}
          <div className="md:col-span-3">
            <p className="mono-label mb-5 text-graphite-500">Transmission</p>
            <a
              href="mailto:protocol@onthellow.systems"
              className="break-all font-mono text-[12px] tracking-[0.08em] text-cloudy-sky-300 transition-colors duration-300 hover:text-azure-mist"
            >
              protocol@onthellow.systems
            </a>
            <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-graphite-600">
              40.7128° N / 74.0060° W
              <br />
              GATEWAY-001 — THRESHOLD SEALED
            </p>
          </div>
        </div>

        {/* baseline */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-graphite-900 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-600">
            © 2026 OnTheLLow Systems
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-700">
            All layers reserved
          </p>
          <a href="#gate" className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-500 transition-colors duration-300 hover:text-cloudy-sky-300">
            Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
