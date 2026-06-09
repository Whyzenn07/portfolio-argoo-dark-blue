// ══════════════════════════════════════════
// useTyping — Custom Hook
// Mengelola typing animation (ketik & hapus)
// ══════════════════════════════════════════

import { useState, useEffect } from 'react'

export function useTyping(texts, typingSpeed = 110, deletingSpeed = 55, pauseMs = 1800) {
  const [displayed, setDisplayed]   = useState('')
  const [textIndex, setTextIndex]   = useState(0)
  const [charIndex, setCharIndex]   = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Hapus satu karakter
        setDisplayed(currentText.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)

        // Selesai hapus → pindah ke teks berikutnya
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setTextIndex(prev => (prev + 1) % texts.length)
        }
      } else {
        // Tambah satu karakter
        setDisplayed(currentText.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)

        // Selesai ketik → tunggu lalu hapus
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseMs)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseMs])

  return displayed
}
