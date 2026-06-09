// ══════════════════════════════════════════
// About Component
// ── Foto besar + floating cards
// ── Info grid (lokasi, email, dll)
// ── Tech stack chips
// ══════════════════════════════════════════

import wahyuPhoto   from '../assets/wahyu.jpg'
import { profile }  from '../data'
import { useFadeUp } from '../hooks/useFadeUp'

export default function About() {
  const heading = useFadeUp()
  const photo   = useFadeUp()
  const content = useFadeUp()

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="about" className="relative z-[1] py-[100px] border-t border-[rgba(0,180,255,0.12)]"
             style={{ padding: '100px 60px', background: '#080d18' }}>

      {/* Section Header */}
      <div ref={heading.ref} className={`fade-up ${heading.visible ? 'visible' : ''} text-center mb-[70px]`}>
        <span className="font-mono text-[0.82rem] text-[#00c8ff] tracking-[0.08em] block mb-[10px]">
          // who am i
        </span>
        <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-white tracking-[-1px] mb-[14px]">
          About <span className="text-grad">Me</span>
        </h2>
        <p className="text-[#64748b] text-[1rem] max-w-[500px] mx-auto leading-[1.7]">
          Passionate developer dari Semarang yang suka membangun produk digital yang bermakna.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-[70px] items-center max-w-[1100px] mx-auto">

        {/* Photo Column */}
        <div ref={photo.ref} className={`fade-up ${photo.visible ? 'visible' : ''} relative`}>
          <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] max-w-[420px]
                          before:content-[''] before:absolute before:inset-[-10px] before:rounded-[34px]
                          before:bg-gradient-to-br before:from-[#00c8ff] before:to-[#3b82f6]
                          before:opacity-[0.12] before:-z-10"
               style={{ borderRadius: 28 }}>

            {/* Photo */}
            <div className="relative overflow-hidden rounded-[28px] group"
                 style={{ aspectRatio: '4/5' }}>
              <img src={wahyuPhoto} alt={profile.name}
                   className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-[40%]
                              bg-gradient-to-t from-[rgba(8,13,24,0.6)] to-transparent pointer-events-none" />
            </div>

          </div>

          {/* Floating: Experience */}
          <div className="float-card-1 absolute bottom-7 -right-6
                          bg-[#111827] border border-[rgba(0,180,255,0.18)]
                          rounded-[16px] px-[18px] py-[14px]
                          shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,200,255,0.05)]
                          backdrop-blur-[10px]">
            <div className="text-[1.5rem] font-extrabold text-grad leading-none number-glow">1+</div>
            <div className="text-[0.72rem] text-[#64748b] font-semibold mt-[2px]">Year Exp.</div>
          </div>

          {/* Floating: Projects */}
          <div className="float-card-2 absolute top-7 -right-6
                          bg-[#111827] border border-[rgba(0,180,255,0.18)]
                          rounded-[16px] px-[18px] py-[14px]
                          shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,200,255,0.05)]">
            <div className="text-[1.5rem] font-extrabold text-grad leading-none number-glow">20+</div>
            <div className="text-[0.72rem] text-[#64748b] font-semibold mt-[2px]">Projects</div>
          </div>
        </div>

        {/* Content Column */}
        <div ref={content.ref} className={`fade-up delay-1 ${content.visible ? 'visible' : ''}`}>
          <h3 className="text-[1.7rem] font-extrabold text-white tracking-[-0.5px] mb-5">
            Halo! Saya {profile.name} 👋
          </h3>

          {profile.bio.map((para, i) => (
            <p key={i} className="text-[#64748b] text-[0.97rem] leading-[1.85] mb-4">{para}</p>
          ))}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-[14px] my-7">
            {[
              { icon: <LocationIcon />, label: 'Lokasi',     val: profile.location  },
              { icon: <EmailIcon />,    label: 'Email',      val: profile.email     },
              { icon: <EduIcon />,      label: 'Pendidikan', val: profile.education },
              { icon: <ClockIcon />,    label: 'Status',     val: 'Available ✓', green: true },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-[10px]">
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center
                                bg-[rgba(0,200,255,0.08)] border border-[rgba(0,200,255,0.15)]
                                rounded-[10px] text-[#00c8ff]">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[0.72rem] text-[#64748b] font-bold uppercase tracking-[0.05em]">
                    {item.label}
                  </div>
                  <div className={`text-[0.88rem] font-bold ${item.green ? 'text-[#22c55e]' : 'text-[#e2e8f0]'}`}>
                    {item.val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Tags */}
          <p className="text-[0.82rem] font-bold text-[#64748b] uppercase tracking-[0.08em] mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['React','Next.js','TypeScript','Node.js','Python','PostgreSQL','MongoDB','Docker','AWS','Git'].map(t => (
              <span key={t}
                    className="bg-[#111827] border border-[rgba(0,180,255,0.12)] rounded-lg
                               px-[14px] py-[6px] font-mono text-[0.78rem] text-[#00c8ff]
                               hover:border-[#00c8ff] hover:bg-[rgba(0,200,255,0.07)]
                               transition-all duration-200 cursor-default">
                {t}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[14px] flex-wrap">
            <button onClick={() => scrollTo('projects')}
                    className="inline-flex items-center gap-2 font-bold text-[0.95rem] px-7 py-[14px]
                               rounded-[14px] bg-gradient-to-br from-[#00c8ff] to-[#3b82f6] text-[#080d18]
                               hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,200,255,0.3)]
                               transition-all duration-200">
              Lihat Projects
              <ArrowIcon />
            </button>
            <a href={profile.cvLink}
               download="CV-Wahyu-Argo-Mulyo.pdf"
               className="inline-flex items-center gap-2 font-bold text-[0.95rem] px-7 py-[14px]
                          rounded-[14px] bg-transparent text-[#e2e8f0]
                          border-[1.5px] border-[rgba(0,180,255,0.12)]
                          hover:border-[#00c8ff] hover:bg-[rgba(0,200,255,0.06)]
                          hover:-translate-y-0.5
                          transition-all duration-200">
              Download CV
              <DownloadIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Icons ──
const LocationIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const EmailIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
const EduIcon      = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
const ClockIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const ArrowIcon    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const DownloadIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
