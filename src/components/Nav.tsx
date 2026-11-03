import { useScrolled } from "../lib/hooks";
import { BrandMark, Wordmark, StatusDot } from "../lib/atoms";

const LINKS = [
  { href: "#doctrine", label: "Doctrine" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#harness", label: "HarneSSHost" },
  { href: "#architect", label: "Architect" },
];

export default function Nav() {
  const scrolled = useScrolled(36);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:var(--ease-hydraulic)] ${
        scrolled ? "nav-solid" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Primary">
        <a href="#gate" className="group flex items-center gap-3" aria-label="OnTheLLow — back to the gateway">
          <BrandMark size={26} className="transition-transform duration-500 [transition-timing-function:var(--ease-hydraulic)] group-hover:scale-105" />
          <Wordmark className="text-[13px] text-graphite-100" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-nav">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2.5 font-mono text-[10px] tracking-[0.26em] text-graphite-400 md:flex">
            <StatusDot />
            SYS.ONLINE
          </span>
          <a href="#access" className="btn-ghost hidden sm:inline-block">
            Request Access
          </a>
        </div>
      </nav>
    </header>
  );
}
