// ══════════════════════════════════════════
// Hero Component
// ── Typing animation
// ── Foto lingkaran dengan gradient ring
// ── Code card kanan
// ══════════════════════════════════════════

import { useRef } from "react";
import wahyuPhoto from "../assets/wahyu.jpg";
import { useTyping } from "../hooks/useTyping";
import { useParticles } from "../hooks/useParticles";
import { profile } from "../data";

export default function Hero() {
  const canvasRef = useRef(null);
  const typedText = useTyping(profile.typingTexts);

  // Particle animation di canvas background
  useParticles(canvasRef);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── Background Canvas ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

      {/* ── Grid Overlay ── */}
      <div className="grid-overlay" />

      {/* ── Floating Orbs ── */}
      <div
        className="orb w-[500px] h-[500px] -top-24 -right-24 animate-[orb-float-1_12s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #00c8ff, transparent)" }}
      />
      <div
        className="orb w-[400px] h-[400px] bottom-[10%] -left-24 animate-[orb-float-2_15s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />
      <div
        className="orb w-[300px] h-[300px] top-[50%] left-[40%] animate-[orb-float-3_18s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
      />

      {/* ── Hero Section ── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden z-[1]"
        style={{ padding: "140px 60px 80px" }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-[1200px]">
          {/* ── LEFT: Text Content ── */}
          <div className="flex-1 flex flex-col animate-[fadeUp_0.6s_ease_both]">
            {/* Greeting */}
            <div className="flex items-center gap-2 font-mono text-[0.95rem] text-[#00c8ff] mb-5">
              <span className="wave-emoji text-xl">👋</span>
              <span>Hello, I'm </span>
            </div>

            {/* Name */}
            <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-extrabold text-white tracking-[-2px] leading-[1.05] mb-3">
              {profile.name}
            </h1>

            {/* Typing Title */}
            <div className="text-[clamp(1.3rem,2.5vw,2rem)] font-bold min-h-[2.4rem] mb-7">
              <span className="text-grad">{typedText}</span>
              <span className="cursor-blink" />
            </div>

            {/* Description */}
            <p className="text-[1rem] text-[#64748b] leading-[1.8] max-w-[520px] mb-10">
              {profile.bio[0]}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-[14px] flex-wrap mb-12">
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 font-bold text-[0.95rem] px-7 py-[14px] rounded-[14px]
                           bg-gradient-to-br from-[#00c8ff] to-[#3b82f6] text-[#080d18]
                           hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,200,255,0.3)]
                           transition-all duration-200"
              >
                View Projects
                <ArrowIcon />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 font-bold text-[0.95rem] px-7 py-[14px] rounded-[14px]
                           bg-transparent text-[#e2e8f0] border-[1.5px] border-[rgba(0,180,255,0.12)]
                           hover:border-[#00c8ff] hover:bg-[rgba(0,200,255,0.06)]
                           transition-all duration-200"
              >
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl
                            border-[1.5px] border-[rgba(0,180,255,0.12)] text-[#64748b]
                            hover:border-[#00c8ff] hover:text-[#00c8ff] hover:-translate-y-0.5
                            transition-all duration-200"
              >
                <GitHubIcon />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl
                            border-[1.5px] border-[rgba(0,180,255,0.12)] text-[#64748b]
                            hover:border-[#00c8ff] hover:text-[#00c8ff] hover:-translate-y-0.5
                            transition-all duration-200"
              >
                <LinkedInIcon />
              </a>
              <div className="w-px h-6 bg-[rgba(0,180,255,0.12)]" />
              <a
                href={profile.cvLink}
                download="CV-Wahyu-Argo-Mulyo.pdf"
                className="flex items-center gap-2 text-[#64748b] text-[0.9rem] font-semibold
                            hover:text-[#00c8ff] transition-colors duration-200"
              >
                <DownloadIcon />
                Download CV
              </a>
            </div>
          </div>

          {/* ── RIGHT: Photo + Code Card ── */}
          <div className="hidden lg:flex items-start gap-7 flex-shrink-0 animate-[fadeUp_0.6s_0.3s_ease_both]">
            {/* Circular Photo */}
            <div className="relative flex-shrink-0">
              <div className="relative w-[220px] h-[220px]">
                {/* Spinning gradient ring */}
                <div className="hero-photo-ring" />
                {/* Photo inside */}
                <div className="absolute inset-[3px] rounded-full z-[2] overflow-hidden bg-[#080d18]">
                  <img
                    src={wahyuPhoto}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Glow */}
                <div
                  className="absolute -inset-6 rounded-full pointer-events-none z-0
                                animate-[glow-pulse_3s_ease-in-out_infinite]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0,200,255,0.15) 0%, transparent 70%)",
                  }}
                />
              </div>
              {/* Available badge */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10
                              flex items-center gap-[6px] bg-[#111827] border border-[rgba(34,197,94,0.35)]
                              rounded-[20px] px-[14px] py-[6px] text-[0.72rem] font-bold text-[#22c55e]
                              whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                <div className="badge-dot" />
                Available for work
              </div>
            </div>

            {/* Code Card */}
            <CodeCard />
          </div>
        </div>
      </section>
    </>
  );
}

// ── Sub-components ──

function CodeCard() {
  return (
    <div
      className="w-[320px] bg-[#111827] border border-[rgba(0,180,255,0.12)] rounded-[20px] overflow-hidden
                    shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_80px_rgba(0,200,255,0.05)]"
    >
      {/* Top bar */}
      <div className="flex items-center gap-[6px] px-4 py-[14px] bg-[#1a2235] border-b border-[rgba(0,180,255,0.12)]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#ef4444]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />
        <span className="font-mono text-[0.75rem] text-[#64748b] ml-2">
          Argoo.js
        </span>
      </div>

      {/* Code body */}
      <div className="p-5 font-mono text-[0.78rem] leading-[1.9]">
        <div>
          <span className="text-[#c792ea]">const </span>
          <span className="text-[#82aaff]">developer</span>
          <span className="text-[#c792ea]"> = </span>
          <span>{"{"}</span>
        </div>
        <div className="code-line-active">
          &nbsp;&nbsp;<span className="text-[#00c8ff]">name</span>:{" "}
          <span className="text-[#c3e88d]"> "Wahyu Argo"</span>,
        </div>
        <div>
          &nbsp;&nbsp;<span className="text-[#00c8ff]">role</span>:{" "}
          <span className="text-[#c3e88d]"> "Junior FS Dev"</span>,
        </div>
        <div>
          &nbsp;&nbsp;<span className="text-[#00c8ff]">exp</span>:{" "}
          <span className="text-[#f78c6c]"> 1</span>,
        </div>
        <div>
          &nbsp;&nbsp;<span className="text-[#00c8ff]">skills</span>:{" "}
          <span>[</span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-[#c3e88d]">"React"</span>,{" "}
          <span className="text-[#c3e88d]">"Node"</span>,
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-[#c3e88d]">"TypeScript"</span>
        </div>
        <div>
          &nbsp;&nbsp;<span>],</span>
        </div>
        <div>
          &nbsp;&nbsp;<span className="text-[#00c8ff]">available</span>:{" "}
          <span className="text-[#c792ea]"> true</span>
        </div>
        <div>
          <span>{"};"}</span>
        </div>
        <br />
        <div className="text-[#64748b]">// Ready to build something great</div>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-[6px] px-5 py-[10px] bg-[#1a2235] border-t border-[rgba(0,180,255,0.12)] text-[0.75rem] text-[#64748b]">
        <div className="badge-dot" />
        Available for new projects
      </div>
    </div>
  );
}

// ── SVG Icons ──
const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
