import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n'
import { ArrowUpIcon } from '../ui/Icons'

/** Botão flutuante com anel de progresso; aparece depois de rolar a página. */
export default function BackToTop() {
  const { t } = useLang()
  const [show, setShow] = useState(false)
  const ring = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      ring.current?.setAttribute('stroke-dashoffset', String(100 - p * 100))
      setShow(window.scrollY > 600)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <button className={`to-top${show ? ' show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.footer.top} tabIndex={show ? 0 : -1}>
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle className="tt-bg" cx="22" cy="22" r="20" />
        <circle ref={ring} className="tt-fg" cx="22" cy="22" r="20" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
      </svg>
      <ArrowUpIcon size={18} />
    </button>
  )
}
