import { useEffect, useRef, type CSSProperties } from 'react'
import { BOOT } from '../data/site'
import { useLang } from '../i18n'
import { vars } from '../lib/css'
import { useBoot } from './BootProvider'
import Skeleton from './Skeleton'

const PANELS = 7

/**
 * Tela de abertura. Camadas (de baixo pra cima):
 *  painéis escuros (viram a "cortina") → skeleton → logo → barra de progresso.
 */
export default function Boot() {
  const { phase } = useBoot()
  const { t } = useLang()
  const pct = useRef<HTMLSpanElement>(null)

  // Contador 0 → 100% durante o tempo do skeleton.
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / BOOT.skeleton)
      if (pct.current) pct.current.textContent = `${Math.round(p * 100)}%`
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`boot is-${phase}`} role="status" aria-live="polite" aria-busy={phase === 'skeleton'} style={vars({ '--boot-ms': `${BOOT.skeleton}ms` })}>
      <span className="sr-only">{t.loading}</span>

      <div className="boot-panels" aria-hidden="true">
        {Array.from({ length: PANELS }, (_, i) => (
          <i key={i} style={{ '--i': i } as CSSProperties} />
        ))}
      </div>

      <div className="boot-bar" aria-hidden="true">
        <i />
      </div>

      <Skeleton />

      <div className="boot-hint" aria-hidden="true">
        <span className="boot-dots">
          <i />
          <i />
          <i />
        </span>
        <span ref={pct} className="boot-pct">
          0%
        </span>
      </div>

      <div className="boot-logo" aria-hidden="true">
        <div className="bl-mark">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="bootGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8b5cf6" />
                <stop offset=".55" stopColor="#22d3ee" />
                <stop offset="1" stopColor="#5eead4" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="54" pathLength="100" />
          </svg>
          <b>JR</b>
        </div>
        <p className="bl-name">
          JoãoRicardo<span>.space</span>
        </p>
      </div>
    </div>
  )
}
