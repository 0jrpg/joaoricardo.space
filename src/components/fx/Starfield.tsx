import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Star = { x: number; y: number; z: number; r: number; p: number; s: number }
type Shoot = { x: number; y: number; vx: number; vy: number; life: number }

/**
 * Céu estrelado em canvas: estrelas que piscam, parallax com o mouse e o scroll,
 * "constelações" que se ligam perto do cursor e estrelas cadentes.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let stars: Star[] = []
    let shoot: Shoot | null = null
    let nextShoot = performance.now() + 2500
    const ptr = { x: -9999, y: -9999, nx: 0, ny: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(420, Math.round((w * h) / 7000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.4 + 0.4,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 1.2 + 0.3,
      }))
      if (reduced) frame(0)
    }

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const sy = window.scrollY
      const near: { x: number; y: number }[] = []

      for (const s of stars) {
        const x = s.x - ptr.nx * s.z * 22
        let y = (s.y - sy * s.z * 0.22) % h
        if (y < 0) y += h
        const twinkle = 0.6 + 0.4 * Math.sin(s.p + t * 0.001 * s.s * 2)
        ctx.globalAlpha = twinkle * (0.3 + 0.7 * s.z)
        ctx.fillStyle = s.z > 0.85 ? '#a5f3fc' : s.z < 0.3 ? '#c4b5fd' : '#ffffff'
        ctx.beginPath()
        ctx.arc(x, y, s.r * s.z + 0.25, 0, Math.PI * 2)
        ctx.fill()
        const dx = x - ptr.x
        const dy = y - ptr.y
        if (dx * dx + dy * dy < 150 * 150) near.push({ x, y })
      }

      // constelação perto do cursor
      ctx.lineWidth = 1
      ctx.strokeStyle = '#8b5cf6'
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const d = Math.hypot(near[i].x - near[j].x, near[i].y - near[j].y)
          if (d < 100) {
            ctx.globalAlpha = (1 - d / 100) * 0.55
            ctx.beginPath()
            ctx.moveTo(near[i].x, near[i].y)
            ctx.lineTo(near[j].x, near[j].y)
            ctx.stroke()
          }
        }
      }

      // estrela cadente
      if (!reduced) {
        if (!shoot && t > nextShoot) {
          shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.35, vx: 9 + Math.random() * 4, vy: 4 + Math.random() * 3, life: 1 }
        }
        if (shoot) {
          const sh = shoot
          const g = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 9, sh.y - sh.vy * 9)
          g.addColorStop(0, `rgba(255,255,255,${sh.life})`)
          g.addColorStop(1, 'rgba(139,92,246,0)')
          ctx.globalAlpha = 1
          ctx.strokeStyle = g
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(sh.x, sh.y)
          ctx.lineTo(sh.x - sh.vx * 9, sh.y - sh.vy * 9)
          ctx.stroke()
          sh.x += sh.vx
          sh.y += sh.vy
          sh.life -= 0.012
          if (sh.life <= 0 || sh.x > w + 100 || sh.y > h + 100) {
            shoot = null
            nextShoot = t + 3500 + Math.random() * 4500
          }
        }
      }
      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      ptr.x = e.clientX
      ptr.y = e.clientY
      ptr.nx = (e.clientX / w) * 2 - 1
      ptr.ny = (e.clientY / h) * 2 - 1
    }

    resize()
    if (!reduced) raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  return <canvas ref={ref} aria-hidden="true" />
}
