// ══════════════════════════════════════════
// Projects Component
// ── Filter tabs dengan stagger animation
// ── Project cards dengan hover effect
// ══════════════════════════════════════════

import { useState, useRef } from "react";
import { projects } from "../data";
import { useFadeUp } from "../hooks/useFadeUp";

const FILTERS = [
  { key: "all",       label: "All"        },
  { key: "frontend",  label: "Frontend"   },
  { key: "fullstack", label: "Full Stack" },
  { key: "backend",   label: "Backend"    },
];

export default function Projects() {
  const [active, setActive]         = useState("all");
  const [filterKey, setFilterKey]   = useState(0);
  const heading                     = useFadeUp();

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  const handleFilter = (key) => {
    if (key === active) return;
    setActive(key);
    setFilterKey(k => k + 1);
  };

  return (
    <section
      id="projects"
      className="relative z-[1] border-t border-[rgba(0,180,255,0.12)]"
      style={{ padding: "100px 60px", background: "#0d1426" }}
    >
      {/* Header */}
      <div
        ref={heading.ref}
        className={`fade-up ${heading.visible ? "visible" : ""} text-center mb-[50px]`}
      >
        <span className="font-mono text-[0.82rem] text-[#00c8ff] tracking-[0.08em] block mb-[10px]">
          // what i've built
        </span>
        <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-white tracking-[-1px] mb-[14px]">
          Featured <span className="text-grad">Projects</span>
        </h2>
        <p className="text-[#64748b] text-[1rem] max-w-[500px] mx-auto leading-[1.7]">
          10+ proyek yang telah saya kerjakan — dari web app hingga REST API.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-[10px] mb-[50px] flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => handleFilter(f.key)}
            className={`px-5 py-2 rounded-[20px] text-[0.85rem] font-semibold border
                        transition-all duration-250
              ${active === f.key
                ? "bg-gradient-to-br from-[#00c8ff] to-[#3b82f6] text-[#080d18] border-transparent shadow-[0_4px_20px_rgba(0,200,255,0.25)]"
                : "bg-[#111827] border-[rgba(0,180,255,0.12)] text-[#64748b] hover:text-[#e2e8f0] hover:border-[rgba(0,200,255,0.25)]"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid — key changes on filter to trigger re-animation */}
      <div
        key={filterKey}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1200px] mx-auto mb-[50px]"
      >
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* View All */}
      <div className="text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 font-bold text-[0.95rem] px-7 py-[14px]
                     rounded-[14px] bg-transparent text-[#e2e8f0]
                     border-[1.5px] border-[rgba(0,180,255,0.12)]
                     hover:border-[#00c8ff] hover:bg-[rgba(0,200,255,0.06)]
                     hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,200,255,0.1)]
                     transition-all duration-200"
        >
          Lihat Semua 20+ Projects
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <div
      className="filter-item project-card group bg-[#111827]
                  border border-[rgba(0,180,255,0.12)] rounded-[20px]
                  overflow-hidden flex flex-col cursor-pointer
                  transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
                  hover:-translate-y-2 hover:scale-[1.01]
                  hover:border-[rgba(0,200,255,0.35)]
                  hover:shadow-[0_24px_60px_rgba(0,200,255,0.1),0_0_0_1px_rgba(0,200,255,0.1)]"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Thumbnail */}
      <div
        className={`relative h-[180px] flex items-center justify-center text-[3.5rem]
                    bg-gradient-to-br ${project.gradient}
                    border-b border-[rgba(0,180,255,0.12)] overflow-hidden`}
      >
        <span className="transition-transform duration-500 group-hover:scale-110
                         drop-shadow-[0_0_20px_rgba(0,200,255,0.3)]">
          {project.emoji}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[rgba(0,200,255,0.08)]
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top-right gradient accent */}
        <div className="absolute top-0 right-0 w-[80px] h-[80px]
                        bg-gradient-to-bl from-[rgba(0,200,255,0.08)] to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action links */}
        <div className="project-links">
          <a
            href={project.github}
            onClick={(e) => e.stopPropagation()}
            className="w-[34px] h-[34px] flex items-center justify-center
                       bg-[rgba(8,13,24,0.85)] border border-[rgba(0,180,255,0.12)]
                       rounded-lg text-[#e2e8f0] backdrop-blur-sm
                       hover:border-[#00c8ff] hover:text-[#00c8ff] transition-all duration-200"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={project.demo}
            onClick={(e) => e.stopPropagation()}
            className="w-[34px] h-[34px] flex items-center justify-center
                       bg-[rgba(8,13,24,0.85)] border border-[rgba(0,180,255,0.12)]
                       rounded-lg text-[#e2e8f0] backdrop-blur-sm
                       hover:border-[#00c8ff] hover:text-[#00c8ff] transition-all duration-200"
            title="Live Demo"
          >
            <ExternalIcon />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-[22px] flex flex-col flex-1">
        <span className="font-mono text-[0.7rem] text-[#00c8ff] uppercase tracking-[0.1em] mb-[6px]">
          {project.label}
        </span>
        <h3 className="text-[1.05rem] font-bold text-white mb-2 leading-[1.3]
                       group-hover:text-grad transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-[#64748b] text-[0.84rem] leading-[1.6] mb-4 flex-1">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-[6px]">
          {project.tech.map((t) => (
            <span
              key={t}
              className="bg-[rgba(0,200,255,0.08)] border border-[rgba(0,200,255,0.18)]
                         text-[#00c8ff] rounded-[6px] px-[10px] py-[3px]
                         font-mono text-[0.7rem]
                         group-hover:bg-[rgba(0,200,255,0.12)]
                         transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Icons ──
const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
