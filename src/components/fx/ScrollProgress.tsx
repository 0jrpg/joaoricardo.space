import { useEffect, useRef } from 'react'

/** Barra de gradiente no topo que mostra quanto da página já foi lida. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        ref.current?.style.setProperty('--p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}
