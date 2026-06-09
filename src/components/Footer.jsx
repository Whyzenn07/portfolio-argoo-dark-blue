// ══════════════════════════════════════════
// Footer Component
// ── Fade-up animation
// ══════════════════════════════════════════

import { profile, navLinks } from '../data'
import { useFadeUp }         from '../hooks/useFadeUp'

export default function Footer() {
  const brand  = useFadeUp()
  const links  = useFadeUp()
  const social = useFadeUp()

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer
      className="relative z-[1] border-t border-[rgba(0,180,255,0.12)]"
      style={{ background: '#080d18', padding: '60px 60px 28px' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr] gap-[60px] pb-10
                      border-b border-[rgba(0,180,255,0.12)] mb-7 max-w-[1200px] mx-auto">

        {/* Brand */}
        <div ref={brand.ref} className={`fade-up ${brand.visible ? 'visible' : ''}`}>
          <button
            onClick={() => scrollTo('home')}
            className="font-mono text-xl font-bold text-grad hover:opacity-80 transition-opacity duration-200"
          >
            &lt;Dev /&gt;
          </button>
          <p className="text-[#64748b] text-[0.88rem] leading-[1.7] mt-[14px] max-w-[280px]">
            Building digital experiences dengan passion dan precision.
            Mari ciptakan sesuatu yang luar biasa bersama!
          </p>

          {/* Social row */}
          <div className="flex gap-[10px] mt-5">
            {[
              { href: profile.github,    icon: <GitHubIcon />,   title: 'GitHub'    },
              { href: profile.linkedin,  icon: <LinkedInIcon />, title: 'LinkedIn'  },
              { href: profile.instagram, icon: <InstaIcon />,    title: 'Instagram' },
              { href: `mailto:${profile.email}`, icon: <EmailIcon />, title: 'Email' },
            ].map(s => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.title}
                className="w-10 h-10 flex items-center justify-center rounded-xl
                           border-[1.5px] border-[rgba(0,180,255,0.12)] text-[#64748b]
                           hover:border-[#00c8ff] hover:text-[#00c8ff] hover:-translate-y-[3px]
                           hover:shadow-[0_6px_20px_rgba(0,200,255,0.15)]
                           transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div ref={links.ref} className={`fade-up delay-1 ${links.visible ? 'visible' : ''}`}>
          <h5 className="font-bold text-[0.9rem] mb-[18px] text-[#e2e8f0]">Quick Links</h5>
          <ul className="list-none space-y-[10px]">
            {navLinks.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-[#64748b] text-[0.88rem] hover:text-[#00c8ff]
                             hover:translate-x-1 transition-all duration-200 flex items-center gap-1"
                >
                  <span className="text-[#00c8ff] opacity-0 hover-show">›</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div ref={social.ref} className={`fade-up delay-2 ${social.visible ? 'visible' : ''}`}>
          <h5 className="font-bold text-[0.9rem] mb-[18px] text-[#e2e8f0]">Get In Touch</h5>
          <div className="space-y-[12px]">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-[#64748b] text-[0.85rem]
                         hover:text-[#00c8ff] transition-colors duration-200"
            >
              <EmailIcon />
              {profile.email}
            </a>
            <div className="flex items-center gap-2 text-[#64748b] text-[0.85rem]">
              <LocationSm />
              {profile.location}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="badge-dot" />
              <span className="text-[0.8rem] text-[#22c55e] font-semibold">Open to Work</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center
                      text-[#64748b] text-[0.8rem] max-w-[1200px] mx-auto gap-2">
        <span>© 2026 {profile.name}. All rights reserved.</span>
        <span>Made with ❤️ using React + Vite + Tailwind CSS</span>
      </div>
    </footer>
  )
}

// ── Icons ──
const GitHubIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
const LinkedInIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const InstaIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const EmailIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
const LocationSm   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
