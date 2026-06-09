// ══════════════════════════════════════════
// Skills Component
// ── Progress bars dengan animasi
// ── Tech icon grid dengan stagger pop-in
// ══════════════════════════════════════════

import { useEffect, useRef } from 'react'
import { skills }    from '../data'
import { useFadeUp } from '../hooks/useFadeUp'

// ── Progress Bar dengan IntersectionObserver ──
function SkillBar({ name, level, delay = 0 }) {
  const barRef  = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && fillRef.current) {
          setTimeout(() => {
            if (fillRef.current) {
              fillRef.current.style.width = level + '%'
              setTimeout(() => fillRef.current?.classList.add('animated'), 1400)
            }
          }, delay)
          observer.unobserve(bar)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(bar)
    return () => observer.disconnect()
  }, [level, delay])

  return (
    <div ref={barRef} className="mb-[22px] group">
      <div className="flex justify-between mb-2">
        <span className="text-[0.88rem] font-semibold text-[#e2e8f0]
                         group-hover:text-white transition-colors duration-200">
          {name}
        </span>
        <span className="font-mono text-[0.8rem] text-[#00c8ff] font-bold">{level}%</span>
      </div>
      <div className="h-[6px] bg-[#1a2235] rounded-[3px] overflow-hidden
                      group-hover:bg-[#243050] transition-colors duration-200">
        <div ref={fillRef} className="skill-fill" />
      </div>
    </div>
  )
}

export default function Skills() {
  const heading = useFadeUp()
  const bars    = useFadeUp()
  const icons   = useFadeUp()

  return (
    <section
      id="skills"
      className="relative z-[1] border-t border-[rgba(0,180,255,0.12)]"
      style={{ padding: '100px 60px', background: '#080d18' }}
    >
      {/* Header */}
      <div ref={heading.ref} className={`fade-up ${heading.visible ? 'visible' : ''} text-center mb-[60px]`}>
        <span className="font-mono text-[0.82rem] text-[#00c8ff] tracking-[0.08em] block mb-[10px]">
          // what i work with
        </span>
        <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-white tracking-[-1px] mb-[14px]">
          My <span className="text-grad">Skills</span>
        </h2>
        <p className="text-[#64748b] text-[1rem] max-w-[500px] mx-auto leading-[1.7]">
          Teknologi dan tools yang saya gunakan untuk membangun produk digital.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] max-w-[1100px] mx-auto items-start">

        {/* Left: Progress Bars */}
        <div ref={bars.ref} className={`fade-up ${bars.visible ? 'visible' : ''}`}>
          <h4 className="font-mono text-[1rem] font-bold text-[#00c8ff] mb-7 flex items-center gap-2">
            ⚡ Proficiency Level
          </h4>
          {skills.bars.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />
          ))}
        </div>

        {/* Right: Tech Icon Grid dengan stagger pop-in */}
        <div ref={icons.ref} className={`fade-up delay-1 ${icons.visible ? 'visible' : ''}`}>
          <h4 className="font-mono text-[1rem] font-bold text-[#00c8ff] mb-7 flex items-center gap-2">
            🛠️ Tech Stack
          </h4>
          <div className="grid grid-cols-4 gap-[14px]">
            {skills.icons.map((item, i) => (
              <div
                key={item.name}
                className={`bg-[#111827] border border-[rgba(0,180,255,0.12)] rounded-[14px]
                            p-4 text-center cursor-default
                            hover:border-[#00c8ff] hover:bg-[rgba(0,200,255,0.06)]
                            hover:-translate-y-[5px]
                            hover:shadow-[0_10px_30px_rgba(0,200,255,0.15)]
                            transition-all duration-250
                            ${icons.visible ? 'tech-icon-anim' : 'opacity-0'}`}
                style={{ animationDelay: icons.visible ? `${i * 0.055}s` : '0s' }}
              >
                <div className="text-[1.7rem] mb-[6px] transition-transform duration-200
                                group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="font-mono text-[0.7rem] text-[#64748b] font-bold
                                group-hover:text-[#00c8ff] transition-colors duration-200">
                  {item.name}
                </div>
              </div>
            ))}
          </div>

          {/* Certification / extra info */}
          <div className="mt-8 p-5 bg-[#111827] border border-[rgba(0,180,255,0.12)]
                          rounded-[16px] flex items-start gap-4">
            <div className="text-[1.8rem] flex-shrink-0">🎯</div>
            <div>
              <div className="text-[0.88rem] font-bold text-[#e2e8f0] mb-1">
                Selalu Belajar Hal Baru
              </div>
              <div className="text-[0.8rem] text-[#64748b] leading-[1.6]">
                Aktif mengikuti perkembangan teknologi terbaru, dari AI integration
                hingga cloud architecture & DevOps practices.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
