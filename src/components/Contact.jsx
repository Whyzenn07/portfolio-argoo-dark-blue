// ══════════════════════════════════════════
// Contact Component
// ── Form terhubung ke backend REST API
// ── Notifikasi ke Gmail + WhatsApp
// ══════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react'
import { profile }   from '../data'
import { useFadeUp } from '../hooks/useFadeUp'

// Kosong = pakai domain yang sama (Vercel production)
// Set VITE_API_URL=http://localhost:3001 di .env.local untuk dev lokal dengan Express
const API_BASE = import.meta.env.VITE_API_URL ?? ''

// ── Toast notification ──
function Toast({ type, message, onClose }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!message) return
    const t1 = setTimeout(() => setLeaving(true),  3200)
    const t2 = setTimeout(() => { setLeaving(false); onClose() }, 3600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [message, onClose])

  if (!message) return null

  const isError = type === 'error'
  return (
    <div
      className={`toast-notification ${leaving ? 'toast-out' : ''}`}
      style={{
        borderColor: isError ? 'rgba(239,68,68,0.35)' : 'rgba(34,197,94,0.35)',
        color       : isError ? '#ef4444' : '#22c55e',
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>{isError ? '❌' : '✅'}</span>
      {message}
    </div>
  )
}

export default function Contact() {
  const heading = useFadeUp()
  const info    = useFadeUp()
  const form    = useFadeUp()

  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [sending, setSending]   = useState(false)
  const [toast, setToast]       = useState({ type: '', message: '' })

  const clearToast = useCallback(() => setToast({ type: '', message: '' }), [])

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan.')
      }

      setToast({ type: 'success', message: 'Pesan berhasil dikirim! Saya akan segera menghubungi kamu.' })
      setFormData({ name: '', email: '', subject: '', message: '' })

    } catch (err) {
      // Fallback jika backend mati — buka mailto langsung
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setToast({
          type   : 'error',
          message: 'Server tidak dapat dijangkau. Coba email langsung ke wahyuargomu123@gmail.com',
        })
      } else {
        setToast({ type: 'error', message: err.message })
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative z-[1] border-t border-[rgba(0,180,255,0.12)]"
      style={{ padding: '100px 60px', background: '#0d1426' }}
    >
      <Toast type={toast.type} message={toast.message} onClose={clearToast} />

      {/* Header */}
      <div ref={heading.ref} className={`fade-up ${heading.visible ? 'visible' : ''} text-center mb-[60px]`}>
        <span className="font-mono text-[0.82rem] text-[#00c8ff] tracking-[0.08em] block mb-[10px]">
          // get in touch
        </span>
        <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-white tracking-[-1px] mb-[14px]">
          Let's Work <span className="text-grad">Together</span>
        </h2>
        <p className="text-[#64748b] text-[1rem] max-w-[500px] mx-auto leading-[1.7]">
          Punya proyek keren? Saya siap membantu mewujudkannya!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] max-w-[1000px] mx-auto items-start">

        {/* Info Kolom */}
        <div ref={info.ref} className={`fade-up ${info.visible ? 'visible' : ''}`}>
          <h3 className="text-[1.5rem] font-extrabold text-white mb-[14px]">Hubungi Saya</h3>
          <p className="text-[#64748b] text-[0.95rem] leading-[1.8] mb-8">
            Saya terbuka untuk peluang freelance, kolaborasi proyek, maupun full-time.
            Jangan ragu untuk menghubungi saya!
          </p>

          {[
            {
              icon : <EmailIcon />,
              label: 'Email',
              val  : profile.email,
              href : `mailto:${profile.email}`,
            },
            {
              icon : <LocationIcon />,
              label: 'Lokasi',
              val  : profile.location,
              href : profile.locationMapUrl,
            },
            {
              icon : <PhoneIcon />,
              label: 'WhatsApp',
              val  : profile.whatsapp,
              href : `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`,
            },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-[14px] mb-5 group">
              <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center
                              bg-[rgba(0,200,255,0.08)] border border-[rgba(0,200,255,0.15)]
                              rounded-[12px] text-[#00c8ff]
                              group-hover:bg-[rgba(0,200,255,0.15)]
                              group-hover:border-[rgba(0,200,255,0.35)]
                              transition-all duration-200">
                {item.icon}
              </div>
              <div>
                <div className="text-[0.72rem] text-[#64748b] font-bold uppercase tracking-[0.06em]">
                  {item.label}
                </div>
                {item.href
                  ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                       rel="noreferrer"
                       className="text-[0.92rem] font-semibold text-[#e2e8f0]
                                  hover:text-[#00c8ff] transition-colors duration-200">
                      {item.val}
                    </a>
                  : <div className="text-[0.92rem] font-semibold text-[#e2e8f0]">{item.val}</div>
                }
              </div>
            </div>
          ))}

          {/* Social Icons */}
          <div className="flex gap-3 mt-8">
            {[
              { href: profile.github,    icon: <GitHubIcon />,   title: 'GitHub'    },
              { href: profile.linkedin,  icon: <LinkedInIcon />, title: 'LinkedIn'  },
              { href: profile.instagram, icon: <InstaIcon />,    title: 'Instagram' },
            ].map(s => (
              <a key={s.title} href={s.href} target="_blank" rel="noreferrer" title={s.title}
                 className="w-11 h-11 flex items-center justify-center rounded-xl
                            border-[1.5px] border-[rgba(0,180,255,0.12)] text-[#64748b]
                            hover:border-[#00c8ff] hover:text-[#00c8ff] hover:-translate-y-[3px]
                            hover:shadow-[0_6px_20px_rgba(0,200,255,0.2)]
                            transition-all duration-200">
                {s.icon}
              </a>
            ))}
          </div>

          {/* Open to Work card */}
          <div className="mt-8 p-5 bg-[#111827] border border-[rgba(34,197,94,0.2)]
                          rounded-[16px] flex items-center gap-3">
            <div className="badge-dot flex-shrink-0" />
            <div>
              <div className="text-[0.85rem] font-bold text-[#22c55e]">Open to Work</div>
              <div className="text-[0.78rem] text-[#64748b]">
                Tersedia untuk freelance & full-time — respons dalam 24 jam
              </div>
            </div>
          </div>

          {/* Notifikasi info */}
          <div className="mt-4 p-4 bg-[#111827] border border-[rgba(0,180,255,0.12)]
                          rounded-[14px] flex items-start gap-3">
            <span className="text-[1.1rem] flex-shrink-0 mt-[1px]">⚡</span>
            <p className="text-[0.78rem] text-[#64748b] leading-[1.6]">
              Pesan kamu akan langsung diteruskan ke{' '}
              <span className="text-[#00c8ff] font-semibold">Gmail</span> dan{' '}
              <span className="text-[#22c55e] font-semibold">WhatsApp</span> saya secara otomatis.
            </p>
          </div>
        </div>

        {/* Form Kolom */}
        <div ref={form.ref} className={`fade-up delay-1 ${form.visible ? 'visible' : ''}`}>
          <form
            onSubmit={handleSubmit}
            className="bg-[#111827] border border-[rgba(0,180,255,0.12)] rounded-[24px] p-9"
          >
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[0.82rem] font-bold text-[#64748b]
                                  uppercase tracking-[0.06em] mb-2">
                  Nama <span className="text-red-400">*</span>
                </label>
                <input
                  type="text" name="name" placeholder="Nama kamu"
                  value={formData.name} onChange={handleChange}
                  required maxLength={100}
                  className="form-input" />
              </div>
              <div>
                <label className="block text-[0.82rem] font-bold text-[#64748b]
                                  uppercase tracking-[0.06em] mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email" name="email" placeholder="email@example.com"
                  value={formData.email} onChange={handleChange}
                  required maxLength={200}
                  className="form-input" />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[0.82rem] font-bold text-[#64748b]
                                uppercase tracking-[0.06em] mb-2">
                Subjek <span className="text-red-400">*</span>
              </label>
              <input
                type="text" name="subject" placeholder="Freelance / Kolaborasi / dll."
                value={formData.subject} onChange={handleChange}
                required maxLength={200}
                className="form-input" />
            </div>

            <div className="mb-6">
              <label className="flex justify-between text-[0.82rem] font-bold text-[#64748b]
                                uppercase tracking-[0.06em] mb-2">
                <span>Pesan <span className="text-red-400">*</span></span>
                <span className={`font-mono text-[0.72rem] ${
                  formData.message.length > 4500 ? 'text-red-400' : 'text-[#475569]'
                }`}>
                  {formData.message.length}/5000
                </span>
              </label>
              <textarea
                name="message" rows={5} placeholder="Ceritakan proyekmu..."
                value={formData.message} onChange={handleChange}
                required maxLength={5000}
                className="form-input" />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2
                         font-bold text-[0.95rem] py-[14px] rounded-[14px]
                         bg-gradient-to-br from-[#00c8ff] to-[#3b82f6] text-[#080d18]
                         hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,200,255,0.3)]
                         transition-all duration-200
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0
                         disabled:shadow-none"
            >
              {sending ? (
                <>
                  <SpinnerIcon />
                  Mengirim...
                </>
              ) : (
                <>
                  Kirim Pesan
                  <SendIcon />
                </>
              )}
            </button>

            <p className="text-center text-[0.74rem] text-[#475569] mt-4">
              Atau email langsung ke{' '}
              <a href={`mailto:${profile.email}`}
                 className="text-[#00c8ff] hover:underline transition-colors duration-200">
                {profile.email}
              </a>
            </p>
          </form>
        </div>

      </div>
    </section>
  )
}

// ── Icons ──
const EmailIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
const LocationIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const PhoneIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16z"/></svg>
const SendIcon     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
const GitHubIcon   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
const LinkedInIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const InstaIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const SpinnerIcon  = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
       style={{ animation: 'spin 0.8s linear infinite' }}>
    <path d="M21 12a9 9 0 11-6.219-8.56"/>
  </svg>
)
