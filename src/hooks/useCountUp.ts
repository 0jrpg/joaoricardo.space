import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './useReducedMotion'

/** Contador animado de 0 até `target` quando `start` vira true. */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setV(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setV(Math.round(target * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return v
}
