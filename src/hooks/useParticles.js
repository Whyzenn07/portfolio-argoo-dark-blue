// ══════════════════════════════════════════
// useParticles — Custom Hook
// Mengelola canvas particle animation
// Partikel bergerak + garis koneksi + mouse interaction
// ══════════════════════════════════════════

import { useEffect, useRef } from 'react'

export function useParticles(canvasRef, count = 70) {
  const mouseRef = useRef({ x: null, y: null })
  const animRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, particles = []
    const MAX_DIST = 130

    // ── Resize canvas sesuai window ──
    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    // ── Class Particle ──
    function createParticle() {
      return {
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 0.4,
        vy:    (Math.random() - 0.5) * 0.4,
        r:     Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      }
    }

    function init() {
      particles = Array.from({ length: count }, createParticle)
    }

    // ── Update posisi partikel ──
    function updateParticle(p) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
    }

    // ── Draw frame ──
    function draw() {
      ctx.clearRect(0, 0, W, H)
      const mouse = mouseRef.current

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 200, 255, ${p.alpha})`
        ctx.fill()
      })

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)

          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Garis ke mouse
        if (mouse.x !== null) {
          const dx   = particles[i].x - mouse.x
          const dy   = particles[i].y - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < 160) {
            const opacity = (1 - dist / 160) * 0.35
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      particles.forEach(updateParticle)
      animRef.current = requestAnimationFrame(draw)
    }

    // ── Event Listeners ──
    const onResize    = () => { resize(); init() }
    const onMouseMove = e  => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onMouseOut  = () => { mouseRef.current = { x: null, y: null } }

    window.addEventListener('resize',    onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseOut)

    resize()
    init()
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize',    onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseOut)
    }
  }, [canvasRef, count])
}
