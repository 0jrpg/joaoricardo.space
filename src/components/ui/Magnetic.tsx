import { useRef, type PointerEvent, type ReactNode } from 'react'

/** O conteúdo é "puxado" na direção do mouse quando ele chega perto. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const inner = useRef<HTMLSpanElement>(null)
  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType === 'touch' || !inner.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    inner.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const leave = () => {
    if (inner.current) inner.current.style.transform = ''
  }
  return (
    <span className="mag" onPointerMove={move} onPointerLeave={leave}>
      <span className="mag-in" ref={inner}>
        {children}
      </span>
    </span>
  )
}
