// ══════════════════════════════════════════
// Stats Component
// ── 3 kartu: Experience, Projects, Clients
// ── Counter animasi saat masuk viewport
// ══════════════════════════════════════════

import { useEffect, useRef, useState } from 'react'
import { stats }      from '../data'
import { useFadeUp }  from '../hooks/useFadeUp'

// ── Counter hook: hitung dari 0 ke target ──
function useCounter(target, isVisible, duration = 1500, steps = 50) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const inc      = target / steps
    const interval = duration / steps
    let   current  = 0
    const timer    = setInterval(() => {
      current = Math.min(current + inc, target)
      setCount(Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [isVisible, target, duration, steps])

  return count
}

// ── Single stat card ──
function StatCard({ stat, visible, delay }) {
  const count = useCounter(stat.value, visible)

  return (
    <div
      className={`fade-up ${visible ? 'visible' : ''} ${delay}`}
      style={{
        background: '#111827',
        border: '1px solid rgba(0,180,255,0.12)',
        borderRadius: 20,
        padding: '40px 24px',
        textAlign: 'center',
        transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.borderColor = 'rgba(0,200,255,0.3)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,200,255,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(0,180,255,0.12)'
        e.currentTarget.style.boxShadow = 'none'
      }}>

      {/* Icon */}
      <div className="w-[52px] h-[52px] mx-auto mb-5 flex items-center justify-center
                      bg-[rgba(0,200,255,0.08)] border border-[rgba(0,200,255,0.15)]
                      rounded-[14px] text-[#00c8ff]">
        {stat.icon === 'code'   && <CodeIcon />}
        {stat.icon === 'rocket' && <RocketIcon />}
        {stat.icon === 'users'  && <UsersIcon />}
      </div>

      {/* Number */}
      <div className="text-[3.2rem] font-extrabold leading-none mb-[10px] text-grad">
        {count}{stat.suffix}
      </div>

      {/* Label */}
      <div className="text-[0.9rem] font-semibold text-[#64748b]">
        {stat.label}
      </div>
    </div>
  )
}

export default function Stats() {
  const { ref, visible } = useFadeUp()

  return (
    <div id="stats" ref={ref}
         className="relative z-[1] py-[70px] border-y border-[rgba(0,180,255,0.12)]"
         style={{ background: '#0d1426' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto px-6 lg:px-0">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            stat={stat}
            visible={visible}
            delay={i === 1 ? 'delay-1' : i === 2 ? 'delay-2' : ''}
          />
        ))}
      </div>
    </div>
  )
}

// ── Icons ──
const CodeIcon   = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const RocketIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>
const UsersIcon  = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
