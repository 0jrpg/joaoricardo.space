import type { CSSProperties, ElementType, HTMLAttributes } from 'react'
import { useBoot } from '../../boot/BootProvider'
import { useInView } from '../../hooks/useInView'
import { vars } from '../../lib/css'

export type Variant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur'

type Props = HTMLAttributes<HTMLElement> & { as?: ElementType; variant?: Variant; delay?: number; href?: string; eager?: boolean }

/** Anima o elemento quando ele entra na tela (só depois que a abertura do site terminar). */
export default function Reveal({ as, variant = 'up', delay = 0, eager = false, className = '', style, children, ...rest }: Props) {
  const { ready } = useBoot()
  const [ref, inView] = useInView<HTMLElement>({ enabled: ready, ...(eager ? { rootMargin: '0px', threshold: 0 } : {}) })
  const Comp = (as ?? 'div') as ElementType
  return (
    <Comp ref={ref} className={`reveal rv-${variant}${inView ? ' in' : ''} ${className}`} style={{ ...vars({ '--d': `${delay}ms` }), ...style } as CSSProperties} {...rest}>
      {children}
    </Comp>
  )
}
