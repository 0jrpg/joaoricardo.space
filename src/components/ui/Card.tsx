import { useRef, type CSSProperties, type ElementType, type HTMLAttributes, type PointerEvent } from 'react'
import { useBoot } from '../../boot/BootProvider'
import { useInView } from '../../hooks/useInView'
import { vars } from '../../lib/css'
import type { Variant } from './Reveal'

type Props = HTMLAttributes<HTMLElement> & { as?: ElementType; tilt?: boolean; variant?: Variant; delay?: number }

/**
 * Card de vidro com: entrada animada, brilho que segue o mouse (spotlight),
 * borda de gradiente girando no hover e inclinação 3D opcional (`tilt`).
 */
export default function Card({ as, tilt = false, variant = 'up', delay = 0, className = '', style, children, onPointerMove, onPointerLeave, ...rest }: Props) {
  const { ready } = useBoot()
  const [ref, inView] = useInView<HTMLElement>({ enabled: ready })
  const raf = useRef(0)
  const Comp = (as ?? 'div') as ElementType

  const move = (e: PointerEvent<HTMLElement>) => {
    onPointerMove?.(e)
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const { clientX, clientY } = e
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      const x = clientX - r.left
      const y = clientY - r.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      if (tilt) {
        el.style.setProperty('--rx', `${(-(y / r.height - 0.5) * 7).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${((x / r.width - 0.5) * 9).toFixed(2)}deg`)
      }
    })
  }
  const leave = (e: PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e)
    cancelAnimationFrame(raf.current)
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <Comp
      ref={ref}
      className={`card reveal rv-${variant}${inView ? ' in' : ''} ${className}`}
      style={{ ...vars({ '--d': `${delay}ms` }), ...style } as CSSProperties}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      {children}
    </Comp>
  )
}
