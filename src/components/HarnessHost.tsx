import { useEffect, useRef, useState } from "react";
import { SectionHead, Reveal, MaskLines, CornerTicks, BrandMark, StatusDot } from "../lib/atoms";
import { useInView, useCountUp, usePrefersReducedMotion } from "../lib/hooks";

/* ————— data ————— */

const NODES = [
  { name: "CORE-01", load: 62 },
  { name: "CORE-02", load: 48 },
  { name: "VAULT-01", load: 71 },
  { name: "ORCH-7", load: 39 },
  { name: "EDGE-04", load: 55 },
  { name: "RELAY-02", load: 44 },
];
const BASE_LAT = [12, 14, 9, 16, 11, 13];

const LOG_POOL: { tag: "OK" | "SYNC" | "AUTH"; msg: string }[] = [
  { tag: "OK", msg: "handshake accepted :: vault-01" },
  { tag: "SYNC", msg: "edge node EDGE-04 aligned — drift 0.003%" },
  { tag: "OK", msg: "pipeline ORCH-7 scheduled → 12ms" },
  { tag: "AUTH", msg: "owner-key verified :: scope FULL" },
  { tag: "OK", msg: "checksum sealed :: 9f3a…c21" },
  { tag: "SYNC", msg: "warm pool 8 — cold start eliminated" },
  { tag: "OK", msg: "p99 latency budget enforced :: 14ms" },
  { tag: "AUTH", msg: "sovereignty audit :: PASS" },
  { tag: "OK", msg: "artifact sealed :: owner-key only" },
  { tag: "SYNC", msg: "orchestration cycle complete :: 0 drops" },
];

const NET_ROWS = [
  { m: "GET", path: "/v1/orchestrate", s: "200", t: "12ms", size: "4.2KB" },
  { m: "POST", path: "/v1/vault/seal", s: "201", t: "34ms", size: "1.1KB" },
  { m: "GET", path: "/v1/edge/sync", s: "200", t: "9ms", size: "780B" },
  { m: "POST", path: "/v1/intent/resolve", s: "200", t: "21ms", size: "2.6KB" },
  { m: "GET", path: "/v1/telemetry/stream", s: "206", t: "4ms", size: "LIVE" },
  { m: "POST", path: "/v1/deploy/immutable", s: "201", t: "88ms", size: "12.4KB" },
];

const TABS = ["Orchestration", "Network", "Vault", "Logs"] as const;
type Tab = (typeof TABS)[number];

type LogLine = { id: number; time: string; tag: "OK" | "SYNC" | "AUTH"; msg: string };

const fmtClock = (d: Date) =>
  [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":");

/* ————— component ————— */

