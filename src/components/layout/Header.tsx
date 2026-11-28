import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useBoot } from '../../boot/BootProvider'
import { EMAIL, SECTIONS } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLang } from '../../i18n'
import LangSwitch from './LangSwitch'
import MobileMenu from './MobileMenu'

/**
 * Cabeçalho flutuante em formato de pílula: entra deslizando, esconde ao rolar pra baixo,
 * mostra ao rolar pra cima e tem um indicador que desliza até a seção ativa.
 */
export default function Header() {
  const { t, lang } = useLang()
  const { ready } = useBoot()
  const active = useActiveSection(SECTIONS, lang)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hide, setHide] = useState(false)
  const [ind, setInd] = useState({ x: 0, w: 0 })
  const nav = useRef<HTMLElement>(null)

  const links = [
    ['inicio', t.nav.home],
    ['codigo', t.nav.code],
    ['destaques', t.nav.featured],
    ['alf', t.nav.alf],
    ['contato', t.nav.contact],
  ] as const

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHide(y > last && y > 240)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const measure = useCallback(() => {
    const a = nav.current?.querySelector<HTMLElement>(`a[data-id="${active}"]`)
    if (a) setInd({ x: a.offsetLeft, w: a.offsetWidth })
  }, [active])

  useLayoutEffect(() => measure(), [measure, t])
  useEffect(() => {
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <>
      <header className={`header${ready ? ' in' : ''}${scrolled ? ' scrolled' : ''}${hide && !open ? ' hide' : ''}`}>
        <div className="header-bar">
          <a href="#inicio" className="brand" aria-label="JoãoRicardo.space">
            <span className="brand-orb" />
            JoãoRicardo<span className="brand-space">.space</span>
          </a>

          <nav className="nav" ref={nav} aria-label="Principal">
            <span className="nav-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.w ? 1 : 0 }} />
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} data-id={id} className={active === id ? 'active' : ''}>
                {label}
              </a>
            ))}
          </nav>

          <div className="head-right">
            <div className="head-lang">
              <LangSwitch />
            </div>
            <a className="pill" href={`mailto:${EMAIL}`}>
              {t.contactTop}
            </a>
            <button className={`burger${open ? ' open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label={open ? t.close : t.menu} aria-expanded={open}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} links={links} active={active} onClose={() => setOpen(false)} />
    </>
  )
}
