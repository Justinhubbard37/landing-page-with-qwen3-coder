import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, seg, easeOutQuart } from "../lib/hooks";
import { BrandMark, Wordmark } from "../lib/atoms";

/* ————————————————————————————————————————————————
   KINETIC THRESHOLD — the hero-only dimensional system.
   Phase 1: mechanical assembly on load
   Phase 2: ambient hold (drift + mouse parallax)
   Phase 3: scroll-scrubbed unlock → gate split → Z-axis push-through
   ———————————————————————————————————————————————— */

type Shard = {
  left: string;
  top: string;
  w: string;
  h: string;
  rz: number;
  z: number;
  f: number;
  outX: number;
  outY: number;
  drift: string;
  delay: number;
  sx: number;
  sy: number;
  etched?: boolean;
  opacity: number;
};

const SHARDS: Shard[] = [
  { left: "9%", top: "16%", w: "min(15vw,148px)", h: "min(22vw,206px)", rz: -12, z: -160, f: 1.05, outX: -260, outY: -120, drift: "drift-a", delay: 0.62, sx: -140, sy: -90, opacity: 0.85 },
  { left: "78%", top: "13%", w: "min(12vw,124px)", h: "min(18vw,168px)", rz: 14, z: -90, f: 0.9, outX: 240, outY: -140, drift: "drift-b", delay: 0.72, sx: 150, sy: -80, etched: true, opacity: 0.7 },
  { left: "6%", top: "62%", w: "min(11vw,112px)", h: "min(16vw,150px)", rz: 8, z: -220, f: 1.2, outX: -300, outY: 150, drift: "drift-c", delay: 0.8, sx: -160, sy: 110, opacity: 0.6 },
  { left: "82%", top: "60%", w: "min(14vw,140px)", h: "min(19vw,180px)", rz: -9, z: -120, f: 1.0, outX: 280, outY: 130, drift: "drift-a", delay: 0.88, sx: 170, sy: 100, etched: true, opacity: 0.75 },
  { left: "24%", top: "8%", w: "min(7vw,76px)", h: "min(10vw,104px)", rz: 22, z: -40, f: 0.8, outX: -180, outY: -200, drift: "drift-b", delay: 0.96, sx: -90, sy: -140, opacity: 0.5 },
];

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [p, setP] = useState(0); // scroll progress 0..1
  const [par, setPar] = useState({ x: 0, y: 0 }); // mouse parallax (deg)

  /* arm assembly after first paint */
  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), reduced ? 0 : 120);
    return () => window.clearTimeout(t);
  }, [reduced]);

  /* scroll-scrubbed progress, lerped for hydraulic smoothness */
  useEffect(() => {
    let raf = 0;
    let target = 0;
    let shown = -1;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      target = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));
    };
    const loop = () => {
      measure();
      const next = shown + (target - shown) * (reduced ? 1 : 0.12);
      if (Math.abs(next - shown) > 0.0004 || shown < 0) {
        shown = Math.abs(next - target) < 0.0006 ? target : next;
        setP(shown);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* restrained cursor parallax — hero only, fine pointers only */
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      setPar({ x: cx * 2.6, y: cy * -2.1 });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  /* ————— phase math ————— */
  const unlock = easeOutQuart(seg(p, 0.02, 0.16));
  const doors = easeOutQuart(seg(p, 0.1, 0.54));
  const rails = easeOutQuart(seg(p, 0.24, 0.64));
  const push = easeOutQuart(seg(p, 0.44, 0.92));
  const hud = 1 - seg(p, 0.03, 0.22);
  const doorOp = 1 - seg(p, 0.3, 0.56);
  const coreOp = 1 - seg(p, 0.5, 0.8);
  const sceneOp = reduced ? 1 - seg(p, 0.25, 0.75) : 1 - seg(p, 0.62, 0.9);

  const doorL = reduced
    ? undefined
    : `translateX(${-(unlock * 0.5 + doors * 46)}vw) rotateY(${doors * 24}deg) translateZ(${doors * 170}px)`;
  const doorR = reduced
    ? undefined
    : `translateX(${unlock * 0.5 + doors * 46}vw) rotateY(${-doors * 24}deg) translateZ(${doors * 170}px)`;

  return (
    <section id="gate" aria-label="OnTheLLow gateway" className="relative z-10">
      <div ref={trackRef} className="h-[230vh] md:h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* deep field glow */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(52% 44% at 50% 46%, rgba(89,148,215,0.13), rgba(89,148,215,0.04) 55%, transparent 78%)",
            }}
          />

          {/* ———— dimensional scene ———— */}
          <div className="absolute inset-0" style={{ perspective: "1500px", perspectiveOrigin: "50% 46%" }}>
            <div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                transform: reduced
                  ? undefined
                  : `scale(${1 + push * 0.26}) rotateX(${par.y}deg) rotateY(${par.x}deg)`,
                opacity: sceneOp,
                willChange: "transform, opacity",
              }}
            >
              {/* structural rails — top / bottom / stiles */}
              <div
                className={`assemble asm-down ${armed ? "armed" : ""} absolute inset-x-0 top-[10%] z-10 mx-auto`}
                style={{ ["--ad" as string]: "0.15s", width: "min(72vw, 860px)" }}
              >
                <div
                  className="brushed-rail relative h-3 w-full"
                  style={{
                    transform: reduced ? undefined : `translateY(${-rails * 34}vh)`,
                    opacity: 1 - rails,
                    boxShadow: "0 1px 0 rgba(225,245,249,0.14) inset, 0 -1px 0 rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.6)",
                  }}
                >
                  <span className="absolute inset-x-0 bottom-0 h-px bg-cloudy-sky-400/40" />
                </div>
              </div>
              <div
                className={`assemble asm-up ${armed ? "armed" : ""} absolute bottom-[10%] inset-x-0 z-10 mx-auto`}
                style={{ ["--ad" as string]: "0.15s", width: "min(72vw, 860px)" }}
              >
                <div
                  className="brushed-rail relative h-3 w-full"
                  style={{
                    transform: reduced ? undefined : `translateY(${rails * 34}vh)`,
                    opacity: 1 - rails,
                    boxShadow: "0 -1px 0 rgba(225,245,249,0.12) inset, 0 1px 0 rgba(0,0,0,0.8), 0 -10px 30px rgba(0,0,0,0.6)",
                  }}
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-cloudy-sky-400/40" />
                </div>
              </div>

              {/* gate doors */}
              {([-1, 1] as const).map((dir) => (
                <div
                  key={dir}
                  className={`assemble ${dir === -1 ? "asm-left" : "asm-right"} ${armed ? "armed" : ""} absolute z-20`}
                  style={{
                    ["--ad" as string]: dir === -1 ? "0.34s" : "0.42s",
                    left: dir === -1 ? "calc(50% - min(29vw, 350px))" : "50%",
                    top: "calc(50% - min(30vh, 270px))",
                  }}
                >
                  <div
                    className="relative h-[min(60vh,540px)] w-[min(29vw,350px)]"
                    style={{
                      transform: dir === -1 ? doorL : doorR,
                      opacity: doorOp,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    {/* gunmetal slab */}
                    <div
                      className="brushed absolute inset-0"
                      style={{
                        boxShadow:
                          "inset 0 1px 0 rgba(225,245,249,0.16), inset 0 -2px 8px rgba(0,0,0,0.7), 0 30px 70px rgba(0,0,0,0.75)",
                      }}
                    >
                      {/* frosted glass inset */}
                      <div className="glass-pane etched absolute inset-5 md:inset-7">
                        {/* specular catch */}
                        <span
                          aria-hidden
                          className="absolute left-0 top-0 h-full w-px"
                          style={{
                            background: "linear-gradient(180deg, rgba(225,245,249,0.5), rgba(225,245,249,0.05) 60%, transparent)",
                            [dir === -1 ? "right" : "left"]: 0,
                          }}
                        />
                        <span aria-hidden className="absolute left-3 top-3 h-px w-1/2 bg-gradient-to-r from-azure-mist/50 to-transparent" />
                      </div>
                      {/* bolt column */}
                      <div className="absolute bottom-8 top-8 flex flex-col justify-between" style={{ [dir === -1 ? "left" : "right"]: "10px" }}>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <span key={i} className="block h-1.5 w-1.5 rounded-full bg-graphite-600 shadow-[inset_0_1px_1px_rgba(0,0,0,0.9),0_1px_0_rgba(225,245,249,0.12)]" />
                        ))}
                      </div>
                      {/* seam-side edge light */}
                      <span
                        aria-hidden
                        className="absolute bottom-0 top-0 w-px"
                        style={{
                          [dir === -1 ? "right" : "left"]: 0,
                          background: "linear-gradient(180deg, rgba(89,148,215,0.1), rgba(89,148,215,0.65) 30%, rgba(132,175,225,0.9) 50%, rgba(89,148,215,0.65) 70%, rgba(89,148,215,0.1))",
                          boxShadow: "0 0 14px rgba(89,148,215,0.5)",
                          opacity: 0.55 + unlock * 0.45,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* central seam light */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 z-30 h-[min(60vh,540px)] w-[2px]"
                style={{
                  background: "linear-gradient(180deg, transparent, rgba(132,175,225,0.95) 28%, #e1f5f9 50%, rgba(132,175,225,0.95) 72%, transparent)",
                  boxShadow: "0 0 22px rgba(89,148,215,0.8), 0 0 60px rgba(89,148,215,0.35)",
                  opacity: reduced ? 0.7 * sceneOp : (0.35 + unlock * 0.65) * (1 - seg(p, 0.14, 0.42)),
                  transform: `translate(-50%,-50%) scaleY(${0.55 + unlock * 0.45})`,
                }}
              />

              {/* ———— brand core mechanism ———— */}
              <div className={`assemble asm-core ${armed ? "armed" : ""} absolute left-1/2 top-1/2 z-30`} style={{ ["--ad" as string]: "0.55s" }}>
                <div
                  className="absolute h-[min(46vmin,400px)] w-[min(46vmin,400px)]"
                  style={{
                    transform: reduced
                      ? "translate(-50%,-50%)"
                      : `translate(-50%,-50%) translateZ(${push * 540}px) scale(${1 + push * 1.15})`,
                    opacity: coreOp,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* halo */}
                  <div aria-hidden className="breathe absolute inset-[8%] rounded-full bg-cloudy-sky-600/25 blur-3xl" />
                  {/* outer metal ring */}
                  <div aria-hidden className="ring-metal absolute inset-0 rounded-full" />
                  {/* rotating tick ring */}
                  <div aria-hidden className="ring-ticks spin-slow absolute inset-[6%] rounded-full" style={{ opacity: 0.5 }} />
                  {/* inner counter-rotating tick ring */}
                  <div aria-hidden className="ring-ticks spin-rev absolute inset-[11%] rounded-full" style={{ opacity: 0.25 }} />
                  {/* dark glass disc */}
                  <div
                    className="absolute inset-[14%] rounded-full border border-azure-mist/15"
                    style={{
                      background: "radial-gradient(circle at 32% 26%, rgba(225,245,249,0.14), rgba(23,22,29,0.94) 46%, #08080c 74%)",
                      boxShadow: "inset 0 2px 18px rgba(225,245,249,0.09), inset 0 -18px 40px rgba(0,0,0,0.85), 0 24px 70px rgba(0,0,0,0.8)",
                    }}
                  >
                    {/* specular arc */}
                    <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-60">
                      <path d="M 22 30 A 34 34 0 0 1 55 15" fill="none" stroke="rgba(225,245,249,0.5)" strokeWidth="0.8" strokeLinecap="round" />
                    </svg>
                    {/* the mark */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                      <BrandMark size={72} className="drop-shadow-[0_0_14px_rgba(89,148,215,0.35)]" />
                      <h1 className="px-4 font-mono text-sm font-bold uppercase tracking-[0.42em] text-graphite-100 md:text-base">
                        OnThe<span className="text-cloudy-sky-300">LL</span>ow
                      </h1>
                      <p className="mono-label text-graphite-400">AI Infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ———— floating glass shards ———— */}
              {SHARDS.map((s, i) => (
                <div
                  key={i}
                  className={`assemble asm-shard ${armed ? "armed" : ""} absolute z-10 hidden sm:block`}
                  style={{
                    ["--ad" as string]: `${s.delay}s`,
                    ["--sx" as string]: `${s.sx}px`,
                    ["--sy" as string]: `${s.sy}px`,
                    left: s.left,
                    top: s.top,
                  }}
                >
                  <div
                    style={{
                      transform: reduced ? undefined : `translateZ(${s.z + push * 680 * s.f}px) translate3d(${push * s.outX}px, ${push * s.outY}px, 0) scale(${1 + push * 1.7 * s.f}) rotate(${s.rz}deg)`,
                      opacity: s.opacity * (1 - seg(p, 0.44, 0.8)),
                      filter: push > 0.02 ? `blur(${push * 7}px)` : undefined,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className={s.drift}>
                      <div className={`glass-pane ${s.etched ? "etched" : ""}`} style={{ width: s.w, height: s.h, transform: `rotate(${s.rz}deg)`, boxShadow: "0 26px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(225,245,249,0.2)" }}>
                        <span aria-hidden className="absolute right-2 top-2 h-px w-2/3 bg-gradient-to-l from-azure-mist/45 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ———— HUD layer ———— */}
          <div className={`assemble asm-fade ${armed ? "armed" : ""}`} style={{ ["--ad" as string]: "1.15s" }}>
          <div className="pointer-events-none absolute inset-0 z-40" style={{ opacity: hud }}>
            <div className="mono-label absolute left-6 top-24 text-graphite-400 md:left-10">
              OnTheLLow <span className="text-graphite-600">//</span> Gateway-001
            </div>
            <div className="mono-label absolute right-6 top-24 hidden text-graphite-500 md:right-10 md:block">
              Z-AXIS Transit <span className="text-cloudy-sky-300">ARMED</span>
            </div>
            <div className="absolute inset-x-0 bottom-7 flex items-end justify-between px-6 md:px-10">
              <p className="mono-label hidden max-w-52 leading-relaxed text-graphite-400 sm:block">
                Precision-engineered AI infrastructure
              </p>
              <div className="flex flex-col items-center gap-3">
                <span className="mono-label text-graphite-300">Scroll to enter</span>
                <span className="relative block h-12 w-px overflow-hidden bg-graphite-700">
                  <span className="cue-line absolute inset-0 bg-cloudy-sky-300" />
                </span>
              </div>
              <p className="mono-label hidden max-w-52 text-right leading-relaxed text-graphite-400 sm:block">
                Sovereign systems <span className="text-graphite-600">—</span> est. 2026
              </p>
            </div>
            <div className="mono-label absolute right-4 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 whitespace-nowrap text-graphite-600 lg:block">
              Kinetic Threshold <span className="text-graphite-700">/ 001</span>
            </div>
          </div>
          </div>

          {/* threshold vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-40"
            style={{ background: "radial-gradient(120% 90% at 50% 46%, transparent 46%, rgba(0,0,0,0.88) 100%)" }}
          />
          {/* wordmark fallback for reduced motion / tiny viewports */}
          <span className="sr-only">
            <Wordmark /> — precision-engineered AI infrastructure. Most systems just add noise; we engineer clarity.
          </span>
        </div>
      </div>
    </section>
  );
}
