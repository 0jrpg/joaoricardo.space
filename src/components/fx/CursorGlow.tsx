import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../hooks/useReducedMotion'

const COLORS = ['#8b5cf6', '#22d3ee', '#5eead4', '#f472b6', '#ffffff']

/** Brilho suave que segue o mouse + explosão de partículas a cada clique. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    // partículas no clique (funciona em qualquer dispositivo)
    const burst = (e: PointerEvent) => {
      for (let i = 0; i < 10; i++) {
        const p = document.createElement('span')
        const size = 4 + Math.random() * 5
        p.className = 'burst'
        p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;background:${COLORS[i % COLORS.length]}`
        document.body.appendChild(p)
        const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.6
        const d = 36 + Math.random() * 52
        p.animate(
          [
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(0)`, opacity: 0 },
          ],
          { duration: 520 + Math.random() * 300, easing: 'cubic-bezier(.2,.8,.3,1)' },
        ).onfinish = () => p.remove()
      }
    }
    window.addEventListener('pointerdown', burst)

    // brilho que segue o cursor (só mouse)
    const el = ref.current
    let raf = 0
    let move: ((e: PointerEvent) => void) | undefined
    if (el && window.matchMedia('(pointer: fine)').matches) {
      let x = window.innerWidth / 2
      let y = window.innerHeight / 2
      let tx = x
      let ty = y
      move = (e) => {
        tx = e.clientX
        ty = e.clientY
        el.style.opacity = '1'
      }
      const tick = () => {
        x += (tx - x) * 0.12
        y += (ty - y) * 0.12
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        raf = requestAnimationFrame(tick)
      }
      window.addEventListener('pointermove', move, { passive: true })
      raf = requestAnimationFrame(tick)
    }

    return () => {
      window.removeEventListener('pointerdown', burst)
      if (move) window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
