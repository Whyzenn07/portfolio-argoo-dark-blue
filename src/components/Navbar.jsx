// ══════════════════════════════════════════
// Navbar Component
// ── Sticky navbar dengan glassmorphism
// ── Active link saat scroll
// ── Mobile hamburger → X animation
// ══════════════════════════════════════════

import { useState, useEffect } from 'react'
import { navLinks } from '../data'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive]         = useState('home')
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Update active section
      const sections = document.querySelectorAll('section[id], div[id]')
      let current = 'home'
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 150) current = sec.id
      })
      setActive(current)
      // Update scrolled state for navbar shadow
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between
                   bg-[rgba(8,13,24,0.82)] backdrop-blur-xl
                   border-b border-[rgba(0,180,255,0.12)]
                   transition-all duration-300"
        style={{
          padding: '18px 60px',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-mono text-xl font-bold text-grad transition-opacity duration-200 hover:opacity-80"
        >
          &lt;Dev /&gt;
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          {navLinks.map(link => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`relative px-[18px] py-2 rounded-[10px] text-sm font-semibold
                            transition-all duration-200
                  ${active === link.href
                    ? 'text-[#e2e8f0] bg-[#111827]'
                    : 'text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#111827]'
                  }`}
              >
                {link.label}
                {/* Active indicator dot */}
                {active === link.href && (
                  <span className="absolute bottom-[4px] left-1/2 -translate-x-1/2
                                   w-[4px] h-[4px] rounded-full bg-[#00c8ff]
                                   shadow-[0_0_6px_#00c8ff]" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Let's Talk Button */}
        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:block font-bold text-sm px-[22px] py-[10px] rounded-xl text-[#080d18]
                     bg-gradient-to-br from-[#00c8ff] to-[#3b82f6]
                     hover:opacity-85 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,200,255,0.3)]
                     transition-all duration-200"
        >
          Let's Talk
        </button>

        {/* Hamburger → X Button */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className={`flex md:hidden flex-col gap-[5px] bg-transparent border-none
                      cursor-pointer p-2 rounded-lg hover:bg-[#111827]
                      transition-colors duration-200 ${mobileOpen ? 'ham-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* Mobile Menu — slide down */}
      {mobileOpen && (
        <div
          className="mobile-menu-slide fixed top-[73px] left-0 right-0 z-[998]
                     bg-[rgba(8,13,24,0.97)] backdrop-blur-xl
                     border-b border-[rgba(0,180,255,0.12)] px-6 pb-6 pt-4"
        >
          <ul className="list-none flex flex-col gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-[10px]
                              font-semibold transition-all duration-200
                    ${active === link.href
                      ? 'bg-[#111827] text-[#e2e8f0]'
                      : 'text-[#64748b] hover:bg-[#111827] hover:text-[#e2e8f0]'
                    }`}
                >
                  {active === link.href && (
                    <span className="w-[5px] h-[5px] rounded-full bg-[#00c8ff]
                                     shadow-[0_0_6px_#00c8ff] flex-shrink-0" />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[rgba(0,180,255,0.1)]">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full font-bold text-sm py-3 rounded-xl text-[#080d18]
                         bg-gradient-to-br from-[#00c8ff] to-[#3b82f6]
                         hover:opacity-90 transition-all duration-200"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </>
  )
}
