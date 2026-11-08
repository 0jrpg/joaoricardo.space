import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { EMAIL } from '../data'
import { MenuIcon, CloseIcon } from './Icons'

export default function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
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

  const links = [
    ['#inicio', t.nav.home],
    ['#codigo', t.nav.code],
    ['#destaques', t.nav.featured],
    ['#alf', t.nav.alf],
    ['#contato', t.nav.contact],
  ]

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <a href="#inicio" className="brand" aria-label="JoãoRicardo.space">
          JoãoRicardo<span className="brand-space">.space</span>
        </a>
        <div className="head-right">
          <a className="pill" href={`mailto:${EMAIL}`}>
            {t.contactTop}
          </a>
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label={t.menu} aria-expanded={open}>
            <MenuIcon />
          </button>
        </div>
      </header>

      <div className={`overlay${open ? ' open' : ''}`} aria-hidden={!open}>
        <button className="menu-btn close" onClick={() => setOpen(false)} aria-label={t.close} tabIndex={open ? 0 : -1}>
          <CloseIcon />
        </button>
        <nav>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
