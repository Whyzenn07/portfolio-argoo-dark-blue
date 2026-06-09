// ══════════════════════════════════════════
// App.jsx — Root Component
// ══════════════════════════════════════════

import { useState, useEffect } from "react";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Stats     from "./components/Stats";
import About     from "./components/About";
import Projects  from "./components/Projects";
import Skills    from "./components/Skills";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";

// ── Scroll progress bar di bagian atas halaman ──
function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

// ── Back to top button ──
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${show ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Kembali ke atas"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#080d18" }}>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