export default function HarnessHost() {
  const reduced = usePrefersReducedMotion();
  const [tab, setTab] = useState<Tab>("Orchestration");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [lat, setLat] = useState(BASE_LAT);
  const [uptime, setUptime] = useState("00:00:00");
  const idRef = useRef(0);
  const poolRef = useRef(0);
  const [consoleRef, consoleIn] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [stripRef, stripIn] = useInView<HTMLDivElement>({ threshold: 0.4 });

  /* streaming event log */
  useEffect(() => {
    if (!consoleIn || reduced) {
      if (reduced && logs.length === 0) {
        setLogs(LOG_POOL.slice(0, 6).map((l, i) => ({ id: i, time: "—", ...l })));
      }
      return;
    }
    const iv = window.setInterval(() => {
      const next = LOG_POOL[poolRef.current % LOG_POOL.length];
      poolRef.current += 1;
      idRef.current += 1;
      setLogs((prev) => [...prev.slice(-8), { id: idRef.current, time: fmtClock(new Date()), ...next }]);
    }, 1250);
    return () => window.clearInterval(iv);
  }, [consoleIn, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  /* latency micro-jitter */
  useEffect(() => {
    if (!consoleIn || reduced) return;
    const iv = window.setInterval(() => {
      setLat(BASE_LAT.map((b) => Math.max(5, b + Math.floor(Math.random() * 7) - 3)));
    }, 1900);
    return () => window.clearInterval(iv);
  }, [consoleIn, reduced]);

  /* session uptime clock */
  useEffect(() => {
    const t0 = Date.now();
    const iv = window.setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setUptime(`${hh}:${mm}:${ss}`);
    }, 1000);
    return () => window.clearInterval(iv);
  }, []);

  const throughput = useCountUp(48.2, { decimals: 1, start: stripIn, duration: 1600 });
  const latencyP = useCountUp(14, { start: stripIn, duration: 1400 });
  const uptimePct = useCountUp(99.99, { decimals: 2, start: stripIn, duration: 1800 });
  const regions = useCountUp(9, { start: stripIn, duration: 1200 });

  const tagColor = (t: LogLine["tag"]) =>
    t === "OK" ? "text-mint-leaf-300" : t === "SYNC" ? "text-cloudy-sky-300" : "text-azure-mist";

  return (
    <section id="harness" aria-labelledby="harness-title" className="relative z-10 border-t border-graphite-900">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHead index="04" title="Interface" note="HarneSSHost console — v2.6" className="mb-16" />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="harness-title" className="font-mono font-bold leading-[1.08] tracking-tight text-graphite-50">
              <MaskLines
                className="text-[clamp(1.9rem,4.4vw,3.4rem)]"
                step={140}
                lines={[
                  <>Stop fighting</>,
                  <>your tools. Start</>,
                  <>
                    <span className="text-azure-mist">orchestrating</span> them.
                  </>,
                ]}
              />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={240}>
              <p className="text-[15.5px] leading-relaxed text-graphite-400">
                Performance shouldn&rsquo;t feel like a puzzle, yet most interfaces are built to distract. The{" "}
                <span className="font-mono text-[14px] font-semibold tracking-wide text-cloudy-sky-300">HarneSSHost</span>{" "}
                console is the solution — a high-fidelity orchestration interface where raw computational power is
                finally disciplined by elite technique. It removes the friction between your intent and the
                machine&rsquo;s execution.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ———— the console ———— */}
        <Reveal delay={120} dir="scale" className="mt-16">
          <div ref={consoleRef} className="panel relative overflow-hidden">
            <CornerTicks className="border-cloudy-sky-400/60" />
            {!reduced && <div aria-hidden className="scanline" />}

            {/* chrome */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-graphite-800 bg-graphite-950/80 px-5 py-3.5 md:px-7">
              <div className="flex items-center gap-3">
                <BrandMark size={20} />
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.24em] text-graphite-100">
                  HarneSSHost
                </span>
                <span className="border border-graphite-700 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.18em] text-graphite-400">
                  v2.6.1
                </span>
              </div>
              <div className="order-last flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto sm:flex-1 sm:justify-center" role="tablist" aria-label="Console modules">
                {TABS.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`whitespace-nowrap border-b px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                      tab === t
                        ? "border-cloudy-sky-300 text-azure-mist"
                        : "border-transparent text-graphite-500 hover:text-graphite-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-graphite-400">
                <StatusDot />
                <span className="text-mint-leaf-300">LIVE</span>
                <span className="hidden text-graphite-600 sm:inline">UPTIME {uptime}</span>
              </div>
            </div>

            {/* body */}
            <div className="min-h-[380px]">
              {tab === "Orchestration" && (
                <div className="grid md:grid-cols-2">
                  {/* node ledger */}
                  <div className="border-b border-graphite-800 p-5 md:border-b-0 md:border-r md:p-7">
                    <p className="mono-label mb-5 text-graphite-500">Active nodes — 06</p>
                    <ul className="space-y-4">
                      {NODES.map((n, i) => (
                        <li key={n.name} className="group">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] text-graphite-200">
                              <span className="h-1.5 w-1.5 rounded-full bg-mint-leaf shadow-[0_0_8px_rgba(32,189,144,0.7)]" />
                              {n.name}
                            </span>
                            <span className="font-mono text-[11px] text-graphite-500 transition-colors duration-300 group-hover:text-cloudy-sky-300">
                              {lat[i]}ms
                            </span>
                          </div>
                          <div className="relative mt-2 h-[3px] overflow-hidden bg-graphite-900">
                            <div
                              className={`relative h-full overflow-hidden bg-gradient-to-r from-cloudy-sky-600 to-cloudy-sky-300 transition-[width] duration-[1400ms] [transition-timing-function:var(--ease-hydraulic)] ${!reduced ? "bar-shimmer" : ""}`}
                              style={{
                                width: consoleIn ? `${n.load}%` : "0%",
                                transitionDelay: `${i * 110}ms`,
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* event stream */}
                  <div className="relative p-5 md:p-7">
                    <p className="mono-label mb-5 text-graphite-500">Event stream — tail</p>
                    <div className="space-y-2 font-mono text-[11.5px] leading-relaxed" aria-live="polite">
                      {logs.map((l) => (
                        <p key={l.id} className="flex gap-3">
                          <span className="shrink-0 text-graphite-600">{l.time}</span>
                          <span className={`shrink-0 font-semibold ${tagColor(l.tag)}`}>[{l.tag}]</span>
                          <span className="truncate text-graphite-300">{l.msg}</span>
                        </p>
                      ))}
                      <p className="flex items-center gap-2 text-graphite-500">
                        <span className="text-cloudy-sky-300">harness@core</span>
                        <span className="text-graphite-600">:~$</span>
                        <span className="blink inline-block h-3.5 w-[7px] bg-azure-mist/80" />
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {tab === "Network" && (
                <div className="p-5 md:p-7">
                  <p className="mono-label mb-5 text-graphite-500">Transport — last 60s</p>
                  <div className="grid grid-cols-[3.4rem_1fr_3rem_3.6rem_4rem] gap-x-3 border-b border-graphite-800 pb-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-graphite-600 md:grid-cols-[4rem_1fr_4rem_4.5rem_5rem]">
                    <span>Method</span><span>Route</span><span>Code</span><span>Time</span><span className="text-right">Size</span>
                  </div>
                  {NET_ROWS.map((r, i) => (
                    <div
                      key={r.path}
                      className="grid grid-cols-[3.4rem_1fr_3rem_3.6rem_4rem] items-baseline gap-x-3 border-b border-graphite-900 py-2.5 font-mono text-[11.5px] transition-colors duration-300 hover:bg-graphite-900/50 md:grid-cols-[4rem_1fr_4rem_4.5rem_5rem]"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      <span className="text-graphite-400">{r.m}</span>
                      <span className="truncate text-graphite-200">{r.path}</span>
                      <span className={r.s === "206" ? "text-cloudy-sky-300" : "text-mint-leaf-300"}>{r.s}</span>
                      <span className="text-graphite-500">{r.t}</span>
                      <span className="text-right text-graphite-500">{r.size}</span>
                    </div>
                  ))}
                </div>
              )}

              {(tab === "Vault" || tab === "Logs") && (
                <div className="flex min-h-[340px] flex-col items-center justify-center gap-5 p-10 text-center">
                  <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" aria-hidden="true">
                    <rect x="10" y="20" width="28" height="20" stroke="rgba(132,175,225,0.8)" strokeWidth="1.8" />
                    <path d="M16 20v-5a8 8 0 0 1 16 0v5" stroke="rgba(132,175,225,0.8)" strokeWidth="1.8" />
                    <circle cx="24" cy="29" r="2.6" stroke="#e1f5f9" strokeWidth="1.6" />
                    <path d="M24 31.5V35" stroke="#e1f5f9" strokeWidth="1.6" />
                  </svg>
                  <div>
                    <p className="font-mono text-sm font-bold uppercase tracking-[0.24em] text-graphite-200">
                      {tab === "Vault" ? "Vault module — sealed" : "Audit trail — sealed"}
                    </p>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-graphite-500">
                      Owner-key access only. Clearance is granted when your instance is provisioned — sovereignty
                      is not a demo feature.
                    </p>
                  </div>
                  <a href="#access" className="btn-ghost">Request clearance</a>
                </div>
              )}
            </div>

            {/* etched footer */}
            <div className="flex items-center justify-between border-t border-graphite-800 bg-graphite-950/80 px-5 py-2.5 md:px-7">
              <span className="mono-label text-graphite-600">HarneSSHost // orchestration layer</span>
              <span className="mono-label hidden text-graphite-600 sm:block">
                intent → execution <span className="text-mint-leaf-300">0 friction</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* ———— metrics strip ———— */}
        <div ref={stripRef} className="mt-10 grid grid-cols-2 border border-graphite-800 bg-graphite-950/60 md:grid-cols-4">
          {[
            { k: "Throughput", v: throughput, u: "GB/S" },
            { k: "P99 latency", v: latencyP, u: "MS" },
            { k: "Uptime", v: uptimePct, u: "%" },
            { k: "Regions", v: String(Number(regions)).padStart(2, "0"), u: "ACTIVE" },
          ].map((m, i) => (
            <div key={m.k} className={`px-6 py-6 ${i % 2 === 1 ? "border-l border-graphite-800" : ""} ${i >= 2 ? "border-t border-graphite-800 md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}>
              <p className="mono-label text-graphite-500">{m.k}</p>
              <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-graphite-50 md:text-[1.7rem]">
                {m.v}
                <span className="ml-2 text-[11px] font-medium tracking-[0.2em] text-cloudy-sky-300">{m.u}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
