// ══════════════════════════════════════════
// useFadeUp — Custom Hook
// Trigger animasi fade-up saat elemen masuk viewport
// ══════════════════════════════════════════

import { useEffect, useRef, useState } from 'react'

export function useFadeUp(threshold = 0.18) {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el) // stop observing setelah visible
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
