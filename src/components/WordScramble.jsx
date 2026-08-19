import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * Signature moment for SPARK: a phrase that starts jumbled — the way a
 * word can feel just out of reach with aphasia — and resolves into place
 * letter by letter, left to right. Ties the hero directly to the product.
 */
export default function WordScramble({ text, className = '', startDelay = 300 }) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, ' '))
  const [settledCount, setSettledCount] = useState(0)
  const frame = useRef(0)
  const rafId = useRef(null)

  useEffect(() => {
    let cancelled = false
    let tickCount = 0

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return
        tickCount++
        const settle = Math.floor(tickCount / 2)
        setSettledCount(Math.min(settle, text.length))

        setDisplay(() =>
          text
            .split('')
            .map((ch, i) => {
              if (ch === ' ') return ' '
              if (i < settle) return ch
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join('')
        )

        if (settle >= text.length) {
          clearInterval(interval)
        }
      }, 45)
      rafId.current = interval
    }, startDelay)

    return () => {
      cancelled = true
      clearTimeout(start)
      if (rafId.current) clearInterval(rafId.current)
    }
  }, [text, startDelay])

  return (
    <span className={className} aria-label={text}>
      {display.split('').map((ch, i) => (
        <span key={i} className={i < settledCount ? 'settled' : ''}>
          {ch}
        </span>
      ))}
    </span>
  )
}
