import { useEffect, useRef, useState } from 'react'

type Opts = { threshold?: number; rootMargin?: string; once?: boolean; enabled?: boolean }

/** Observa quando o elemento entra na tela. `enabled=false` adia a observação (ex.: até a abertura do site terminar). */
export function useInView<T extends Element>({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true, enabled = true }: Opts = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) setInView(false)
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once, enabled])
  return [ref, inView] as const
}
