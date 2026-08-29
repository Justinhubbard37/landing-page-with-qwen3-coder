import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Hook from "./components/Hook";
import Identity from "./components/Identity";
import Infrastructure from "./components/Infrastructure";
import HarnessHost from "./components/HarnessHost";
import Architect from "./components/Architect";
import Cta from "./components/Cta";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-graphite-100">
      <a
        href="#thesis-title"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-cloudy-sky-400 focus:bg-graphite-950 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:text-azure-mist"
      >
        SKIP TO CONTENT
      </a>

      <Background />
      <Nav />

      <main>
        <Hero />
        <Hook />
        <Identity />
        <Infrastructure />
        <HarnessHost />
        <Architect />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
